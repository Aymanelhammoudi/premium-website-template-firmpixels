import { expertise } from "@content/site";
import { ArrowUpRight, Browser, Chat, Handshake } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Spotlight } from "../ui/Spotlight";

const icons = { chat: Chat, handshake: Handshake, browser: Browser };

export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="05"
          label="Mijn sterke punten"
          id="expertise-title"
          title={expertise.title}
          accent={expertise.titleAccent}
          intro={expertise.intro}
        />
        <ul className="mt-20 grid gap-5 md:grid-cols-3">
          {expertise.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.title} delay={i * 0.12} className={i === 1 ? "md:translate-y-16" : ""}>
                <Spotlight className="group flex h-full flex-col rounded-3xl border border-line bg-surface/60 p-8 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-2 md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.7rem] tracking-[0.18em] text-gold uppercase">
                      0{i + 1} / {item.label}
                    </span>
                    <span className="grid size-16 place-items-center rounded-2xl border border-line-strong text-gold transition-all duration-700 group-hover:rotate-[-8deg] group-hover:bg-gold group-hover:text-on-gold">
                      <Icon className="size-9" />
                    </span>
                  </div>
                  <h3 className="font-display mt-16 text-[2.1rem] leading-tight">{item.title}</h3>
                  <p className="mt-4 flex-1 text-muted">{item.text}</p>
                  <a
                    href={item.link.href}
                    className="mt-10 inline-flex items-center gap-2 border-t border-line pt-6 text-sm text-ink transition-colors hover:text-gold"
                  >
                    {item.link.label}
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                  </a>
                </Spotlight>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
