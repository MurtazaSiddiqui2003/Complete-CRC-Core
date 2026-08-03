import { getCaseStudies } from "../lib/data";

export default async function CaseStudies() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <section id="cases" className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-sm text-glow mb-3">Proof of Impact</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by <span className="grad">Ambitious Brands</span>
            </h2>
            <p className="text-textSub">
              Integrated as their growth partner — not just another vendor.
            </p>
          </div>

          {caseStudies.length === 0 ? (
            <p className="text-center text-textMuted">
              No case studies added yet. Add some from the admin panel.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {caseStudies.map((c) => (
                <div
                  key={c._id}
                  className={`bg-card border border-border rounded-xl p-6 ${
                    c.featured ? "sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-6 sm:items-center" : ""
                  }`}
                >
                  <div className="rounded-xl overflow-hidden mb-5 sm:mb-0">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover rounded-xl"
                    >
                      <source src={c.videoUrl || "/videos/reel.mp4"} type="video/mp4" />
                    </video>
                  </div>
                  <div>
                    <span className="inline-block text-xs px-3 py-1 rounded-full bg-accent/15 text-accentLight mb-3">
                      {c.badge}
                    </span>
                    <h3 className="text-xl font-semibold mb-1">{c.title}</h3>
                    <p className="text-sm text-textMuted mb-4">{c.market}</p>
                    <div className="space-y-2">
                      {(c.points || []).map((point) => (
                        <div key={point} className="text-sm text-textSub flex gap-2">
                          <span className="text-accentLight">✓</span>
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="hr-glow" />

      <section className="py-10 px-5">
        <div className="max-w-5xl mx-auto bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-3xl">📄</div>
            <div>
              <h4 className="font-semibold">Want the Full Picture?</h4>
              <p className="text-sm text-textSub">
                Download our portfolio deck — everything we do, all in one place.
              </p>
            </div>
          </div>
          <a
            href="/pdf/CRC-Core-Portfolio.pdf"
            download
            className="whitespace-nowrap bg-gradient-to-br from-accent to-accentLight text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            ⬇️ Download Portfolio PDF
          </a>
        </div>
      </section>
    </>
  );
}
