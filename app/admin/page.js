"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CONTENT = [
  { href: "/admin/case-studies", label: "Case Studies", desc: "Projects and results", icon: "▣", api: "/api/case-studies" },
  { href: "/admin/portfolio", label: "Portfolio", desc: "Live website previews", icon: "◫", api: "/api/portfolio" },
  { href: "/admin/services", label: "Services", desc: "Growth system services", icon: "✦", api: "/api/services" },
  { href: "/admin/testimonials", label: "Testimonials", desc: "Client proof and quotes", icon: "❝", api: "/api/testimonials" },
  { href: "/admin/faq", label: "FAQ", desc: "Questions and answers", icon: "?", api: "/api/faq" },
  { href: "/admin/blog", label: "Blog", desc: "Articles and insights", icon: "✎", api: "/api/blog" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadOverview() {
      try {
        const results = await Promise.all(
          CONTENT.map(async (section) => {
            const response = await fetch(section.api, { cache: "no-store" });
            if (!response.ok) throw new Error("Unable to load content.");
            const data = await response.json();
            return [section.api, Array.isArray(data) ? data.length : 0];
          })
        );
        if (!cancelled) setCounts(Object.fromEntries(results));
      } catch (err) {
        if (!cancelled) setError(err.message || "Some dashboard data could not be loaded.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadOverview();
    return () => { cancelled = true; };
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);

  return (
    <div className="min-h-screen bg-[#07070f] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0a0a14] p-5 lg:flex lg:flex-col">
          <div className="mb-10">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-300/70">CRC Core</div>
            <div className="font-heading text-xl font-semibold">Admin Studio</div>
          </div>

          <nav className="space-y-1">
            <NavItem href="/admin" active label="Dashboard" icon="⌂" />
            <div className="mb-2 mt-7 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">Website content</div>
            {CONTENT.map((item) => (
              <NavItem key={item.href} href={item.href} label={item.label} icon={item.icon} />
            ))}
          </nav>

          <div className="mt-auto space-y-2 pt-8">
            <Link href="/" target="_blank" className="flex items-center gap-3 border border-white/10 px-3 py-2.5 text-sm text-white/65 transition hover:border-purple-400/40 hover:text-white">
              <span>↗</span> View website
            </Link>
            <button onClick={handleLogout} className="flex w-full items-center gap-3 border border-white/10 px-3 py-2.5 text-left text-sm text-white/55 transition hover:border-red-400/30 hover:text-red-300">
              <span>↪</span> Log out
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-6 sm:px-8 lg:px-10 lg:py-9">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-purple-300/65">Control center</div>
                <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
                  Welcome to <span className="grad">CRC Core</span>
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
                  Manage the content that powers the website. Changes made here are reflected on the live site.
                </p>
              </div>
              <button onClick={handleLogout} className="lg:hidden border border-white/10 px-3 py-2 text-xs text-white/60">Log out</button>
            </div>

            {error && (
              <div role="alert" className="mb-6 border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <section className="grid gap-4 sm:grid-cols-3">
              <StatCard label="Content items" value={loading ? "—" : total} detail="Across all sections" />
              <StatCard label="Content sections" value={CONTENT.length} detail="Ready to manage" />
              <StatCard label="System status" value={error ? "Check" : "Online"} detail={error ? "Some data needs attention" : "Admin APIs responding"} status={!error} />
            </section>

            <section className="mt-10">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <h2 className="font-heading text-xl font-semibold">Website content</h2>
                  <p className="mt-1 text-sm text-white/40">Choose what you want to update.</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {CONTENT.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group border border-white/10 bg-white/[0.025] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-purple-400/40 hover:bg-purple-500/[0.045]"
                  >
                    <div className="mb-7 flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center border border-purple-400/20 bg-purple-500/10 text-lg text-purple-200">
                        {item.icon}
                      </div>
                      <span className="text-xs text-white/25 transition group-hover:text-purple-300">Open →</span>
                    </div>
                    <h3 className="font-heading text-base font-semibold">{item.label}</h3>
                    <p className="mt-1 text-sm text-white/40">{item.desc}</p>
                    <div className="mt-5 border-t border-white/8 pt-3 text-xs text-white/30">
                      {loading ? "Loading…" : `${counts[item.api] ?? 0} item${counts[item.api] === 1 ? "" : "s"}`}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-10 border border-white/10 bg-gradient-to-br from-purple-500/[0.08] to-transparent p-6 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-300/70">Next phase</div>
                  <h2 className="mt-2 font-heading text-xl font-semibold">Global website controls</h2>
                  <p className="mt-1 max-w-xl text-sm leading-6 text-white/40">
                    We are building the next layer of the admin: hero, about, contact, footer, navigation, SEO, and social settings in one place.
                  </p>
                </div>
                <div className="shrink-0 border border-white/10 px-4 py-3 text-xs text-white/45">Coming next</div>
              </div>
            </section>

            <div className="mt-8 border-t border-white/8 pt-5 text-xs text-white/25">
              CRC Core Admin · Secure session · Live content management
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, label, icon, active = false }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 border px-3 py-2.5 text-sm transition ${
        active
          ? "border-purple-400/20 bg-purple-500/10 text-white"
          : "border-transparent text-white/50 hover:border-white/8 hover:bg-white/[0.025] hover:text-white"
      }`}
    >
      <span className="w-5 text-center text-sm">{icon}</span>
      {label}
    </Link>
  );
}

function StatCard({ label, value, detail, status = false }) {
  return (
    <div className="border border-white/10 bg-white/[0.025] p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.16em] text-white/35">{label}</div>
        {status && <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,.65)]" />}
      </div>
      <div className="mt-3 font-heading text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-xs text-white/35">{detail}</div>
    </div>
  );
}
