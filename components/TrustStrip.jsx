const STATS = [
  { num: "5+", label: "Brands Scaled" },
  { num: "3", label: "Countries Served" },
  { num: "6", label: "Core Services" },
  { num: "100%", label: "System-Driven" },
  { num: "B2B+B2C", label: "Markets Covered" },
];

export default function TrustStrip() {
  return (
    <div className="border-y border-border py-10 px-5">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-6">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-10">
            <div className="text-center">
              <div className="font-orbitron text-3xl md:text-4xl font-black text-glow">
                {stat.num}
              </div>
              <div className="text-sm text-textSub mt-1">{stat.label}</div>
            </div>
            {i < STATS.length - 1 && (
              <div className="hidden md:block w-px h-10 bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
