import { getSite, type Locale } from "@content";
import { PageHeader } from "@/components/ui/PageHeader";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Growth } from "@/components/sections/Growth";
import { CtaBand } from "@/components/sections/CtaBand";
import { crumbs, pageMetadata } from "./page";

export const aboutMetadata = (locale: Locale) => pageMetadata(locale, "about");

export function AboutView({ locale }: { locale: Locale }) {
  const { growth, pages, ui } = getSite(locale);
  const p = pages.about;
  return (
    <>
      <PageHeader crumbs={crumbs(locale, "about")} crumbsLabel={ui.detail.crumbs} {...p} />
      <About locale={locale} heading={false} />
      <Expertise locale={locale} />
      <Growth growth={growth} ui={{ growth: ui.growth }} />
      <CtaBand locale={locale} />
    </>
  );
}
