import type { ReactNode, AnchorHTMLAttributes } from "react";
import Link from "next/link";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
};

/** Zakelijke knop: duidelijke vorm, rustige hover met tekst-roll, ingedrukt-gevoel. */
export function Button({ children, variant = "primary", icon, className, href = "", ...rest }: Props) {
  // Interne pagina's via next/link (client-navigatie, view transitions en submap-voorvoegsel); bestanden en externe links blijven <a>.
  const internal = href.startsWith("/") && !/\.[a-z0-9]+$/i.test(href.split(/[?#]/)[0]);
  const Tag = internal ? Link : "a";
  const styles =
    variant === "primary"
      ? "btn-shine bg-ink text-bg shadow-[0_10px_30px_-12px_rgb(7_20_38/0.6)] hover:bg-gold hover:text-on-gold"
      : "border border-line-strong text-ink hover:border-ink";
  return (
    <Tag
      {...(variant === "primary" ? { "data-magnetic": "" } : {})}
      {...rest}
      href={href}
      className={`group relative inline-flex h-11 items-center gap-2.5 overflow-hidden rounded-full px-5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] ${styles} ${className ?? ""}`}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0">
          {children}
        </span>
      </span>
      {icon && <span className="grid size-4 place-items-center transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </Tag>
  );
}
