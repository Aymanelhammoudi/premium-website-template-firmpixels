import Link from "next/link";
import { ViewTransition } from "react";
import { getSite, routes, type Locale } from "@content";
import { BrandMark } from "../ui/BrandMark";
import { ArrowUpRight } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Spotlight } from "../ui/Spotlight";

/** Drie hoogtepunten op de homepage, elk met een link naar de eigen pagina. */
export function Highlights({ locale }: { locale: Locale }) {
  const { home, experienceBySlug, ui } = getSite(locale);
  return (
    <section aria-labelledby="hl-title" className="pt-8 pb-20 md:pt-12 md:pb-28">
      <div className="container-x">
        <SectionHeading label={ui.homeUi.highlights} id="hl-title" title={home.highlightsTitle} accent={home.highlightsAccent} />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {home.highlights.map((h, i) => {
            const item = experienceBySlug(h.id);
            if (!item) return null;
            return (
              <Reveal as="li" key={h.id} delay={i * 0.05}>
                <Link href={routes.experience(locale, item.id)} className="group block h-full rounded-2xl">
                  <Spotlight className="flex h-full flex-col gap-10 rounded-2xl border border-line bg-surface p-6 transition-[border-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-line-strong md:p-7">
                    <div className="flex items-start justify-between">
                      <ViewTransition name={`brand-${item.id}`} share="morph" default="none">
                        <span className="grid size-12 place-items-center rounded-xl border border-line bg-bg">
                          <BrandMark item={item} size={item.logo ? 26 : 24} />
                        </span>
                      </ViewTransition>
                      <ArrowUpRight className="size-4 text-muted transition-[transform,color] duration-300 group-hover:rotate-45 group-hover:text-ink" />
                    </div>
                    <div>
                      <p className="font-mono text-xs tracking-[0.12em] text-gold uppercase">{h.label}</p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight">
                        <ViewTransition name={`title-${item.id}`} share="morph" default="none">
                          <span className="inline-block">{item.company}</span>
                        </ViewTransition>
                      </h3>
                      <p className="mt-2 text-muted">{h.text}</p>
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
