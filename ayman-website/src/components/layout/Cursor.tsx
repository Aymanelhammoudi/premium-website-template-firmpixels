"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Gouden cursor-ring die meebeweegt, groeit boven links en een label
 * toont boven elementen met data-cursor="Label". Alleen bij een muis.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<{ hover: boolean; label: string; down: boolean }>({
    hover: false,
    label: "",
    down: false,
  });
  const pathname = usePathname();
  // Na een paginawissel staat de muis vaak niet meer op een link: label resetten.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setState((s) => ({ ...s, hover: false, label: "" }));
  }
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea, label, summary",
      );
      const label = t?.dataset.cursor && t.dataset.cursor !== "hover" ? t.dataset.cursor : "";
      setState((s) => (s.hover === !!t && s.label === label ? s : { ...s, hover: !!t, label }));
    };
    const down = () => setState((s) => ({ ...s, down: true }));
    const up = () => setState((s) => ({ ...s, down: false }));
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = state.label ? 96 : state.hover ? 56 : 28;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] no-print">
      <motion.div className="fixed top-0 left-0 size-1.5 -translate-1/2 rounded-full bg-gold" style={{ x, y }} />
      <motion.div
        className="fixed top-0 left-0 grid place-items-center rounded-full border border-gold/70 backdrop-blur-[1px]"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          backgroundColor: state.label ? "var(--gold)" : "rgba(0,0,0,0)",
          scale: state.down ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <AnimatePresence>
          {state.label && (
            <motion.span
              key={state.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[10px] tracking-[0.18em] text-on-gold uppercase"
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
