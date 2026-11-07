"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Site } from "@content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { EASE, useReducedMotion } from "../ui/motion";

export function Skills({ certificates, education, person, skillGroups, skillsIntro, ui, heading = true }: { certificates: Site["certificates"]; education: Site["education"]; person: Site["person"]; skillGroups: Site["skillGroups"]; skillsIntro: Site["skillsIntro"]; ui: Pick<Site["ui"], "skills">; heading?: boolean }) {
  const t = ui.skills;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const group = skillGroups[active];
  const H = heading ? "h3" : "h2";

  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next: number | null = null;
    if (e.key in keys) next = (active + keys[e.key] + skillGroups.length) % skillGroups.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = skillGroups.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      id="vaardigheden"
      {...(heading ? { "aria-labelledby": "skills-title" } : { "aria-label": t.label })}
      className={heading ? "bg-bg-2 py-24 md:py-32" : "py-16 md:py-24"}
    >
      <div className="container-x">
        {heading && (
          <SectionHeading
            label={t.label}
            id="skills-title"
            title={skillsIntro.title}
            accent={skillsIntro.titleAccent}
            intro={skillsIntro.intro}
          />
        )}

        <div className={heading ? "mt-16" : ""}>
          <div
            role="tablist"
            aria-label={t.tabsAria}
            className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto border-b border-line px-5 sm:mx-0 sm:px-0"
          >
            {skillGroups.map((g, i) => {
              const sel = i === active;
              return (
                <button
                  key={g.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${g.id}`}
                  aria-selected={sel}
                  aria-controls={`panel-${g.id}`}
                  tabIndex={sel ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onKey}
                  className={`relative shrink-0 px-4 pt-2 pb-4 text-left text-sm font-medium whitespace-nowrap transition-colors duration-[var(--dur-base)] md:text-base ${
                    sel ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  <span className="mr-2 font-mono text-[0.7rem] text-muted">0{i + 1}</span>
                  {g.title}
                  {sel && (
                    <motion.span
                      layoutId="skill-tab"
                      aria-hidden
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gold"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative mt-8 min-h-[20rem] rounded-2xl border border-line bg-surface p-7 md:p-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={group.id}
                role="tabpanel"
                id={`panel-${group.id}`}
                aria-labelledby={`tab-${group.id}`}
                tabIndex={0}
                className="grid gap-10 outline-none lg:grid-cols-12"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <div className="lg:col-span-5">
                  <p className="eyebrow mb-4">{t.expertise} · 0{active + 1}</p>
                  <p className="text-[clamp(1.4rem,2.4vw,2rem)] leading-snug font-semibold tracking-tight">{group.intro}</p>
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((s, i) => (
                      <motion.li
                        key={s}
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 + i * 0.04, duration: 0.25, ease: EASE }}
                        className="rounded-full border border-line-strong bg-bg px-4 py-2 text-sm transition-colors duration-[var(--dur-fast)] hover:border-ink"
                      >
                        {s}
                      </motion.li>
                    ))}
                  </ul>
                  <p className="mt-8 border-t border-line pt-6 text-sm text-muted">
                    <span className="eyebrow mb-2 block">{t.practice}</span>
                    {group.practice}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Opleiding, talen, certificaten */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <Reveal className="rounded-3xl border border-line p-8">
            <H className="eyebrow mb-6">{t.education}</H>
            <ul className="space-y-4">
              {education.map((e) => (
                <li key={e.title}>
                  <p className="font-semibold tracking-tight text-2xl">{e.title}</p>
                  <p className="text-muted">
                    {e.school}
                    {e.period && ` · ${e.period}`}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="rounded-3xl border border-line p-8" delay={0.1}>
            <H className="eyebrow mb-6">{t.languages}</H>
            <ul className="space-y-2">
              {person.languages.map((l) => (
                <li key={l} className="font-semibold tracking-tight text-2xl">
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="rounded-3xl border border-line p-8" delay={0.2}>
            <H className="eyebrow mb-6">{t.tools}</H>
            <ul className="flex flex-wrap gap-2">
              {["bol-partnerplatform", "Amazon Seller Central", "Shopify", "WordPress"].map((t) => (
                <li key={t} className="rounded-full border border-line-strong px-4 py-1.5 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          {certificates.length > 0 && (
            <Reveal className="rounded-3xl border border-line p-8 md:col-span-3">
              <H className="eyebrow mb-6">{t.certificates}</H>
              <ul className="grid gap-4 md:grid-cols-3">
                {certificates.map((c) => (
                  <li key={c.title}>
                    <p className="font-semibold tracking-tight text-xl">{c.title}</p>
                    <p className="text-sm text-muted">
                      {c.issuer} · {c.year}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
