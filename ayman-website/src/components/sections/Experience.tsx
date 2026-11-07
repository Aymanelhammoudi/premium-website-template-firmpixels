"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useRef, useState, ViewTransition } from "react";
import { routes, type Locale } from "@content/routes";
import type { Experience as Exp, Site } from "@content";
import { ArrowRight, Plus } from "../ui/Icons";
import { BrandMark } from "../ui/BrandMark";
import { Reveal } from "../ui/Reveal";
import { EASE, useReducedMotion } from "../ui/motion";

type Filter = string;

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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
      transition={{ duration: 0.4, ease: EASE, delay: index * 0.04 }}
      data-group={item.group}
      className="relative pl-10 md:pl-16"
      onPointerEnter={() => onHover(item)}
      onPointerLeave={() => onHover(null)}
    >
      {/* Knooppunt op de tijdlijn */}
      <span aria-hidden className="absolute top-9 left-[7px] md:left-[23px]">
        <span
          className={`block size-[11px] rounded-full border-2 ${
            item.current ? "pulse-dot border-gold bg-gold text-gold" : "border-line-strong bg-bg"
          }`}
        />
      </span>
      <div
        className={`rounded-2xl border transition-colors duration-[var(--dur-base)] ${
          open ? "border-line-strong bg-surface" : "border-transparent hover:bg-surface/60"
        }`}
      >
        <h2>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            data-exp={item.id}
            onClick={onToggle}
            data-cursor={open ? ui.overview.close : ui.overview.open}
            className="grid w-full grid-cols-[1fr_auto] items-center gap-4 p-5 text-left md:grid-cols-[10rem_1fr_auto] md:gap-8 md:p-7"
          >
            <span className="col-span-2 flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.16em] text-muted uppercase md:col-span-1">
              {item.period}
              {item.current && (
                <span className="rounded-full border border-line-strong px-2 py-0.5 text-[0.6rem] text-ink">{ui.tracks.current}</span>
              )}
            </span>
            <span className="flex items-center gap-4">
              <ViewTransition name={`brand-${item.id}`} share="morph" default="none">
                <span className="hidden size-12 shrink-0 place-items-center rounded-xl border border-line bg-bg sm:grid">
                  <BrandMark item={item} size={item.logo ? 28 : 26} />
                </span>
              </ViewTransition>
              <span>
                <span className="block text-[clamp(1.35rem,2.4vw,1.9rem)] leading-tight font-semibold tracking-tight">
                  {item.company}
                </span>
                <span className="block text-sm text-muted">
                  {item.role} · {item.sector}
                </span>
              </span>
            </span>
            <span
              aria-hidden
              className={`grid size-10 place-items-center rounded-full border border-line-strong transition-[transform,background-color,color] duration-[var(--dur-base)] ${
                open ? "rotate-45 border-ink bg-ink text-bg" : ""
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
              transition={{ duration: 0.4, ease: EASE }}
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
                          <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-line-strong" />
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 rounded-xl border-l-2 border-gold bg-bg p-4">
                      <h3 className="eyebrow mb-1">{ui.overview.says}</h3>
                      <p className="text-sm">{item.value}</p>
                    </div>
                    <Link
                      href={routes.experience(locale, item.id)}
                      className="group mt-6 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
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

export function Experience({ locale, filters, showThread = true, experience, experienceIntro, ui }: { locale: Locale; filters: { id: string; label: string }[]; showThread?: boolean; experience: Site["experience"]; experienceIntro: Site["experienceIntro"]; ui: Pick<Site["ui"], "overview" | "tracks"> }) {
  const o = ui.overview;
  const [filter, setFilter] = useState<Filter>("alles");
  const [openId, setOpenId] = useState<string | null>(experience[0].id);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  const items = experience.filter((e) => filter === "alles" || e.group === filter);

  return (
    <section id="tijdlijn" aria-label={o.label} className="py-16 md:py-24">
      <div className="container-x">
        {showThread && (
        <Reveal className="mb-16 md:grid md:grid-cols-12">
          <blockquote className="border-l-2 border-gold pl-6 md:col-span-7 md:col-start-4">
            <p className="eyebrow mb-3">{o.thread}</p>
            <p className="font-display text-2xl leading-snug font-light md:text-3xl">{experienceIntro.thread}</p>
          </blockquote>
        </Reveal>
        )}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label={o.filterAria} className="no-scrollbar flex max-w-full gap-1 self-start overflow-x-auto rounded-full border border-line p-1">
            {filters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  data-filter={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`relative shrink-0 rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                    active ? "text-bg" : "text-muted hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="exp-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-ink"
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

        <div ref={listRef} className="relative mt-10">
          {/* tijdlijn die zich tekent tijdens het scrollen */}
          <span aria-hidden className="absolute top-0 bottom-0 left-[12px] w-px bg-line md:left-[28px]" />
          <motion.span
            aria-hidden
            style={{ scaleY: reduce ? 1 : lineScale }}
            className="absolute top-0 bottom-0 left-[12px] w-px origin-top bg-gradient-to-b from-ink via-line-strong to-transparent md:left-[28px]"
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
                  onHover={() => {}}
                  locale={locale}
                  ui={ui}
                />
              ))}
            </AnimatePresence>
          </motion.ol>

        </div>

        <p className="mt-10 max-w-2xl text-xs text-muted">{experienceIntro.note}</p>
      </div>
    </section>
  );
}
