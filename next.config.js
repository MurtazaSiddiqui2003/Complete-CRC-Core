/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next.js blocks SVGs through its image optimizer by default (they
    // can contain embedded scripts). Safe here since these are our own
    // icon files in /public, not files uploaded by visitors.
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
