import Image from "next/image";
import { employers } from "@content/site";

export function LogoMarquee() {
  const items = [...employers, ...employers, ...employers, ...employers];
  return (
    <section aria-label="Ervaring opgebouwd bij" className="border-y border-line bg-bg-2/60 py-8">
      <div className="container-x mb-5">
        <p className="eyebrow">Ervaring opgebouwd bij · verkocht voor · verkocht via</p>
      </div>
      <div className="marquee overflow-hidden">
        <ul aria-hidden className="marquee-track flex w-max items-center gap-16 pr-16">
          {items.map((e, i) => (
            <li
              key={i}
              className="group flex items-center gap-4 opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
            >
              {e.logo ? (
                <Image src={e.logo} alt="" width={36} height={36} className="size-9 object-contain" />
              ) : (
                <span className="font-sans text-3xl font-bold tracking-[-0.06em]">
                  {e.wordmark}
                  <span className="text-gold">.</span>
                </span>
              )}
              {e.logo && <span className="font-display text-3xl whitespace-nowrap">{e.name}</span>}
            </li>
          ))}
        </ul>
      </div>
      <ul className="sr-only">
        {employers.map((e) => (
          <li key={e.name}>{e.name}</li>
        ))}
      </ul>
    </section>
  );
}
