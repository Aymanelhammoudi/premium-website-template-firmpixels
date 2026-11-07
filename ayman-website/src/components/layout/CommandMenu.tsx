"use client";

import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { localeFromPath } from "@content/routes";
import type { Chrome } from "@content";
import { ArrowUpRight, CornerDownLeft, Search } from "../ui/Icons";
import { EASE } from "../ui/motion";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** ⌘K / Ctrl+K: snel naar een pagina of ervaring springen. */
export function CommandMenu({ chrome }: { chrome: Chrome }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const { search, ui } = chrome[locale];
  const t = ui.nav2;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const returnFocus = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return search;
    return search.filter((i) => norm(`${i.label} ${i.sub}`).includes(q));
  }, [query, search]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmdk", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmdk", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    document.documentElement.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(id);
      document.documentElement.style.overflow = "";
      returnFocus.current?.focus?.();
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  };
  const go = (href: string) => {
    close();
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return close();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" && results[index]) {
      e.preventDefault();
      go(results[index].href);
    }
  };

  const groups = [
    { key: "pages", label: t.groupPages },
    { key: "experience", label: t.groupExperience },
  ] as const;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-[#071426]/50 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.searchLabel}
            lang={locale}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_40px_100px_-30px_rgb(0_0_0/0.6)]"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-4 shrink-0 text-muted" />
              <input
                ref={inputRef}
                id="cmdk-input"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                placeholder={t.searchHint}
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={results[index] ? `${listId}-${index}` : undefined}
                aria-autocomplete="list"
                className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.65rem] text-muted">Esc</kbd>
            </div>
            <ul id={listId} role="listbox" className="max-h-[min(60vh,26rem)] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-10 text-center text-sm text-muted">{t.empty}</li>}
              {groups.map((g) => {
                const items = results.map((r, i) => ({ r, i })).filter(({ r }) => r.group === g.key);
                if (!items.length) return null;
                return (
                  <li key={g.key} role="presentation">
                    <p className="px-3 pt-3 pb-1.5 font-mono text-[0.65rem] tracking-[0.14em] text-muted uppercase">{g.label}</p>
                    <ul role="presentation">
                      {items.map(({ r, i }) => (
                        <li
                          key={r.href}
                          id={`${listId}-${i}`}
                          role="option"
                          aria-selected={i === index}
                          onMouseMove={() => setIndex(i)}
                          onClick={() => go(r.href)}
                          className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 ${
                            i === index ? "bg-ink text-bg" : "text-ink"
                          }`}
                        >
                          <span className="min-w-0">
                            <span className="block truncate font-medium">{r.label}</span>
                            {r.sub && <span className={`block truncate text-xs ${i === index ? "opacity-70" : "text-muted"}`}>{r.sub}</span>}
                          </span>
                          {i === index ? <CornerDownLeft className="size-4 shrink-0" /> : <ArrowUpRight className="size-4 shrink-0 text-muted" />}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.65rem] text-muted">
              <span>↑ ↓ {t.navigate}</span>
              <span>↵ {t.open}</span>
              <button type="button" onClick={close} className="ml-auto rounded px-1.5 py-0.5 hover:text-ink">
                {t.close}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
