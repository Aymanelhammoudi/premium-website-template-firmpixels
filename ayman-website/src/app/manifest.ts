import type { MetadataRoute } from "next";
import { getSite, withBase } from "@content";

export const dynamic = "force-static";

/** Web-app-manifest: nette naam, kleuren en iconen als de site op een startscherm wordt gezet. */
export default function manifest(): MetadataRoute.Manifest {
  const { person, seo } = getSite("nl");
  return {
    name: person.fullName,
    short_name: "Ayman",
    description: seo.description,
    start_url: withBase("/"),
    scope: withBase("/"),
    display: "standalone",
    background_color: "#071426",
    theme_color: "#071426",
    lang: "nl",
    icons: [
      { src: withBase("/icon.svg"), sizes: "any", type: "image/svg+xml" },
      { src: withBase("/icons/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: withBase("/icons/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
