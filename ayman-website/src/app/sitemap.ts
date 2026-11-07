import type { MetadataRoute } from "next";
import { getSite, routes } from "@content";

const { experience, person } = getSite("nl");

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${person.siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${person.siteUrl}/cv/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${person.siteUrl}/ervaring/`, changeFrequency: "monthly", priority: 0.8 },
    ...experience.map((e) => ({
      url: `${person.siteUrl}${routes.experience("nl", e.id)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${person.siteUrl}/en/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${person.siteUrl}/en/cv/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${person.siteUrl}/en/experience/`, changeFrequency: "monthly", priority: 0.7 },
    ...experience.map((e) => ({
      url: `${person.siteUrl}${routes.experience("en", e.id)}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
