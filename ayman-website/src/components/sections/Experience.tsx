"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
} from "framer-motion";
import { useRef, useState, type PointerEvent } from "react";
import { routes, type Locale } from "@content/routes";
import type { Experience as Exp, Site, Track } from "@content";
import { ArrowRight, Plus } from "../ui/Icons";
import { BrandMark } from "../ui/BrandMark";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { EASE, useReducedMotion } from "../ui/motion";

type Filter = "alles" | Track;

function Row({
  item,
  index,
  open,
  onToggle,
  onHover,
  locale,
  ui,
}: {
  locale: Locale;
  ui: Pick<Site["ui"], "overview" | "tracks">;
  item: Exp;
  index: number;
  open: boolean;
  onToggle: () => void;
  onHover: (item: Exp | null) => void;
}) {
  const panelId = `exp-${item.id}`;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.04 }}
      className="relative pl-10 md:pl-16"
      onPointerEnter={() => onHover(item)}
      onPointerLeave={() => onHover(null)}
    >
      {/* Knooppunt op de tijdlijn */}
      <span aria-hidden className="absolute top-9 left-[7px] md:left-[23px]">
        <span
          className={`block size-[11px] rounded-full border-2 border-gold ${
            item.current ? "pulse-dot bg-gold text-gold" : "bg-bg"
          }`}
        />
      </span>
      <div
        className={`rounded-3xl border transition-colors duration-500 ${
          open ? "border-line-strong bg-surface/70" : "border-transparent hover:bg-surface/40"
        }`}
      >
        <h2>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={onToggle}
            data-cursor={open ? ui.overview.close : ui.overview.open}
            className="grid w-full grid-cols-[1fr_auto] items-center gap-4 p-5 text-left md:grid-cols-[10rem_1fr_auto] md:gap-8 md:p-7"
          >
            <span className="col-span-2 flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.16em] text-gold uppercase md:col-span-1">
              {item.period}
              {item.current && (
                <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[0.6rem] text-gold">{ui.tracks.current}</span>
              )}
            </span>
            <span className="flex items-center gap-4">
              <span className="hidden size-12 shrink-0 place-items-center rounded-xl border border-line bg-bg sm:grid">
                <BrandMark item={item} size={item.logo ? 28 : 26} />
              </span>
              <span>
                <span className="font-display block text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">
                  {item.company}
                </span>
                <span className="block text-sm text-muted">
                  {item.role} · {item.sector}
                </span>
              </span>
            </span>
            <span
              aria-hidden
              className={`grid size-11 place-items-center rounded-full border border-line-strong transition-all duration-500 ${
                open ? "rotate-45 bg-gold text-on-gold" : ""
              }`}
            >
              <Plus className="size-5" />
            </span>
          </button>
        </h2>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              role="region"
              aria-label={`${item.company} — ${ui.overview.details}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="grid gap-8 px-5 pb-7 md:grid-cols-[10rem_1fr] md:gap-8 md:px-7 md:pb-9">
                <div className="hidden md:block" />
                <div className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <p className="text-lg">{item.summary}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <li key={t} className="rounded-full border border-line-strong px-3 py-1 text-xs text-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="eyebrow mb-3">{ui.overview.tasks}</h3>
                    <ul className="space-y-2 text-muted">
                      {item.tasks.map((t) => (
                        <li key={t} className="flex gap-3">
                          <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-gold" />
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 rounded-2xl border-l-2 border-gold bg-gold/5 p-4">
                      <h3 className="eyebrow mb-1">{ui.overview.says}</h3>
                      <p className="text-sm">{item.value}</p>
                    </div>
                    <Link
                      href={routes.experience(locale, item.id)}
                      className="group mt-6 inline-flex items-center gap-2 text-sm text-gold"
                    >
                      {ui.overview.full}
                      <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}

export function Experience({ locale, experience, experienceIntro, ui }: { locale: Locale; experience: Site["experience"]; experienceIntro: Site["experienceIntro"]; ui: Pick<Site["ui"], "overview" | "tracks"> }) {
  const o = ui.overview;
  const [filter, setFilter] = useState<Filter>("alles");
  const [openId, setOpenId] = useState<string | null>(experience[0].id);
  const [hovered, setHovered] = useState<Exp | null>(null);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  // zwevend logo dat de muis volgt (desktop)
  const fx = useMotionValue(0);
  const fy = useMotionValue(0);
  const sfx = useSpring(fx, { stiffness: 220, damping: 22 });
  const sfy = useSpring(fy, { stiffness: 220, damping: 22 });
  const onMove = (e: PointerEvent) => {
    if (!listRef.current || e.pointerType !== "mouse") return;
    const r = listRef.current.getBoundingClientRect();
    fx.set(e.clientX - r.left + 24);
    fy.set(e.clientY - r.top - 40);
  };

  const items = experience.filter((e) => filter === "alles" || e.track === filter);

  return (
    <section id="tijdlijn" aria-labelledby="tijdlijn-title" className="pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="container-x">
        <SectionHeading
          index="—"
          label={o.label}
          id="tijdlijn-title"
          title={o.title}
          accent={o.accent}
          intro={o.intro}
          level="h1"
        />

        <Reveal className="mt-16 md:grid md:grid-cols-12">
          <blockquote className="border-l-2 border-gold pl-6 md:col-span-7 md:col-start-4">
            <p className="eyebrow mb-3">{o.thread}</p>
            <p className="font-display text-2xl leading-snug font-light md:text-3xl">{experienceIntro.thread}</p>
          </blockquote>
        </Reveal>

        <div className="mt-20 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label={o.filterAria} className="flex flex-wrap gap-1 rounded-full border border-line p-1">
            {experienceIntro.filters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    active ? "text-on-gold" : "text-muted hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="exp-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {f.label}
                </button>
              );
            })}
          </div>
          <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase" aria-live="polite">
            {items.length} {items.length === 1 ? o.one : o.many}
          </p>
        </div>

        <div ref={listRef} onPointerMove={onMove} className="relative mt-10">
          {/* tijdlijn die zich tekent tijdens het scrollen */}
          <span aria-hidden className="absolute top-0 bottom-0 left-[12px] w-px bg-line md:left-[28px]" />
          <motion.span
            aria-hidden
            style={{ scaleY: reduce ? 1 : lineScale }}
            className="absolute top-0 bottom-0 left-[12px] w-px origin-top bg-gradient-to-b from-gold via-gold to-transparent md:left-[28px]"
          />
          <motion.ol layout className="space-y-2">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <Row
                  key={item.id}
                  item={item}
                  index={i}
                  open={openId === item.id}
                  onToggle={() => setOpenId((o) => (o === item.id ? null : item.id))}
                  onHover={setHovered}
                  locale={locale}
                  ui={ui}
                />
              ))}
            </AnimatePresence>
          </motion.ol>

          {!reduce && (
            <motion.div
              aria-hidden
              style={{ x: sfx, y: sfy }}
              className="pointer-events-none absolute top-0 left-0 z-10 hidden lg:block"
            >
              <AnimatePresence>
                {hovered && openId !== hovered.id && (
                  <motion.div
                    key={hovered.id}
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="grid size-24 place-items-center rounded-3xl border border-line-strong bg-surface shadow-2xl"
                  >
                    <BrandMark item={hovered} size={hovered.logo ? 52 : 44} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        <p className="mt-10 max-w-2xl text-xs text-muted">{experienceIntro.note}</p>
      </div>
    </section>
  );
}
