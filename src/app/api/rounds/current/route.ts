import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  getOrCreateCurrentRound,
  getRoundTotals,
  getWalletRoundStatus,
  getWalletState,
} from "@/lib/piluck-store";
import { verifyPiAccessToken } from "@/lib/pi-verify";

const statusSchema = z.object({
  accessToken: z.string().min(10),
  uid: z.string().min(1),
  username: z.string().min(1),
  walletAddress: z.string().min(1).optional().nullable(),
});

export async function GET(request: NextRequest) {
  const round = await getOrCreateCurrentRound();
  const walletKey = request.nextUrl.searchParams.get("walletKey");
  const wallet = walletKey ? await getWalletState(walletKey) : null;
  const totals = await getRoundTotals();

  const hoursRemaining = Math.max(
    0,
    Math.floor((new Date(round.endsAt).getTime() - Date.now()) / (60 * 60 * 1000))
  );

  return NextResponse.json({
    ok: true,
    round,
    wallet,
    stats: {
      currentJackpotPi: Number(round.totalPoolPi ?? 0),
      currentRound: round.roundNumber,
      hoursRemaining,
      participants: Number(round.totalBaseEntries ?? 0) + Number(round.totalCreditEntries ?? 0),
      totalDistributedPi: totals.totalPoolPi,
      totalWinners: totals.roundsCount * 9,
      treasuryPi: Number(round.treasuryPi ?? 0),
    },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = statusSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid wallet status payload." },
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

  const status = await getWalletRoundStatus({
    uid: parsed.data.uid,
    username: parsed.data.username,
    walletAddress: parsed.data.walletAddress ?? undefined,
  });

  return NextResponse.json({
    ok: true,
    wallet: status.wallet,
    round: status.round,
    hasBaseTicket: status.hasBaseTicket,
    hasCreditTicket: status.hasCreditTicket,
  });
}
