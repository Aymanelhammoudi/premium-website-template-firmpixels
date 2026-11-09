import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Volledig statische export (map `out/`), te hosten op Vercel of elke webserver.
  output: "export",
  trailingSlash: true,
  // Leeg op een eigen domein; gezet voor GitHub Pages (site in een submap). Zie scripts/deploy-pages.sh.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
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
