import Image from "next/image";
import { employers } from "@content/site";

export function LogoMarquee() {
  const items = [...employers, ...employers, ...employers, ...employers];
  return (
    <section aria-label="Ervaring opgebouwd bij" className="border-y border-line bg-bg-2/60 py-8">
      <div className="container-x mb-5">
        <p className="eyebrow">Ervaring opgebouwd bij</p>
      </div>
      <div className="marquee overflow-hidden">
        <ul aria-hidden className="marquee-track flex w-max items-center gap-16 pr-16">
          {items.map((e, i) => (
            <li
              key={i}
              className="group flex items-center gap-4 opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
            >
              <Image src={e.logo} alt="" width={36} height={36} className="size-9" />
              <span className="font-display text-3xl whitespace-nowrap">{e.name}</span>
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
