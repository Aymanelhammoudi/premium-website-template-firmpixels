import Link from "next/link";
import { SectionHeading } from "../ui/SectionHeading";
import { ArrowRight } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { Spotlight } from "../ui/Spotlight";

/** Vier genummerde kaarten in een bento-raster, met optionele vervolgstap. */
export function FeatureGrid({
  id,
  index,
  label,
  title,
  accent,
  intro,
  items,
  cta,
  note,
  tone = "plain",
  cols = 4,
}: {
  cols?: 3 | 4;
  id: string;
  index?: string;
  label: string;
  title: string;
  accent?: string;
  intro?: string;
  items: { title: string; text: string }[];
  cta?: { label: string; href: string };
  note?: string;
  tone?: "plain" | "tinted";
}) {
  return (
    <section aria-labelledby={id} className={`py-20 md:py-28 ${tone === "tinted" ? "border-y border-line bg-bg-2" : ""}`}>
      <div className="container-x">
        <SectionHeading index={index} label={label} id={id} title={title} accent={accent} intro={intro} />
        <ol className={`mt-12 grid grid-cols-1 gap-4 ${cols === 3 ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
          {items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i * 0.05}>
              <Spotlight className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong md:p-7">
                <span className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  <span aria-hidden className="h-px w-10 bg-gradient-to-r from-gold to-transparent transition-[width] duration-500 group-hover:w-16" />
                </span>
                <h3 className="mt-10 text-xl font-semibold tracking-tight">{it.title}</h3>
                <p className="mt-3 text-muted">{it.text}</p>
              </Spotlight>
            </Reveal>
          ))}
        </ol>
        {(cta || note) && (
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {note ? <p className="max-w-2xl text-xs text-muted">{note}</p> : <span />}
            {cta && (
              <Link
                href={cta.href}
                className="group inline-flex shrink-0 items-center gap-2 self-start border-b border-line-strong pb-1 text-sm font-medium transition-colors duration-[var(--dur-base)] hover:border-ink"
              >
                {cta.label}
                <ArrowRight className="size-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
