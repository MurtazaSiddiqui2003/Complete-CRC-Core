import { getPortfolioSites } from "../../lib/data";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ParticleBackground from "../../components/ParticleBackground";
import PortfolioPreview from "../../components/PortfolioPreview";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Portfolio",
  description: "Live previews of websites built by CRC Core.",\n  alternates: { canonical: "https://crccore.com/portfolio" },
};

export default async function PortfolioPage() {
  const sites = await getPortfolioSites();

  return (
    <>
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />

        <section className="max-w-6xl mx-auto px-5 py-16">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-sm text-glow mb-3">Our Portfolio</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Real Sites, <span className="grad">Live &amp; Working</span>
            </h1>
            <p className="text-textSub">
              These aren&apos;t mockups or screenshots — scroll and click around, they&apos;re
              the actual live websites.
            </p>
          </div>

          {sites.length === 0 ? (
            <p className="text-center text-textMuted">
              No sites added yet. Add some from the admin panel.
            </p>
          ) : (
            <div className="max-w-3xl mx-auto space-y-8">
              {sites.map((site) => (
                <PortfolioPreview key={site._id} site={site} />
              ))}
            </div>
          )}
        </section>

        <Footer />
      </div>
    </>
  );
}
