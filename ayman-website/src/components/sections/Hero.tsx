"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { Site } from "@content";
import { Button } from "../ui/Button";
import { ArrowDown, Download, Star } from "../ui/Icons";
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

  if (reduce) return <em className="accent">{roles.join(" & ").toLowerCase()}</em>;

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {/* Onzichtbare "maatvoerder": reserveert de breedte van de langste titel, zodat er niets verspringt */}
      <em aria-hidden className="accent invisible col-start-1 row-start-1 whitespace-nowrap">
        {roles.reduce((a, b) => (b.length > a.length ? b : a), "").toLowerCase()}
      </em>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.em
          key={roles[i]}
          className="accent col-start-1 row-start-1 whitespace-nowrap"
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

export function Hero({ cv, hero, person, ui }: { cv: Site["cv"]; hero: Site["hero"]; person: Site["person"]; ui: Pick<Site["ui"], "hero"> }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const smx = useSpring(mx, { stiffness: 80, damping: 20 });
  const smy = useSpring(my, { stiffness: 80, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(640px circle at ${smx}px ${smy}px, var(--glow), transparent 65%)`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const onMove = (e: PointerEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onMove}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 pb-8 md:pt-32"
    >
      {/* Achtergrond: raster, lichtvlek die muis volgt, gouden gloed */}
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
      {!reduce && <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ background: spotlight }} />}
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] -z-10 size-[42rem] rounded-full bg-gold/10 blur-[120px]"
      />

      <div className="container-x grid flex-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <motion.div style={reduce ? undefined : { y: textY, opacity: fade }} className="lg:col-span-7">
          <p
            className="enter mb-8 inline-flex items-center gap-3 rounded-full border border-line-strong bg-surface/50 py-2 pr-4 pl-3 font-mono text-[0.7rem] tracking-[0.16em] uppercase backdrop-blur"
            style={{ "--d": "0.1s" } as CSSProperties}
          >
            <span className="pulse-dot size-2 rounded-full bg-emerald-400 text-emerald-400" aria-hidden />
            {hero.status}
            <span className="hidden xl:inline">· {person.region}</span>
          </p>

          <p
            className="enter font-display text-[clamp(1.4rem,2.6vw,2.1rem)] leading-snug font-light"
            style={{ "--d": "0.2s" } as CSSProperties}
          >
            {ui.hero.iAm} <strong className="font-normal">{person.fullName}</strong>, <RotatingRole roles={person.roleShort} />
          </p>

          <h1
            id="hero-title"
            className="font-display mt-4 text-[clamp(3.6rem,10.5vw,9.5rem)] leading-[0.92] font-light"
          >
            <span className="sr-only">
              {person.fullName}, {person.role}:{" "}
            </span>
            {[hero.tagline[0], hero.tagline[1], <em key="v">{hero.tagline[2]}</em>].map((line, i) => (
              <span key={i} className="line-mask">
                <span className="line-up" style={{ "--d": `${0.3 + i * 0.12}s` } as CSSProperties}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="enter mt-10 max-w-md text-lg text-muted" style={{ "--d": "0.7s" } as CSSProperties}>
            {hero.intro}
          </p>
          <div className="enter mt-8 flex flex-wrap items-center gap-3" style={{ "--d": "0.85s" } as CSSProperties}>
            <Button href={hero.primaryCta.href} download={cv.fileName} icon={<Download className="size-4" />}>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="ghost" icon={<ArrowDown className="size-4" />}>
              {hero.secondaryCta.label}
            </Button>
          </div>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { y: portraitY }}
          className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:max-w-none lg:pl-8"
        >
          <div className="portrait-in">
            <TiltCard max={7} className="rounded-[2rem]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line-strong bg-surface">
                <Image
                  src={person.portrait}
                  alt={person.portraitAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 36vw"
                  className="object-cover object-top"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#071426]/95 via-[#071426]/40 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 text-[#f5f1e8]" style={{ transform: "translateZ(40px)" }}>
                  <p className="font-display text-3xl">{person.fullName}</p>
                  <p className="mt-1 font-mono text-[0.68rem] tracking-[0.2em] text-[#d5b579] uppercase">
                    {ui.hero.caption}
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>
          <div
            aria-hidden
            className="absolute -inset-3 -z-10 rounded-[2.4rem] border border-line-strong lg:left-5"
          />
          <Star aria-hidden className="spin-slow absolute -top-8 -left-4 size-16 text-gold lg:left-2 lg:size-20" />
          <p
            aria-hidden
            className="absolute top-8 -right-8 hidden font-mono text-[0.62rem] tracking-[0.3em] text-muted uppercase [writing-mode:vertical-rl] xl:block"
          >
            {ui.hero.side}
          </p>
        </motion.div>
      </div>

      <div className="container-x mt-12 flex items-center justify-between font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase">
        <span className="hidden sm:inline">{hero.footnote}</span>
        <a href="#over" className="group inline-flex items-center gap-3 hover:text-gold">
          <span className="relative h-10 w-px overflow-hidden bg-line-strong">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-gold" />
          </span>
          {ui.hero.scroll}
        </a>
        <span>{ui.hero.index}</span>
      </div>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
