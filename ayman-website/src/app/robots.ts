import type { MetadataRoute } from "next";
import { getSite } from "@content";

const { person } = getSite("nl");

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${person.siteUrl}/sitemap.xml`,
  };
}
