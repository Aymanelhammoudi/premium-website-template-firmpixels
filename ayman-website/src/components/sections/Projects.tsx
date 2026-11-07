"use client";

import Image from "next/image";
import { AnimatePresence, motion} from "framer-motion";
import { useState } from "react";
import type { Site } from "@content";
import { ArrowUpRight } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { TiltCard } from "../ui/TiltCard";
import { EASE, useReducedMotion } from "../ui/motion";

export function Projects({ projects, projectsIntro, ui, heading = true }: { projects: Site["projects"]; projectsIntro: Site["projectsIntro"]; ui: Pick<Site["ui"], "projects">; heading?: boolean }) {
  const ALL = ui.projects.all;
  const reduce = useReducedMotion();
  const visible = projects.filter((p) => p.published);
  const categories = [ALL, ...Array.from(new Set(visible.map((p) => p.category)))];
  const [cat, setCat] = useState(ALL);
  const items = visible.filter((p) => cat === ALL || p.category === cat);

  const H = heading ? "h3" : "h2";

  const filters = (
            <div role="group" aria-label={ui.projects.filterAria} className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={cat === c}
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                    cat === c
                      ? "border-ink bg-ink text-bg"
                      : "border-line-strong text-muted hover:border-ink hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
  );

  return (
    <section id="werk" {...(heading ? { "aria-labelledby": "werk-title" } : { "aria-label": projectsIntro.label })} className={`relative ${heading ? "py-24 md:py-32" : "py-16 md:py-24"}`}>
      <div className="container-x">
        {heading ? (
        <SectionHeading
          aside={filters}
          label={projectsIntro.label}
          id="werk-title"
          title={projectsIntro.title}
          accent={projectsIntro.titleAccent}
          intro={projectsIntro.intro}
        />
        ) : (
          <div className="flex justify-end">{filters}</div>
        )}

        <motion.ul layout className={`${heading ? "mt-20" : "mt-10"} grid gap-10 md:grid-cols-2 md:gap-8`}>
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <motion.li
                layout
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
                className={i % 2 === 1 ? "md:mt-32" : ""}
              >
                <article className="group">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor={ui.projects.cursor}
                    className="block"
                  >
                    <span className="sr-only">
                      {p.name} — {ui.projects.visit}
                    </span>
                    <TiltCard max={5} className="rounded-3xl">
                      <div className="overflow-hidden rounded-3xl border border-line-strong bg-surface shadow-[0_40px_80px_-40px_rgb(0_0_0/0.5)]">
                        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                          <span aria-hidden className="flex gap-1.5">
                            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                            <span className="size-2.5 rounded-full bg-[#febc2e]" />
                            <span className="size-2.5 rounded-full bg-[#28c840]" />
                          </span>
                          <span aria-hidden className="flex-1 truncate rounded-full bg-bg/60 px-3 py-1 text-center font-mono text-[0.68rem] text-muted">
                            {p.domain}
                          </span>
                          <ArrowUpRight className="size-4 text-muted transition-transform duration-500 group-hover:rotate-45" />
                        </div>
                        <div className="relative aspect-[1200/833] overflow-hidden">
                          {p.image && (
                            <Image
                              src={p.image}
                              alt=""
                              fill
                              sizes="(max-width: 768px) 92vw, 46vw"
                              className="object-cover object-top transition-transform duration-[1.6s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
                            />
                          )}
                          <div
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                          />
                        </div>
                      </div>
                    </TiltCard>
                  </a>
                  <div className="mt-6 flex flex-col-reverse gap-3 xl:flex-row xl:items-start xl:justify-between xl:gap-6">
                    <div>
                      <p className="font-mono text-[0.7rem] tracking-[0.16em] text-gold uppercase">
                        0{i + 1} — {p.category}
                      </p>
                      <H className="mt-2 text-3xl font-semibold tracking-tight">
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 hover:bg-[length:100%_1px]">
                          {p.name}
                          <span className="sr-only"> {ui.projects.newTab}</span>
                        </a>
                      </H>
                      <p className="mt-3 max-w-md text-muted">{p.description}</p>
                    </div>
                    <p className="pt-1 font-mono xl:shrink-0 xl:text-right text-[0.65rem] tracking-wider text-muted uppercase">
                      {p.checked}
                    </p>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <p className="mt-16 max-w-2xl text-xs text-muted">{projectsIntro.note}</p>

        {/* Werkwijze */}
        <div className="mt-28 rounded-3xl border border-line bg-surface/50 p-8 md:p-14">
          <div className="grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className="eyebrow mb-4">{ui.projects.process}</p>
              <H className="heading text-[clamp(2rem,3.6vw,3.2rem)] leading-tight">
                {projectsIntro.processTitle}
              </H>
            </Reveal>
            <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
              <p className="text-muted">{projectsIntro.processIntro}</p>
            </Reveal>
          </div>
          <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
            <motion.span
              aria-hidden
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute top-5 right-0 left-0 hidden h-px origin-left bg-line-strong md:block"
            />
            {projectsIntro.process.map((step, i) => (
              <Reveal as="li" key={step} delay={0.1 + i * 0.05} className="relative">
                <span className="relative z-10 grid size-10 place-items-center rounded-full border border-line-strong bg-bg font-mono text-xs">
                  0{i + 1}
                </span>
                <p className="mt-5 text-lg">{step}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
