import { getSite, type Locale } from "@content";
import { Button } from "../ui/Button";
import { Download, Mail } from "../ui/Icons";
import { Reveal, RevealLines } from "../ui/Reveal";

/** Afsluitende band met de twee belangrijkste acties voor een werkgever. */
export function CtaBand({ locale }: { locale: Locale }) {
  const { cv, person, ui } = getSite(locale);
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line bg-bg-2 py-24 md:py-28">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
      <div className="container-x relative flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <h2 id="cta-title" className="heading text-[clamp(2.4rem,5.5vw,4.6rem)]">
          <RevealLines lines={[ui.cta.title, <em key="a">{ui.cta.accent}</em>]} />
        </h2>
        <Reveal className="flex flex-wrap gap-3" delay={0.15}>
          <Button href={cv.pdf} download={cv.fileName} icon={<Download className="size-4" />}>
            {ui.cta.download}
          </Button>
          <Button
            href={`mailto:${person.email}?subject=${encodeURIComponent(ui.quick.meetSubject)}`}
            variant="ghost"
            icon={<Mail className="size-4" />}
          >
            {ui.cta.meet}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
