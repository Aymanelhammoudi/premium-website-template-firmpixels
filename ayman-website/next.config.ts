import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Volledig statische export (map `out/`), te hosten op Vercel of elke webserver.
  output: "export",
  trailingSlash: true,
  images: {
    // Afbeeldingen zijn al als geoptimaliseerde WebP aangeleverd.
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
