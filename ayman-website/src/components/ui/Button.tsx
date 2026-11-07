import type { ReactNode, AnchorHTMLAttributes } from "react";
import { Magnetic } from "./Magnetic";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
  icon?: ReactNode;
};

/**
 * Knop met magnetisch effect en een "roll"-animatie van de tekst bij hover.
 */
export function Button({ children, variant = "primary", icon, className, ...rest }: Props) {
  const styles =
    variant === "primary"
      ? "bg-gold text-on-gold hover:bg-gold-2"
      : "border border-line-strong text-ink hover:border-gold hover:text-gold";
  return (
    <Magnetic strength={0.25}>
      <a
        {...rest}
        data-cursor="hover"
        className={`group relative inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 ${styles} ${className ?? ""}`}
      >
        <span className="relative block overflow-hidden">
          <span className="block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-full">
            {children}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0"
          >
            {children}
          </span>
        </span>
        {icon && (
          <span className="grid size-5 place-items-center transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:rotate-45">
            {icon}
          </span>
        )}
      </a>
    </Magnetic>
  );
}
