import type { ReactNode } from "react";
import { RevealLines, Reveal } from "./Reveal";

/** Vaste sectiekop: nummer + label, grote titel met goud cursief accent, intro. */
export function SectionHeading({
  index,
  label,
  title,
  accent,
  intro,
  id,
  aside,
}: {
  index: string;
  label: string;
  title: string;
  accent?: string;
  intro?: string;
  id?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-6">
      <Reveal className="md:col-span-3">
        <p className="eyebrow flex items-center gap-4">
          <span>{index}</span>
          <span className="h-px w-10 bg-current opacity-50" aria-hidden />
          <span>{label}</span>
        </p>
      </Reveal>
      <div className="md:col-span-9">
        <h2 id={id} className="font-display text-[clamp(2.6rem,6.2vw,5.6rem)] leading-[0.98] font-light">
          <RevealLines lines={[title, ...(accent ? [<em key="a">{accent}</em>] : [])]} />
        </h2>
        {(intro || aside) && (
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {intro && (
              <Reveal delay={0.15}>
                <p className="max-w-xl text-lg text-muted">{intro}</p>
              </Reveal>
            )}
            {aside}
          </div>
        )}
      </div>
    </div>
  );
}
