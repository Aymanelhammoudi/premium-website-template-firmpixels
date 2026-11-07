/** Routes per taal — bevat bewust géén inhoud, zodat client-code klein blijft. */
export type Locale = "nl" | "en";

export const locales: Locale[] = ["nl", "en"];

/** Basispad per taal. */
export const base = (l: Locale) => (l === "en" ? "/en/" : "/");

/** Alle interne routes op één plek, per taal. */
export const routes = {
  home: (l: Locale) => base(l),
  anchor: (l: Locale, id: string) => `${base(l)}#${id}`,
  cv: (l: Locale) => (l === "en" ? "/en/cv/" : "/cv/"),
  overview: (l: Locale) => (l === "en" ? "/en/experience/" : "/ervaring/"),
  experience: (l: Locale, id: string) => (l === "en" ? `/en/experience/${id}/` : `/ervaring/${id}/`),
};

/** Taal afleiden uit een pad (voor client components). */
export const localeFromPath = (path: string): Locale => (path === "/en" || path.startsWith("/en/") ? "en" : "nl");

/** Hetzelfde adres in de andere taal (voor de taalknop). */
export function switchPath(path: string, to: Locale): string {
  const from = localeFromPath(path);
  if (from === to) return path;
  const p = path.endsWith("/") ? path : path + "/";
  if (to === "en") {
    if (p === "/") return "/en/";
    if (p === "/cv/") return "/en/cv/";
    if (p === "/ervaring/") return "/en/experience/";
    const m = p.match(/^\/ervaring\/([^/]+)\/$/);
    if (m) return `/en/experience/${m[1]}/`;
    return "/en/";
  }
  if (p === "/en/") return "/";
  if (p === "/en/cv/") return "/cv/";
  if (p === "/en/experience/") return "/ervaring/";
  const m = p.match(/^\/en\/experience\/([^/]+)\/$/);
  if (m) return `/ervaring/${m[1]}/`;
  return "/";
}

/** hreflang-alternatieven voor metadata. */
export function alternates(nlPath: string, enPath: string, current: Locale) {
  return {
    canonical: current === "en" ? enPath : nlPath,
    languages: { "nl-NL": nlPath, "en-GB": enPath, "x-default": nlPath },
  };
}

/** Kies de waarde voor de huidige taal. */
export const pick = <T,>(locale: Locale, nl: T, en: T): T => (locale === "en" ? en : nl);
