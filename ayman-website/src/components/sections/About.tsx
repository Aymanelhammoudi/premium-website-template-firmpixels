import { getSite, type Locale } from "@content";
import { CountUp } from "../ui/CountUp";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Spotlight } from "../ui/Spotlight";

export function About({ locale, heading = true }: { locale: Locale; heading?: boolean }) {
  const { about, ui } = getSite(locale);
  const [before, after = ""] = about.statement.split(about.statementAccent);
  return (
    <section id="over" {...(heading ? { "aria-labelledby": "over-title" } : { "aria-label": ui.about.label })} className={`relative ${heading ? "py-24 md:py-32" : "py-16 md:py-24"}`}>
      <div className="container-x">
        {heading && <SectionHeading label={ui.about.label} id="over-title" title={ui.about.title} accent={ui.about.accent} />}

        {/* Statement */}
        <div className={`md:grid md:grid-cols-12 ${heading ? "mt-20 md:mt-28" : ""}`}>
          <p className="enter font-display text-[clamp(1.9rem,4vw,3.6rem)] leading-[1.12] font-light text-pretty md:col-span-10 md:col-start-2">
            {before}
            <span className="font-normal">{about.statementAccent}</span>
            {after} <span className="text-muted">{about.lead}</span>
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-12">
          <div className="space-y-5 text-lg text-muted md:col-span-6 md:col-start-3">
            {about.story.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="md:col-span-3 md:col-start-10" delay={0.1}>
            <p className="eyebrow mb-4">{ui.about.traits}</p>
            <ul className="flex flex-wrap gap-2">
              {about.traits.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line-strong px-4 py-1.5 text-sm transition-colors hover:border-ink"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Kerncijfers */}
        <ul className="mt-24 grid grid-cols-2 border-t border-l border-line md:grid-cols-4">
          {about.stats.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 0.08} className="border-r border-b border-line">
              <Spotlight className="h-full p-6 md:p-8">
                <span className="block text-[clamp(2.75rem,5vw,4rem)] leading-none font-semibold tracking-tight text-ink">
                  <CountUp value={s.value} suffix={s.suffix} />
                </span>
                <span className="mt-4 block max-w-[14rem] text-sm text-muted">{s.label}</span>
              </Spotlight>
            </Reveal>
          ))}
        </ul>

        {/* Principes */}
        <div className="mt-28">
          <Reveal>
            <h2 className="eyebrow mb-10">
              {ui.about.way} — {about.principlesTitle}
            </h2>
          </Reveal>
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
            {about.principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.1} className="bg-bg">
                <Spotlight className="group h-full p-8 md:p-10">
                  <span className="font-mono text-xs text-gold">0{i + 1}</span>
                  <h3 className="mt-10 text-3xl font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-muted">{p.text}</p>
                </Spotlight>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
