"use client";

import Image from "next/image";
import { AnimatePresence, motion} from "framer-motion";
import { useMemo, useState } from "react";
import { projects, projectsIntro } from "@content/site";
import { ArrowUpRight } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { TiltCard } from "../ui/TiltCard";
import { EASE, useReducedMotion } from "../ui/motion";

export function Projects() {
  const reduce = useReducedMotion();
  const visible = projects.filter((p) => p.published);
  const categories = useMemo(() => ["Alles", ...Array.from(new Set(visible.map((p) => p.category)))], [visible]);
  const [cat, setCat] = useState("Alles");
  const items = visible.filter((p) => cat === "Alles" || p.category === cat);

  return (
    <section id="werk" aria-labelledby="werk-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="08"
          label={projectsIntro.label}
          id="werk-title"
          title={projectsIntro.title}
          accent={projectsIntro.titleAccent}
          intro={projectsIntro.intro}
          aside={
            <div role="group" aria-label="Filter projecten" className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={cat === c}
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                    cat === c
                      ? "border-gold bg-gold text-on-gold"
                      : "border-line-strong text-muted hover:border-gold hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          }
        />

        <motion.ul layout className="mt-20 grid gap-10 md:grid-cols-2 md:gap-8">
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <motion.li
                layout
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}
                className={i % 2 === 1 ? "md:mt-32" : ""}
              >
                <article className="group">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Bekijk"
                    aria-label={`${p.name} — bekijk website (opent in nieuw tabblad)`}
                    className="block"
                  >
                    <TiltCard max={5} className="rounded-3xl">
                      <div className="overflow-hidden rounded-3xl border border-line-strong bg-surface shadow-[0_40px_80px_-40px_rgb(0_0_0/0.5)]">
                        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                          <span aria-hidden className="flex gap-1.5">
                            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                            <span className="size-2.5 rounded-full bg-[#febc2e]" />
                            <span className="size-2.5 rounded-full bg-[#28c840]" />
                          </span>
                          <span className="flex-1 truncate rounded-full bg-bg/60 px-3 py-1 text-center font-mono text-[0.68rem] text-muted">
                            {p.domain}
                          </span>
                          <ArrowUpRight className="size-4 text-gold transition-transform duration-500 group-hover:rotate-45" />
                        </div>
                        <div className="relative aspect-[1200/833] overflow-hidden">
                          {p.image && (
                            <Image
                              src={p.image}
                              alt={`Websitepreview van ${p.name}`}
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
                      <h3 className="font-display mt-2 text-4xl">
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 hover:bg-[length:100%_1px]">
                          {p.name}
                          <span className="sr-only"> (opent in nieuw tabblad)</span>
                        </a>
                      </h3>
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
        <div className="mt-28 rounded-[2rem] border border-line bg-surface/50 p-8 md:p-14">
          <div className="grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className="eyebrow mb-4">Werkwijze</p>
              <h3 className="font-display text-[clamp(2rem,3.6vw,3.2rem)] leading-tight font-light">
                {projectsIntro.processTitle}
              </h3>
            </Reveal>
            <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
              <p className="text-muted">{projectsIntro.processIntro}</p>
            </Reveal>
          </div>
          <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            <motion.span
              aria-hidden
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: EASE }}
              className="absolute top-5 right-0 left-0 hidden h-px origin-left bg-gold md:block"
            />
            {projectsIntro.process.map((step, i) => (
              <Reveal as="li" key={step} delay={0.2 + i * 0.15} className="relative">
                <span className="relative z-10 grid size-10 place-items-center rounded-full border border-gold bg-bg font-mono text-xs text-gold">
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
