import type { CSSProperties } from "react";

/**
 * Tekst die woord voor woord oplicht terwijl je scrolt — in pure CSS (scroll-driven animations).
 * Browsers zonder ondersteuning tonen de tekst gewoon volledig. Regels na de eerste krijgen nadruk.
 */
export function ScrollWords({ lines, emphasis = "last" }: { lines: string[]; emphasis?: "last" | "none" }) {
  const words = lines.flatMap((l, li) => l.split(" ").filter(Boolean).map((w) => ({ w, li })));
  const n = Math.max(1, words.length - 1);
  return (
    <span className="sw-root">
      {words.map(({ w, li }, i) => (
        <span
          key={i}
          className={`sw ${emphasis === "last" && li === lines.length - 1 && lines.length > 1 ? "font-normal" : ""}`}
          style={{ "--p": (i / n).toFixed(3) } as CSSProperties}
        >
          {w}{" "}
        </span>
      ))}
    </span>
  );
}
