import type { ReactNode, AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
};

/** Zakelijke knop: duidelijke vorm, rustige hover met tekst-roll, ingedrukt-gevoel. */
export function Button({ children, variant = "primary", icon, className, ...rest }: Props) {
  const styles =
    variant === "primary"
      ? "btn-shine bg-ink text-bg shadow-[0_10px_30px_-12px_rgb(7_20_38/0.6)] hover:bg-gold hover:text-on-gold"
      : "border border-line-strong text-ink hover:border-ink";
  return (
    <a
      {...(variant === "primary" ? { "data-magnetic": "" } : {})}
      {...rest}
      className={`group relative inline-flex h-11 items-center gap-2.5 overflow-hidden rounded-full px-5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] ${styles} ${className ?? ""}`}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0">
          {children}
        </span>
      </span>
      {icon && <span className="grid size-4 place-items-center transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </a>
  );
}
