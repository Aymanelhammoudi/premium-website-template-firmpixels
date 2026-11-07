import { about } from "@content/site";
import { CountUp } from "../ui/CountUp";
import { Reveal } from "../ui/Reveal";
import { ScrollText } from "../ui/ScrollText";
import { SectionHeading } from "../ui/SectionHeading";
import { Spotlight } from "../ui/Spotlight";

export function About() {
  return (
    <section id="over" aria-labelledby="over-title" className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionHeading index="02" label="Over mij" id="over-title" title="Aangenaam." accent="Ik ben Ayman." />

        {/* Statement dat oplicht tijdens het scrollen */}
        <div className="mt-20 md:mt-28 md:grid md:grid-cols-12">
          <ScrollText
            className="font-display text-[clamp(2rem,4.6vw,4.2rem)] leading-[1.08] font-light md:col-span-10 md:col-start-3"
            text={`${about.statement.replace("écht luisteren.", "*écht *luisteren.")} ${about.lead}`}
          />
        </div>

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12">
          <div className="space-y-5 text-lg text-muted md:col-span-6 md:col-start-3">
            {about.story.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="md:col-span-3 md:col-start-10" delay={0.1}>
            <p className="eyebrow mb-4">Zo ken je mij</p>
            <ul className="flex flex-wrap gap-2">
              {about.traits.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line-strong px-4 py-1.5 text-sm transition-colors hover:border-gold hover:bg-gold hover:text-on-gold"
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
                <span className="font-display block text-[clamp(3.5rem,8vw,6.5rem)] leading-none font-light text-gold">
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
            <p className="eyebrow mb-10">Mijn manier van werken — {about.principlesTitle}</p>
          </Reveal>
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
            {about.principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.1} className="bg-bg">
                <Spotlight className="group h-full p-8 md:p-10">
                  <span className="font-mono text-xs text-gold">0{i + 1}</span>
                  <h3 className="font-display mt-10 text-4xl transition-[font-variation-settings] duration-700 [font-variation-settings:'wght'_300] group-hover:[font-variation-settings:'wght'_600]">
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
