"use client";

import type { ReactNode, PointerEvent, ElementType } from "react";

/** Container die --mx/--my zet zodat de .spotlight-gloed de muis volgt. */
export function Spotlight({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Tag onPointerMove={onMove} className={`spotlight ${className ?? ""}`}>
      {children}
    </Tag>
  );
}
