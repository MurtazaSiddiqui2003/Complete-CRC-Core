import Image from "next/image";
import CalendlyButton from "./CalendlyButton";
import { getSiteContent } from "../lib/siteContent";

const PLATFORMS = [
  "shopify",
  "woocommerce",
  "amazon",
  "meta",
  "google-ads",
  "etsy",
  "ebay",
  "walmart",
];

const CERTS = ["amfori", "wrap", "smeta", "gots", "bci", "oekotex"];

export default async function Hero() {
  const content = await getSiteContent();
  return (
    <section className="relative pt-16 pb-20 px-5 text-center overflow-hidden">
      {/* soft purple radial glow behind the headline */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.25),transparent_60%)]" />

      <p className="inline-flex items-center gap-2 text-sm text-textSub mb-5">
        <span className="w-2 h-2 rounded-full bg-glow inline-block" />
        {content.heroEyebrow}
      </p>

      <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight">
        {content.heroTitle.includes("E-Commerce") ? <>A Complete Brand &amp; An <span className="grad">E-Commerce System</span></> : content.heroTitle}
      </h1>

      <p className="max-w-xl mx-auto mt-6 text-textSub">
        {content.heroDescription}
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <CalendlyButton />
        <a
          href="#cases"
          className="border border-border px-6 py-3 rounded-full font-medium text-textSub hover:text-white hover:border-accent transition-colors"
        >
          {content.heroSecondaryCta}
        </a>
      </div>

      <div className="mt-16">
        <p className="text-xs uppercase tracking-widest text-textMuted mb-4">
          Our Technology Partners
        </p>
        {/* 4 logos per row on mobile (4 + 4), all 8 in one row from
            tablet width up -- matches how these look best at each size. */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-x-6 gap-y-6 items-center justify-items-center max-w-2xl mx-auto opacity-90">
          {PLATFORMS.map((name) =>
            name === "amazon" ? (
              // Amazon's logo is dark charcoal, which nearly disappears
              // on this site's dark background -- a small white chip
              // behind it keeps it visible without changing the logo.
              <div key={name} className="bg-white rounded-md px-2 py-1.5 flex items-center justify-center">
                <Image src="/images/logos/amazon.png" alt="Amazon" width={60} height={30} className="h-5 w-auto object-contain" />
              </div>
            ) : (
              <Image
                key={name}
                src={`/images/logos/${name}.png`}
                alt={name}
                width={70}
                height={36}
                className="h-8 w-auto object-contain"
              />
            )
          )}
        </div>

        {/* Certifications are hidden for now (not removed) -- remove the
            "hidden" class below whenever they should show again. */}
        <div className="hidden">
          <p className="text-xs uppercase tracking-widest text-textMuted mt-10 mb-4">
            Our Certifications
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-80">
            {CERTS.map((name) => (
              <Image
                key={name}
                src={`/images/certifications/${name}.png`}
                alt={name}
                width={50}
                height={50}
                className="h-10 w-10 object-contain rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
