"use client";

import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buildCheckoutUrl } from "@/lib/checkout";

declare global {
  interface Window {
    LemonSqueezy?: {
      Url: {
        Open: (url: string) => void;
      };
    };
  }
}

export function PricingCard() {
  const startCheckout = () => {
    const storeId = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID;
    const variantId = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRODUCT_ID;
    if (!storeId || !variantId) {
      alert("Missing NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID or NEXT_PUBLIC_LEMON_SQUEEZY_PRODUCT_ID configuration.");
      return;
    }

    const sessionId = crypto.randomUUID();
    localStorage.setItem("adt_checkout_session", sessionId);

    const redirectUrl = `${window.location.origin}/pricing/success?session_id=${sessionId}`;
    const url = buildCheckoutUrl({ variantId, sessionId, redirectUrl });

    if (window.LemonSqueezy?.Url?.Open) {
      window.LemonSqueezy.Url.Open(url);
    } else {
      window.location.href = url;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <Card className="mx-auto w-full max-w-md border-[var(--accent)] shadow-[0_0_40px_rgba(88,166,255,0.15)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Lock className="h-5 w-5 text-[var(--accent)]" />
            Pro Toolkit
          </CardTitle>
          <CardDescription>
            Ship confidently with a focused accessibility workflow for screen-reader behavior and ARIA integrity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-4xl font-bold">$15</p>
            <p className="text-sm text-[var(--muted)]">per month, cancel anytime</p>
          </div>

          <ul className="space-y-3 text-sm">
            {[
              "Unlimited screen reader simulation runs",
              "Real-time ARIA validation on custom snippets",
              "Exportable axe-core audit report JSON",
              "Persistent purchase access via secure cookie"
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-[var(--accent-2)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Button className="w-full" onClick={startCheckout}>
            Start Pro Access
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
