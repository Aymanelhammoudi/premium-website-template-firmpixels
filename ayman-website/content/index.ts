import * as nl from "./site";
import * as en from "./site.en";
import { PAGES, type Locale } from "./routes";

export * from "./routes";

export type Site = typeof nl;
export type { Experience, Track, Project, SkillGroup, BrandIcon } from "./site";

const sites: Record<Locale, Site> = { nl, en };


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
