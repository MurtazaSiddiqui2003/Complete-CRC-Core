import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../lib/siteConfig";\nimport { getSiteContent } from "../lib/siteContent";

export default async function Footer() {\n  const content = await getSiteContent();
  return (
    <footer className="border-t border-border py-14 px-5">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div className="md:col-span-1 sm:col-span-2">
          <Image src="/images/logo-wide.png" alt="CRC Core" width={140} height={36} className="mb-3" />
          <p className="text-sm text-textSub mb-4">
            We build scalable systems for brands that want real growth. Marketing. Operations.
            Sourcing — all working together.
          </p>
          <div className="flex items-center gap-4">
            {/* No "invert" filter here anymore -- these are full-color
                icons now, not the old black glyphs that needed flipping
                to white to show up on the dark background. */}
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <Image src="/images/logos/whatsapp.png" alt="WhatsApp" width={20} height={20} unoptimized />
            </a>
            <a href={`mailto:${siteConfig.email}`} aria-label="Email">
              <Image src="/images/logos/email.png" alt="Email" width={20} height={20} />
            </a>
            <a href={`tel:${siteConfig.phoneLink}`} aria-label="Call">
              <Image src="/images/logos/phone.png" alt="Call" width={22} height={22} />
            </a>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Image src="/images/logos/instagram.png" alt="Instagram" width={20} height={20} unoptimized />
            </a>
            <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Image src="/images/logos/linkedin.png" alt="LinkedIn" width={20} height={20} unoptimized />
            </a>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold mb-3">Company</h5>
          <div className="flex flex-col gap-2 text-sm text-textSub">
            <a href="#about" className="hover:text-white transition-colors">About Us</a>
            <a href="#lore" className="hover:text-white transition-colors">Our Story</a>
            <a href="#cases" className="hover:text-white transition-colors">Case Studies</a>
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <a href="#blog" className="hover:text-white transition-colors">Blog</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold mb-3">Services</h5>
          <div className="flex flex-col gap-2 text-sm text-textSub">
            <a href="#services" className="hover:text-white transition-colors">Brand Foundation</a>
            <a href="#services" className="hover:text-white transition-colors">E-commerce Setup</a>
            <a href="#services" className="hover:text-white transition-colors">Performance Marketing</a>
            <a href="#services" className="hover:text-white transition-colors">Content &amp; Creatives</a>
            <a href="#services" className="hover:text-white transition-colors">AI &amp; Automation</a>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold mb-3">Contact</h5>
          <div className="flex flex-col gap-2 text-sm text-textSub">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phoneLink}`} className="hover:text-white transition-colors">{siteConfig.phoneDisplay}</a>
            <a href="/pdf/CRC-Core-Portfolio.pdf" download className="hover:text-white transition-colors">Download Portfolio</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 mt-12 pt-6 border-t border-border text-xs text-textMuted">
        <p>© {new Date().getFullYear()} CRC Core. All rights reserved.</p>
        <p>{content.footerTagline}</p>
      </div>
    </footer>
  );
}
