import Image from "next/image";
import Link from "next/link";
import { getCaseStudies } from "../../lib/data";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ParticleBackground from "../../components/ParticleBackground";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Case Studies",
  description: "Selected CRC Core case studies showing strategy, creative, e-commerce, and growth work.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="max-w-6xl mx-auto px-5 py-16">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm text-glow mb-3">Proof of Impact</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Work That <span className="grad">Tells the Story</span>
            </h1>
            <p className="text-textSub">
              Explore selected work and the thinking behind the systems we build for ambitious brands.
            </p>
          </div>

          {caseStudies.length === 0 ? (
            <p className="text-center text-textMuted">No case studies published yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {caseStudies.map((c) => (
                <article key={c._id} className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="relative aspect-video bg-surface">
                    {c.image ? (
                      <Image src={c.image} alt={c.title} fill className="object-cover" unoptimized />
                    ) : (
                      <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                        <source
                          src={c.videoFileId ? `/api/video/${c.videoFileId}` : c.videoUrl || "/videos/reel.mp4"}
                          type="video/mp4"
                        />
                      </video>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="inline-block text-xs px-3 py-1 rounded-full bg-accent/15 text-accentLight mb-3">
                      {c.badge}
                    </span>
                    <h2 className="text-xl font-semibold mb-1">{c.title}</h2>
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
                </article>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/#contact" className="inline-block bg-gradient-to-br from-accent to-accentLight text-white px-5 py-2.5 rounded-full text-sm font-medium">
              Discuss Your Brand →
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
