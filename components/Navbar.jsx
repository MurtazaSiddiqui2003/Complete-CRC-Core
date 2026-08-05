"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const SERVICE_LINKS = [
  { icon: "🏗️", label: "Brand Foundation", sub: "Strategy & positioning" },
  { icon: "🛒", label: "E-commerce Setup", sub: "Shopify & WooCommerce" },
  { icon: "📊", label: "Performance Marketing", sub: "Meta, Google & Amazon Ads" },
  { icon: "🎬", label: "Content & Creatives", sub: "Ads, UGC & brand visuals" },
  { icon: "🎧", label: "Business Operations", sub: "Orders, support & logistics" },
  { icon: "🤖", label: "AI & Automation", sub: "Zapier, Make & chatbots" },
];

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#cases", label: "Case Studies" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "#faq", label: "FAQ" },
  { href: "#blog", label: "Blog" },
  // { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Clicking the logo should always land on the homepage. If we're
  // already there, just scroll to the top instead of doing a pointless
  // "navigation" to the same page. If we're on /portfolio, /blog/[id],
  // etc., send them to the homepage for real.
  function handleLogoClick(e) {
    e.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  }

  return (
    <>
      {/* Mobile sidebar + overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity md:hidden
          ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-surface border-l border-border z-50
          transition-transform duration-300 md:hidden flex flex-col p-6
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between mb-8">
          <span className="font-orbitron text-glow font-bold">CRC CORE</span>
          <button onClick={() => setSidebarOpen(false)} className="text-2xl leading-none">
            ×
          </button>
        </div>
        <div className="flex items-center gap-4 mb-8">
          <a href="https://wa.me/14166169901" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <Image src="/images/logos/whatsapp.svg" alt="WhatsApp" width={22} height={22} className="invert" unoptimized />
          </a>
          <a href="mailto:saeed@crccore.com" aria-label="Email">
            <Image src="/images/logos/mail.svg" alt="Email" width={22} height={22} />
          </a>
          <a href="tel:+1-416-616-9901" aria-label="Call">
            <Image src="/images/logos/phone.svg" alt="Call" width={24} height={24} />
          </a>
        </div>
        <nav className="flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className="text-textSub hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          onClick={() => setSidebarOpen(false)}
          className="mt-auto bg-gradient-to-br from-accent to-accentLight text-white text-center py-3 rounded-full font-medium"
        >
          Get Started →
        </a>
      </div>

      {/* Main nav bar */}
      <nav id="top" className="sticky top-0 z-30 bg-bg/90 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-4">
            {/* Always goes to the homepage -- scrolls to top if we're
                already there, navigates there for real otherwise. */}
            <a href="/" onClick={handleLogoClick}>
              <Image src="/images/logo-wide.png" alt="CRC Core" width={160} height={40} priority />
            </a>

            <div className="hidden sm:flex items-center gap-3">
              <a href="https://wa.me/14166169901" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <Image src="/images/logos/whatsapp.svg" alt="WhatsApp" width={22} height={22} className="invert" unoptimized />
              </a>
              <a href="mailto:saeed@crccore.com" aria-label="Email">
                <Image src="/images/logos/mail.svg" alt="Email" width={22} height={22} />
              </a>
              <a href="tel:+1-416-616-9901" aria-label="Call">
                <Image src="/images/logos/phone.svg" alt="Call" width={24} height={24} />
              </a>
            </div>
          </div>

          <ul className="hidden md:flex items-center gap-8 text-sm text-textSub">
            <li>
              <a href="#about" className="hover:text-white transition-colors">
                About
              </a>
            </li>
            <li className="relative group">
              <a href="#services" className="hover:text-white transition-colors">
                Services
              </a>
              {/* Dropdown, shown on hover for desktop -- pure CSS via group-hover */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72 opacity-0 invisible
                group-hover:opacity-100 group-hover:visible transition-all"
              >
                <div className="bg-card border border-border rounded-xl p-2 shadow-xl">
                  {SERVICE_LINKS.map((item) => (
                    <a
                      key={item.label}
                      href="#services"
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="flex flex-col text-left">
                        <span className="text-white text-sm">{item.label}</span>
                        <span className="text-xs text-textMuted">{item.sub}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <a href="#cases" className="hover:text-white transition-colors">
                Case Studies
              </a>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-white transition-colors">
                Portfolio
              </Link>
            </li>
            <li>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-white transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-block bg-gradient-to-br from-accent to-accentLight text-white text-sm px-5 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>

          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className="w-6 h-0.5 bg-white block" />
            <span className="w-6 h-0.5 bg-white block" />
            <span className="w-6 h-0.5 bg-white block" />
          </button>
        </div>
      </nav>
    </>
  );
}
