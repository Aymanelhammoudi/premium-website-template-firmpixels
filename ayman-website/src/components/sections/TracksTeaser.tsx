import Link from "next/link";
import { getSite, routes, type Locale, type Track } from "@content";
import { BrandMark } from "../ui/BrandMark";
import { ArrowRight } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Spotlight } from "../ui/Spotlight";

/** Twee sporen als toegang tot de pagina's Ervaring en Ondernemerschap. */
export function TracksTeaser({ locale }: { locale: Locale }) {
  const { home, tracks, experience, ui } = getSite(locale);
  const order: Track[] = ["sales", "ondernemer"];
  return (
    <section aria-labelledby="tt-title" className="border-t border-line bg-bg-2 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading label={ui.homeUi.tracks} id="tt-title" title={home.tracksTitle} accent={home.tracksAccent} intro={home.tracksIntro} />
        <ul className="mt-12 grid gap-4 lg:grid-cols-2">
          {order.map((tk, i) => {
            const t = tracks[tk];
            const items = experience.filter((e) => e.track === tk);
            const marks = items.filter((e) => e.logo || e.wordmark || e.icon).slice(0, 5);
            return (
              <Reveal as="li" key={tk} delay={i * 0.06}>
                <Link href={routes.track(locale, tk)} className="group block h-full rounded-2xl">
                  <Spotlight className="flex h-full flex-col justify-between gap-12 rounded-2xl border border-line bg-surface p-7 transition-[border-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-line-strong md:p-9">
                    <div>
                      <p className="eyebrow">{t.label}</p>
                      <h3 className="heading mt-4 text-3xl md:text-4xl">
                        {t.title} <em>{t.titleAccent}</em>
                      </h3>
                      <p className="mt-4 max-w-lg text-muted">{t.intro}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-6">
                      <ul className="flex items-center" aria-hidden>
                        {marks.map((m, n) => (
                          <li
                            key={m.id}
                            className="-ml-2 grid size-11 place-items-center rounded-full border border-line bg-bg first:ml-0"
                            style={{ zIndex: 10 - n }}
                          >
                            <BrandMark item={m} size={m.logo ? 22 : 20} />
                          </li>
                        ))}
                        <li className="ml-3 text-sm text-muted">
                          {items.length} {ui.homeUi.items}
                        </li>
                      </ul>
                      <span className="inline-flex items-center gap-2 text-sm font-medium">
                        {ui.homeUi.viewTrack[tk]}
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Spotlight>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
