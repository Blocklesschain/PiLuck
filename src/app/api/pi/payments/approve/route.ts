import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { recordPaymentApproval } from "@/lib/piluck-store";
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
