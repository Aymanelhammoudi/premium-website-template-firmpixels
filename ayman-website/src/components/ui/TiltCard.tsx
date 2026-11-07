"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { useReducedMotion } from "./motion";

/** 3D-kantelende kaart met glans-reflectie die de muis volgt. */
export function TiltCard({
  children,
  className,
  max = 3,
  glare = false,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 150, damping: 18 });
  const sy = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const gx = useTransform(sx, (v) => `${v * 100}%`);
  const gy = useTransform(sy, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgb(255 255 255 / 0.28), transparent 55%)`;

  const onMove = (e: PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="[perspective:1200px]">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group/tilt relative ${className ?? ""}`}
      >
        {children}
        {glare && !reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover/tilt:opacity-100"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
}
