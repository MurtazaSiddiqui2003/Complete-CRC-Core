"use client";

import { useState } from "react";

export default function FaqAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq._id} className="bg-card border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-medium">{faq.question}</span>
              <span className="text-glow text-xl leading-none shrink-0">{isOpen ? "−" : "+"}</span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-textSub">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
