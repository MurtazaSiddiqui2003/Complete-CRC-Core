"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SECTIONS = [
  { href: "/admin/case-studies", label: "Case Studies", icon: "◆", desc: "Proof, projects and results." },
  { href: "/admin/portfolio", label: "Portfolio", icon: "▣", desc: "Live website previews." },
  { href: "/admin/blog", label: "Blog", icon: "✎", desc: "Articles and content marketing." },
  { href: "/admin/services", label: "Services", icon: "✦", desc: "Your growth-system offerings." },
  { href: "/admin/testimonials", label: "Testimonials", icon: "“", desc: "Client social proof." },
  { href: "/admin/faq", label: "FAQ", icon: "?", desc: "Questions and answers." },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const endpoints = [
        ["caseStudies", "/api/case-studies"],
        ["portfolio", "/api/portfolio"],
        ["blog", "/api/blog"],
        ["services", "/api/services"],
        ["testimonials", "/api/testimonials"],
        ["faq", "/api/faq"],
      ];
      const results = await Promise.all(
        endpoints.map(async ([key, url]) => {
          try {
            const res = await fetch(url);
            const data = await res.json();
            return [key, Array.isArray(data) ? data.length : 0];
          } catch {
            return [key, 0];
          }
        })
      );
      if (!cancelled) {
        setStats(Object.fromEntries(results));
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const total = Object.values(stats).reduce((sum, value) => sum + value, 0);

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accentLight">Dashboard</p>
          <h1 className="font-heading text-3xl sm:text-4xl">Good to see you.</h1>
          <p className="mt-2 max-w-2xl text-sm text-textSub">Manage the content that powers CRC Core. Every saved change is reflected on the live website.</p>
        </div>
        <Link href="/" target="_blank" className="w-fit bg-gradient-to-br from-accent to-accentLight px-5 py-3 text-sm font-medium text-white">Open Website ↗</Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total Content" value={loading ? "—" : total} />
        <Stat label="Case Studies" value={loading ? "—" : stats.caseStudies ?? 0} />
        <Stat label="Portfolio Sites" value={loading ? "—" : stats.portfolio ?? 0} />
        <Stat label="Blog Posts" value={loading ? "—" : stats.blog ?? 0} />
      </div>

      <section className="mt-8">
        <div className="mb-4">
          <h2 className="font-heading text-xl">Website Content</h2>
          <p className="mt-1 text-sm text-textMuted">Choose a section to manage.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section) => (
            <Link key={section.href} href={section.href} className="group border border-border bg-card p-5 transition-colors hover:border-accent/60 hover:bg-card/80">
              <div className="mb-5 flex h-10 w-10 items-center justify-center border border-border text-accentLight">{section.icon}</div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium">{section.label}</h3>
                  <p className="mt-1 text-xs text-textSub">{section.desc}</p>
                </div>
                <span className="text-textMuted transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div><h2 className="font-heading text-lg">Content Health</h2><p className="mt-1 text-xs text-textMuted">Live database counts.</p></div>
            <span className="flex items-center gap-2 text-xs text-textSub"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Connected</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MiniStat label="Services" value={loading ? "—" : stats.services ?? 0} />
            <MiniStat label="Testimonials" value={loading ? "—" : stats.testimonials ?? 0} />
            <MiniStat label="FAQ" value={loading ? "—" : stats.faq ?? 0} />
            <MiniStat label="API" value="Online" />
          </div>
        </div>

        <div className="border border-border bg-card p-5">
          <h2 className="font-heading text-lg">Quick Actions</h2>
          <p className="mt-1 text-xs text-textMuted">Jump straight into common admin tasks.</p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Quick href="/admin/case-studies" label="+ Case Study" />
            <Quick href="/admin/blog" label="+ Blog Post" />
            <Quick href="/admin/services" label="+ Service" />
            <Quick href="/admin/testimonials" label="+ Testimonial" />
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return <div className="border border-border bg-card p-5"><p className="text-xs uppercase tracking-[0.12em] text-textMuted">{label}</p><p className="mt-2 font-heading text-2xl">{value}</p></div>;
}
function MiniStat({ label, value }) {
  return <div className="border border-border bg-surface/50 p-3"><p className="text-[11px] text-textMuted">{label}</p><p className="mt-1 text-sm font-medium">{value}</p></div>;
}
function Quick({ href, label }) {
  return <Link href={href} className="border border-border px-3 py-2.5 text-center text-xs text-textSub hover:border-accent hover:text-white">{label}</Link>;
}
