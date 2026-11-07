import type { Metadata } from "next";
import { PAGES, alternates, getSite, routes, type Locale, type PageKey } from "@content";
import type { Crumb } from "@/components/ui/PageHeader";

export type SubPage = Exclude<PageKey, "home">;

/** Titel, beschrijving en hreflang voor een subpagina. */
export function pageMetadata(locale: Locale, key: SubPage): Metadata {
  const { pages, person } = getSite(locale);
  const p = pages[key];
  const title = `${p.eyebrow} — ${p.title} ${p.accent}`;
  return {
    title: p.eyebrow,
    description: p.intro,
    alternates: alternates(PAGES[key].nl, PAGES[key].en, locale),
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_GB" : "nl_NL",
      url: PAGES[key][locale],
      siteName: person.fullName,
      title,
      description: p.intro,
    },
    twitter: { card: "summary_large_image", title, description: p.intro },
  };
}

/** Kruimelpad Home / pagina (/ extra). */
export function crumbs(locale: Locale, key: SubPage, extra?: string): Crumb[] {
  const { pages, ui } = getSite(locale);
  return [
    { label: ui.detail.home, href: routes.home(locale) },
    extra ? { label: pages[key].eyebrow, href: PAGES[key][locale] } : { label: pages[key].eyebrow },
    ...(extra ? [{ label: extra }] : []),
  ];
}
