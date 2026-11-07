"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { nav, person } from "@content/site";
import { ThemeToggle } from "./ThemeToggle";
import { ArrowUpRight } from "../ui/Icons";
import { Magnetic } from "../ui/Magnetic";
import { EASE } from "../ui/motion";

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const prefix = onHome ? "" : "/";
  const [active, setActive] = useState<string>("");
  const routeActive = pathname.startsWith("/ervaring") ? "ervaring" : pathname.startsWith("/cv") ? "cv" : "";
  const current = onHome ? active : routeActive;
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Verberg bij naar beneden scrollen, toon bij omhoog scrollen.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev && !open);
  });

  // Actieve sectie bijhouden.
  useEffect(() => {
    if (!onHome) return;
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  // Menu: Escape sluit, scroll blokkeren.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 no-print"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-500 ${
            scrolled || open ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"
          }`}
        >
          <div className="container-x flex h-20 items-center justify-between gap-6">
            <Link
              href="/"
              className="group flex items-center gap-3"
              onClick={() => setOpen(false)}
            >
              <span
                aria-hidden
                className="font-display text-[2rem] leading-none italic transition-transform duration-500 group-hover:-rotate-6"
              >
                {person.initials}
                <span className="text-gold">.</span>
              </span>
              <span className="sr-only font-mono text-[0.68rem] leading-tight tracking-[0.18em] uppercase sm:not-sr-only sm:block">
                {person.firstName}
                <br />
                <span className="text-muted">{person.lastName}</span>
              </span>
            </Link>

            <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
              <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/40 p-1 backdrop-blur">
                {nav.map((n) => {
                  const isActive = current === n.id;
                  return (
                    <li key={n.id}>
                      <a
                        href={`${prefix}#${n.id}`}
                        aria-current={isActive ? "true" : undefined}
                        className={`relative block rounded-full px-4 py-2 text-sm transition-colors ${
                          isActive ? "text-on-gold" : "text-muted hover:text-ink"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-gold"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        {n.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Magnetic className="hidden md:inline-block">
                <a
                  href={`${prefix}#contact`}
                  data-cursor="hover"
                  className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-bg transition-colors hover:bg-gold hover:text-on-gold"
                >
                  Kennismaken
                  <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                </a>
              </Magnetic>
              <button
                type="button"
                className="relative grid size-11 place-items-center rounded-full border border-line-strong lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Menu sluiten" : "Menu openen"}
                onClick={() => setOpen((o) => !o)}
              >
                <span
                  className={`absolute h-px w-5 bg-ink transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[4px]"}`}
                />
                <span
                  className={`absolute h-px w-5 bg-ink transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[4px]"}`}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-bg pt-24 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav aria-label="Mobiele navigatie" className="container-x flex-1">
              <ul className="flex flex-col">
                {nav.map((n, i) => (
                  <li key={n.id} className="overflow-hidden border-b border-line">
                    <motion.a
                      href={`${prefix}#${n.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4 font-display text-[clamp(2.4rem,11vw,4rem)] leading-none"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ delay: 0.15 + i * 0.06, duration: 0.8, ease: EASE }}
                    >
                      {n.label}
                      <span className="font-mono text-xs text-gold">0{i + 1}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="container-x flex flex-col gap-1 py-8 text-sm text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a href={`mailto:${person.email}`} className="text-ink">
                {person.email}
              </a>
              <a href={`tel:${person.phoneHref}`}>{person.phoneDisplay}</a>
              <span>{person.region}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
