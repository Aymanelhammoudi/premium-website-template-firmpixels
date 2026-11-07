import Image from "next/image";
import Link from "next/link";
import { cv } from "@content/site";
import { Button } from "../ui/Button";
import { ArrowUpRight, Download } from "../ui/Icons";
import { Reveal, RevealLines } from "../ui/Reveal";
import { TiltCard } from "../ui/TiltCard";

export function CvSection() {
  return (
    <section id="cv" data-theme="dark" aria-labelledby="cv-title" className="relative overflow-hidden bg-bg py-28 text-ink md:py-40">
      <div aria-hidden className="absolute top-1/2 left-1/2 -z-0 size-[50rem] -translate-1/2 rounded-full bg-gold/10 blur-[140px]" />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-6">08 — Curriculum vitae</p>
          <h2 id="cv-title" className="font-display text-[clamp(2.8rem,6.5vw,5.8rem)] leading-[0.98] font-light">
            <RevealLines lines={["Mijn ervaring.", <em key="a">Direct in beeld.</em>]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-lg text-lg text-muted">
              Download mijn cv als PDF, open hem op volledig formaat of lees de doorzoekbare online versie.
              Handig voor recruiters én sollicitatiesystemen.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex flex-wrap gap-3">
            <Button href={cv.pdf} download={cv.fileName} icon={<Download className="size-4" />}>
              Download cv (PDF)
            </Button>
            <Button href={cv.pdf} target="_blank" rel="noopener noreferrer" variant="ghost" icon={<ArrowUpRight className="size-4" />}>
              Open in nieuw tabblad
            </Button>
          </Reveal>
          <Reveal delay={0.35}>
            <Link
              href="/cv/"
              className="mt-8 inline-flex items-center gap-2 border-b border-gold/40 pb-1 text-gold transition-colors hover:border-gold"
            >
              Bekijk de online tekstversie (ATS-vriendelijk)
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-5 lg:col-start-8" y={60}>
          <a href={cv.pdf} target="_blank" rel="noopener noreferrer" data-cursor="Open" className="block" aria-label="Open cv als PDF (nieuw tabblad)">
            <TiltCard max={12} className="rounded-2xl">
              <div className="relative rotate-[3deg] overflow-hidden rounded-2xl border border-gold/30 shadow-[0_60px_120px_-30px_rgb(0_0_0/0.7)] transition-transform duration-700 hover:rotate-0">
                <Image
                  src={cv.preview}
                  alt="Voorbeeld van het cv van Ayman El Hammoudi"
                  width={1200}
                  height={1697}
                  sizes="(max-width: 1024px) 90vw, 36vw"
                  className="h-auto w-full"
                />
              </div>
            </TiltCard>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
