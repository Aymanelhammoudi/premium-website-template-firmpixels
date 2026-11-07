import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { alternates, getSite, routes, type Locale } from "@content";
import { BrandMark } from "@/components/ui/BrandMark";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { TiltCard } from "@/components/ui/TiltCard";
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
  };
}

export function ExperienceView({ locale, slug }: { locale: Locale; slug: string }) {
  const { experience, experienceBySlug, person, tracks, ui } = getSite(locale);
  const d = ui.detail;
  const item = experienceBySlug(slug);
  if (!item) notFound();

  const i = experience.indexOf(item);
  const prev = experience[(i - 1 + experience.length) % experience.length];
  const next = experience[(i + 1) % experience.length];
  const track = tracks[item.track];

  return (
    <article aria-labelledby="exp-title">
      {/* Kop */}
      <header className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
        <div aria-hidden className="absolute top-0 right-[-10%] -z-10 size-[36rem] rounded-full bg-gold/10 blur-[120px]" />
        <div className="container-x">
          <Reveal y={12}>
            <nav aria-label={d.crumbs} className="flex flex-wrap items-center gap-2 font-mono text-[0.7rem] tracking-[0.16em] text-muted uppercase">
              <Link href={routes.home(locale)} className="hover:text-gold">
                {d.home}
              </Link>
              <span aria-hidden>/</span>
              <Link href={routes.anchor(locale, item.track)} className="hover:text-gold">
                {track.title}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-gold">{item.company}</span>
            </nav>
          </Reveal>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal y={16}>
                <p className="eyebrow">
                  {track.label} · {item.sector}
                </p>
              </Reveal>
              <h1 id="exp-title" className="font-display mt-5 text-[clamp(3rem,8.5vw,7.5rem)] leading-[0.92] font-light">
                <ViewTransition name={`title-${item.id}`} share="morph" default="none">
                  <span className="block">{item.company}</span>
                </ViewTransition>
              </h1>
              <Reveal delay={0.2}>
                <p className="font-display mt-5 text-[clamp(1.4rem,2.6vw,2.2rem)] leading-snug font-light text-muted italic">
                  {item.role}
                </p>
              </Reveal>
              <Reveal delay={0.3} className="mt-8 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-line-strong px-4 py-1.5 font-mono text-xs tracking-[0.14em] uppercase">
                  {item.period}
                </span>
                {item.current && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 font-mono text-xs tracking-[0.14em] text-gold uppercase">
                    <span className="pulse-dot size-1.5 rounded-full bg-gold text-gold" aria-hidden />
                    {ui.tracks.current}
                  </span>
                )}
              </Reveal>
            </div>
            <Reveal className="w-full max-w-[9rem] sm:max-w-[15rem] lg:col-span-4 lg:max-w-none" delay={0.15} y={40}>
              <ViewTransition name={`brand-${item.id}`} share="morph" default="none">
              <TiltCard max={10} className="rounded-[2rem]">
                <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[2rem] border border-line-strong bg-surface [container-type:inline-size]">
                  <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--glow),transparent_60%)]" />
                  <BrandMark item={item} size={item.logo ? 120 : 110} className="relative" />
                </div>
              </TiltCard>
              </ViewTransition>
            </Reveal>
          </div>
        </div>
      </header>

      {/* Samenvatting */}
      <section aria-label={d.summary} className="border-y border-line bg-bg-2 py-16 md:py-24">
        <div className="container-x md:grid md:grid-cols-12">
          <Reveal className="md:col-span-9 md:col-start-2">
            <p className="font-display text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.3] font-light">{item.summary}</p>
          </Reveal>
        </div>
      </section>

      <div className="container-x py-20 md:py-28">
        {/* Merken */}
        {item.brands && (
          <section aria-labelledby="merken-title" className="mb-20">
            <Reveal>
              <h2 id="merken-title" className="eyebrow mb-6">
                {d.brands}
              </h2>
            </Reveal>
            <ul className="grid gap-4 sm:grid-cols-3">
              {item.brands.map((b, n) => (
                <Reveal as="li" key={b.name} delay={n * 0.1}>
                  <Spotlight className="flex h-full items-center gap-5 rounded-3xl border border-line bg-surface/60 p-6">
                    <span className="grid h-16 w-24 place-items-center rounded-2xl bg-white p-3">
                      <Image src={b.logo} alt="" width={80} height={48} className="h-10 w-auto object-contain" />
                    </span>
                    <span className="font-display text-2xl">{b.name}</span>
                  </Spotlight>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {/* Verhaal in stappen */}
        {item.story && (
          <section aria-labelledby="verhaal-title" className="mb-24">
            <Reveal>
              <h2 id="verhaal-title" className="eyebrow mb-10">
                {d.story}
              </h2>
            </Reveal>
            <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
              <span aria-hidden className="absolute top-5 right-0 left-0 hidden h-px bg-line md:block" />
              {item.story.map((s, n) => (
                <Reveal as="li" key={s.title} delay={0.1 + n * 0.15} className="relative">
                  <span
                    className={`relative z-10 grid size-10 place-items-center rounded-full border font-mono text-xs ${
                      n === item.story!.length - 1 ? "border-gold bg-gold text-on-gold" : "border-gold bg-bg text-gold"
                    }`}
                  >
                    0{n + 1}
                  </span>
                  <h3 className="font-display mt-6 text-2xl">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.text}</p>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {/* Wat ik deed + wat het zegt */}
        <div className="grid gap-12 lg:grid-cols-12">
          <section aria-labelledby="taken-title" className="lg:col-span-7">
            <Reveal>
              <h2 id="taken-title" className="eyebrow mb-8">
                {d.did}
              </h2>
            </Reveal>
            <ol className="divide-y divide-line border-y border-line">
              {item.tasks.map((t, n) => (
                <Reveal as="li" key={t} delay={n * 0.08} className="flex gap-6 py-6">
                  <span className="font-display w-10 shrink-0 text-3xl leading-none font-light text-gold">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg">{t}</p>
                </Reveal>
              ))}
            </ol>
          </section>
          <aside aria-labelledby="zegt-title" className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.15}>
              <div className="rounded-[2rem] border border-gold/40 bg-gold/10 p-8 lg:sticky lg:top-28">
                <h2 id="zegt-title" className="eyebrow">
                  {d.says}
                </h2>
                <p className="font-display mt-5 text-2xl leading-snug font-light">{item.value}</p>
                <ul className="mt-8 flex flex-wrap gap-2" aria-label={d.keywords}>
                  {item.tags.map((t) => (
                    <li key={t} className="rounded-full border border-gold/40 px-3 py-1 text-xs text-gold">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* Vorige / volgende */}
        <nav aria-label={d.other} className="mt-24 grid gap-4 md:grid-cols-2">
          {[
            { it: prev, label: d.prev, dir: "prev", Icon: ArrowLeft, align: "" },
            { it: next, label: d.next, dir: "next", Icon: ArrowRight, align: "md:text-right md:items-end" },
          ].map(({ it, label, dir, Icon, align }) => (
            <Link
              key={label}
              href={routes.experience(locale, it.id)}
              data-cursor={label}
              className={`group flex flex-col gap-3 rounded-3xl border border-line p-7 transition-colors duration-500 hover:border-gold hover:bg-surface/60 ${align}`}
            >
              <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.16em] text-gold uppercase">
                {dir === "prev" && <Icon className="size-4 transition-transform duration-500 group-hover:-translate-x-1" />}
                {label}
                {dir === "next" && <Icon className="size-4 transition-transform duration-500 group-hover:translate-x-1" />}
              </span>
              <span className="font-display text-3xl">{it.company}</span>
              <span className="text-sm text-muted">{it.role}</span>
            </Link>
          ))}
        </nav>
        <p className="mt-10 text-center">
          <Link href={routes.overview(locale)} className="text-sm text-muted underline-offset-4 hover:text-gold hover:underline">
            {d.all} · {person.fullName}
          </Link>
        </p>
      </div>
      <CtaBand locale={locale} />
    </article>
  );
}
