import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border py-14 px-5">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div className="md:col-span-1 sm:col-span-2">
          <Image src="/images/logo-wide.png" alt="CRC Core" width={140} height={36} className="mb-3" />
          <p className="text-sm text-textSub">
            We build scalable systems for brands that want real growth. Marketing. Operations.
            Sourcing — all working together.
          </p>
        </div>

        <div>
          <h5 className="text-sm font-semibold mb-3">Company</h5>
          <div className="flex flex-col gap-2 text-sm text-textSub">
            <a href="#about" className="hover:text-white transition-colors">About Us</a>
            <a href="#lore" className="hover:text-white transition-colors">Our Story</a>
            <a href="#cases" className="hover:text-white transition-colors">Our Work</a>
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
            <a href="mailto:saeed@crccore.com" className="hover:text-white transition-colors">saeed@crccore.com</a>
            <a href="tel:+1-416-616-9901" className="hover:text-white transition-colors">+1-(416)-616-9901</a>
            <a href="/pdf/CRC-Core-Portfolio.pdf" download className="hover:text-white transition-colors">Download Portfolio</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 mt-12 pt-6 border-t border-border text-xs text-textMuted">
        <p>© {new Date().getFullYear()} CRC Core. All rights reserved.</p>
        <p>The Center That Scales Everything</p>
      </div>
    </footer>
  );
}
