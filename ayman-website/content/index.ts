import * as nl from "./site";
import * as en from "./site.en";
import type { Locale } from "./routes";

export * from "./routes";

export type Site = typeof nl;
export type { Experience, Track, Project, SkillGroup, BrandIcon } from "./site";

const sites: Record<Locale, Site> = { nl, en };


export function getSite(locale: Locale = "nl"): Site {
  return sites[locale];
}


/** Kleine set teksten voor header, footer en skiplink, voor beide talen. */
export type Chrome = Record<
  Locale,
  { nav: Site["nav"]; person: Site["person"]; footer: Site["footer"]; ui: Pick<Site["ui"], "header" | "footer" | "skip"> }
>;

export function getChrome(): Chrome {
  const one = (l: Locale) => {
    const s = sites[l];
    return { nav: s.nav, person: s.person, footer: s.footer, ui: { header: s.ui.header, footer: s.ui.footer, skip: s.ui.skip } };
  };
  return { nl: one("nl"), en: one("en") };
}
