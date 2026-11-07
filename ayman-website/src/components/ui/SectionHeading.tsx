import type { ReactNode } from "react";
import { Reveal, RevealLines } from "./Reveal";

/** Sectiekop: label, tweekleurige titel (inkt + gedempt) en intro. */
export function SectionHeading({
  label,
  title,
  accent,
  intro,
  id,
  aside,
  level = "h2",
  align = "split",
}: {
  index?: string;
  label: string;
  title: string;
  accent?: string;
  intro?: string;
  id?: string;
  aside?: ReactNode;
  level?: "h1" | "h2";
  align?: "split" | "stack";
}) {
  const H = level;
  return (
    <div className={align === "split" ? "grid gap-8 md:grid-cols-12 md:items-end" : "max-w-3xl"}>
      <div className={align === "split" ? "md:col-span-7" : ""}>
        <Reveal y={8}>
          <p className="eyebrow mb-5 inline-flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full bg-gold" />
            {label}
          </p>
        </Reveal>
        <H id={id} className="heading text-[clamp(2.1rem,4.4vw,3.75rem)]">
          <RevealLines lines={[title, ...(accent ? [<em key="a">{accent}</em>] : [])]} />
        </H>
      </div>
      {(intro || aside) && (
        <div className={align === "split" ? "flex flex-col gap-6 md:col-span-5 md:items-end md:text-right" : "mt-6 flex flex-col gap-6"}>
          {intro && (
            <Reveal delay={0.1} y={8}>
              <p className={`max-w-md text-lg text-muted ${align === "split" ? "md:ml-auto" : ""}`}>{intro}</p>
            </Reveal>
          )}
          {aside}
        </div>
      )}
    </div>
  );
}
