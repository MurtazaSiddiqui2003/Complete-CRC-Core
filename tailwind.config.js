/**
 * Tailwind config.
 *
 * These colors match the ORIGINAL crc-core CSS variables 1:1, so the site
 * looks exactly the same as before, just built with Tailwind classes now
 * instead of a big style.css file.
 *
 * If you (or your boss) ever want to change the brand colors, this is the
 * ONE place to do it — every component below reads from here.
 */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#07070F",
        surface: "#0C0C1E",
        card: "#101024",
        border: "#1C1C3E",
        borderGlow: "#2E1A5C",
        accent: "#7C3AED",
        accentLight: "#9D5CF5",
        glow: "#C084FC",
        textSub: "#94A3B8",
        textMuted: "#3D4A5C",
      },
      fontFamily: {
        heading: ["'Bruno Ace SC'", "sans-serif"],
        body: ["Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
