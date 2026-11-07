import { getSite, type Locale } from "@content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Projects } from "@/components/sections/Projects";
import { CtaBand } from "@/components/sections/CtaBand";
import { crumbs, pageMetadata } from "./page";

export const websitesMetadata = (locale: Locale) => pageMetadata(locale, "websites");

export function WebsitesView({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  return (
    <>
      <PageHeader crumbs={crumbs(locale, "websites")} crumbsLabel={site.ui.detail.crumbs} {...site.pages.websites} />
      <Projects
        heading={false}
        projects={site.projects.filter((p) => p.published)}
        projectsIntro={site.projectsIntro}
        ui={{ projects: site.ui.projects }}
      />
      <CtaBand locale={locale} />
    </>
  );
}
