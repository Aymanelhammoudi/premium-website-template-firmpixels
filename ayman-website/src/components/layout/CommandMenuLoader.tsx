"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Chrome } from "@content";

const load = () => import("./CommandMenu").then((m) => m.CommandMenu);
const CommandMenu = dynamic(load, { ssr: false });

/**
 * Laadt het ⌘K-menu pas bij het eerste gebruik (sneltoets of zoekknop): minder JavaScript bij het openen
 * van een pagina. Bij hover over de zoekknop wordt het alvast opgehaald.
 */
export function CommandMenuLoader({ chrome }: { chrome: Chrome }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (active) return;
    const go = () => setActive(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        go();
      }
    };
    const warm = (e: Event) => {
      if ((e.target as Element | null)?.closest?.("[data-cmdk]")) void load();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmdk", go);
    document.addEventListener("pointerover", warm, { passive: true });
    document.addEventListener("focusin", warm);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmdk", go);
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("focusin", warm);
    };
  }, [active]);
  return active ? <CommandMenu chrome={chrome} defaultOpen /> : null;
}
