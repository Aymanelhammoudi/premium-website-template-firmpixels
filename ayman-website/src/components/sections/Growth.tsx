"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { growth } from "@content/site";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Spotlight } from "../ui/Spotlight";
import { EASE } from "../ui/motion";

const views = [
  { id: "bring", label: "Wat ik meebreng" },
  { id: "goals", label: "Waar ik naartoe wil" },
] as const;

export function Growth() {
  const [view, setView] = useState<(typeof views)[number]["id"]>("bring");
  const list = view === "bring" ? growth.bring : growth.goals;

  return (
    <section id="ambitie" aria-labelledby="ambitie-title" className="py-28 md:py-40">
      <div className="container-x">
        <SectionHeading
          index="07"
          label="Ontwikkeling & ambitie"
          id="ambitie-title"
          title={growth.title}
          accent={growth.titleAccent}
          intro={growth.intro}
          aside={
            <div role="group" aria-label="Kies een weergave" className="relative inline-flex rounded-full border border-line-strong p-1">
              {views.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  aria-pressed={view === v.id}
                  onClick={() => setView(v.id)}
                  className={`relative z-10 rounded-full px-5 py-2.5 text-sm transition-colors duration-300 ${
                    view === v.id ? "text-on-gold" : "text-muted hover:text-ink"
                  }`}
                >
                  {view === v.id && (
                    <motion.span
                      layoutId="growth-toggle"
                      className="absolute inset-0 -z-10 rounded-full bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {v.label}
                </button>
              ))}
            </div>
          }
        />

        <div className="mt-16 min-h-[20rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.ol
              key={view}
              className={`grid gap-5 ${view === "bring" ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
            >
              {list.map((item, i) => (
                <motion.li
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 30, rotateX: -20 },
                    show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: EASE } },
                  }}
                  style={{ transformPerspective: 800 }}
                >
                  <Spotlight className="h-full rounded-3xl border border-line bg-surface/60 p-8">
                    <span className="font-display text-5xl font-light text-gold">0{i + 1}</span>
                    <h3 className="font-display mt-8 text-2xl">{item.title}</h3>
                    <p className="mt-3 text-muted">{item.text}</p>
                  </Spotlight>
                </motion.li>
              ))}
            </motion.ol>
          </AnimatePresence>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <p className="eyebrow mb-4">Wat mij drijft</p>
            <p className="font-display text-2xl leading-snug font-light md:text-3xl">{growth.drive}</p>
          </Reveal>
          <Reveal className="md:col-span-5 md:col-start-8" delay={0.1}>
            <p className="eyebrow mb-4">Wat ik zoek</p>
            <p className="text-muted">{growth.seeking}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {growth.seekingTags.map((t) => (
                <li key={t} className="rounded-full border border-gold/50 px-4 py-1.5 text-sm text-gold">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
