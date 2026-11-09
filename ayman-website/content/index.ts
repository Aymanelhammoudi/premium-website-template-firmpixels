import * as nl from "./site";
import * as en from "./site.en";
import { PAGES, type Locale } from "./routes";

export * from "./routes";

export type Site = typeof nl;
export type { Experience, Track, Project, SkillGroup, BrandIcon } from "./site";

/** Zet het submap-voorvoegsel voor afbeeldingen en pdf's als de site niet op een eigen domein staat. */
function withAssets(site: Site): Site {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base && !siteUrl) return site;
  const map = (v: unknown): unknown => {
    if (typeof v === "string") return base && /^\/(images|cv)\//.test(v) ? base + v : v;
    if (Array.isArray(v)) return v.map(map);
    if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, map(x)]));
    return v;
  };
  const out = Object.fromEntries(Object.entries(site).map(([k, v]) => [k, typeof v === "function" ? v : map(v)])) as Site;
  const experience = out.experience;
  return {
    ...out,
    person: { ...out.person, ...(siteUrl ? { siteUrl } : {}) },
    experienceBySlug: (slug: string) => experience.find((e) => e.id === slug),
  };
}

const sites: Record<Locale, Site> = { nl: withAssets(nl), en: withAssets(en) };


export function getSite(locale: Locale = "nl"): Site {
  return sites[locale];
}


/** Kleine set teksten voor header, footer, skiplink en zoekmenu, voor beide talen. */
export type Chrome = Record<
  Locale,
  {
    nav: Site["nav"];
    person: Site["person"];
    footer: Site["footer"];
    ui: Pick<Site["ui"], "header" | "footer" | "skip" | "nav2">;
    search: { label: string; sub: string; href: string; group: "pages" | "experience" }[];
    /** Id’s van ondernemerschapsonderdelen, om het juiste menu-item actief te maken. */
    ventureIds: string[];
  }
>;

export function getChrome(): Chrome {
  const one = (l: Locale) => {
    const s = sites[l];
    const pageItems = [
      { label: s.ui.nav2.home, sub: s.person.fullName, href: PAGES.home[l], group: "pages" as const },
      ...s.nav.map((n) => ({ label: n.label, sub: "", href: PAGES[n.key][l], group: "pages" as const })),
      { label: s.ui.nav2.contact, sub: s.person.email, href: PAGES.contact[l], group: "pages" as const },
    ];
    const expItems = s.experience.map((e) => ({
      label: e.company,
      sub: e.role,
      href: l === "en" ? `/en/experience/${e.id}/` : `/ervaring/${e.id}/`,
      group: "experience" as const,
    }));
    return {
      nav: s.nav,
      person: s.person,
      footer: s.footer,
      ui: { header: s.ui.header, footer: s.ui.footer, skip: s.ui.skip, nav2: s.ui.nav2 },
      search: [...pageItems, ...expItems],
      ventureIds: s.experience.filter((e) => e.track === "ondernemer").map((e) => e.id),
    };
  };
  return { nl: one("nl"), en: one("en") };
}
