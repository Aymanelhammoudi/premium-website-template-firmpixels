import { getSite, type Locale } from "@content";
import { Reveal } from "../ui/Reveal";

/** Wordt alleen getoond als er echte citaten in content/site.ts staan. */
export function Testimonials({ locale }: { locale: Locale }) {
  const { testimonials } = getSite(locale);
  return (
    <section aria-label={locale === "en" ? "What others say" : "Wat anderen zeggen"} className="py-28">
      <div className="container-x grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="h-full rounded-3xl border border-line p-10">
              <blockquote className="font-display text-2xl leading-snug font-light">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-sm text-muted">
                <span className="text-ink">{t.name}</span> · {t.role}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
