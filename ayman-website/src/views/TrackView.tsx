import { getSite, type Locale, type Track } from "@content";
import { PageHeader } from "@/components/ui/PageHeader";
import { BrandMark } from "@/components/ui/BrandMark";
import { Experience } from "@/components/sections/Experience";
import { GreenCase } from "@/components/sections/GreenCase";
import { CtaBand } from "@/components/sections/CtaBand";
import { crumbs, pageMetadata } from "./page";

const KEY = { sales: "experience", ondernemer: "ventures" } as const;

export const trackMetadata = (locale: Locale, track: Track) => pageMetadata(locale, KEY[track]);

/** Ervaring (sales & retail) of ondernemerschap: kop, filterbare tijdlijn en — bij ondernemerschap — de uitgelichte case. */
export function TrackView({ locale, track }: { locale: Locale; track: Track }) {
  const { experience, experienceIntro, pages, tracks, ui } = getSite(locale);
  const key = KEY[track];
  const items = experience.filter((e) => e.track === track);
  return (
    <>
      <PageHeader
        crumbs={crumbs(locale, key)}
        crumbsLabel={ui.detail.crumbs}
        {...pages[key]}
        aside={
          <div className="rounded-2xl border border-line bg-surface p-6">
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
      <Experience
        locale={locale}
        filters={experienceIntro.trackFilters[track]}
        showThread={track === "sales"}
        experience={items}
        experienceIntro={experienceIntro}
        ui={{ overview: ui.overview, tracks: ui.tracks }}
      />
      {track === "ondernemer" && <GreenCase locale={locale} />}
      <CtaBand locale={locale} />
    </>
  );
}
