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

const STACK = ["MARKETING", "AI AUTOMATION", "OPERATIONS", "SOURCING"];

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

        <div className="flex flex-col gap-4">
          {STACK.map((label) => (
            <a
              key={label}
              href="#services"
              className="font-orbitron text-xs tracking-widest h-[76px] rounded-xl border border-borderGlow
                flex items-center justify-center text-textSub hover:text-white hover:border-accent
                transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
