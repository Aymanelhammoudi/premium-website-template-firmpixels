import { getSite, routes, type Locale } from "@content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Skills } from "@/components/sections/Skills";
import { SplitStatement } from "@/components/sections/SplitStatement";
import { CtaBand } from "@/components/sections/CtaBand";
import { crumbs, pageMetadata } from "./page";

export const skillsMetadata = (locale: Locale) => pageMetadata(locale, "skills");

export function SkillsView({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const f = site.sections.skillsFlow;
  return (
    <>
      <PageHeader crumbs={crumbs(locale, "skills")} crumbsLabel={site.ui.detail.crumbs} {...site.pages.skills} />
      <Skills
        heading={false}
        certificates={site.certificates}
        education={site.education}
        person={site.person}
        skillGroups={site.skillGroups}
        skillsIntro={site.skillsIntro}
        ui={{ skills: site.ui.skills }}
      />
      <SplitStatement
        id="flow-title"
        label={f.label}
        lines={f.lines}
        text={[f.text]}
        cta={{ label: f.cta, href: routes.page(locale, "websites") }}
        img={site.atmosphere.web}
        tone="tinted"
      />
      <CtaBand locale={locale} />
    </>
  );
}
