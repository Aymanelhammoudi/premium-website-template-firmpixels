import type { Metadata } from "next";
import { PAGES, alternates, getSite, routes, withBase, type Locale, type PageKey } from "@content";
import type { Crumb } from "@/components/ui/PageHeader";

/** Pad van de vooraf gegenereerde deelafbeelding (zie app/og/[file]/route.tsx). */
export const ogImage = (name: string) => withBase(`/og/${name}.png`);

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
      images: [{ url: ogImage(`${key}-${locale}`), width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description: p.intro, images: [ogImage(`${key}-${locale}`)] },
  };
}

/** Kruimelpad Home / pagina (/ extra). */
export function crumbs(locale: Locale, key: SubPage, extra?: string): Crumb[] {
  const { pages, ui } = getSite(locale);
  return [
    { label: ui.detail.home, href: routes.home(locale) },
    extra ? { label: pages[key].eyebrow, href: PAGES[key][locale] } : { label: pages[key].eyebrow, url: PAGES[key][locale] },
    ...(extra ? [{ label: extra }] : []),
  ];
}
