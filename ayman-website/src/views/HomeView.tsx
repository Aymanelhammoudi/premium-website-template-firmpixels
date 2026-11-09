import { getSite, routes, type Locale } from "@content";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { QuickScan } from "@/components/sections/QuickScan";
import { Highlights } from "@/components/sections/Highlights";
import { Expertise } from "@/components/sections/Expertise";
import { SplitStatement } from "@/components/sections/SplitStatement";
import { TracksTeaser } from "@/components/sections/TracksTeaser";
import { WorkTeaser } from "@/components/sections/WorkTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";

/** Home: in één oogopslag wie ik ben, met doorverwijzingen naar de subpagina’s. */
export function HomeView({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const { atmosphere, experienceBySlug, home, sections } = site;
  const p = sections.homePerson;
  const chips = home.highlights.slice(0, 2).map((h) => {
    const e = experienceBySlug(h.id);
    return { label: h.label, text: e?.company ?? h.id, logo: e?.logo };
  });
  return (
    <>
      <Hero
        cv={site.cv}
        hero={site.hero}
        person={site.person}
        ui={{ hero: site.ui.hero }}
        secondaryHref={routes.page(locale, "experience")}
        chips={chips}
      />
      <LogoMarquee locale={locale} />
      <QuickScan locale={locale} />
      <Highlights locale={locale} />
      <Expertise locale={locale} />
      <SplitStatement
        id="person-title"
        label={p.label}
        lines={[p.title, p.accent]}
        text={p.text}
        cta={{ label: p.cta, href: routes.page(locale, "about") }}
        img={atmosphere.sales}
        serif
        tone="tinted"
      />
      <TracksTeaser locale={locale} />
      <WorkTeaser locale={locale} />
      {site.testimonials.length > 0 && <Testimonials locale={locale} />}
      <CtaBand locale={locale} />
    </>
  );
}
