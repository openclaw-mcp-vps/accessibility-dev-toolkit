import { createHmac, timingSafeEqual } from "crypto";
import { markSessionPaid } from "@/lib/paywall";
import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

export const PAYWALL_COOKIE = "adt_access";

export function verifyWebhookSignature(rawBody: string, signature: string | null) {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  const digest = createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const expected = Buffer.from(digest, "utf8");
  const received = Buffer.from(signature, "utf8");

  if (expected.length !== received.length) return false;
  return timingSafeEqual(expected, received);
}

export async function handleWebhookPayload(payload: Record<string, unknown>) {
  lemonSqueezySetup({ apiKey: "noop" });
  const meta = (payload.meta ?? {}) as { event_name?: string; custom_data?: { session_id?: string } };
  const order = (payload.data ?? {}) as { id?: string };

  if (meta.event_name !== "order_created") {
    return { handled: false, reason: "unsupported_event" };
  }

  const sessionId = meta.custom_data?.session_id;
  if (!sessionId) {
    return { handled: false, reason: "missing_session_id" };
  }

  await markSessionPaid(sessionId, order.id);
  return { handled: true };
}
