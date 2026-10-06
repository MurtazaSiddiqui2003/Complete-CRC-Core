"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV = [
  { label: "Overview", href: "/admin", icon: "⌂" },
  { label: "Case Studies", href: "/admin/case-studies", icon: "◆" },
  { label: "Portfolio", href: "/admin/portfolio", icon: "▣" },
  { label: "Blog", href: "/admin/blog", icon: "✎" },
  { label: "Services", href: "/admin/services", icon: "✦" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "“" },
  { label: "FAQ", href: "/admin/faq", icon: "?" },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const active = (href) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-bg text-white">
      {open && (
        <button
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-card/95 backdrop-blur-xl transition-transform duration-200 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div>
              <p className="font-heading text-xl grad">CRC Core</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-textMuted">Admin Studio</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-textMuted lg:hidden" aria-label="Close">×</button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-textMuted">Manage</p>
            <Link href="/admin/inquiries" onClick={() => setOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 text-sm ${active("/admin/inquiries") ? "bg-accent/15 text-white border-l-2 border-accent" : "text-textSub hover:bg-white/5 hover:text-white"}`}><span className="flex h-7 w-7 items-center justify-center text-xs text-accentLight">◉</span>Inquiries</Link>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${active(item.href) ? "bg-accent/15 text-white border-l-2 border-accent" : "text-textSub hover:bg-white/5 hover:text-white"}`}
              >
                <span className="flex h-7 w-7 items-center justify-center text-xs text-accentLight">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            <p className="px-3 pb-2 pt-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-textMuted">System</p>
            <Link href="/admin/settings" onClick={() => setOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 text-sm ${active("/admin/settings") ? "bg-accent/15 text-white border-l-2 border-accent" : "text-textSub hover:bg-white/5 hover:text-white"}`}><span className="flex h-7 w-7 items-center justify-center text-xs text-accentLight">⚙</span>Site Settings</Link>
            <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 text-sm text-textSub hover:bg-white/5 hover:text-white">
              <span className="flex h-7 w-7 items-center justify-center text-xs text-accentLight">↗</span>
              View Live Site
            </Link>
          </nav>

          <div className="border-t border-border p-4">
            <button onClick={logout} className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-textSub hover:bg-white/5 hover:text-white">
              <span className="flex h-7 w-7 items-center justify-center">⇥</span>
              Log Out
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-bg/85 px-4 backdrop-blur-xl sm:px-6">
          <button onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center border border-border bg-card text-textSub lg:hidden" aria-label="Open navigation">☰</button>
          <div className="hidden lg:block">
            <p className="text-sm text-textSub">CRC Core Admin Studio</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-xs text-textMuted sm:inline">Changes publish instantly</span>
            <Link href="/" target="_blank" className="border border-border px-3 py-2 text-xs text-textSub hover:text-white">Live Site ↗</Link>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)] px-4 py-7 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
