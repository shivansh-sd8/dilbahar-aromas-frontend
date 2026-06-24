import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permanent (308) redirects preserving SEO equity from legacy WordPress URLs.
  // - Old top-level marketing PAGES map to their closest current page.
  // - Old root-level blog POSTS (134 of them) are handled generically by the
  //   `[citySlug]` catch-all, which 301s any root slug matching a blog post
  //   to `/blog/<slug>`.
  async redirects() {
    return [
      // Legacy WordPress pages → current equivalents
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/services", destination: "/b2b", permanent: true },
      { source: "/faqs", destination: "/contact-us", permanent: true },
      { source: "/privacy-policy-2", destination: "/privacy-policy", permanent: true },
      // Consolidate the legacy manufacturer post into the purpose-built landing
      // page targeting the same keyword (avoids duplicate manufacturer URLs).
      {
        source: "/essential-oils-manufacturers-in-india",
        destination: "/manufacturers-in-india",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
