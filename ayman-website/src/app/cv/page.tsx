import type { Metadata } from "next";
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
    <div className="pt-32 pb-24 print:pt-0">
      <div className="container-x max-w-4xl">
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
              Download originele PDF
            </a>
          </div>
        </div>

        <article aria-labelledby="cv-name" className="rounded-[2rem] border border-line bg-surface/60 p-8 md:p-14 print:border-0 print:p-0">
          <header className="border-b border-line pb-8">
            <p className="eyebrow">Curriculum vitae</p>
            <h1 id="cv-name" className="font-display mt-3 text-5xl md:text-6xl">
              {person.fullName}
            </h1>
            <p className="mt-2 text-lg">Verkoopadviseur · Retail &amp; sales · Webdesigner</p>
            <p className="mt-4 text-muted">
              {person.region} · <a href={`mailto:${person.email}`} className="underline-offset-4 hover:underline">{person.email}</a> ·{" "}
              <a href={`tel:${person.phoneHref}`} className="underline-offset-4 hover:underline">{person.phoneDisplay}</a>
              {person.linkedin && (
                <>
                  {" "}
                  · <a href={person.linkedin}>LinkedIn</a>
                </>
              )}
            </p>
          </header>

          <section aria-labelledby="cv-profiel" className="border-b border-line py-8">
            <h2 id="cv-profiel" className="eyebrow mb-3">Profiel</h2>
            <p className="text-lg">{cv.profile}</p>
          </section>

          <section aria-labelledby="cv-ervaring" className="border-b border-line py-8">
            <h2 id="cv-ervaring" className="eyebrow mb-6">Werkervaring</h2>
            <ol className="space-y-8">
              {experience.map((e) => (
                <li key={e.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl">
                      {e.company} — {e.role}
                    </h3>
                    <p className="font-mono text-xs tracking-wider text-gold uppercase">
                      {e.period} · {e.sector}
                    </p>
                  </div>
                  <p className="mt-2 text-muted">{e.summary}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-muted marker:text-gold">
                    {e.tasks.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="cv-opleiding" className="border-b border-line py-8">
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

          <section aria-labelledby="cv-skills" className="grid gap-8 pt-8 md:grid-cols-2">
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
