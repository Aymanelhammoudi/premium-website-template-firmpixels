import { getSite, routes, type Locale } from "@content";
import { PageHeader } from "@/components/ui/PageHeader";
import { About } from "@/components/sections/About";
import { SplitStatement } from "@/components/sections/SplitStatement";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { crumbs, pageMetadata } from "./page";

export const aboutMetadata = (locale: Locale) => pageMetadata(locale, "about");

export function AboutView({ locale }: { locale: Locale }) {
  const { atmosphere, pages, sections, ui } = getSite(locale);
  const o = sections.aboutOnline;
  const v = sections.aboutVentures;
  return (
    <>
      <PageHeader crumbs={crumbs(locale, "about")} crumbsLabel={ui.detail.crumbs} {...pages.about} />
      <About locale={locale} heading={false} />
      <SplitStatement
        id="online-title"
        label={o.label}
        lines={[o.title, o.accent]}
        text={o.text}
        cta={{ label: o.cta, href: routes.page(locale, "websites") }}
        img={atmosphere.office}
        reverse
        tone="tinted"
      />
      <FeatureGrid
        id="ventures-title"
        label={v.label}
        title={v.title}
        accent={v.accent}
        intro={v.intro}
        items={v.items}
        cta={{ label: v.cta, href: routes.page(locale, "ventures") }}
      />
      <CtaBand locale={locale} />
    </>
  );
}
