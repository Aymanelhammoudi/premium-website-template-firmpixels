import Image from "next/image";
import Link from "next/link";
import { getSite, routes, type Locale } from "@content";
import { Button } from "../ui/Button";
import { ArrowUpRight, Download } from "../ui/Icons";
import { Reveal, RevealLines } from "../ui/Reveal";
import { ShareButton } from "../ui/ShareButton";
import { TiltCard } from "../ui/TiltCard";

/** Cv-blok: origineel vormgegeven cv, ATS-versie, andere taal en online versie. */
export function CvSection({ locale }: { locale: Locale }) {
  const { cv, ui } = getSite(locale);
  const t = ui.cvSection;
  return (
    <section id="cv" data-theme="dark" aria-labelledby="cv-title" className="relative overflow-hidden bg-bg py-24 text-ink md:py-32">
      <div aria-hidden className="absolute top-1/2 left-1/2 -z-0 size-[50rem] -translate-1/2 rounded-full bg-gold/10 blur-[140px]" />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-6">09 — {t.eyebrow}</p>
          <h2 id="cv-title" className="font-display text-[clamp(2.8rem,6.5vw,5.8rem)] leading-[0.98] font-light text-balance">
            <RevealLines lines={[t.title, <em key="a">{t.accent}</em>]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-lg text-lg text-pretty text-muted">{t.intro}</p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex flex-wrap gap-3">
            <Button href={cv.pdf} download={cv.fileName} icon={<Download className="size-4" />}>
              {t.download}
            </Button>
            <Button href={cv.ats} download={cv.atsFileName} variant="ghost" icon={<Download className="size-4" />}>
              {t.ats}
            </Button>
          </Reveal>
          <Reveal delay={0.35} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href={routes.cv(locale)}
              className="group inline-flex items-center gap-2 border-b border-gold/40 pb-1 text-gold transition-colors hover:border-gold"
            >
              {t.online}
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
            <a
              href={t.otherLang.href}
              download
              className="group inline-flex items-center gap-2 border-b border-line-strong pb-1 text-sm text-muted transition-colors hover:border-gold hover:text-gold"
            >
              <Download className="size-4" />
              {t.otherLang.label}
            </a>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-lg text-xs text-pretty text-muted">{t.note}</p>
            <div className="mt-5">
              <ShareButton locale={locale} />
            </div>
          </Reveal>
        </div>

        <Reveal className="mx-auto w-full max-w-md lg:col-span-5 lg:col-start-8 lg:max-w-[26rem]" y={60}>
          <a href={cv.pdf} target="_blank" rel="noopener noreferrer" data-cursor="Open" className="block" aria-label={t.openAria}>
            <TiltCard max={12} className="rounded-2xl">
              <div className="relative rotate-[3deg] overflow-hidden rounded-2xl border border-gold/30 shadow-[0_60px_120px_-30px_rgb(0_0_0/0.7)] transition-transform duration-700 hover:rotate-0">
                <Image
                  src={cv.preview}
                  alt={t.previewAlt}
                  width={cv.previewSize.width}
                  height={cv.previewSize.height}
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
