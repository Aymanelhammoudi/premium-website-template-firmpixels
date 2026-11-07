import Image from "next/image";
import { getSite, type Locale } from "@content";
import { Download, Mail } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Spotlight } from "../ui/Spotlight";

const card = "h-full rounded-3xl border border-line bg-surface/60 p-7 md:p-8";

/** Alles wat een werkgever in 30 seconden wil weten. */
export function QuickScan({ locale }: { locale: Locale }) {
  const { cv, education, person, quickScan, ui } = getSite(locale);
  const q = ui.quick;
  const { current } = quickScan;
  return (
    <section id="in-het-kort" aria-labelledby="kort-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="02"
          label={q.label}
          id="kort-title"
          title={quickScan.title}
          accent={quickScan.titleAccent}
        />

        <ul className="mt-16 grid gap-4 md:grid-cols-6">
          <Reveal as="li" className="md:col-span-4">
            <Spotlight className={`${card} flex flex-col justify-between gap-10`}>
              <p className="eyebrow">{current.label}</p>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-none font-light">
                    {current.role}
                  </p>
                  <p className="mt-3 text-lg text-muted">
                    {q.at} <span className="text-ink">{current.company}</span> · {current.since}
                  </p>
                </div>
                <span className="grid size-20 place-items-center rounded-2xl border border-line-strong bg-bg">
                  <Image src={current.logo} alt="" width={44} height={44} />
                </span>
              </div>
            </Spotlight>
          </Reveal>

          <Reveal as="li" className="md:col-span-2" delay={0.08}>
            <div className={`${card} flex flex-col justify-between gap-6 border-gold/40 bg-gold/10`}>
              <p className="eyebrow">{q.act}</p>
              <div className="flex flex-col gap-3">
                <a
                  href={cv.pdf}
                  download={cv.fileName}
                  className="group inline-flex h-12 items-center justify-between gap-3 rounded-full bg-gold px-5 text-sm font-medium text-on-gold transition-colors hover:bg-gold-2"
                >
                  {q.download}
                  <Download className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" />
                </a>
                <a
                  href={`mailto:${person.email}?subject=${encodeURIComponent(q.meetSubject)}`}
                  className="group inline-flex h-12 items-center justify-between gap-3 rounded-full border border-line-strong px-5 text-sm transition-colors hover:border-gold hover:text-gold"
                >
                  {q.meet}
                  <Mail className="size-4" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal as="li" className="md:col-span-3" delay={0.1}>
            <Spotlight className={card}>
              <p className="eyebrow mb-5">{q.sectors}</p>
              <ul className="flex flex-wrap gap-2">
                {quickScan.sectors.map((s) => (
                  <li key={s} className="rounded-full border border-line-strong px-4 py-1.5 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>

          <Reveal as="li" className="md:col-span-3" delay={0.15}>
            <Spotlight className={card}>
              <p className="eyebrow mb-5">{q.strengths}</p>
              <ul className="flex flex-wrap gap-2">
                {quickScan.strengths.map((s) => (
                  <li key={s} className="rounded-full bg-gold/10 px-4 py-1.5 text-sm text-gold">
                    {s}
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>

          <Reveal as="li" className="md:col-span-2" delay={0.1}>
            <Spotlight className={card}>
              <p className="eyebrow mb-4">{q.education}</p>
              {education.map((e) => (
                <p key={e.title}>
                  <span className="font-display block text-xl">{e.title}</span>
                  <span className="text-sm text-muted">{e.school}</span>
                </p>
              ))}
            </Spotlight>
          </Reveal>

          <Reveal as="li" className="md:col-span-2" delay={0.15}>
            <Spotlight className={card}>
              <p className="eyebrow mb-4">{q.langRegion}</p>
              <p className="font-display text-xl">{person.languages.join(" & ")}</p>
              <p className="text-sm text-muted">
                {person.region} · {person.age} {q.years}
              </p>
            </Spotlight>
          </Reveal>

          <Reveal as="li" className="md:col-span-2" delay={0.2}>
            <Spotlight className={card}>
              <p className="eyebrow mb-4">{q.seeking}</p>
              <p className="text-muted">{quickScan.seeking}</p>
            </Spotlight>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
