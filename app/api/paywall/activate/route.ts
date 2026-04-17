import { NextRequest, NextResponse } from "next/server";
import { PAYWALL_COOKIE } from "@/lib/lemonsqueezy";
import { isSessionPaid } from "@/lib/paywall";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ ok: false, error: "missing_session_id" }, { status: 400 });
  }

  const paid = await isSessionPaid(sessionId);
  if (!paid) {
    return NextResponse.json({ ok: false, error: "not_paid_yet" }, { status: 409 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(PAYWALL_COOKIE, "paid", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/"
  });
  return res;
}
