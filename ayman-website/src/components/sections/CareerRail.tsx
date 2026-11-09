import Link from "next/link";
import { getSite, routes, type Locale } from "@content";
import { BrandMark } from "../ui/BrandMark";
import { ArrowUpRight } from "../ui/Icons";

/**
 * Scrollytelling: een vastgezette sectie waarin alle ervaringen horizontaal voorbij schuiven terwijl je
 * verticaal scrolt (desktop). Op mobiel en bij "minder beweging": een gewone veegbare rij met snap.
 */
export function CareerRail({ locale }: { locale: Locale }) {
  const { experience, sections, tracks } = getSite(locale);
  const r = sections.rail;
  return (
    <section data-rail aria-labelledby="rail-title" className="rail relative border-y border-line bg-bg-2">
      <div className="rail-sticky flex flex-col justify-center overflow-hidden py-20 md:py-0">
        <div className="container-x flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5 inline-flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-gold" />
              {r.label}
            </p>
            <h2 id="rail-title" className="heading text-[clamp(2.2rem,4.6vw,3.75rem)]">
              {r.title} <em>{r.accent}</em>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted">{r.intro}</p>
          </div>
          <div aria-hidden className="flex min-w-[12rem] items-center gap-4 md:flex-col md:items-end">
            <p className="font-mono text-sm tabular-nums">
              <span data-rail-count>01</span>
              <span className="text-muted"> / {String(experience.length).padStart(2, "0")}</span>
            </p>
            <span className="relative block h-px w-40 overflow-hidden bg-line-strong">
              <span data-rail-progress className="absolute inset-0 origin-left scale-x-0 bg-gold" />
            </span>
            <p className="hidden font-mono text-[0.65rem] tracking-[0.14em] text-muted uppercase md:block">{r.hint} →</p>
          </div>
        </div>
        <div className="rail-viewport no-scrollbar mt-10 overflow-x-auto md:mt-12">
          <ol data-rail-track className="rail-track flex w-max gap-4 px-5 md:gap-5 md:px-[max(2.5rem,calc((100vw-1320px)/2))]">
            {experience.map((e, i) => (
              <li key={e.id} className="w-[78vw] max-w-[22rem] shrink-0 snap-start sm:w-[22rem]">
                <Link href={routes.experience(locale, e.id)} className="group block h-full">
                  <article className="spotlight flex h-full min-h-[22rem] flex-col rounded-3xl border border-line bg-surface p-6 transition-[border-color,transform] duration-500 group-hover:-translate-y-1 group-hover:border-line-strong md:p-7">
                    <div className="flex items-start justify-between">
                      <span className="grid size-14 place-items-center rounded-2xl border border-line bg-bg">
                        <BrandMark item={e} size={e.logo ? 30 : 28} />
                      </span>
                      <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="mt-auto pt-10 font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">{e.period}</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">{e.company}</h3>
                    <p className="mt-1 text-muted">{e.role}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
                      <span className="text-muted">{tracks[e.track].label.split("·")[1]?.trim() ?? e.sector}</span>
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        {r.open}
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                      </span>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
