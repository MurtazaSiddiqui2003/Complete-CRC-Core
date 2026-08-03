"use client";

import { useEffect, useState } from "react";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    // Scrolling directly to y=0 like this works everywhere. The old
    // version used an <a href="#top"> link, but "#top" pointed at the
    // navbar, which is `position: sticky` -- browsers are inconsistent
    // about scrolling to sticky elements, so it would often just do
    // nothing when clicked.
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-11 h-11 rounded-full bg-gradient-to-br from-accent to-accentLight
        flex items-center justify-center text-white text-xl z-50 transition-all duration-300
        ${visible ? "opacity-100 visible" : "opacity-0 invisible"}`}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
