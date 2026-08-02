import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { claimDailyStreak } from "@/lib/piluck-store";
import { verifyPiAccessToken } from "@/lib/pi-verify";

const claimSchema = z.object({
  accessToken: z.string().min(10),
  uid: z.string().min(1),
  username: z.string().min(1),
  walletAddress: z.string().min(1).optional().nullable(),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = claimSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid credit claim payload." },
      { status: 400 }
    );
  }

  try {
    await verifyPiAccessToken(parsed.data.accessToken);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Pi access token verification failed.",
      },
      { status: 401 }
    );
  }

  const result = await claimDailyStreak({
    uid: parsed.data.uid,
    username: parsed.data.username,
    walletAddress: parsed.data.walletAddress ?? undefined,
  });

  return NextResponse.json({ ok: true, result });
}
