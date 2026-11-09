"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PAGES, base, localeFromPath, locales, pageFromPath, switchPath } from "@content/routes";
import type { Chrome } from "@content";
import { ThemeToggle } from "./ThemeToggle";
import { ArrowUpRight, Search } from "../ui/Icons";
import { EASE } from "../ui/motion";

/** Opent het ⌘K-menu (zie CommandMenu). */
export const openCommandMenu = () => window.dispatchEvent(new Event("open-cmdk"));

export function Header({ chrome }: { chrome: Chrome }) {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const { nav, person, ui, ventureIds } = chrome[locale];
  const active = pageFromPath(pathname, ventureIds);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu sluiten bij paginawissel; Escape sluit; scroll blokkeren.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        lang={locale}
        className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300 no-print ${
          scrolled || open ? "border-line bg-bg/80 backdrop-blur-xl" : "border-transparent bg-bg/0"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
          <Link href={base(locale)} className="group flex shrink-0 items-center gap-3">
            <span
              aria-hidden
              className="grid size-9 place-items-center rounded-lg bg-ink text-[0.95rem] leading-none font-semibold tracking-tight text-bg transition-transform duration-300 group-hover:-rotate-6"
            >
              ae
            </span>
            <span className="hidden text-sm leading-tight font-semibold tracking-tight whitespace-nowrap sm:block">
              {person.fullName}
              <span className="block text-xs font-normal text-muted">{person.region}</span>
            </span>
            <span className="sr-only sm:hidden">{person.fullName}</span>
            <span className="sr-only">, {ui.header.homeAria}</span>
          </Link>

          <nav aria-label={ui.header.navAria} className="hidden xl:block">
            <ul className="flex items-center gap-0.5 rounded-full border border-line bg-surface/60 p-1">
              {nav.map((n) => {
                const on = active === n.key;
                return (
                  <li key={n.key}>
                    <Link
                      href={PAGES[n.key][locale]}
                      aria-current={on ? "page" : undefined}
                      className={`relative isolate block rounded-full px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors duration-200 ${
                        on ? "text-bg" : "text-muted hover:text-ink"
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full bg-ink"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCommandMenu}
              data-cmdk
              aria-label={ui.nav2.searchLabel}
              className="group inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-3 text-sm text-muted transition-colors hover:border-ink hover:text-ink"
            >
              <Search className="size-4" />
              <span className="hidden 2xl:inline">{ui.nav2.search}</span>
              <kbd className="hidden rounded border border-line px-1.5 font-mono text-[0.65rem] 2xl:inline" suppressHydrationWarning>
                {isMac ? "⌘K" : "Ctrl K"}
              </kbd>
            </button>
            <div
              role="group"
              aria-label={ui.header.langSwitch}
              className="hidden items-center rounded-full border border-line-strong p-0.5 font-mono text-[0.65rem] tracking-[0.12em] uppercase sm:flex"
            >
              {locales.map((l) => (
                <Link
                  key={l}
                  href={switchPath(pathname, l)}
                  hrefLang={l}
                  lang={l}
                  aria-current={l === locale ? "true" : undefined}
                  className={`grid h-8 min-w-9 place-items-center rounded-full px-2 transition-colors duration-200 ${
                    l === locale ? "bg-ink text-bg" : "text-muted hover:text-ink"
                  }`}
                >
                  {l}
                </Link>
              ))}
            </div>
            <ThemeToggle toDark={ui.header.toDark} toLight={ui.header.toLight} className="size-10" />
            <Link
              href={PAGES.contact[locale]}
              aria-current={active === "contact" ? "page" : undefined}
              data-magnetic
              className="group hidden h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-medium text-bg transition-[background-color,transform] duration-200 hover:bg-gold hover:text-on-gold active:scale-[0.98] md:inline-flex"
            >
              {ui.nav2.contact}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
            <button
              type="button"
              className="relative grid size-10 place-items-center rounded-full border border-line-strong xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              data-menu-btn
              aria-label={open ? ui.header.menuClose : ui.header.menuOpen}
              onClick={() => setOpen((o) => !o)}
            >
              <span className={`absolute h-px w-4.5 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
              <span className={`absolute h-px w-4.5 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={ui.header.menu}
            lang={locale}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-bg pt-[calc(4.5rem+env(safe-area-inset-top,0px))] xl:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <nav aria-label={ui.header.mobileNavAria} className="container-x flex-1 py-6">
              <ul className="flex flex-col">
                {[...nav, { key: "contact" as const, label: ui.nav2.contact }].map((n, i) => (
                  <motion.li
                    key={n.key}
                    className="border-b border-line"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, duration: 0.4, ease: EASE }}
                  >
                    <Link
                      href={PAGES[n.key][locale]}
                      aria-current={active === n.key ? "page" : undefined}
                      className={`flex items-center justify-between py-4 text-2xl font-semibold tracking-tight ${active === n.key ? "text-ink" : "text-muted"}`}
                    >
                      {n.label}
                      <ArrowUpRight className="size-5 text-gold" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-sm text-muted">
              <span>
                <span className="block text-ink">{person.email}</span>
                {person.phoneDisplay}
              </span>
              <span className="flex gap-2">
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={switchPath(pathname, l)}
                    hrefLang={l}
                    className={`grid h-11 place-items-center rounded-full border px-4 font-mono text-xs tracking-[0.12em] uppercase ${
                      l === locale ? "border-ink bg-ink text-bg" : "border-line-strong text-ink"
                    }`}
                  >
                    {l === "nl" ? "Nederlands" : "English"}
                  </Link>
                ))}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
