"use client";

import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "");
    formData.append("For", "CRC Core");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      setStatus(result.success ? "sent" : "error");
      if (result.success) e.target.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-20 px-5">
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.2),transparent_60%)]" />

        <p className="text-sm text-glow mb-3">Ready to Scale?</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          One system. <br />
          <span className="grad">Built to scale.</span>
        </h2>
        <p className="text-textSub mb-8">
          Tell us about your brand and let&apos;s talk about what it would take to build your
          complete growth system.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label htmlFor="name" className="text-xs text-textMuted block mb-1">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-xs text-textMuted block mb-1">
              Your Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-xs text-textMuted block mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex-1 bg-gradient-to-br from-accent to-accentLight text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send Us a Message →"}
            </button>
            <a
              href="https://calendly.com/murtazasiddiqui250/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center border border-border px-6 py-3 rounded-full font-medium text-textSub hover:text-white hover:border-accent transition-colors"
            >
              📅 Book a Free Call
            </a>
          </div>

          {status === "sent" && (
            <p className="text-sm text-green-400 text-center">
              Message sent — we&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400 text-center">
              Something went wrong. Please try again or email us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
