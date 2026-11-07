"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "./motion";

function Word({ word, range, progress, accent }: { word: string; range: [number, number]; progress: MotionValue<number>; accent: boolean }) {
  // Ook "onverlicht" blijft de tekst leesbaar (≥ 3:1 contrast voor grote tekst).
  const opacity = useTransform(progress, range, [accent ? 0.8 : 0.55, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className={`inline-block ${accent ? "accent italic text-gold" : ""}`}>
      {word}&nbsp;
    </motion.span>
  );
}

/** Tekst die woord voor woord "oplicht" terwijl je scrolt. Woorden in *sterretjes* worden goud. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const tokens = text.split(" ");
  const clean = text.replace(/\*/g, "");

  if (reduce) {
    return <p className={className}>{clean}</p>;
  }

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{clean}</span>
      <span aria-hidden>
        {tokens.map((t, i) => {
          const start = i / tokens.length;
          const accent = t.startsWith("*");
          return (
            <Word
              key={i}
              word={t.replace(/\*/g, "")}
              accent={accent}
              progress={scrollYProgress}
              range={[start, start + 1 / tokens.length]}
            />
          );
        })}
      </span>
    </p>
  );
}
