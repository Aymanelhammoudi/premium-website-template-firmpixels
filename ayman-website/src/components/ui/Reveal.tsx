"use client";

import { motion} from "framer-motion";
import type { ReactNode } from "react";
import { EASE, useReducedMotion } from "./motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article" | "section" | "p" | "span";
};

/** Laat een blok zacht invliegen zodra het in beeld komt. */
export function Reveal({ children, className, delay = 0, y = 12, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

type LinesProps = {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
};

/** Koppen die regel voor regel uit een masker omhoog schuiven. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.06,
}: LinesProps) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className={`block will-change-transform ${lineClassName ?? ""}`}
            variants={{
              hidden: { y: "105%" },
              show: { y: "0%", transition: { duration: 0.7, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
