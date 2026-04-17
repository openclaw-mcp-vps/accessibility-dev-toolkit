import { NextRequest, NextResponse } from "next/server";
import axe from "axe-core";
import { JSDOM } from "jsdom";

export const runtime = "nodejs";

type AxeNode = {
  html: string;
};

type AxeViolation = {
  id: string;
  impact: string | null;
  description: string;
  help: string;
  nodes: AxeNode[];
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { html?: string };
  if (!body.html || typeof body.html !== "string") {
    return NextResponse.json({ error: "html is required" }, { status: 400 });
  }

  const dom = new JSDOM(body.html, { runScripts: "outside-only" });
  const { window } = dom;
  window.eval(axe.source);

  const results = await (window as unknown as { axe: { run: (doc: Document) => Promise<{ violations: AxeViolation[] }> } }).axe.run(
    window.document
  );

  const issues = results.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    help: `${v.help} ${v.nodes[0] ? `(example: ${v.nodes[0].html.slice(0, 120)})` : ""}`
  }));

  return NextResponse.json({ issues });
}
