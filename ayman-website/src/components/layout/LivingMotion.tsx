"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { initLiving } from "@/lib/living";

/** Start de levende interacties (puntenveld, diepte, magneet, rail) na de eerste weergave en per pagina opnieuw. */
export function LivingMotion() {
  const pathname = usePathname();
  useEffect(() => {
    let cleanup = () => {};
    const run = () => {
      cleanup = initLiving(document);
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const id = w.requestIdleCallback ? w.requestIdleCallback(run, { timeout: 1200 }) : window.setTimeout(run, 300);
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else window.clearTimeout(id);
      cleanup();
    };
  }, [pathname]);
  return null;
}
