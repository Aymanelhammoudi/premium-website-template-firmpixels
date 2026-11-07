import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowUpRight = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const ArrowDown = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);
export const ArrowUp = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);
export const Download = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);
export const Copy = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h8" />
  </svg>
);
export const Check = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="m5 12 5 5 9-10" />
  </svg>
);
export const Plus = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);
export const Pin = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const Sun = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
export const Moon = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </svg>
);
export const Print = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M7 9V3h10v6M7 18H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="7" y="14" width="10" height="7" />
  </svg>
);
export const Linkedin = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
  </svg>
);
export const Instagram = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5v.01" />
  </svg>
);
export const Chat = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} strokeWidth={1.2} {...p}>
    <path d="M8 10h24a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H18l-7 6v-6H8a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4Z" />
    <path d="M36 18h4a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-2v5l-6-5h-8a4 4 0 0 1-4-4" />
    <path d="M12 18h16M12 23h10" />
  </svg>
);
export const Handshake = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} strokeWidth={1.2} {...p}>
    <path d="M4 14h7l6 14-4 3H4M44 14h-7l-6 14 4 3h9" />
    <path d="M17 28l7 6a2.5 2.5 0 0 0 3.5-3.5M24 25l6 5.5a2.5 2.5 0 0 0 3.5-3.5L26 20l-4 3a3 3 0 0 1-4-4.5L23 14h8" />
  </svg>
);
export const Browser = (p: P) => (
  <svg viewBox="0 0 48 48" {...base} strokeWidth={1.2} {...p}>
    <rect x="4" y="8" width="40" height="32" rx="4" />
    <path d="M4 16h40M9 12h.01M13 12h.01M17 12h.01" />
    <path d="M10 22h14v12H10zM29 22h9M29 27h9M29 32h6" />
  </svg>
);
export const Star = (p: P) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden {...p}>
    <path d="M50 0v100M0 50h100M15 15l70 70M15 85l70-70" />
  </svg>
);
