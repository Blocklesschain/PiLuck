import { NextResponse } from "next/server";
import { ensureSchema } from "@/lib/piluck-store";

export async function GET() {
  await ensureSchema();

  return NextResponse.json({
    ok: true,
    service: "piluck-api",
    status: "healthy",
  });
}
