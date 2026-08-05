// Shows a REAL, live, scrollable/clickable preview of another website
// inside a small card -- not a screenshot. It works by loading the site
// at full desktop width (1440px) inside an iframe, then shrinking that
// down to fit the card using a CSS scale transform. Because it's a
// transform (not a resize), the page inside stays fully interactive --
// visitors can actually scroll and click around, same as keystone.app's
// gallery.
//
// "cqw" (container query width) units below mean "scale relative to
// THIS card's own width", so it stays correctly sized whether the card
// is in a 3-column grid on desktop or full-width on mobile -- no
// JavaScript needed to measure anything.

const VIRTUAL_WIDTH = 1440;
const VIRTUAL_HEIGHT = 900;

export default function PortfolioPreview({ site }) {
  let hostname = site.url;
  try {
    hostname = new URL(site.url).hostname;
  } catch {
    // If the URL is malformed, just show it as typed.
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent transition-colors">
      {/* Little browser-window chrome, purely decorative, to sell the
          "this is a real website" effect. */}
      <div className="flex items-center gap-1.5 px-3 py-2.5 bg-surface border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-textMuted truncate">{hostname}</span>
      </div>

      {/* The live preview itself. */}
      <div
        className="relative w-full overflow-hidden bg-white"
        style={{ containerType: "inline-size", aspectRatio: `${VIRTUAL_WIDTH} / ${VIRTUAL_HEIGHT}` }}
      >
        <iframe
          src={site.url}
          title={site.title}
          loading="lazy"
          className="absolute top-0 left-0 border-0"
          style={{
            width: `${VIRTUAL_WIDTH}px`,
            height: `${VIRTUAL_HEIGHT}px`,
            transformOrigin: "top left",
            transform: `scale(calc(100cqw / ${VIRTUAL_WIDTH}))`,
          }}
        />
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
    </div>
  );
}
