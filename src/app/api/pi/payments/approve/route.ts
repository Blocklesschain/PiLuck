import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { recordPaymentApproval, getWalletRoundStatus } from "@/lib/piluck-store";
import { approvePiPayment } from "@/lib/pi-platform";
import { verifyPiAccessToken, verifyPiPayment } from "@/lib/pi-verify";

const approvalSchema = z.object({
  accessToken: z.string().min(10),
  paymentId: z.string().min(1),
  amountPi: z.number().positive(),
  memo: z.string().min(1),
  uid: z.string().min(1),
  username: z.string().min(1),
  walletAddress: z.string().min(1).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = approvalSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid payment approval payload." },
      { status: 400 }
    );
  }

  try {
    await verifyPiAccessToken(parsed.data.accessToken);
    await verifyPiPayment(parsed.data.paymentId);
    await approvePiPayment(parsed.data.paymentId);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Pi payment verification failed.",
      },
      { status: 401 }
    );
  }

  // Enforce one base ticket per wallet per round at the approval stage too.
  // This prevents a user from purchasing multiple base tickets even if they
  // disconnect and reconnect (as long as the payment was completed before).
  const ticketType =
    typeof parsed.data.metadata?.ticketType === "string"
      ? parsed.data.metadata.ticketType
      : "base";

  if (ticketType === "base") {
    try {
      const status = await getWalletRoundStatus({
        uid: parsed.data.uid,
        username: parsed.data.username,
        walletAddress: parsed.data.walletAddress ?? undefined,
      });
      if (status.hasBaseTicket) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "You already have a base ticket for this round. One base ticket per wallet per round.",
          },
          { status: 400 }
        );
      }
    } catch (error) {
      // DB not configured - fall through to allow payment approval.
      console.warn("Base-ticket check skipped (DB not available):", error);
    }
  }

  const record = await recordPaymentApproval({
    identity: {
      uid: parsed.data.uid,
      username: parsed.data.username,
      walletAddress: parsed.data.walletAddress ?? undefined,
    },
    paymentId: parsed.data.paymentId,
    amountPi: parsed.data.amountPi,
    memo: parsed.data.memo,
    metadata: parsed.data.metadata ?? {},
  });

  return NextResponse.json({
    ok: true,
    record,
  });
}
