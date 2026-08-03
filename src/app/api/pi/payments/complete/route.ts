import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { recordPaymentCompletion } from "@/lib/piluck-store";
import { completePiPayment } from "@/lib/pi-platform";
import { verifyPiAccessToken, verifyPiPayment } from "@/lib/pi-verify";

const completionSchema = z.object({
  accessToken: z.string().min(10),
  paymentId: z.string().min(1),
  txid: z.string().min(1),
  amountPi: z.number().positive(),
  memo: z.string().min(1),
  uid: z.string().min(1),
  username: z.string().min(1),
  walletAddress: z.string().min(1).optional().nullable(),
  metadata: z.record(z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = completionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid payment completion payload." },
      { status: 400 }
    );
  }

  try {
    await verifyPiAccessToken(parsed.data.accessToken);
    await verifyPiPayment(parsed.data.paymentId, parsed.data.accessToken);
    await completePiPayment(parsed.data.paymentId, parsed.data.txid);
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

  const record = await recordPaymentCompletion({
    identity: {
      uid: parsed.data.uid,
      username: parsed.data.username,
      walletAddress: parsed.data.walletAddress ?? undefined,
    },
    paymentId: parsed.data.paymentId,
    txid: parsed.data.txid,
    amountPi: parsed.data.amountPi,
    memo: parsed.data.memo,
    metadata: parsed.data.metadata ?? {},
  });

  return NextResponse.json({
    ok: true,
    record,
  });
}
