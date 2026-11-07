import { getSite, routes, type Locale } from "@content";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { QuickScan } from "@/components/sections/QuickScan";
import { Highlights } from "@/components/sections/Highlights";
import { TracksTeaser } from "@/components/sections/TracksTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";

/** Home: in één oogopslag wie ik ben, met doorverwijzingen naar de subpagina’s. */
export function HomeView({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  return (
    <>
      <Hero
        cv={site.cv}
        hero={site.hero}
        person={site.person}
        ui={{ hero: site.ui.hero }}
        secondaryHref={routes.page(locale, "experience")}
      />
      <LogoMarquee locale={locale} />
      <QuickScan locale={locale} />
      <Highlights locale={locale} />
      <TracksTeaser locale={locale} />
      {site.testimonials.length > 0 && <Testimonials locale={locale} />}
      <CtaBand locale={locale} />
    </>
  );
}
