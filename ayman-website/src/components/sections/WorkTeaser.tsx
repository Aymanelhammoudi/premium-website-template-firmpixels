import Image from "next/image";
import Link from "next/link";
import { getSite, routes, type Locale } from "@content";
import { ArrowRight, ArrowUpRight } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

/** Geselecteerd werk op de homepage: de gepubliceerde websites als browserkaarten. */
export function WorkTeaser({ locale, index }: { locale: Locale; index?: string }) {
  const { projects, sections, ui } = getSite(locale);
  const w = sections.homeWork;
  const items = projects.filter((p) => p.published);
  return (
    <section aria-labelledby="work-title" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          index={index}
          label={w.label}
          id="work-title"
          title={w.title}
          accent={w.accent}
          intro={w.intro}
          aside={
            <Link
              href={routes.page(locale, "websites")}
              className="group inline-flex items-center gap-2 border-b border-line-strong pb-1 text-sm font-medium transition-colors hover:border-ink"
            >
              {w.cta}
              <ArrowRight className="size-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-1" />
            </Link>
          }
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.06}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block">
                <span className="sr-only">
                  {p.name} — {ui.projects.visit}
                </span>
                <div data-tilt className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_80px_-50px_rgb(7_20_38/0.6)] transition-[transform,border-color] duration-500 group-hover:-translate-y-1 group-hover:border-line-strong">
                  <div aria-hidden className="flex items-center gap-3 border-b border-line px-4 py-2.5">
                    <span className="flex gap-1.5">
                      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="size-2.5 rounded-full bg-[#febc2e]" />
                      <span className="size-2.5 rounded-full bg-[#28c840]" />
                    </span>
                    <span className="flex-1 truncate rounded-full bg-bg px-3 py-1 text-center font-mono text-[0.68rem] text-muted">{p.domain}</span>
                    <ArrowUpRight className="size-4 text-muted transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                  {p.image && (
                    <div className="relative aspect-[1200/760] overflow-hidden">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 92vw, 46vw"
                        className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                </div>
                <div aria-hidden className="mt-5 flex items-baseline justify-between gap-4">
                  <span>
                    <span className="block font-mono text-xs text-muted uppercase">0{i + 1} · {p.category}</span>
                    <span className="mt-1 block text-2xl font-semibold tracking-tight">{p.name}</span>
                  </span>
                  <span className="text-right text-xs text-muted">{p.checked}</span>
                </div>
                <p aria-hidden className="mt-2 max-w-md text-muted">{p.description}</p>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
