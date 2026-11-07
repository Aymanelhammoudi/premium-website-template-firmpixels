import Image from "next/image";
import type { Experience } from "@content";
import { Bag, Browser, Door, Key, PhoneBig, Sofa, SunBig, Swap } from "./Icons";

const icons = {
  phone: PhoneBig,
  key: Key,
  door: Door,
  bag: Bag,
  sofa: Sofa,
  sun: SunBig,
  swap: Swap,
  browser: Browser,
};

type Mark = Pick<Experience, "logo" | "wordmark" | "icon" | "company">;

/**
 * Toont het logo van een ervaring: een logobestand, een tekstlogo (bol, amazon)
 * of een lijnicoon voor anonieme/eigen ondernemingen.
 */
export function BrandMark({ item, size = 44, className }: { item: Mark; size?: number; className?: string }) {
  if (item.logo) {
    return (
      <Image
        src={item.logo}
        alt=""
        width={size}
        height={size}
        className={`object-contain ${className ?? ""}`}
        style={{ width: size, height: size }}
      />
    );
  }
  if (item.wordmark) {
    return (
      <span
        aria-hidden
        className={`font-sans leading-none font-bold tracking-[-0.06em] text-ink ${className ?? ""}`}
        style={{
          fontSize: `min(${size * (item.wordmark.length > 4 ? 0.34 : 0.58)}px, ${item.wordmark.length > 4 ? 20 : 30}cqw)`,
        }}
      >
        {item.wordmark}
        <span className="text-gold">.</span>
      </span>
    );
  }
  const Icon = item.icon ? icons[item.icon] : null;
  if (Icon) return <Icon className={`text-gold ${className ?? ""}`} style={{ width: size, height: size }} />;
  return (
    <span aria-hidden className={`font-display text-gold italic ${className ?? ""}`} style={{ fontSize: size * 0.5 }}>
      {item.company.slice(0, 2)}
    </span>
  );
}
