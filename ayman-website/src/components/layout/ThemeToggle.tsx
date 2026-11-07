"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import { Moon, Sun } from "../ui/Icons";

type Theme = "dark" | "light";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

/** Wisselt licht/donker met een cirkel-onthulling vanaf de knop (View Transitions API). */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => null);

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (!doc.startViewTransition || reduce) return apply();
    const r = e.currentTarget.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
    const root = document.documentElement.style;
    root.setProperty("--vt-x", `${cx}px`);
    root.setProperty("--vt-y", `${cy}px`);
    root.setProperty("--vt-r", `${radius}px`);
    doc.startViewTransition(apply);
  };

  const label = theme === "light" ? "Schakel naar donkere modus" : "Schakel naar lichte modus";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`grid size-11 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-gold hover:text-gold ${className ?? ""}`}
    >
      <span className="relative block size-5">
        <Sun
          className={`absolute inset-0 size-5 transition-all duration-500 ${theme === "light" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
        />
        <Moon
          className={`absolute inset-0 size-5 transition-all duration-500 ${theme === "light" ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
        />
      </span>
    </button>
  );
}
