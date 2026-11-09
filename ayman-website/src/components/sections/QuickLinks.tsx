import Link from "next/link";
import { PAGES, getSite, type Locale } from "@content";
import { ArrowUpRight } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Spotlight } from "../ui/Spotlight";

/** Contactpagina: snel naar de informatie die een werkgever zoekt. */
export function QuickLinks({ locale, index }: { locale: Locale; index?: string }) {
  const { sections } = getSite(locale);
  const q = sections.contactQuick;
  return (
    <section aria-labelledby="quick-title" className="border-t border-line bg-bg-2 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading index={index} label={q.label} id="quick-title" title={q.title} accent={q.accent} />
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {q.items.map((it, i) => (
            <Reveal as="li" key={it.key} delay={i * 0.05}>
              <Link href={PAGES[it.key][locale]} className="group block h-full rounded-2xl">
                <Spotlight tilt className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-[border-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-line-strong md:p-7">
                  <span className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    <ArrowUpRight className="size-4 text-muted transition-[transform,color] duration-300 group-hover:rotate-45 group-hover:text-ink" />
                  </span>
                  <span className="mt-10 block text-xl font-semibold tracking-tight">{it.title}</span>
                  <span className="mt-3 block text-muted">{it.text}</span>
                </Spotlight>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
