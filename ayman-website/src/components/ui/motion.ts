import { useSyncExternalStore } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * "Minder beweging"-voorkeur van de bezoeker. Geeft tijdens server-render en
 * hydration `false` terug (zelfde HTML als de server) en daarna de echte waarde.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
