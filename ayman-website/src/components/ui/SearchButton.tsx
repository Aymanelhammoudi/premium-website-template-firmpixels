"use client";

import type { ReactNode } from "react";
import { openCommandMenu } from "../layout/Header";

/** Knop die het ⌘K-menu opent (bijvoorbeeld op de 404-pagina). */
export function SearchButton({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <button type="button" data-cmdk onClick={openCommandMenu} className={className}>
      {children}
    </button>
  );
}
