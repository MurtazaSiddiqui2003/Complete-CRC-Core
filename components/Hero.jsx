import Image from "next/image";

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

export default function Hero() {
  return (
    <section className="relative pt-16 pb-20 px-5 text-center overflow-hidden">
      {/* soft purple radial glow behind the headline */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.25),transparent_60%)]" />

      <p id="top" className="inline-flex items-center gap-2 text-sm text-textSub mb-5">
        <span className="w-2 h-2 rounded-full bg-glow inline-block" />
        The Center That Scales Everything
      </p>

      <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight">
        A Complete Brand &amp; An <span className="grad">E-Commerce System</span>
      </h1>

      <p className="max-w-xl mx-auto mt-6 text-textSub">
        We build scalable systems for brands that want real growth. Marketing. Operations.
        Sourcing. All working together.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <a
          href="#contact"
          className="bg-gradient-to-br from-accent to-accentLight text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Send Us A Message →
        </a>
        <a
          href="#cases"
          className="border border-border px-6 py-3 rounded-full font-medium text-textSub hover:text-white hover:border-accent transition-colors"
        >
          See Our Work
        </a>
      </div>

      <div className="mt-16">
        <p className="text-xs uppercase tracking-widest text-textMuted mb-4">
          Our Technology Partners
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 opacity-80">
          {PLATFORMS.map((name) => (
            <Image
              key={name}
              src={`/images/logos/${name}.png`}
              alt={name}
              width={70}
              height={36}
              className="h-8 w-auto object-contain"
            />
          ))}
        </div>

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
    </section>
  );
}
