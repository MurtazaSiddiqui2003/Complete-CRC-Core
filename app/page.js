// Render this page fresh on every visit instead of caching it at build
// time. That way, whenever your boss edits something in /admin, the
// change shows up on the live site immediately -- no rebuild needed.
export const dynamic = "force-dynamic";

import ParticleBackground from "../components/ParticleBackground";
import ScrollTopButton from "../components/ScrollTopButton";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import About from "../components/About";
import OurStory from "../components/OurStory";
import Problem from "../components/Problem";
import Services from "../components/Services";
import CaseStudies from "../components/CaseStudies";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { getSiteContent } from "../lib/siteContent";

export default async function HomePage() {
  const content = await getSiteContent();
  return (
    <>
      <ParticleBackground />
      <ScrollTopButton />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <div className="hr-glow" />
        <TrustStrip />
        <About />
        <div className="hr-glow" />
        <OurStory />
        <div className="hr-glow" />
        <Problem />
        <div className="hr-glow" />
        <Services />
        <div className="hr-glow" />
        <CaseStudies />
        <div className="hr-glow" />
        <Testimonials />
        <Faq />
        <div className="hr-glow" />
        <Blog />
        <div className="hr-glow" />
        <Contact content={content} />
        <Footer />
      </div>
    </>
  );
}
