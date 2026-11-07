"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Site } from "@content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { EASE } from "../ui/motion";

export function Skills({ certificates, education, person, skillGroups, skillsIntro, ui }: { certificates: Site["certificates"]; education: Site["education"]; person: Site["person"]; skillGroups: Site["skillGroups"]; skillsIntro: Site["skillsIntro"]; ui: Pick<Site["ui"], "skills"> }) {
  const t = ui.skills;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = skillGroups[active];

  const onKey = (e: KeyboardEvent) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + skillGroups.length) % skillGroups.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="vaardigheden" aria-labelledby="skills-title" className="bg-bg-2 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="06"
          label={t.label}
          id="skills-title"
          title={skillsIntro.title}
          accent={skillsIntro.titleAccent}
          intro={skillsIntro.intro}
        />

        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <div role="tablist" aria-label={t.tabsAria} aria-orientation="vertical" className="flex flex-col gap-2 lg:col-span-4">
            {skillGroups.map((g, i) => {
              const sel = i === active;
              return (
                <button
                  key={g.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${g.id}`}
                  aria-selected={sel}
                  aria-controls={`panel-${g.id}`}
                  tabIndex={sel ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onKey}
                  className={`group relative flex items-center justify-between overflow-hidden rounded-2xl border px-6 py-5 text-left transition-colors duration-500 ${
                    sel ? "border-gold text-on-gold" : "border-line-strong hover:border-gold"
                  }`}
                >
                  {sel && (
                    <motion.span
                      layoutId="skill-tab"
                      className="absolute inset-0 -z-0 bg-gold"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative">
                    <span className={`block font-mono text-[0.68rem] tracking-[0.16em] uppercase ${sel ? "" : "text-gold"}`}>
                      0{i + 1} / {t.expertise}
                    </span>
                    <span className="font-display mt-1 block text-2xl">{g.title}</span>
                  </span>
                  <span aria-hidden className={`relative transition-transform duration-500 ${sel ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[22rem] rounded-[2rem] border border-line bg-surface/60 p-8 md:p-12 lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={group.id}
                role="tabpanel"
                id={`panel-${group.id}`}
                aria-labelledby={`tab-${group.id}`}
                tabIndex={0}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-snug font-light">{group.intro}</p>
                <ul className="mt-10 flex flex-wrap gap-3">
                  {group.skills.map((s, i) => (
                    <motion.li
                      key={s}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 260, damping: 20 }}
                      whileHover={{ y: -4, rotate: i % 2 ? 2 : -2 }}
                      className="cursor-default rounded-full border border-line-strong bg-bg px-5 py-2.5 text-base transition-colors hover:border-gold hover:text-gold"
                    >
                      {s}
                    </motion.li>
                  ))}
                </ul>
                <p className="mt-10 border-t border-line pt-6 text-sm text-muted">
                  <span className="eyebrow mr-3">{t.practice}</span>
                  {group.practice}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Opleiding, talen, certificaten */}
        <div className="mt-20 grid gap-5 md:grid-cols-3">
          <Reveal className="rounded-3xl border border-line p-8">
            <h3 className="eyebrow mb-6">{t.education}</h3>
            <ul className="space-y-4">
              {education.map((e) => (
                <li key={e.title}>
                  <p className="font-display text-2xl">{e.title}</p>
                  <p className="text-muted">
                    {e.school}
                    {e.period && ` · ${e.period}`}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="rounded-3xl border border-line p-8" delay={0.1}>
            <h3 className="eyebrow mb-6">{t.languages}</h3>
            <ul className="space-y-2">
              {person.languages.map((l) => (
                <li key={l} className="font-display text-2xl">
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="rounded-3xl border border-line p-8" delay={0.2}>
            <h3 className="eyebrow mb-6">{t.tools}</h3>
            <ul className="flex flex-wrap gap-2">
              {["bol-partnerplatform", "Amazon Seller Central", "Shopify", "WordPress"].map((t) => (
                <li key={t} className="rounded-full bg-gold/10 px-4 py-1.5 text-gold">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          {certificates.length > 0 && (
            <Reveal className="rounded-3xl border border-line p-8 md:col-span-3">
              <h3 className="eyebrow mb-6">{t.certificates}</h3>
              <ul className="grid gap-4 md:grid-cols-3">
                {certificates.map((c) => (
                  <li key={c.title}>
                    <p className="font-display text-xl">{c.title}</p>
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
