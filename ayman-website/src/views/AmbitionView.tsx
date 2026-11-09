import { getSite, routes, type Locale } from "@content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Mail } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SplitStatement } from "@/components/sections/SplitStatement";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { crumbs, pageMetadata } from "./page";

export const ambitionMetadata = (locale: Locale) => pageMetadata(locale, "ambition");

/** Ambitie & toekomst: wat mij drijft, drie doelen, wat ik meebreng en wat ik zoek. */
export function AmbitionView({ locale }: { locale: Locale }) {
  const { atmosphere, growth, pages, sections, ui } = getSite(locale);
  const a = sections.ambition;
  return (
    <>
      <PageHeader crumbs={crumbs(locale, "ambition")} crumbsLabel={ui.detail.crumbs} {...pages.ambition} />
      <SplitStatement
        id="drive-title"
        label={a.drive.label}
        lines={[a.drive.title, a.drive.accent]}
        text={a.drive.text}
        img={atmosphere.growth}
      />
      <FeatureGrid
        id="direction-title"
        label={a.direction.label}
        title={a.direction.title}
        accent={a.direction.accent}
        intro={a.direction.intro}
        items={growth.goals}
        cols={3}
        tone="tinted"
      />
      <FeatureGrid
        id="bring-title"
        label={a.bring.label}
        title={growth.title}
        accent={growth.titleAccent}
        intro={growth.intro}
        items={growth.bring}
      />
      <SplitStatement
        id="seek-title"
        label={a.seek.label}
        lines={[a.seek.title, a.seek.accent]}
        text={[growth.seeking]}
        img={atmosphere.sales}
        reverse
        tone="tinted"
      >
        <Reveal delay={0.15} y={8}>
          <ul className="mt-7 flex flex-wrap gap-2">
            {growth.seekingTags.map((t) => (
              <li key={t} className="rounded-full border border-line-strong bg-surface px-4 py-1.5 text-sm">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.2} y={8} className="mt-8 flex flex-wrap gap-3">
          <Button href={routes.cv(locale)} icon={<ArrowRight className="size-4" />}>
            {a.seek.cv}
          </Button>
          <Button href={routes.page(locale, "contact")} variant="ghost" icon={<Mail className="size-4" />}>
            {a.seek.contact}
          </Button>
        </Reveal>
      </SplitStatement>
      <CtaBand locale={locale} />
    </>
  );
}
