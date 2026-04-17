import Link from "next/link";
import { ArrowRight, Bug, Ear, ShieldAlert } from "lucide-react";
import { PricingCard } from "@/components/PricingCard";
import { Button } from "@/components/ui/button";

const faq = [
  {
    q: "What does this replace in our workflow?",
    a: "It removes ad-hoc manual checks by giving your team a repeatable simulator, ARIA validator, and audit runner in one place."
  },
  {
    q: "Do we need to install a browser extension?",
    a: "No. Everything runs in the web app, so onboarding is immediate for engineers, QA, and design reviewers."
  },
  {
    q: "How quickly can we get value?",
    a: "Most teams find broken labels and missing semantics in their first 10 minutes using real snippets from active features."
  }
];

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 text-[var(--muted)]">{subtitle}</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="pb-24">
      <section className="mx-auto max-w-6xl px-6 pt-16 sm:pt-24">
        <div className="rounded-2xl border border-[var(--border)] bg-[linear-gradient(145deg,#121924,#0d1117)] p-8 sm:p-12">
          <p className="mb-4 inline-block rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]">
            developer-tools
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Screen reader development tools for going blind
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[var(--muted)]">
            Catch accessibility defects before code review with a focused toolkit that simulates spoken output, validates ARIA,
            and generates practical audits.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Open Pro Toolkit
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#pricing">
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-6xl gap-4 px-6 md:grid-cols-3">
        {[
          {
            icon: <Ear className="h-5 w-5 text-[var(--accent)]" />,
            title: "Problem",
            body: "Teams ship flows that look right visually but fail for keyboard and screen-reader users because spoken output was never tested."
          },
          {
            icon: <Bug className="h-5 w-5 text-[var(--accent)]" />,
            title: "Impact",
            body: "Late fixes in QA become expensive and risky, especially when semantic issues are spread across multiple components."
          },
          {
            icon: <ShieldAlert className="h-5 w-5 text-[var(--accent)]" />,
            title: "Solution",
            body: "Run focused checks while coding: hear likely announcements, validate ARIA semantics, and audit complete snippets instantly."
          }
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="mb-3">{item.icon}</div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{item.body}</p>
          </div>
        ))}
      </section>

      <section id="pricing" className="mx-auto mt-24 max-w-6xl px-6">
        <SectionTitle
          title="One plan for complete accessibility debugging"
          subtitle="A single subscription for engineers shipping production interfaces."
        />
        <div className="mt-10">
          <PricingCard />
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-4xl px-6">
        <SectionTitle title="FAQ" subtitle="Straight answers for teams evaluating the toolkit." />
        <div className="mt-8 space-y-3">
          {faq.map((item) => (
            <details key={item.q} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
              <summary className="cursor-pointer list-none font-semibold">{item.q}</summary>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
