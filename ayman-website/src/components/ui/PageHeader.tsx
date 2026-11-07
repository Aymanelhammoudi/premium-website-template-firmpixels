import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export type Crumb = { label: string; href?: string };

/** Kop van een subpagina: kruimelpad, label, tweekleurige h1 en intro. */
export function PageHeader({
  crumbs,
  crumbsLabel,
  eyebrow,
  title,
  accent,
  intro,
  aside,
  children,
}: {
  crumbs: Crumb[];
  crumbsLabel: string;
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line pt-12 pb-16 md:pt-16 md:pb-20">
      <div aria-hidden className="dot-grid absolute inset-0 -z-10" />
      <div className="container-x">
        <nav aria-label={crumbsLabel}>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
            {crumbs.map((c, i) => (
              <li key={i} className="inline-flex items-center gap-1.5">
                {i > 0 && <span aria-hidden className="text-line-strong">/</span>}
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="enter eyebrow mb-5 inline-flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-gold" />
              {eyebrow}
            </p>
            <h1 className="heading text-[clamp(2.5rem,6vw,4.75rem)]">
              {[title, ...(accent ? [<em key="a">{accent}</em>] : [])].map((line, i) => (
                <span key={i} className="line-mask">
                  <span className="line-up" style={d(0.05 + i * 0.06)}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            {intro && (
              <p className="enter mt-6 max-w-2xl text-lg text-muted md:text-xl" style={d(0.15)}>
                {intro}
              </p>
            )}
          </div>
          {aside && <div className="enter lg:col-span-4" style={d(0.2)}>{aside}</div>}
        </div>
        {children}
      </div>
    </header>
  );
}
