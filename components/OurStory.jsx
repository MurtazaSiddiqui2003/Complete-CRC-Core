"use client";

import { useState } from "react";
import Image from "next/image";

const TIMELINE = [
  {
    title: "The Problem We Saw",
    body: "Brands with incredible products kept failing — not because of the product, but because they had no systems, no structure, no direction.",
  },
  {
    title: "What We Built",
    body: "CRC Core was built to be the missing center — combining brand, e-commerce, marketing, and operations into one unified growth system.",
  },
  {
    title: "Where We Are Now",
    body: "Working with brands across the US, Canada, UAE, Pakistan and beyond — building systems that compound, not campaigns that expire.",
  },
  {
    title: "Where We're Going",
    body: "Becoming the infrastructure layer every ambitious product brand runs on — regardless of size, stage, or market.",
  },
];

export default function OurStory() {
  const [flipped, setFlipped] = useState(false);

  return (
    <section id="lore" className="py-20 px-5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center">
          <h5 className="text-sm text-white mb-3">Tap To Flip</h5>
          <div
            onClick={() => setFlipped(!flipped)}
            className="cursor-pointer [perspective:1200px] w-full max-w-sm aspect-[1.6/1]"
          >
            <div
              className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
              style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            >
              <div className="absolute inset-0 [backface-visibility:hidden] rounded-xl overflow-hidden border border-border">
                <Image src="/images/Front.png" alt="CRC Core business card front" fill className="object-cover" />
              </div>
              <div
                className="absolute inset-0 [backface-visibility:hidden] rounded-xl overflow-hidden border border-border"
                style={{ transform: "rotateY(180deg)" }}
              >
                <Image src="/images/Back.png" alt="CRC Core business card back" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-glow mb-3">Our Story</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            The <span className="grad">CRC Core</span> Origin
          </h2>
          <p className="text-textSub mb-8">
            We started with a simple observation — great products were dying inside broken
            systems. We built CRC Core to fix that.
          </p>

          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-accent shrink-0" />
                  {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div className="pb-2">
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-textSub">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
