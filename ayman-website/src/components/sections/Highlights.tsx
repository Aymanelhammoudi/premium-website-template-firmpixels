import Link from "next/link";
import { ViewTransition } from "react";
import { getSite, routes, type Locale } from "@content";
import { BrandMark } from "../ui/BrandMark";
import { ArrowUpRight } from "../ui/Icons";
import { SectionHeading } from "../ui/SectionHeading";
import { Spotlight } from "../ui/Spotlight";

/** Drie hoogtepunten op de homepage, elk met een link naar de eigen pagina. */
export function Highlights({ locale }: { locale: Locale }) {
  const { home, experienceBySlug, ui } = getSite(locale);
  return (
    <section aria-labelledby="hl-title" className="pt-8 pb-20 md:pt-12 md:pb-28">
      <div className="container-x">
        <SectionHeading label={ui.homeUi.highlights} id="hl-title" title={home.highlightsTitle} accent={home.highlightsAccent} />
        <ul className="mt-12 space-y-4 md:space-y-0">
          {home.highlights.map((h, i) => {
            const item = experienceBySlug(h.id);
            if (!item) return null;
            return (
              <li
                key={h.id}
                className="stack-card md:sticky md:mb-[14vh] md:last:mb-0"
                style={{ top: `calc(6.5rem + ${i} * 1.75rem)` }}
              >
                <Link href={routes.experience(locale, item.id)} className="group block rounded-3xl">
                  <Spotlight className="grid gap-8 rounded-3xl border border-line bg-surface p-6 shadow-[0_30px_70px_-45px_rgb(7_20_38/0.55)] transition-[border-color] duration-300 group-hover:border-line-strong md:min-h-[17rem] md:grid-cols-12 md:items-center md:p-10">
                    <div className="flex items-center justify-between md:col-span-3 md:flex-col md:items-start md:justify-center md:gap-4">
                      <span className="font-mono text-[clamp(2.5rem,5vw,4.5rem)] leading-none font-medium tracking-tight text-line-strong transition-colors duration-500 group-hover:text-gold">
                        0{i + 1}
                      </span>
                      <p className="font-mono text-xs tracking-[0.12em] text-gold uppercase">{h.label}</p>
                    </div>
                    <div className="md:col-span-6">
                      <h3 className="text-[clamp(1.6rem,3vw,2.5rem)] leading-tight font-semibold tracking-tight">
                        <ViewTransition name={`title-${item.id}`} share="morph" default="none">
                          <span className="inline-block">{item.company}</span>
                        </ViewTransition>
                      </h3>
                      <p className="mt-3 max-w-lg text-lg text-muted">{h.text}</p>
                    </div>
                    <div className="flex items-center justify-between md:col-span-3 md:flex-col md:items-end md:gap-8">
                      <ViewTransition name={`brand-${item.id}`} share="morph" default="none">
                        <span className="grid size-16 place-items-center rounded-2xl border border-line bg-bg md:size-24">
                          <BrandMark item={item} size={item.logo ? 40 : 34} />
                        </span>
                      </ViewTransition>
                      <span className="inline-flex items-center gap-2 text-sm font-medium">
                        {ui.overview.full}
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                      </span>
                    </div>
                  </Spotlight>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
