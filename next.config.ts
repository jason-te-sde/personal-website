import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This directory sits inside a parent git repo, so Next would otherwise walk up
  // and pick the wrong workspace root.
  turbopack: { root: __dirname },

  async redirects() {
    return [
      // stable, shareable URL for the resume — swap the PDF without changing the link
      { source: "/resume", destination: "/Jason_Te_Resume_Web.pdf", permanent: false },
    ];
  },
};

export default nextConfig;
