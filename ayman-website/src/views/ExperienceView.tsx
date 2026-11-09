import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { alternates, getSite, routes, withBase, type Locale } from "@content";
import { BrandMark } from "@/components/ui/BrandMark";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Toc } from "@/components/ui/Toc";
import { breadcrumbJsonLd } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";

export function experienceParams(locale: Locale) {
  return getSite(locale).experience.map((e) => ({ slug: e.id }));
}

export function experienceMetadata(locale: Locale, slug: string): Metadata {
  const item = getSite(locale).experienceBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.company} — ${item.role}`,
    description: item.summary.slice(0, 155),
    alternates: alternates(routes.experience("nl", item.id), routes.experience("en", item.id), locale),
    openGraph: {
      type: "article",
      locale: locale === "en" ? "en_GB" : "nl_NL",
      url: routes.experience(locale, item.id),
      title: `${item.company} — ${item.role}`,
      description: item.summary.slice(0, 155),
      images: [{ url: withBase(`/og/exp-${item.id}-${locale}.png`), width: 1200, height: 630, alt: `${item.company} — ${item.role}` }],
    },
    twitter: { card: "summary_large_image", images: [withBase(`/og/exp-${item.id}-${locale}.png`)] },
  };
}

export function ExperienceView({ locale, slug }: { locale: Locale; slug: string }) {
  const { experience, experienceBySlug, pages, person, tracks, ui } = getSite(locale);
  const d = ui.detail;
  const item = experienceBySlug(slug);
  if (!item) notFound();

  const same = experience.filter((e) => e.track === item.track);
  const i = same.indexOf(item);
  const prev = same[(i - 1 + same.length) % same.length];
  const next = same[(i + 1) % same.length];
  const track = tracks[item.track];

  const trackKey = item.track === "sales" ? "experience" : "ventures";
  const toc = [
    { id: "samenvatting", label: d.summary },
    ...(item.brands ? [{ id: "merken", label: d.brands }] : []),
    ...(item.story ? [{ id: "verhaal", label: d.story }] : []),
    { id: "taken", label: d.did },
    { id: "zegt", label: d.says },
  ];

  return (
    <article aria-labelledby="exp-title">
      {/* Kop */}
      <header className="relative overflow-hidden border-b border-line pt-12 pb-14 md:pt-16 md:pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbJsonLd([
                { label: d.home, href: routes.home(locale) },
                { label: pages[trackKey].eyebrow, href: routes.track(locale, item.track) },
                { label: item.company, url: routes.experience(locale, item.id) },
              ]),
            ),
          }}
        />
        <div aria-hidden className="dot-grid absolute inset-0 -z-10" />
        <div className="container-x">
          <nav aria-label={d.crumbs}>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <li>
                <Link href={routes.home(locale)} className="transition-colors hover:text-ink">
                  {d.home}
                </Link>
              </li>
              <li aria-hidden className="text-line-strong">/</li>
              <li>
                <Link href={routes.track(locale, item.track)} className="transition-colors hover:text-ink">
                  {pages[trackKey].eyebrow}
                </Link>
              </li>
              <li aria-hidden className="text-line-strong">/</li>
              <li>
                <span aria-current="page" className="text-ink">
                  {item.company}
                </span>
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal y={8}>
                <p className="eyebrow inline-flex items-center gap-2">
                  <span aria-hidden className="size-1.5 rounded-full bg-gold" />
                  {track.label} · {item.sector}
                </p>
              </Reveal>
              <h1 id="exp-title" className="heading mt-5 text-[clamp(2.75rem,7vw,5.5rem)]">
                <ViewTransition name={`title-${item.id}`} share="morph" default="none">
                  <span className="block">{item.company}</span>
                </ViewTransition>
              </h1>
              <Reveal delay={0.1} y={8}>
                <p className="mt-4 text-[clamp(1.15rem,2vw,1.5rem)] leading-snug text-muted">{item.role}</p>
              </Reveal>
              <Reveal delay={0.15} y={8} className="mt-7 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-line-strong px-3.5 py-1 font-mono text-xs tracking-[0.12em] uppercase">
                  {item.period}
                </span>
                {item.current && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1 font-mono text-xs tracking-[0.12em] uppercase">
                    <span className="pulse-dot size-1.5 rounded-full bg-gold text-gold" aria-hidden />
                    {ui.tracks.current}
                  </span>
                )}
              </Reveal>
            </div>
            <div className="w-full max-w-[8rem] sm:max-w-[12rem] lg:col-span-3 lg:col-start-10 lg:max-w-none">
              <ViewTransition name={`brand-${item.id}`} share="morph" default="none">
                <div className="relative grid aspect-square place-items-center overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)]">
                  <BrandMark item={item} size={item.logo ? 96 : 88} />
                </div>
              </ViewTransition>
            </div>
          </div>
        </div>
      </header>

      <div className="container-x grid grid-cols-1 gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-12">
        <aside className="hidden min-w-0 lg:col-span-3 lg:block">
          <Toc label={ui.toc} items={toc} />
        </aside>

        <div className="min-w-0 space-y-16 md:space-y-20 lg:col-span-9">
          <section id="samenvatting" aria-labelledby="samenvatting-title" className="scroll-mt-28">
            <h2 id="samenvatting-title" className="eyebrow mb-5">
              {d.summary}
            </h2>
            <p className="enter text-[clamp(1.25rem,2.2vw,1.65rem)] leading-[1.45] font-medium tracking-tight text-pretty">{item.summary}</p>
          </section>

          {item.brands && (
            <section id="merken" aria-labelledby="merken-title" className="scroll-mt-28">
              <h2 id="merken-title" className="eyebrow mb-5">
                {d.brands}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-3">
                {item.brands.map((b, n) => (
                  <Reveal as="li" key={b.name} delay={n * 0.05}>
                    <div className="flex h-full items-center gap-4 rounded-2xl border border-line bg-surface p-5">
                      <span className="grid h-14 w-20 place-items-center rounded-xl bg-white p-2.5">
                        <Image src={b.logo} alt="" width={80} height={48} className="h-9 w-auto object-contain" />
                      </span>
                      <span className="text-xl font-semibold tracking-tight">{b.name}</span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </section>
          )}

          {item.story && (
            <section id="verhaal" aria-labelledby="verhaal-title" className="scroll-mt-28">
              <h2 id="verhaal-title" className="eyebrow mb-8">
                {d.story}
              </h2>
              <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
                <span aria-hidden className="absolute top-5 right-0 left-0 hidden h-px bg-line md:block" />
                {item.story.map((st, n) => (
                  <Reveal as="li" key={st.title} delay={n * 0.05} className="relative">
                    <span
                      className={`relative z-10 grid size-10 place-items-center rounded-full border font-mono text-xs ${
                        n === item.story!.length - 1 ? "border-ink bg-ink text-bg" : "border-line-strong bg-bg"
                      }`}
                    >
                      0{n + 1}
                    </span>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{st.title}</h3>
                    <p className="mt-2 text-muted">{st.text}</p>
                  </Reveal>
                ))}
              </ol>
            </section>
          )}

          <section id="taken" aria-labelledby="taken-title" className="scroll-mt-28">
            <h2 id="taken-title" className="eyebrow mb-5">
              {d.did}
            </h2>
            <ol className="divide-y divide-line border-y border-line">
              {item.tasks.map((t, n) => (
                <Reveal as="li" key={t} delay={n * 0.04} className="flex gap-5 py-5">
                  <span className="w-8 shrink-0 font-mono text-sm leading-7 text-muted">{String(n + 1).padStart(2, "0")}</span>
                  <p className="text-lg">{t}</p>
                </Reveal>
              ))}
            </ol>
          </section>

          <section id="zegt" aria-labelledby="zegt-title" className="scroll-mt-28">
            <div className="rounded-2xl border border-line bg-surface p-7 md:p-9">
              <h2 id="zegt-title" className="eyebrow inline-flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-gold" />
                {d.says}
              </h2>
              <p className="mt-4 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug font-light">{item.value}</p>
              <ul className="mt-7 flex flex-wrap gap-2" aria-label={d.keywords}>
                {item.tags.map((t) => (
                  <li key={t} className="rounded-full border border-line-strong px-3 py-1 text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Vorige / volgende */}
          <nav aria-label={d.other} className="grid gap-3 border-t border-line pt-10 md:grid-cols-2">
            {[
              { it: prev, label: d.prev, dir: "prev", Icon: ArrowLeft, align: "" },
              { it: next, label: d.next, dir: "next", Icon: ArrowRight, align: "md:text-right md:items-end" },
            ].map(({ it, label, dir, Icon, align }) => (
              <Link
                key={label}
                href={routes.experience(locale, it.id)}
                className={`group flex flex-col gap-2 rounded-2xl border border-line p-6 transition-colors duration-[var(--dur-base)] hover:border-ink hover:bg-surface ${align}`}
              >
                <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.14em] text-muted uppercase">
                  {dir === "prev" && <Icon className="size-4 transition-transform duration-[var(--dur-base)] group-hover:-translate-x-1" />}
                  {label}
                  {dir === "next" && <Icon className="size-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-1" />}
                </span>
                <span className="text-2xl font-semibold tracking-tight">{it.company}</span>
                <span className="text-sm text-muted">{it.role}</span>
              </Link>
            ))}
          </nav>
          <p>
            <Link href={routes.track(locale, item.track)} className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
              ← {pages[trackKey].eyebrow} · {person.fullName}
            </Link>
          </p>
        </div>
      </div>
      <CtaBand locale={locale} />
    </article>
  );
}
