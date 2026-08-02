import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { spendCredits } from "@/lib/piluck-store";
import { verifyPiAccessToken } from "@/lib/pi-verify";

const spendSchema = z.object({
  accessToken: z.string().min(10),
  uid: z.string().min(1),
  username: z.string().min(1),
  walletAddress: z.string().min(1).optional().nullable(),
  quantity: z.number().int().min(1).default(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = spendSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid credit spend payload." },
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

  try {
    const result = await spendCredits(
      {
        uid: parsed.data.uid,
        username: parsed.data.username,
        walletAddress: parsed.data.walletAddress ?? undefined,
      },
      parsed.data.quantity
    );

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Could not spend credits.",
      },
      { status: 400 }
    );
  }
}
