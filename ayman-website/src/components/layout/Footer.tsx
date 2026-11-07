"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { footer, nav, person } from "@content/site";
import { ArrowUp, Instagram, Linkedin, Mail } from "../ui/Icons";

function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("nl-NL", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Amsterdam",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time || "--:--"}</span>;
}

export function Footer() {
  const pathname = usePathname();
  const prefix = pathname === "/" ? "" : "/";
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line bg-bg-2 no-print">
      <div className="container-x grid gap-12 pt-20 pb-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-3xl leading-tight">
            {footer.motto[0]}
            <br />
            <em className="accent">{footer.motto[1]}</em>
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a
              href={`mailto:${person.email}`}
              aria-label="Stuur een e-mail"
              className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:border-gold hover:text-gold"
            >
              <Mail className="size-5" />
            </a>
            {person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (nieuw tabblad)"
                className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:border-gold hover:text-gold"
              >
                <Linkedin className="size-5" />
              </a>
            )}
            {person.instagram && (
              <a
                href={person.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (nieuw tabblad)"
                className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:border-gold hover:text-gold"
              >
                <Instagram className="size-5" />
              </a>
            )}
          </div>
        </div>
        <nav aria-label="Footernavigatie" className="md:col-span-4">
          <p className="eyebrow mb-4">Navigatie</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`${prefix}#${n.id}`} className="text-muted transition-colors hover:text-gold">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/ervaring/" className="text-muted transition-colors hover:text-gold">
                Alle ervaring
              </Link>
            </li>
            <li>
              <Link href="/cv/" className="text-muted transition-colors hover:text-gold">
                Online cv
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex flex-col items-start gap-6 md:col-span-3 md:items-end">
          <p className="font-mono text-xs tracking-widest text-muted uppercase md:text-right">
            {person.region}
            <br />
            <span className="text-ink">
              <LocalTime />
            </span>{" "}
            lokale tijd
          </p>
          <button
            type="button"
            onClick={() => (window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
          >
            Terug naar boven
            <span className="grid size-9 place-items-center rounded-full border border-line-strong transition-transform duration-500 group-hover:-translate-y-1">
              <ArrowUp className="size-4" />
            </span>
          </button>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none h-[15vw] overflow-hidden select-none">
        {/* Decoratief woordmerk als SVG (geen leestekst) */}
        <motion.svg style={{ y }} viewBox="0 0 1000 170" className="block w-full" role="presentation">
          <text
            x="500"
            y="150"
            textAnchor="middle"
            className="font-display"
            style={{ fontSize: 196, fontWeight: 300, letterSpacing: "-0.06em", fill: "color-mix(in srgb, var(--ink) 7%, transparent)" }}
          >
            El Hammoudi<tspan style={{ fill: "color-mix(in srgb, var(--gold) 45%, transparent)" }}>.</tspan>
          </text>
        </motion.svg>
      </div>

      <div className="relative z-10 container-x flex flex-col gap-2 border-t border-line py-6 font-mono text-[0.7rem] tracking-wider text-muted uppercase md:flex-row md:justify-between">
        <span>
          © {year} {person.fullName}
        </span>
        <span>{footer.disclaimer}</span>
      </div>
    </footer>
  );
}
