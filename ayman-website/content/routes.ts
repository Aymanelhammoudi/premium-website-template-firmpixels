/** Routes per taal — bevat bewust géén inhoud, zodat client-code klein blijft. */
export type Locale = "nl" | "en";

export const locales: Locale[] = ["nl", "en"];

/** Basispad per taal. */
export const base = (l: Locale) => (l === "en" ? "/en/" : "/");

/** Pagina's van de site, per taal. */
export type PageKey = "home" | "about" | "experience" | "ventures" | "skills" | "ambition" | "websites" | "cv" | "contact";

export const PAGES: Record<PageKey, Record<Locale, string>> = {
  home: { nl: "/", en: "/en/" },
  about: { nl: "/over-mij/", en: "/en/about/" },
  experience: { nl: "/ervaring/", en: "/en/experience/" },
  ventures: { nl: "/ondernemerschap/", en: "/en/entrepreneurship/" },
  skills: { nl: "/vaardigheden/", en: "/en/skills/" },
  ambition: { nl: "/ambitie/", en: "/en/ambition/" },
  websites: { nl: "/websites/", en: "/en/websites/" },
  cv: { nl: "/cv/", en: "/en/cv/" },
  contact: { nl: "/contact/", en: "/en/contact/" },
};

/** Alle interne routes op één plek, per taal. */
export const routes = {
  page: (l: Locale, key: PageKey) => PAGES[key][l],
  home: (l: Locale) => PAGES.home[l],
  cv: (l: Locale) => PAGES.cv[l],
  overview: (l: Locale) => PAGES.experience[l],
  track: (l: Locale, track: "sales" | "ondernemer") => (track === "sales" ? PAGES.experience[l] : PAGES.ventures[l]),
  experience: (l: Locale, id: string) => (l === "en" ? `/en/experience/${id}/` : `/ervaring/${id}/`),
  anchor: (l: Locale, id: string) => `${base(l)}#${id}`,
};

/** Welke pagina hoort bij een pad (voor het actieve menu-item). */
export function pageFromPath(path: string, ventureIds: string[] = []): PageKey | null {
  const p = path.endsWith("/") ? path : path + "/";
  for (const [key, paths] of Object.entries(PAGES) as [PageKey, Record<Locale, string>][]) {
    if (paths.nl === p || paths.en === p) return key;
  }
  const m = p.match(/^\/(?:en\/experience|ervaring)\/([^/]+)\/$/);
  if (m) return ventureIds.includes(m[1]) ? "ventures" : "experience";
  return null;
}

/** Taal afleiden uit een pad (voor client components). */
export const localeFromPath = (path: string): Locale => (path === "/en" || path.startsWith("/en/") ? "en" : "nl");

/** Hetzelfde adres in de andere taal (voor de taalknop). */
export function switchPath(path: string, to: Locale): string {
  const p = path.endsWith("/") ? path : path + "/";
  for (const paths of Object.values(PAGES)) {
    if (paths.nl === p || paths.en === p) return paths[to];
  }
  const m = p.match(/^\/(?:en\/experience|ervaring)\/([^/]+)\/$/);
  if (m) return to === "en" ? `/en/experience/${m[1]}/` : `/ervaring/${m[1]}/`;
  return PAGES.home[to];
}

/** hreflang-alternatieven voor metadata. */
/**
 * Optioneel voorvoegsel als de site in een submap staat (bijv. GitHub Pages: /premium-website-template-firmpixels).
 * Leeg bij hosting op een eigen domein.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const withBase = (p: string) => (BASE_PATH && p.startsWith("/") && !p.startsWith(BASE_PATH + "/") ? BASE_PATH + p : p);

export function alternates(nlPath: string, enPath: string, current: Locale) {
  const nlUrl = withBase(nlPath);
  const enUrl = withBase(enPath);
  return {
    canonical: current === "en" ? enUrl : nlUrl,
    languages: { "nl-NL": nlUrl, "en-GB": enUrl, "x-default": nlUrl },
  };
}

/** Kies de waarde voor de huidige taal. */
export const pick = <T,>(locale: Locale, nl: T, en: T): T => (locale === "en" ? en : nl);
