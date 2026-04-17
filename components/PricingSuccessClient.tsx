"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function PricingSuccessClient() {
  const params = useSearchParams();
  const sessionId = params.get("session_id") ?? "";
  const [status, setStatus] = useState<"checking" | "ready" | "waiting" | "error">("checking");

  const endpoint = useMemo(() => `/api/paywall/activate?session_id=${encodeURIComponent(sessionId)}`, [sessionId]);

  useEffect(() => {
    let active = true;

    const run = async () => {
      if (!sessionId) {
        setStatus("error");
        return;
      }

      for (let i = 0; i < 8; i += 1) {
        const res = await fetch(endpoint, { method: "POST" });
        if (!active) return;

        if (res.status === 200) {
          setStatus("ready");
          return;
        }

        if (res.status !== 409) {
          setStatus("error");
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1800));
      }

      setStatus("waiting");
    };

    run();
    return () => {
      active = false;
    };
  }, [endpoint, sessionId]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold">Finalizing your access</h1>
      {status === "checking" ? <p className="mt-3 text-[var(--muted)]">Verifying your payment with Lemon Squeezy...</p> : null}
      {status === "ready" ? (
        <>
          <p className="mt-3 text-[var(--accent-2)]">Payment verified. Your Pro access is active.</p>
          <Link href="/dashboard" className="mt-6">
            <Button>Go to Dashboard</Button>
          </Link>
        </>
      ) : null}
      {status === "waiting" ? (
        <p className="mt-3 text-[var(--muted)]">
          Payment has not reached the webhook yet. Refresh in a few seconds if your card was charged.
        </p>
      ) : null}
      {status === "error" ? <p className="mt-3 text-red-300">Could not verify payment. Contact support with your receipt.</p> : null}
    </main>
  );
}
