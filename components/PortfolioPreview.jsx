"use client";

import { useState } from "react";

// Shows a REAL, live, scrollable/clickable preview of another website --
// not a screenshot, and not shrunk down to a tiny illegible thumbnail
// either. The site loads at its natural size inside a fixed-height
// window (so it gets its own scrollbar, like looking through a small
// window into the real page), and "Fullscreen" opens it larger with
// Mobile / Tablet / Full width toggles -- same idea as keystone.app's
// gallery.

const DEVICE_WIDTHS = {
  mobile: 390,
  tablet: 834,
  full: "100%",
};

export default function PortfolioPreview({ site }) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [device, setDevice] = useState("full");

  let hostname = site.url;
  try {
    hostname = new URL(site.url).hostname;
  } catch {
    // If the URL is malformed, just show it as typed.
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Browser-window chrome bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-surface border-b border-border">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-textMuted truncate flex-1">{hostname}</span>
        <button
          onClick={() => setFullscreenOpen(true)}
          className="shrink-0 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
        >
          ⛶ Fullscreen
        </button>
      </div>

      {/* The live preview -- real size, fixed height, its own native
          scrollbar. Nothing is scaled down here. */}
      <div className="h-[420px] overflow-auto bg-white">
        <iframe src={site.url} title={site.title} loading="lazy" className="w-full h-full border-0" />
      </div>

      <div className="p-5">
        {site.category && <span className="text-xs text-glow">{site.category}</span>}
        <h3 className="font-semibold mt-1 mb-2">{site.title}</h3>
        {site.description && <p className="text-sm text-textSub mb-4">{site.description}</p>}
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accentLight hover:underline"
        >
          Visit Full Site ↗
        </a>
      </div>

      {fullscreenOpen && (
        <div className="fixed inset-0 z-[100] bg-bg flex flex-col">
          <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-border bg-surface">
            <span className="font-semibold text-sm truncate">{site.title}</span>

            <div className="flex items-center gap-2">
              {["mobile", "tablet", "full"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDevice(d)}
                  className={`text-xs px-3 py-1.5 rounded-full capitalize transition-colors ${
                    device === d ? "bg-accent text-white" : "bg-white/10 text-textSub hover:bg-white/20"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <button
              onClick={() => setFullscreenOpen(false)}
              aria-label="Close"
              className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-auto bg-surface flex justify-center py-6">
            <iframe
              src={site.url}
              title={site.title}
              className="border-0 bg-white h-full"
              style={{ width: DEVICE_WIDTHS[device], maxWidth: "100%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
