import { getSiteContent } from "../lib/siteContent";\n\nconst PAIN_POINTS = [
  "No clear brand positioning",
  "Random marketing with no direction",
  "Low-converting websites",
  "No systems or automation",
];

const ANSWERS = [
  {
    num: "01",
    title: "Brand Foundation",
    body: "We build strong positioning, identity, and offers so your brand stands out and converts from day one.",
  },
  {
    num: "02",
    title: "Growth Systems",
    body: "We drive traffic, leads, and conversions through structured, data-backed performance systems.",
  },
  {
    num: "03",
    title: "Operations & Scale",
    body: "We automate, optimize, and scale your backend so growth doesn't break your business.",
  },
];

export default async function Problem() {\n  const content = await getSiteContent();
  return (
    <section id="problem" className="py-20 px-5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-sm text-glow mb-3">{content.problemEyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
            {content.problemTitle}
          </h2>
          <p className="text-textSub mb-6">
            They fail because of broken systems. Random efforts with no structure lead to one
            place — stuck.
          </p>

          <div className="space-y-3 mb-6">
            {PAIN_POINTS.map((point) => (
              <div key={point} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-xs shrink-0">
                  ✕
                </div>
                <p className="text-sm text-textSub">{point}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 items-start bg-card border border-border rounded-xl p-4">
            <span>⚠️</span>
            <p className="text-sm text-textSub">
              Random efforts. No structure. No scale. That&apos;s why most brands stay stuck.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {ANSWERS.map((a) => (
            <div key={a.num} className="bg-card border border-border rounded-xl p-6">
              <p className="font-orbitron text-glow text-sm mb-2">{a.num}</p>
              <h3 className="font-semibold mb-2">{a.title}</h3>
              <p className="text-sm text-textSub">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
