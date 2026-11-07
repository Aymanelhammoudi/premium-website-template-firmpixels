import Link from "next/link";
import { getSite, routes, type Locale, type Track } from "@content";
import { ExperienceTile } from "../ui/ExperienceTile";
import { ArrowRight } from "../ui/Icons";
import { Reveal, RevealLines } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

function TrackBlock({ track, index, locale }: { track: Track; index: number; locale: Locale }) {
  const { experience, tracks, ui } = getSite(locale);
  const t = tracks[track];
  const items = experience.filter((e) => e.track === track);
  return (
    <div id={track} className="scroll-mt-28">
      <div className="grid gap-6 border-t border-line pt-10 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="eyebrow">{t.label}</p>
          <h3 className="font-display mt-4 text-[clamp(2.2rem,4vw,3.4rem)] leading-[1] font-light">
            <RevealLines lines={[t.title, <em key="a">{t.titleAccent}</em>]} />
          </h3>
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7 md:self-end" delay={0.1}>
          <p className="text-muted">{t.intro}</p>
          <p className="mt-3 font-mono text-[0.68rem] tracking-[0.16em] text-muted uppercase">
            {String(items.length).padStart(2, "0")} {ui.tracks.parts}
          </p>
        </Reveal>
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal
            as="li"
            key={item.id}
            delay={(i % 4) * 0.07 + index * 0.02}
            y={40}
            className={item.featured ? "sm:col-span-2" : ""}
          >
            <ExperienceTile item={item} locale={locale} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

/** Ervaring op de homepage: twee sporen, elk met klikbare tegels. */
export function Tracks({ locale }: { locale: Locale }) {
  const { experienceIntro, ui } = getSite(locale);
  return (
    <section id="ervaring" aria-labelledby="ervaring-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="03"
          label={ui.tracks.label}
          id="ervaring-title"
          title={experienceIntro.title}
          accent={experienceIntro.titleAccent}
          intro={experienceIntro.intro}
          aside={
            <Link
              href={routes.overview(locale)}
              className="group inline-flex shrink-0 items-center gap-2 border-b border-gold/40 pb-1 text-sm text-gold transition-colors hover:border-gold"
            >
              {ui.tracks.overview}
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          }
        />
        <div className="mt-20 space-y-24">
          <TrackBlock track="sales" index={0} locale={locale} />
          <TrackBlock track="ondernemer" index={1} locale={locale} />
        </div>
        <p className="mt-12 max-w-3xl text-xs text-muted">{experienceIntro.note}</p>
      </div>
    </section>
  );
}
