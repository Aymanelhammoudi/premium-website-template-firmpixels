"use client";

import { useEffect, useState } from "react";

/** Sticky inhoudsopgave die de sectie in beeld markeert. */
export function Toc({ label, items }: { label: string; items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} data-toc className="lg:sticky lg:top-28">
      <p className="eyebrow mb-4">{label}</p>
      <ol className="flex gap-2 overflow-x-auto border-line lg:flex-col lg:gap-0 lg:border-l no-scrollbar">
        {items.map((i) => {
          const on = active === i.id;
          return (
            <li key={i.id} className="shrink-0">
              <a
                href={`#${i.id}`}
                aria-current={on ? "location" : undefined}
                className={`block rounded-full border px-3 py-1.5 text-sm whitespace-nowrap transition-colors duration-[var(--dur-base)] lg:-ml-px lg:rounded-none lg:border-0 lg:border-l-2 lg:px-4 lg:py-2 ${
                  on ? "border-ink text-ink lg:border-gold" : "border-line text-muted hover:text-ink lg:border-transparent"
                }`}
              >
                {i.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
