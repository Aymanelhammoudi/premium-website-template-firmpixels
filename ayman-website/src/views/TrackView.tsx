import Link from "next/link";
import { getSite, routes, type Locale, type Track } from "@content";
import { PageHeader } from "@/components/ui/PageHeader";
import { BrandMark } from "@/components/ui/BrandMark";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Experience } from "@/components/sections/Experience";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { SplitStatement } from "@/components/sections/SplitStatement";
import { GreenCase } from "@/components/sections/GreenCase";
import { CtaBand } from "@/components/sections/CtaBand";
import { crumbs, pageMetadata } from "./page";

const KEY = { sales: "experience", ondernemer: "ventures" } as const;

export const trackMetadata = (locale: Locale, track: Track) => pageMetadata(locale, KEY[track]);

/** Ervaring (sales & retail) of ondernemerschap: kop, profiel, filterbare tijdlijn en verdieping. */
export function TrackView({ locale, track }: { locale: Locale; track: Track }) {
  const { atmosphere, experience, experienceIntro, pages, sections, tracks, ui } = getSite(locale);
  const key = KEY[track];
  const items = experience.filter((e) => e.track === track);
  const sales = track === "sales";
  const t = sections.expThread;
  const g = sections.ventGlance;
  const take = sections.ventTake;
  const p = sections.expProfile;
  return (
    <>
      <PageHeader
        crumbs={crumbs(locale, key)}
        crumbsLabel={ui.detail.crumbs}
        {...pages[key]}
        aside={
          <div className="beam rounded-2xl border border-line bg-surface p-6">
            <p className="eyebrow">{tracks[track].label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">
              {items.length} <span className="text-base font-normal text-muted">{ui.homeUi.items}</span>
            </p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-hidden>
              {items.slice(0, 8).map((e) => (
                <li key={e.id} className="grid size-10 place-items-center rounded-lg border border-line bg-bg">
                  <BrandMark item={e} size={22} />
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {sales ? (
        <>
          <FeatureGrid id="profile-title" label={p.label} title={p.title} accent={p.accent} intro={p.intro} items={p.items} />
          <SplitStatement id="thread-title" label={t.label} lines={t.lines} text={t.text} img={atmosphere.sales} tone="tinted" />
        </>
      ) : (
        <FeatureGrid id="glance-title" label={g.label} title={g.title} accent={g.accent} intro={g.intro} items={g.items} />
      )}

      <div className="container-x pt-20 md:pt-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 inline-flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-gold" />
              {sales ? tracks[track].label : g.pick}
            </p>
            <h2 className="heading text-[clamp(2rem,4vw,3.25rem)]">{sales ? t.career : g.pickTitle}</h2>
            <p className="mt-4 max-w-xl text-muted">{sales ? t.careerIntro : g.note}</p>
          </div>
          <Reveal y={8}>
            <Link
              href={routes.cv(locale)}
              className="group inline-flex items-center gap-2 border-b border-line-strong pb-1 text-sm font-medium transition-colors hover:border-ink"
            >
              {t.cv}
              <ArrowRight className="size-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
      <Experience
        locale={locale}
        filters={experienceIntro.trackFilters[track]}
        showThread={false}
        experience={items}
        experienceIntro={experienceIntro}
        ui={{ overview: ui.overview, tracks: ui.tracks }}
      />

      {!sales && (
        <>
          <GreenCase locale={locale} />
          <SplitStatement
            id="take-title"
            label={take.label}
            lines={take.lines}
            text={[take.text]}
            cta={{ label: take.cta, href: routes.page(locale, "ambition") }}
            img={atmosphere.growth}
            reverse
          />
        </>
      )}
      <CtaBand locale={locale} />
    </>
  );
}
