import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { alternates, getSite, routes, type Locale } from "@content";
import { Download } from "@/components/ui/Icons";
import { PrintButton } from "@/app/cv/PrintButton";

export function cvMetadata(locale: Locale): Metadata {
  const { ui } = getSite(locale);
  return {
    title: ui.cvPage.metaTitle,
    description: ui.cvPage.metaDescription,
    alternates: alternates(routes.cv("nl"), routes.cv("en"), locale),
  };
}

/** Sobere, semantische cv-pagina: goed leesbaar voor mensen, sollicitatiesystemen én de printer. */
export function CvView({ locale }: { locale: Locale }) {
  const { cv, education, experience, person, ui } = getSite(locale);
  const t = ui.cvPage;
  return (
    <div className="pt-32 pb-24 print:p-0">
      <div className="container-x max-w-4xl print:w-full print:max-w-none">
        <div className="no-print mb-12 flex flex-wrap items-center justify-between gap-4">
          <Link href={routes.home(locale)} className="text-sm text-muted transition-colors hover:text-gold">
            {t.back}
          </Link>
          <div className="flex flex-wrap gap-3">
            <PrintButton label={t.print} />
            <a
              href={cv.ats}
              download={cv.atsFileName}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm transition-colors hover:border-gold hover:text-gold"
            >
              <Download className="size-4" />
              {t.ats}
            </a>
            <a
              href={cv.pdf}
              download={cv.fileName}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-medium text-on-gold transition-colors hover:bg-gold-2"
            >
              <Download className="size-4" />
              {t.download}
            </a>
          </div>
        </div>

        <article aria-labelledby="cv-name" className="rounded-[2rem] border border-line bg-surface/60 p-8 md:p-14 print:rounded-none print:border-0 print:bg-transparent print:p-0">
          <header className="flex flex-col-reverse gap-6 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between print:flex-row print:items-center print:justify-between">
            <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h1 id="cv-name" className="font-display mt-3 text-5xl md:text-6xl print:text-5xl">
              {person.fullName}
            </h1>
            <p className="mt-2 text-lg">{cv.subtitle}</p>
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
            <h2 id="cv-profiel" className="eyebrow mb-3">{t.profile}</h2>
            <p className="text-lg print:text-base">{cv.profile}</p>
          </section>

          {(
            [
              { id: "cv-ervaring", title: t.work, track: "sales", printTasks: 2 },
              { id: "cv-ondernemerschap", title: t.venture, track: "ondernemer", printTasks: 0 },
            ] as const
          ).map((group) => (
            <section key={group.id} aria-labelledby={group.id} className="border-b border-line py-8 print:py-5">
              <h2 id={group.id} className="eyebrow mb-6">
                {group.title}
              </h2>
              <ol className="space-y-8 print:space-y-3">
                {experience
                  .filter((e) => e.track === group.track)
                  .map((e) => (
                    <li key={e.id} className="break-inside-avoid print:text-[10pt]">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-display text-2xl print:text-xl">
                          <Link href={routes.experience(locale, e.id)} className="hover:text-gold">
                            {e.company} — {e.role}
                          </Link>
                        </h3>
                        <p className="font-mono text-xs tracking-wider text-gold uppercase">
                          {e.period} · {e.sector}
                        </p>
                      </div>
                      <p className="mt-2 text-muted print:mt-1">{e.summary}</p>
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-muted marker:text-gold print:mt-1 print:space-y-0">
                        {e.tasks.map((t, i) => (
                          <li key={t} className={i >= group.printTasks ? "print:hidden" : undefined}>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
              </ol>
            </section>
          ))}

          <section aria-labelledby="cv-opleiding" className="break-inside-avoid border-b border-line py-8 print:py-5">
            <h2 id="cv-opleiding" className="eyebrow mb-3">{t.education}</h2>
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
              <h2 id="cv-skills" className="eyebrow mb-3">{t.skills}</h2>
              <p>{cv.skills.join(" · ")}</p>
            </div>
            <div>
              <h2 className="eyebrow mb-3">{t.languages}</h2>
              <p>{person.languages.join(locale === "en" ? " and " : " en ")}</p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
