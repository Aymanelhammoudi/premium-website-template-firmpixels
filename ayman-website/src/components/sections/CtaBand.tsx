import { getSite, routes, type Locale } from "@content";
import { Button } from "../ui/Button";
import { ArrowRight, Download, Mail } from "../ui/Icons";
import { Reveal, RevealLines } from "../ui/Reveal";

/** "De volgende stap": afsluitende donkere band met aurora en de belangrijkste acties voor een werkgever. */
export function CtaBand({ locale }: { locale: Locale }) {
  const { cv, person, sections, ui } = getSite(locale);
  const n = sections.next;
  return (
    <section data-theme="dark" aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-bg py-24 text-ink md:py-32">
      <div aria-hidden className="grid-fade absolute inset-0 -z-10 opacity-70" />
      <div aria-hidden className="aurora top-[-40%] left-1/2 -z-10 size-[42rem] -translate-x-1/2 bg-gold/15" />
      <div aria-hidden className="aurora right-[-20%] bottom-[-50%] -z-10 size-[30rem] bg-[#3b5b8c]/25" style={{ animationDelay: "-11s" }} />
      <div className="container-x">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal y={8}>
            <p className="eyebrow mb-6 inline-flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-gold" />
              {n.label}
            </p>
          </Reveal>
          <h2 id="cta-title" className="heading text-[clamp(2.6rem,7vw,5.5rem)]">
            <RevealLines lines={[n.title, <em key="a">{n.accent}</em>]} />
          </h2>
          <Reveal delay={0.1} y={8}>
            <p className="mx-auto mt-7 max-w-xl text-lg text-muted">{n.text}</p>
          </Reveal>
          <Reveal delay={0.18} y={8} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href={routes.page(locale, "contact")} icon={<ArrowRight className="size-4" />}>
              {n.cta}
            </Button>
            <Button href={cv.pdf} download={cv.fileName} variant="ghost" icon={<Download className="size-4" />}>
              {ui.cta.download}
            </Button>
          </Reveal>
          <Reveal delay={0.24} y={8}>
            <a
              href={`mailto:${person.email}?subject=${encodeURIComponent(ui.quick.meetSubject)}`}
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              <Mail className="size-4" />
              {person.email}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
