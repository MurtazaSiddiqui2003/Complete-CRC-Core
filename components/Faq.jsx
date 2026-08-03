import { getFaqs } from "../lib/data";
import FaqAccordion from "./FaqAccordion";

export default async function Faq() {
  const faqs = await getFaqs();

  return (
    <section id="faq" className="py-20 px-5">
      <div className="text-center max-w-xl mx-auto mb-14">
        <p className="text-sm text-glow mb-3">Questions</p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Frequently Asked <span className="grad">Questions</span>
        </h2>
      </div>

      {faqs.length === 0 ? (
        <p className="text-center text-textMuted">No FAQs added yet.</p>
      ) : (
        <FaqAccordion faqs={faqs} />
      )}
    </section>
  );
}
