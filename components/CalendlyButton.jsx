"use client";

import { siteConfig } from "../lib/siteConfig";

// One shared button used anywhere we want to open the Calendly popup
// (Hero, Contact, etc.) so there's one place to update the link, and the
// Calendly script only needs to be loaded once (in app/layout.js).

export default function CalendlyButton({
  label = "📅 Book A Free Call",
  variant = "primary", // "primary" (solid gradient) | "light" (solid white)
  className = "",
}) {
  function openPopup(e) {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: siteConfig.calendlyUrl });
    } else {
      // Rare fallback in case the script hasn't finished loading yet.
      window.open(siteConfig.calendlyUrl, "_blank");
    }
  }

  const variants = {
    primary: "bg-gradient-to-br from-accent to-accentLight text-white hover:opacity-90",
    light: "bg-white text-accent hover:bg-white/90",
  };

  return (
    <button
      onClick={openPopup}
      className={`px-6 py-3 rounded-full font-medium transition-opacity ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
