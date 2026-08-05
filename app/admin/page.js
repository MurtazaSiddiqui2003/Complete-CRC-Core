"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const SECTIONS = [
  { href: "/admin/case-studies", label: "Case Studies", icon: "💼", desc: "The projects shown in 'Trusted by Ambitious Brands'" },
  { href: "/admin/portfolio", label: "Portfolio Sites", icon: "🖥️", desc: "Live website previews shown on the /portfolio page" },
  { href: "/admin/blog", label: "Blog Posts", icon: "📝", desc: "Cards shown in the 'From The Blog' section" },
  { href: "/admin/faq", label: "FAQ", icon: "❓", desc: "Questions and answers on the FAQ section" },
  { href: "/admin/services", label: "Services", icon: "🛠️", desc: "The 6 service cards in 'Complete Growth System'" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "💬", desc: "Client quotes (new section, hidden until you add one)" },
];

export default function AdminDashboard() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-bg text-white px-5 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-heading text-2xl grad">CRC Core Admin</h1>
            <p className="text-sm text-textSub mt-1">
              Manage what shows up on the website. Changes appear on the live site right away.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-textSub hover:text-white border border-border rounded-full px-4 py-2 transition-colors"
          >
            Log Out
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="bg-card border border-border rounded-xl p-5 hover:border-accent transition-colors"
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <h3 className="font-semibold mb-1">{s.label}</h3>
              <p className="text-sm text-textSub">{s.desc}</p>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-block mt-8 text-sm text-accentLight hover:underline"
        >
          View live site →
        </Link>
      </div>
    </div>
  );
}
