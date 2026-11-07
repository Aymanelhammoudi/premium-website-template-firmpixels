import type { MetadataRoute } from "next";
import { experience, person } from "@content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${person.siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${person.siteUrl}/cv/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${person.siteUrl}/ervaring/`, changeFrequency: "monthly", priority: 0.8 },
    ...experience.map((e) => ({
      url: `${person.siteUrl}/ervaring/${e.id}/`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
