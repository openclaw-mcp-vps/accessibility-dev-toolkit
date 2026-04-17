"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type AuditIssue = {
  id: string;
  impact: string | null;
  description: string;
  help: string;
};

const SAMPLE = `<html>
  <body>
    <main>
      <img src="dashboard.png">
      <button></button>
      <a href="#"></a>
    </main>
  </body>
</html>`;

export function AccessibilityAuditor() {
  const [html, setHtml] = useState(SAMPLE);
  const [loading, setLoading] = useState(false);
  const [issues, setIssues] = useState<AuditIssue[]>([]);
  const [error, setError] = useState<string | null>(null);

  const runAudit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html })
      });
      if (!res.ok) throw new Error("Audit run failed");
      const data = (await res.json()) as { issues: AuditIssue[] };
      setIssues(data.issues);
    } catch {
      setError("Could not run audit. Check your HTML and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <ShieldCheck className="h-5 w-5 text-[var(--accent)]" />
          Accessibility Auditor
        </CardTitle>
        <CardDescription>
          Run an axe-core based report and find high-impact accessibility defects quickly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea value={html} onChange={(e) => setHtml(e.target.value)} className="min-h-[220px] font-mono text-xs" />
        <Button onClick={runAudit} disabled={loading}>
          {loading ? "Running audit..." : "Run Audit"}
        </Button>
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <div className="space-y-2">
          {issues.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">No audit issues yet. Run the audit to see actionable findings.</p>
          ) : (
            issues.map((issue, idx) => (
              <div key={`${issue.id}-${idx}`} className="rounded-md border border-[var(--border)] bg-[var(--surface-2)] p-3">
                <p className="font-medium text-red-200">{issue.help}</p>
                <p className="text-sm text-[var(--muted)]">{issue.description}</p>
                <p className="text-xs text-[var(--muted)]">Impact: {issue.impact ?? "unknown"}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
