import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@content/site";
import { BrandMark } from "./BrandMark";
import { ArrowUpRight } from "./Icons";
import { Spotlight } from "./Spotlight";

/** Klikbare tegel die naar de eigen pagina van een ervaring leidt. */
export function ExperienceTile({ item }: { item: Experience }) {
  return (
    <Link
      href={`/ervaring/${item.id}/`}
      data-cursor="Bekijk"
      className="group block h-full rounded-3xl focus-visible:outline-offset-4"
      aria-label={`${item.company}: ${item.role}. Bekijk wat ik deed`}
    >
      <Spotlight
        className={`relative flex h-full flex-col justify-between gap-5 overflow-hidden rounded-3xl border border-line bg-surface/60 p-5 transition-[transform,border-color,background-color] duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-1.5 group-hover:border-line-strong group-hover:bg-surface sm:gap-8 sm:p-6 md:p-7 ${
          item.featured ? "sm:min-h-[17rem]" : "sm:min-h-[14.5rem]"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-14 shrink-0 place-items-center sm:size-16 rounded-2xl border border-line bg-bg transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105 group-hover:-rotate-3">
            <BrandMark item={item} size={item.logo ? 34 : 30} />
          </span>
          <span className="flex items-center gap-2">
            {item.current && (
              <span className="rounded-full bg-gold/15 px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.16em] text-gold uppercase">
                Huidig
              </span>
            )}
            <span
              aria-hidden
              className="grid size-10 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-on-gold"
            >
              <ArrowUpRight className="size-4" />
            </span>
          </span>
        </div>

        <div>
          <p className="font-mono text-[0.66rem] tracking-[0.16em] text-gold uppercase">{item.period}</p>
          <h4 className="font-display mt-2 text-[1.7rem] leading-[1.05] sm:text-[1.9rem]">{item.company}</h4>
          <p className="mt-1 text-sm text-muted">{item.role}</p>
          {item.featured && <p className="mt-4 line-clamp-2 max-w-md text-sm text-muted max-sm:hidden">{item.summary}</p>}
          {item.brands && (
            <ul className="mt-4 flex items-center gap-2" aria-label="Verkochte merken">
              {item.brands.map((b) => (
                <li key={b.name} className="grid h-8 w-12 place-items-center rounded-lg bg-white/90 p-1" title={b.name}>
                  <Image src={b.logo} alt={b.name} width={40} height={24} className="h-5 w-auto object-contain" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Spotlight>
    </Link>
  );
}
