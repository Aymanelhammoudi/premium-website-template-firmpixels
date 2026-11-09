import Link from "next/link";
import type { ReactNode } from "react";
import { Atmosphere, type AtmosphereImage } from "../ui/Atmosphere";
import { ArrowRight } from "../ui/Icons";
import { Reveal, RevealLines } from "../ui/Reveal";
import { ScrollWords } from "../ui/ScrollWords";

/** Statement met sfeerbeeld: label, grote regels, tekst en één duidelijke vervolgstap. */
export function SplitStatement({
  id,
  index,
  label,
  lines,
  text,
  cta,
  img,
  reverse = false,
  serif = false,
  tone = "plain",
  children,
}: {
  id: string;
  index?: string;
  label: string;
  /** Laatste regel wordt gedempt weergegeven. */
  lines: string[];
  text: string[];
  cta?: { label: string; href: string };
  img: AtmosphereImage;
  reverse?: boolean;
  serif?: boolean;
  tone?: "plain" | "tinted";
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className={`py-20 md:py-28 ${tone === "tinted" ? "border-y border-line bg-bg-2" : ""}`}>
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
          <Reveal y={8}>
            <p className="eyebrow mb-5 inline-flex items-center gap-2">
              {index ? (
                <span aria-hidden className="text-gold">
                  {index}
                  <span className="ml-2 text-line-strong">/</span>
                </span>
              ) : (
                <span aria-hidden className="size-1.5 rounded-full bg-gold" />
              )}
              {label}
            </p>
          </Reveal>
          <h2
            id={id}
            className={
              serif
                ? "font-display text-[clamp(2.2rem,4.6vw,3.9rem)] leading-[1.06] font-light text-balance"
                : "heading text-[clamp(2.2rem,4.6vw,3.75rem)]"
            }
          >
            {serif ? <ScrollWords lines={lines} /> : <RevealLines lines={lines.map((l, i) => (i === lines.length - 1 && lines.length > 1 ? <em key={i}>{l}</em> : l))} />}
          </h2>
          <div className="mt-7 max-w-xl space-y-4 text-lg text-muted">
            {text.map((t, i) => (
              <Reveal key={i} delay={0.08 + i * 0.05} y={8}>
                <p>{t}</p>
              </Reveal>
            ))}
          </div>
          {children}
          {cta && (
            <Reveal delay={0.2} y={8} className="mt-8">
              <Link
                href={cta.href}
                className="group inline-flex items-center gap-2 border-b border-line-strong pb-1 text-sm font-medium transition-colors duration-[var(--dur-base)] hover:border-ink"
              >
                {cta.label}
                <ArrowRight className="size-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-1" />
              </Link>
            </Reveal>
          )}
        </div>
        <Reveal className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""}`} y={16}>
          <Atmosphere img={img} />
        </Reveal>
      </div>
    </section>
  );
}
