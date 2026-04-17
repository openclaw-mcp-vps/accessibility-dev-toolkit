export function buildCheckoutUrl(opts: {
  variantId: string;
  sessionId: string;
  redirectUrl: string;
}) {
  const base = `https://checkout.lemonsqueezy.com/buy/${opts.variantId}`;
  const url = new URL(base);
  url.searchParams.set("embed", "1");
  url.searchParams.set("checkout[custom][session_id]", opts.sessionId);
  url.searchParams.set("checkout[success_url]", opts.redirectUrl);
  return url.toString();
}
