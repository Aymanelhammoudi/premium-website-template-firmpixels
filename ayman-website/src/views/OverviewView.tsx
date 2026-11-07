import type { Metadata } from "next";
import { alternates, getSite, routes, type Locale } from "@content";
import { Experience } from "@/components/sections/Experience";
import { CtaBand } from "@/components/sections/CtaBand";

export function overviewMetadata(locale: Locale): Metadata {
  const { ui } = getSite(locale);
  return {
    title: ui.overview.metaTitle,
    description: ui.overview.metaDescription,
    alternates: alternates(routes.overview("nl"), routes.overview("en"), locale),
  };
}

export function OverviewView({ locale }: { locale: Locale }) {
  return (
    <>
      <Experience locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}
