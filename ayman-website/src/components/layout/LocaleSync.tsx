"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { localeFromPath, type Locale } from "@content/routes";

/** Houdt <html lang> gelijk aan de taal van de pagina en toont de skiplink in die taal. */
export function LocaleSync({ skip }: { skip: Record<Locale, string> }) {
  const locale = localeFromPath(usePathname());
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return (
    <a
      href="#main"
      className="sr-only-focusable fixed top-3 left-3 z-[80] rounded-full bg-gold px-5 py-3 text-on-gold"
    >
      {skip[locale]}
    </a>
  );
}
