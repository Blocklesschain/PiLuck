import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { claimDailyStreak, upsertWallet } from "@/lib/piluck-store";
import { fetchPiWalletBalance } from "@/lib/pi-platform";
import { verifyPiAccessToken } from "@/lib/pi-verify";

const sessionSchema = z.object({
  accessToken: z.string().min(10),
  uid: z.string().min(1),
  username: z.string().min(1),
  walletAddress: z.string().min(1).optional().nullable(),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = sessionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid Pi session payload." },
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

  const wallet = await upsertWallet({
    uid: parsed.data.uid,
    username: parsed.data.username,
    walletAddress: parsed.data.walletAddress ?? undefined,
  });

  const streak = await claimDailyStreak({
    uid: parsed.data.uid,
    username: parsed.data.username,
    walletAddress: parsed.data.walletAddress ?? undefined,
  });

  let balance: { nativeBalance: string | null; accountId: string } | null = null;

  if (wallet?.walletAddress) {
    try {
      balance = await fetchPiWalletBalance(wallet.walletAddress);
    } catch (error) {
      console.warn("Pi wallet balance lookup failed:", error);
    }
  }

  return NextResponse.json({
    ok: true,
    wallet,
    streak,
    balance,
  });
}
