"use client";

import { Print } from "@/components/ui/Icons";

export function PrintButton({ label, className }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className ?? "inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm transition-colors hover:border-ink"}
    >
      <Print className="size-4" />
      {label}
    </button>
  );
}
