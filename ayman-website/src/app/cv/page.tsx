import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cv, education, experience, person } from "@content/site";
import { Download } from "@/components/ui/Icons";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "Online cv",
  description: `Doorzoekbaar, ATS-vriendelijk cv van ${person.fullName}: ${person.role} uit ${person.region}.`,
  alternates: { canonical: "/cv/" },
};

/** Sobere, semantische cv-pagina: goed leesbaar voor mensen, sollicitatiesystemen én de printer. */
export default function CvPage() {
  return (
    <div className="pt-32 pb-24 print:p-0">
      <div className="container-x max-w-4xl print:w-full print:max-w-none">
        <div className="no-print mb-12 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-sm text-muted transition-colors hover:text-gold">
            ← Terug naar de homepage
          </Link>
          <div className="flex flex-wrap gap-3">
            <PrintButton />
            <a
              href={cv.pdf}
              download={cv.fileName}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-medium text-on-gold transition-colors hover:bg-gold-2"
            >
              <Download className="size-4" />
              Download als PDF
            </a>
          </div>
        </div>

        <article aria-labelledby="cv-name" className="rounded-[2rem] border border-line bg-surface/60 p-8 md:p-14 print:rounded-none print:border-0 print:bg-transparent print:p-0">
          <header className="flex flex-col-reverse gap-6 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between print:flex-row print:items-center print:justify-between">
            <div>
            <p className="eyebrow">Curriculum vitae</p>
            <h1 id="cv-name" className="font-display mt-3 text-5xl md:text-6xl print:text-5xl">
              {person.fullName}
            </h1>
            <p className="mt-2 text-lg">Verkoopadviseur · Retail &amp; sales · Webdesigner</p>
            <p className="mt-4 text-muted">
              {person.region} · <a href={`mailto:${person.email}`} className="underline-offset-4 hover:underline">{person.email}</a> ·{" "}
              <a href={`tel:${person.phoneHref}`} className="whitespace-nowrap underline-offset-4 hover:underline">{person.phoneDisplay}</a>
              {person.linkedin && (
                <>
                  {" "}
                  · <a href={person.linkedin}>LinkedIn</a>
                </>
              )}
            </p>
            </div>
            <Image
              src={person.portrait}
              alt={person.portraitAlt}
              width={160}
              height={200}
              className="h-auto w-28 shrink-0 rounded-2xl border border-line object-cover sm:w-32 print:w-28"
            />
          </header>

          <section aria-labelledby="cv-profiel" className="border-b border-line py-8 print:py-5">
            <h2 id="cv-profiel" className="eyebrow mb-3">Profiel</h2>
            <p className="text-lg print:text-base">{cv.profile}</p>
          </section>

          <section aria-labelledby="cv-ervaring" className="border-b border-line py-8 print:py-5">
            <h2 id="cv-ervaring" className="eyebrow mb-6">Werkervaring</h2>
            <ol className="space-y-8 print:space-y-3">
              {experience.map((e) => (
                <li key={e.id} className="break-inside-avoid print:text-[10pt]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl print:text-xl">
                      {e.company} — {e.role}
                    </h3>
                    <p className="font-mono text-xs tracking-wider text-gold uppercase">
                      {e.period} · {e.sector}
                    </p>
                  </div>
                  <p className="mt-2 text-muted print:mt-1">{e.summary}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-muted marker:text-gold print:mt-1 print:space-y-0">
                    {e.tasks.map((t, i) => (
                      <li key={t} className={i >= 2 ? "print:hidden" : undefined}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="cv-opleiding" className="break-inside-avoid border-b border-line py-8 print:py-5">
            <h2 id="cv-opleiding" className="eyebrow mb-3">Opleiding</h2>
            <ul>
              {education.map((e) => (
                <li key={e.title} className="text-lg">
                  {e.title} — {e.school}
                  {e.period && ` (${e.period})`}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="cv-skills" className="grid break-inside-avoid gap-8 pt-8 md:grid-cols-2 print:grid-cols-2 print:pt-5">
            <div>
              <h2 id="cv-skills" className="eyebrow mb-3">Vaardigheden</h2>
              <p>{cv.skills.join(" · ")}</p>
            </div>
            <div>
              <h2 className="eyebrow mb-3">Talen</h2>
              <p>{person.languages.join(" en ")}</p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
