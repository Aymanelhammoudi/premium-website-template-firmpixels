"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";
import { Star } from "../ui/Icons";
import { useReducedMotion } from "../ui/motion";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** Grote kinetische tekstband die sneller gaat (en kantelt) als je sneller scrolt. */
export function VelocityBand({ words, baseVelocity = -2 }: { words: string[]; baseVelocity?: number }) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(smooth, [-1500, 0, 1500], [-8, 0, 8]);
  const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(1);
  const box = useRef<HTMLDivElement>(null);
  // Alleen animeren als de band in beeld is: scheelt veel rekenwerk op telefoons.
  const inView = useInView(box, { margin: "200px 0px" });

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    base.set(base.get() + move);
  });

  const row = (
    <>
      {words.map((w, i) => (
        <span key={i} className="flex items-center gap-10 pr-10">
          <span className={i % 2 ? "accent italic text-gold" : ""}>{w}</span>
          <Star className="size-[0.5em] shrink-0 text-gold" />
        </span>
      ))}
    </>
  );

  return (
    <div ref={box} aria-hidden className="overflow-hidden border-y border-line py-6 select-none md:py-10">
      <motion.div
        style={reduce ? undefined : { x, skewX: skew }}
        className="font-display flex w-max text-[clamp(3rem,9vw,8rem)] leading-none font-light whitespace-nowrap"
      >
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
