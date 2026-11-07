import { cv, person } from "@content/site";
import { Button } from "../ui/Button";
import { Download, Mail } from "../ui/Icons";
import { Reveal, RevealLines } from "../ui/Reveal";

/** Afsluitende band met de twee belangrijkste acties voor een werkgever. */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line bg-bg-2 py-24 md:py-28">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
      <div className="container-x relative flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <h2 id="cta-title" className="font-display text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[0.98] font-light">
          <RevealLines lines={["Past mijn ervaring", <em key="a">bij jouw team?</em>]} />
        </h2>
        <Reveal className="flex flex-wrap gap-3" delay={0.15}>
          <Button href={cv.pdf} download={cv.fileName} icon={<Download className="size-4" />}>
            Download mijn cv
          </Button>
          <Button
            href={`mailto:${person.email}?subject=${encodeURIComponent("Uitnodiging kennismakingsgesprek")}`}
            variant="ghost"
            icon={<Mail className="size-4" />}
          >
            Plan een kennismaking
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
