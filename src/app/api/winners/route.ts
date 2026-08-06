import { NextRequest, NextResponse } from "next/server";
import { getPastWinners } from "@/lib/piluck-store";

export async function GET(request: NextRequest) {
  try {
    const limit = Number(request.nextUrl.searchParams.get("limit") || 20);
    const winners = await getPastWinners(Math.min(limit, 100));
    return NextResponse.json({ ok: true, winners });
  } catch (error) {
    console.warn("Failed to fetch past winners:", error);
    return NextResponse.json(
      { ok: false, error: "Could not fetch past winners." },
      { status: 500 }
    );
  }
}