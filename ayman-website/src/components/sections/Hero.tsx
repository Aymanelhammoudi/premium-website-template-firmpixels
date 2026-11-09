"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";
import type { Site } from "@content";
import { Button } from "../ui/Button";
import { ArrowRight, Download } from "../ui/Icons";
import { TiltCard } from "../ui/TiltCard";
import { EASE, useReducedMotion } from "../ui/motion";

function RotatingRole({ roles }: { roles: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [reduce, roles.length]);

  if (reduce) return <em className="not-italic text-gold">{roles.join(" & ").toLowerCase()}</em>;

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {/* Onzichtbare "maatvoerder": reserveert de breedte van de langste titel, zodat er niets verspringt */}
      <em aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap not-italic">
        {roles.reduce((a, b) => (b.length > a.length ? b : a), "").toLowerCase()}
      </em>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.em
          key={roles[i]}
          data-role
          className="col-start-1 row-start-1 whitespace-nowrap not-italic text-gold"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {roles[i].toLowerCase()}
        </motion.em>
      </AnimatePresence>
      <span className="sr-only">{roles.join(" & ")}</span>
    </span>
  );
}

export function Hero({
  cv,
  hero,
  person,
  ui,
  secondaryHref,
  chips = [],
}: {
  chips?: { label: string; text: string; logo?: string }[];
  cv: Site["cv"];
  hero: Site["hero"];
  person: Site["person"];
  ui: Pick<Site["ui"], "hero">;
  secondaryHref: string;
}) {
  const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;
  return (
    <section id="top" data-depth-root aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b border-line">
      <canvas data-dotfield aria-hidden className="pointer-events-none absolute inset-0 -z-10 size-full" />
      <div aria-hidden className="aurora -top-40 right-[-10%] -z-10 size-[36rem] bg-gold/12" />
      <div aria-hidden className="aurora bottom-[-30%] left-[-15%] -z-10 size-[32rem] bg-[#3b5b8c]/15" style={{ animationDelay: "-8s" }} />

      <div className="container-x grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-7">
          <p
            className="enter inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pr-3.5 pl-2.5 text-xs text-muted"
            style={d(0.05)}
          >
            <span className="pulse-dot size-2 rounded-full bg-emerald-500 text-emerald-500" aria-hidden />
            {hero.status}
          </p>

          <p className="enter mt-8 text-lg text-muted md:text-xl" style={d(0.12)}>
            {ui.hero.iAm} <strong className="font-semibold text-ink">{person.fullName}</strong>, <RotatingRole roles={person.roleShort} />
          </p>

          <h1 id="hero-title" className="heading mt-4 text-[clamp(3rem,7.6vw,6.25rem)] leading-[0.98]">
            <span className="sr-only">
              {person.fullName}, {person.role}:{" "}
            </span>
            {[hero.tagline[0], hero.tagline[1], <em key="v">{hero.tagline[2]}</em>].map((line, i) => (
              <span key={i} className="line-mask">
                <span className="line-up" style={d(0.18 + i * 0.08)}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="enter mt-8 max-w-xl text-lg text-muted" style={d(0.35)}>
            {hero.intro}
          </p>
          <div className="enter mt-9 flex flex-wrap items-center gap-3" style={d(0.42)}>
            <Button href={hero.primaryCta.href} download={cv.fileName} icon={<Download className="size-4" />}>
              {hero.primaryCta.label}
            </Button>
            <Button href={secondaryHref} variant="secondary" icon={<ArrowRight className="size-4" />}>
              {hero.secondaryCta.label}
            </Button>
          </div>
          <p className="enter mt-8 text-sm text-muted" style={d(0.5)}>
            {hero.footnote}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[24rem] lg:col-span-5 lg:max-w-[28rem] lg:justify-self-end">
          <div className="portrait-in" data-depth="0.45">
            <TiltCard className="rounded-3xl">
              <div className="beam relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_30px_80px_-40px_rgb(7_20_38/0.55)]">
                <Image
                  src={person.portrait}
                  alt={person.portraitAlt}
                  fill
                  preload
                  sizes="(max-width: 1024px) 90vw, 30vw"
                  className="object-cover object-top"
                />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#071426]/90 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-[#f5f1e8]">
                  <div>
                    <p className="text-lg font-semibold tracking-tight">{person.fullName}</p>
                    <p className="text-sm text-[#a9b5c3]">{ui.hero.caption}</p>
                  </div>
                  <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs backdrop-blur">{person.region}</span>
                </div>
              </div>
            </TiltCard>
          </div>
          {chips.map((c, i) => (
            <div
              key={c.text}
              aria-hidden
              data-depth={i === 0 ? "1.2" : "0.9"}
              className={`enter absolute z-10 hidden lg:block ${i === 0 ? "top-12 -left-14" : "-right-8 bottom-28"}`}
              style={d(0.6 + i * 0.15)}
            >
              <div
                className="float-y flex items-center gap-3 rounded-2xl border border-line bg-surface/90 py-2.5 pr-4 pl-2.5 shadow-[0_20px_50px_-25px_rgb(7_20_38/0.5)] backdrop-blur-md"
                style={d(i * 1.5)}
              >
                <span className="grid size-9 place-items-center rounded-xl border border-line bg-bg">
                  {c.logo ? (
                    <Image src={c.logo} alt="" width={20} height={20} className="size-5 object-contain" />
                  ) : (
                    <span className="text-[0.8rem] font-bold tracking-[-0.06em]">
                      {c.text.slice(0, 3)}
                      <span className="text-gold">.</span>
                    </span>
                  )}
                </span>
                <span className="leading-tight">
                  <span className="block font-mono text-[0.62rem] tracking-[0.14em] text-muted uppercase">{c.label}</span>
                  <span className="block text-sm font-semibold tracking-tight">{c.text}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
