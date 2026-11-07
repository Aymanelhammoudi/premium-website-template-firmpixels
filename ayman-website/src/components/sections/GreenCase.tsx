import Link from "next/link";
import { getSite, routes, type Locale } from "@content";
import { BrandMark } from "../ui/BrandMark";
import { ArrowRight } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

/** Uitgelichte case op de ondernemerschapspagina: groene energie in vier stappen. */
export function GreenCase({ locale }: { locale: Locale }) {
  const { experienceBySlug, ui } = getSite(locale);
  const item = experienceBySlug("groene-energie");
  if (!item?.story) return null;
  return (
    <section aria-labelledby="case-title" className="border-y border-line bg-bg-2 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading label={ui.caseTitle} id="case-title" title={item.company} accent={item.period} intro={item.summary} />
        <ol className="relative mt-14 grid gap-8 md:grid-cols-4 md:gap-6">
          <span aria-hidden className="absolute top-5 right-0 left-0 hidden h-px bg-line md:block" />
          {item.story.map((s, n) => (
            <Reveal as="li" key={s.title} delay={n * 0.05} className="relative rounded-2xl border border-line bg-surface p-6 md:border-0 md:bg-transparent md:p-0">
              <span
                className={`relative z-10 grid size-10 place-items-center rounded-full border font-mono text-xs ${
                  n === item.story!.length - 1 ? "border-ink bg-ink text-bg" : "border-line-strong bg-bg"
                }`}
              >
                0{n + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-12">
          <Link
            href={routes.experience(locale, item.id)}
            className="group inline-flex items-center gap-4 rounded-2xl border border-line bg-surface py-3 pr-5 pl-3 transition-colors duration-[var(--dur-base)] hover:border-ink"
          >
            <span className="grid size-12 place-items-center rounded-xl border border-line bg-bg">
              <BrandMark item={item} size={28} />
            </span>
            <span className="text-sm font-medium">{ui.overview.full}</span>
            <ArrowRight className="size-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
