"use client";

import { useState } from "react";
import type { Site } from "@content";
import { Check, Copy } from "./Icons";

/** Deelt het profiel (native deelmenu op mobiel) of kopieert de link. */
export function ShareButton({ person, ui }: { person: Site["person"]; ui: Pick<Site["ui"], "share"> }) {
  const [done, setDone] = useState(false);
  const share = async () => {
    const data = { title: `${person.fullName} — ${person.role}`, url: person.siteUrl };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(data.url);
      setDone(true);
      setTimeout(() => setDone(false), 2200);
    } catch {
      /* geannuleerd door gebruiker */
    }
  };
  return (
    <button
      type="button"
      onClick={share}
      data-share
      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
    >
      {done ? <Check className="size-4 text-gold" /> : <Copy className="size-4" />}
      <span aria-live="polite">{done ? ui.share.done : ui.share.idle}</span>
    </button>
  );
}
