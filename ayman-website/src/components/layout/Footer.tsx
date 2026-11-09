"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PAGES, base, localeFromPath, locales, switchPath } from "@content/routes";
import type { Chrome } from "@content";
import { ArrowUp, Linkedin, Mail, Phone } from "../ui/Icons";

function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("nl-NL", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Amsterdam" });
    const tick = () => setTime(fmt.format(new Date()));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 15_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return (
    <time className="tabular-nums" suppressHydrationWarning>
      {time || "--:--"}
    </time>
  );
}

export function Footer({ chrome }: { chrome: Chrome }) {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const { footer, nav, person, ui } = chrome[locale];
  const year = new Date().getFullYear();
  const link = "text-muted transition-colors duration-200 hover:text-ink";

  return (
    <footer lang={locale} className="border-t border-line bg-bg-2 no-print">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href={base(locale)} className="inline-flex items-center gap-3">
            <span aria-hidden className="grid size-9 place-items-center rounded-lg bg-ink text-[0.95rem] leading-none font-semibold tracking-tight text-bg">
              ae
            </span>
            <span className="font-semibold tracking-tight">{person.fullName}</span>
          </Link>
          <p className="mt-5 max-w-xs text-muted">
            {footer.motto[0]} {footer.motto[1]}
          </p>
        </div>

        <nav aria-label={ui.footer.nav} className="md:col-span-3 md:col-start-6">
          <h2 className="eyebrow mb-4">{ui.nav2.groupPages}</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <li>
              <Link href={PAGES.home[locale]} className={link}>
                {ui.nav2.home}
              </Link>
            </li>
            {nav.map((n) => (
              <li key={n.key}>
                <Link href={PAGES[n.key][locale]} className={link}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={PAGES.contact[locale]} className={link}>
                {ui.nav2.contact}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-2">
          <h2 className="eyebrow mb-4">{ui.nav2.contact}</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${person.email}`} className={`inline-flex items-center gap-2 ${link}`}>
                <Mail className="size-4" />
                {ui.footer.emailAria}
              </a>
            </li>
            <li>
              <a href={`tel:${person.phoneHref}`} className={`inline-flex items-center gap-2 whitespace-nowrap ${link}`}>
                <Phone className="size-4" />
                {person.phoneDisplay}
              </a>
            </li>
            {person.linkedin && (
              <li>
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 ${link}`}>
                  <Linkedin className="size-4" />
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-5 md:col-span-2 md:items-end">
          <div role="group" aria-label={ui.header.langSwitch} className="flex rounded-full border border-line-strong p-0.5 font-mono text-[0.65rem] tracking-[0.12em] uppercase">
            {locales.map((l) => (
              <Link
                key={l}
                href={switchPath(pathname, l)}
                hrefLang={l}
                aria-current={l === locale ? "true" : undefined}
                className={`grid h-8 min-w-9 place-items-center rounded-full px-2 ${l === locale ? "bg-ink text-bg" : "text-muted hover:text-ink"}`}
              >
                {l}
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted md:text-right">
            {person.region} · <LocalTime /> {ui.footer.localTime}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            {ui.footer.backToTop}
            <span className="grid size-8 place-items-center rounded-full border border-line-strong transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp className="size-3.5" />
            </span>
          </button>
        </div>
      </div>
      <div aria-hidden className="container-x overflow-hidden pt-2 [container-type:inline-size]">
        <p className="wordmark select-none">
          {[...person.fullName].map((ch, i) => (
            <span key={i} style={{ "--i": i } as CSSProperties}>
              {ch === " " ? "\u00a0" : ch}
            </span>
          ))}
        </p>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
        <span>
          © {year} {person.fullName}
        </span>
        <span>{footer.disclaimer}</span>
      </div>
    </footer>
  );
}
