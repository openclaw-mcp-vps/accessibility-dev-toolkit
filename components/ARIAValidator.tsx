"use client";

import { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { validateARIA } from "@/lib/accessibility-rules";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const SAMPLE = `<section aria-hidden="true">
  <button></button>
</section>
<img src="chart.png" />
<input type="text" />`;

export function ARIAValidator() {
  const [html, setHtml] = useState(SAMPLE);
  const issues = useMemo(() => validateARIA(html), [html]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <AlertTriangle className="h-5 w-5 text-[var(--accent)]" />
          ARIA Attribute Validator
        </CardTitle>
        <CardDescription>
          Detect invalid or risky ARIA patterns before they reach production.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-sm text-[var(--muted)]">Input HTML</p>
          <Textarea value={html} onChange={(e) => setHtml(e.target.value)} className="min-h-[220px] font-mono text-xs" />
        </div>
        <div>
          <p className="mb-2 text-sm text-[var(--muted)]">Validation Findings ({issues.length})</p>
          <div className="h-[220px] overflow-auto rounded-md border border-[var(--border)] bg-[var(--surface-2)] p-3">
            {issues.length === 0 ? (
              <p className="text-sm text-[var(--accent-2)]">No ARIA rule violations detected.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {issues.map((issue) => (
                  <li key={issue.id} className="rounded border border-[var(--border)] bg-[#10151d] p-2">
                    <p className={issue.severity === "error" ? "text-red-300" : "text-yellow-200"}>
                      {issue.severity.toUpperCase()}: {issue.message}
                    </p>
                    <p className="text-xs text-[var(--muted)]">Selector: {issue.selector}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
