import Image from "next/image";
import Link from "next/link";
import { getSite, routes, type Locale } from "@content";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArrowUpRight, Download } from "@/components/ui/Icons";
import { PrintButton } from "@/app/cv/PrintButton";
import { ShareButton } from "@/components/ui/ShareButton";
import { crumbs, pageMetadata } from "./page";

export const cvMetadata = (locale: Locale) => pageMetadata(locale, "cv");

const btn =
  "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-[var(--dur-fast)] active:scale-[0.98]";

/**
 * Cv-pagina. Bovenaan downloads en het originele, vormgegeven cv; daaronder een sobere, semantische
 * online versie die goed leesbaar is voor mensen, sollicitatiesystemen én de printer (bron van de ATS-pdf).
 */
export function CvView({ locale }: { locale: Locale }) {
  const { cv, education, experience, pages, person, ui } = getSite(locale);
  const t = ui.cvPage;
  const s = ui.cvSection;
  return (
    <>
      <div className="no-print">
        <PageHeader crumbs={crumbs(locale, "cv")} crumbsLabel={ui.detail.crumbs} {...pages.cv} />
      </div>
      <div className="py-16 md:py-24 print:p-0">
        <div className="container-x grid gap-10 lg:grid-cols-12 print:block print:w-full print:max-w-none">
          <aside className="no-print lg:col-span-4 lg:col-start-9 lg:row-start-1">
            <div className="space-y-5 lg:sticky lg:top-28">
              <a
                href={cv.pdf}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.openAria}
                className="group block overflow-hidden rounded-2xl border border-line bg-surface p-3 transition-colors duration-[var(--dur-base)] hover:border-ink"
              >
                <Image
                  src={cv.preview}
                  alt={s.previewAlt}
                  width={cv.previewSize.width}
                  height={cv.previewSize.height}
                  sizes="(max-width: 1024px) 90vw, 28vw"
                  loading="eager"
                  fetchPriority="high"
                  className="h-auto w-full rounded-lg"
                />
                <span className="mt-3 flex items-center justify-between px-1 text-sm">
                  {s.openAria.replace(/\s*\(.*\)$/, "")}
                  <ArrowUpRight className="size-4 transition-transform duration-[var(--dur-base)] group-hover:rotate-45" />
                </span>
              </a>
              <div className="grid gap-2">
                <a href={cv.pdf} download={cv.fileName} className={`${btn} bg-ink text-bg hover:bg-gold hover:text-on-gold`}>
                  <Download className="size-4" />
                  {t.download}
                </a>
                <a href={cv.ats} download={cv.atsFileName} className={`${btn} border border-line-strong hover:border-ink`}>
                  <Download className="size-4" />
                  {t.ats}
                </a>
                <PrintButton label={t.print} className={`${btn} border border-line-strong hover:border-ink`} />
                <a href={s.otherLang.href} download className="mt-1 inline-flex items-center justify-center gap-2 text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
                  <Download className="size-4" />
                  {s.otherLang.label}
                </a>
              </div>
              <p className="text-xs text-muted">{s.note}</p>
              <ShareButton person={person} ui={{ share: ui.share }} />
            </div>
          </aside>

          <div className="lg:col-span-8 lg:row-start-1">
          <article aria-labelledby="cv-name" className="rounded-2xl border border-line bg-surface p-6 sm:p-8 md:p-12 print:rounded-none print:border-0 print:bg-transparent print:p-0">
            <header className="flex flex-col-reverse gap-6 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between print:flex-row print:items-center print:justify-between">
              <div>
              <p className="eyebrow">{t.eyebrow}</p>
              <h2 id="cv-name" className="heading mt-3 text-4xl md:text-5xl print:text-5xl">
                {person.fullName}
              </h2>
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

            <section aria-labelledby="cv-profiel" className="border-b border-line py-8 print:py-4">
              <h3 id="cv-profiel" className="eyebrow mb-3">{t.profile}</h3>
              <p className="text-lg print:text-base">{cv.profile}</p>
            </section>

            {(
              [
                { id: "cv-ervaring", title: t.work, track: "sales", printTasks: 2 },
                { id: "cv-ondernemerschap", title: t.venture, track: "ondernemer", printTasks: 0 },
              ] as const
            ).map((group) => (
              <section key={group.id} aria-labelledby={group.id} className="border-b border-line py-8 print:py-4">
                <h3 id={group.id} className="eyebrow mb-6">
                  {group.title}
                </h3>
                <ol className="space-y-8 print:space-y-2">
                  {experience
                    .filter((e) => e.track === group.track)
                    .map((e) => (
                      <li key={e.id} className="break-inside-avoid print:text-[10pt]">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="font-semibold tracking-tight text-2xl print:text-xl">
                            <Link href={routes.experience(locale, e.id)} className="hover:text-gold">
                              {e.company} — {e.role}
                            </Link>
                          </h4>
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

            <section aria-labelledby="cv-opleiding" className="break-inside-avoid border-b border-line py-8 print:py-4">
              <h3 id="cv-opleiding" className="eyebrow mb-3">{t.education}</h3>
              <ul>
                {education.map((e) => (
                  <li key={e.title} className="text-lg">
                    {e.title} — {e.school}
                    {e.period && ` (${e.period})`}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="cv-skills" className="grid break-inside-avoid gap-8 pt-8 md:grid-cols-2 print:grid-cols-2 print:pt-4">
              <div>
                <h3 id="cv-skills" className="eyebrow mb-3">{t.skills}</h3>
                <p>{cv.skills.join(" · ")}</p>
              </div>
              <div>
                <h3 className="eyebrow mb-3">{t.languages}</h3>
                <p>{person.languages.join(locale === "en" ? " and " : " en ")}</p>
              </div>
            </section>
          </article>
          </div>
        </div>
      </div>
    </>
  );
}
