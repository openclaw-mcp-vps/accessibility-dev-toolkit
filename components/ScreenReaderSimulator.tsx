"use client";

import { useMemo, useState } from "react";
import { Volume2 } from "lucide-react";
import { simulateAnnouncements } from "@/lib/screen-reader-engine";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const SAMPLE = `<main>
  <h1>Checkout</h1>
  <button aria-label="Apply coupon">Apply</button>
  <img src="/promo.png" alt="Discount banner: 20% off annual plan" />
  <a href="/terms">Terms and conditions</a>
</main>`;

export function ScreenReaderSimulator() {
  const [html, setHtml] = useState(SAMPLE);
  const announcements = useMemo(() => simulateAnnouncements(html), [html]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Volume2 className="h-5 w-5 text-[var(--accent)]" />
          Screen Reader Simulator
        </CardTitle>
        <CardDescription>
          Paste component markup and preview likely announcement order to catch missing names and weak content structure.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-sm text-[var(--muted)]">Input HTML</p>
          <Textarea value={html} onChange={(e) => setHtml(e.target.value)} className="min-h-[260px] font-mono text-xs" />
        </div>
        <div>
          <p className="mb-2 text-sm text-[var(--muted)]">Simulated Announcements</p>
          <div className="h-[260px] overflow-auto rounded-md border border-[var(--border)] bg-[var(--surface-2)] p-3">
            <ol className="space-y-2 text-sm">
              {announcements.map((line, idx) => (
                <li key={`${line}-${idx}`} className="rounded bg-[#10151d] p-2">
                  <span className="text-[var(--muted)]">{idx + 1}.</span> {line}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
