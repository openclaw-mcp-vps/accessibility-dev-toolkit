import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccessibilityAuditor } from "@/components/AccessibilityAuditor";
import { ARIAValidator } from "@/components/ARIAValidator";
import { ScreenReaderSimulator } from "@/components/ScreenReaderSimulator";
import { PAYWALL_COOKIE } from "@/lib/lemonsqueezy";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const paid = cookieStore.get(PAYWALL_COOKIE)?.value === "paid";

  if (!paid) {
    redirect("/#pricing");
  }

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Accessibility Pro Toolkit</h1>
          <p className="text-[var(--muted)]">Use all three tools to validate semantics and improve screen-reader experience.</p>
        </div>
        <Link href="/">
          <Button variant="ghost">Back to Landing</Button>
        </Link>
      </header>

      <ScreenReaderSimulator />
      <ARIAValidator />
      <AccessibilityAuditor />
    </main>
  );
}
