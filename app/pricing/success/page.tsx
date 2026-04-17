import { Suspense } from "react";
import { PricingSuccessClient } from "@/components/PricingSuccessClient";

export default function PricingSuccessPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-xl px-6 py-24 text-center text-[var(--muted)]">Loading checkout status...</main>}>
      <PricingSuccessClient />
    </Suspense>
  );
}
