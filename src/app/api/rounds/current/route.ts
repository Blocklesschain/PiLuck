import { NextRequest, NextResponse } from "next/server";
import { getOrCreateCurrentRound, getWalletState } from "@/lib/piluck-store";

export async function GET(request: NextRequest) {
  const round = await getOrCreateCurrentRound();
  const walletKey = request.nextUrl.searchParams.get("walletKey");
  const wallet = walletKey ? await getWalletState(walletKey) : null;

  return NextResponse.json({
    ok: true,
    round,
    wallet,
  });
}
