const PILLARS = [
  {
    icon: "🎯",
    title: "Strategy-First Approach",
    body: "Every decision starts with a clear strategy, not guesswork or trends.",
  },
  {
    icon: "⚙️",
    title: "System-Driven Execution",
    body: "We build repeatable systems that run without constant reinvention.",
  },
  {
    icon: "📈",
    title: "Built for Scale, Not Short-Term Wins",
    body: "Everything we build is designed to compound over time.",
  },
];

// These four layers recreate the exact "stacked cards" look from the
// original site: each one sits slightly smaller and darker than the one
// above it, with a negative margin so they overlap instead of stacking
// with gaps -- like a deck of cards fanned out from the top.
const STACK = [
  {
    label: "MARKETING",
    background: "linear-gradient(135deg, #1D1050, #0F0A28)",
    color: "#C084FC",
    boxShadow: "0 0 30px rgba(124, 58, 237, 0.3)",
    scale: 1,
    zIndex: 4,
  },
  {
    label: "AI AUTOMATION",
    background: "linear-gradient(135deg, #150D3A, #0B0B22)",
    color: "#9D5CF5",
    scale: 0.93,
    zIndex: 3,
  },
  {
    label: "OPERATIONS",
    background: "linear-gradient(135deg, #150D3A, #0B0B22)",
    color: "#9D5CF5",
    scale: 0.86,
    zIndex: 2,
  },
  {
    label: "SOURCING",
    background: "linear-gradient(135deg, #0E0828, #08081C)",
    color: "#7C3AED",
    scale: 0.79,
    zIndex: 1,
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 px-5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm text-glow mb-3">Who We Are</p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
            We are not a service agency. We are a <span className="grad">system builder.</span>
          </h2>
          <p className="text-textSub mb-8">
            CRC Core combines marketing, operations, and sourcing into one unified system
            designed for scalable growth — not fragmented freelancers and disconnected tools.
          </p>

          <div className="space-y-6">
            {PILLARS.map((p) => (
              <div key={p.title} className="flex gap-4">
                <div className="text-2xl">{p.icon}</div>
                <div>
                  <h4 className="font-semibold mb-1">{p.title}</h4>
                  <p className="text-sm text-textSub">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col mx-auto w-full max-w-[270px]">
          {STACK.map((layer, i) => (
            <a
              key={layer.label}
              href="#services"
              className="font-orbitron text-xs tracking-widest h-[76px] rounded-xl border border-borderGlow
                flex items-center justify-center hover:brightness-125 transition-all"
              style={{
                background: layer.background,
                color: layer.color,
                boxShadow: layer.boxShadow,
                transform: `scale(${layer.scale})`,
                zIndex: layer.zIndex,
                marginBottom: i < STACK.length - 1 ? "-16px" : 0,
              }}
            >
              {layer.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
