import type { MetadataRoute } from "next";
import { PAGES, getSite, locales, routes, type PageKey } from "@content";

const { experience, person } = getSite("nl");

export const dynamic = "force-static";

const PRIORITY: Record<PageKey, number> = {
  home: 1,
  experience: 0.9,
  ventures: 0.9,
  cv: 0.9,
  about: 0.8,
  skills: 0.7,
  ambition: 0.7,
  websites: 0.6,
  contact: 0.7,
};

/** Alle pagina’s in beide talen, met hreflang-alternatieven. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (nl: string, en: string, priority: number): MetadataRoute.Sitemap =>
    locales.map((l) => ({
      url: `${person.siteUrl}${l === "en" ? en : nl}`,
      changeFrequency: "monthly" as const,
      priority: l === "en" ? Math.round(priority * 90) / 100 : priority,
      alternates: { languages: { "nl-NL": `${person.siteUrl}${nl}`, "en-GB": `${person.siteUrl}${en}` } },
    }));
  return [
    ...(Object.keys(PAGES) as PageKey[]).flatMap((k) => entry(PAGES[k].nl, PAGES[k].en, PRIORITY[k])),
    ...experience.flatMap((e) => entry(routes.experience("nl", e.id), routes.experience("en", e.id), 0.6)),
  ];
}
