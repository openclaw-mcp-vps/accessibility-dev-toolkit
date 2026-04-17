import { NextRequest, NextResponse } from "next/server";
import { handleWebhookPayload, verifyWebhookSignature } from "@/lib/lemonsqueezy";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as Record<string, unknown>;
  const result = await handleWebhookPayload(payload);
  return NextResponse.json({ ok: true, result });
}
