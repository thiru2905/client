import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Cpu, Moon, ShieldCheck, Sparkles, Sun, Zap } from "lucide-react";
import { BackgroundBeams } from "@/components/aceternity/BackgroundBeams";
import { Spotlight } from "@/components/aceternity/Spotlight";
import { BentoCard, BentoGrid } from "@/components/aceternity/BentoGrid";
import { useTheme } from "@/lib/theme";
import { LandingOrgChart } from "@/components/landing/LandingOrgChart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alyson HR — People, Pay & Equity OS" },
      { name: "description", content: "The AI-augmented operating system for people, payroll, performance, and equity." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { theme, toggle } = useTheme();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/60 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-5 md:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-foreground text-background grid place-items-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="font-display text-lg font-semibold tracking-tight">Alyson HR</div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#lab" className="hover:text-foreground">Lab</a>
            <a href="#security" className="hover:text-foreground">Security</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              className="h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/auth" className="h-9 px-3 rounded-md border border-border text-sm font-medium hover:bg-muted/50">
              Sign in
            </Link>
            <Link
              to="/auth"
              className="h-9 px-3 rounded-md bg-foreground text-background text-sm font-medium inline-flex items-center gap-2 hover:opacity-90"
            >
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <BackgroundBeams />
          <Spotlight />

          <div className="mx-auto max-w-6xl px-5 md:px-8 pt-16 md:pt-20 pb-10 md:pb-14 relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1 text-xs text-muted-foreground">
              <Cpu className="h-3.5 w-3.5" />
              AI-first HR lab for compensation + headcount intelligence
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7">
                <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.03]">
                  An AI lab for people & pay.
                  <span className="text-muted-foreground"> Built like a modern SaaS OS.</span>
                </h1>
                <p className="mt-5 max-w-2xl text-[15px] md:text-lg text-muted-foreground leading-relaxed">
                  Alyson turns HR + Finance data into decision-ready views: role-aware dashboards, scenario planning, and audit-grade workflows —
                  with an AI copilot that explains every metric.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/auth"
                    className="h-11 px-5 rounded-md bg-foreground text-background text-sm font-medium inline-flex items-center justify-center gap-2 hover:opacity-90"
                  >
                    Create account <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/auth"
                    className="h-11 px-5 rounded-md border border-border text-sm font-medium inline-flex items-center justify-center hover:bg-muted/50"
                  >
                    Sign in
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border bg-muted/30 px-3 py-1">Role-aware access</span>
                  <span className="rounded-full border border-border bg-muted/30 px-3 py-1">Forecast payroll + bonus + equity</span>
                  <span className="rounded-full border border-border bg-muted/30 px-3 py-1">Workflows + approvals</span>
                  <span className="rounded-full border border-border bg-muted/30 px-3 py-1">Clerk auth</span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="surface-lifted p-4 md:p-5 rounded-2xl">
                  <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-medium">Lab console</div>
                  <div className="mt-3 rounded-xl border border-border bg-background/60 p-4 font-mono text-[12px] leading-relaxed">
                    <div className="text-muted-foreground">$ alyson run forecast --scenario growth --months 12</div>
                    <div className="mt-2">
                      <span className="text-foreground">✓</span> Payroll next month:{" "}
                      <span className="text-foreground font-medium">$1.42M</span>
                    </div>
                    <div>
                      <span className="text-foreground">✓</span> Bonus accrual (Q):{" "}
                      <span className="text-foreground font-medium">$310k</span>
                    </div>
                    <div>
                      <span className="text-foreground">✓</span> Equity expense (6mo):{" "}
                      <span className="text-foreground font-medium">$980k</span>
                    </div>
                    <div className="mt-2 text-muted-foreground">Explain variance ↴</div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      { k: "Latency", v: "fast" },
                      { k: "Lineage", v: "traceable" },
                      { k: "Controls", v: "role-based" },
                    ].map((x) => (
                      <div key={x.k} className="rounded-xl border border-border bg-muted/20 p-3">
                        <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{x.k}</div>
                        <div className="mt-1 text-sm font-medium">{x.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-5 md:px-8 py-14 md:py-20">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-medium">What you get</div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2 tracking-tight">Modern ops, minus the noise</h2>
            </div>
            <div className="text-sm text-muted-foreground max-w-md">
              Designed like a SaaS AI lab: fast feedback loops, clean surfaces, and data you can trust.
            </div>
          </div>

          <BentoGrid className="mt-8 grid-cols-1 md:grid-cols-3">
            <BentoCard
              eyebrow="Explore"
              title="Instant answers"
              description="Slice headcount, comp, and spend by org unit and time — without exporting data."
              icon={<Zap className="h-4 w-4" />}
            />
            <BentoCard
              eyebrow="Model"
              title="Scenario planning"
              description="Forecast payroll + bonus + equity costs with conservative/base/growth assumptions."
              icon={<Bot className="h-4 w-4" />}
            />
            <BentoCard
              eyebrow="Operate"
              title="Workflows that stick"
              description="Approvals, inboxes, and audit trails that match real finance + HR teams."
              icon={<ShieldCheck className="h-4 w-4" />}
            />
          </BentoGrid>
        </section>

        <section id="lab" className="border-t border-border bg-muted/10">
          <div className="mx-auto max-w-6xl px-5 md:px-8 py-14 md:py-18">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-medium">AI lab</div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold mt-2 tracking-tight">
                  Lab-driven primitives, product-grade UX
                </h3>
              </div>
              <div className="text-sm text-muted-foreground max-w-md">
                Every KPI is explainable. Every forecast is reproducible. Every decision has lineage.
              </div>
            </div>

            <BentoGrid className="mt-8 grid-cols-1 lg:grid-cols-12">
              <BentoCard
                className="lg:col-span-7"
                eyebrow="Copilot"
                title="Explain anything"
                description="Ask why a metric moved, what contributes to cost, or where a number comes from — and get a plain-English answer."
                icon={<Bot className="h-4 w-4" />}
              >
                <div className="rounded-xl border border-border bg-background/60 p-4 font-mono text-[12px] text-muted-foreground leading-relaxed">
                  <div className="text-foreground">Q: Why did payroll jump 8% MoM?</div>
                  <div className="mt-2">A: Headcount +6, comp refresh +$120k, equity amortization +$34k.</div>
                  <div className="mt-1">Sources: employees, compensation, vesting_events.</div>
                </div>
              </BentoCard>
              <BentoCard
                className="lg:col-span-5"
                eyebrow="Guardrails"
                title="Operator-safe"
                description="Role-based access, consistent surfaces, and calm defaults. Built to ship without chaos."
                icon={<ShieldCheck className="h-4 w-4" />}
              >
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border bg-muted/30 px-3 py-1">CEO</span>
                  <span className="rounded-full border border-border bg-muted/30 px-3 py-1">Finance</span>
                  <span className="rounded-full border border-border bg-muted/30 px-3 py-1">HR</span>
                  <span className="rounded-full border border-border bg-muted/30 px-3 py-1">Manager</span>
                  <span className="rounded-full border border-border bg-muted/30 px-3 py-1">Employee</span>
                </div>
              </BentoCard>
            </BentoGrid>
          </div>
        </section>

        <section id="org" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-5 md:px-8 py-14 md:py-20">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-medium">Canvas</div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold mt-2 tracking-tight">
                  Org chart, as a heroic scene
                </h3>
              </div>
              <div className="text-sm text-muted-foreground max-w-md">
                A living map of your company: reporting lines, cost, and movement — built for operators.
              </div>
            </div>

            <div className="mt-8">
              <LandingOrgChart
                onCta={() => {
                  const el = document.getElementById("faq");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>
          </div>
        </section>

        <section id="security" className="border-t border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-5 md:px-8 py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-medium">Security</div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mt-2 tracking-tight">Clean auth, safe defaults</h3>
              <p className="mt-3 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                Sign-in is handled by Clerk. Private routes stay private, and marketing pages remain public.
              </p>
            </div>
            <div className="surface-card p-5">
              <div className="text-sm font-medium">Included</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-foreground">•</span> Protected app area under <span className="font-mono text-foreground">/app</span></li>
                <li className="flex gap-2"><span className="text-foreground">•</span> Public landing page at <span className="font-mono text-foreground">/</span></li>
                <li className="flex gap-2"><span className="text-foreground">•</span> Auth page at <span className="font-mono text-foreground">/auth</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-6xl px-5 md:px-8 py-14 md:py-20">
          <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">FAQ</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Faq q="Can I still reach the app fast?" a="Yes — once you sign in, you’ll land in the app at /app." />
            <Faq q="Why did auth show first before?" a="The app was redirecting every unauthenticated route to /auth." />
            <Faq q="Is the landing page public?" a="Yep. / stays public, while everything else stays protected." />
            <Faq q="Can we add pricing / docs later?" a="Absolutely — we can add more public routes beside /." />
          </div>

          <div className="mt-10 surface-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="font-display text-xl font-semibold">Ready to build your workspace?</div>
              <div className="text-sm text-muted-foreground mt-1">Create an account and explore the demo roles inside.</div>
            </div>
            <Link
              to="/auth"
              className="h-11 px-5 rounded-md bg-foreground text-background text-sm font-medium inline-flex items-center gap-2 hover:opacity-90"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 md:px-8 py-10 text-sm text-muted-foreground flex items-center justify-between">
          <div>© {new Date().getFullYear()} Alyson HR</div>
          <div className="flex items-center gap-4">
            <Link to="/auth" className="hover:text-foreground">Sign in</Link>
            <Link to="/auth" className="hover:text-foreground">Create account</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="surface-card p-5">
      <div className="font-medium">{q}</div>
      <div className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{a}</div>
    </div>
  );
}
