import type { Site } from "@content";

/** Kaartje met beschikbaarheid, regio en directe contactgegevens. */
export function Availability({ person, ui }: { person: Site["person"]; ui: Pick<Site["ui"], "availability"> }) {
  const a = ui.availability;
  const rows = [
    { k: a.region, v: person.region },
    { k: a.email, v: <a href={`mailto:${person.email}`} className="underline-offset-4 hover:underline">{person.email}</a> },
    { k: a.phone, v: <a href={`tel:${person.phoneHref}`} className="whitespace-nowrap underline-offset-4 hover:underline">{person.phoneDisplay}</a> },
    { k: a.languages, v: person.languages.join(" · ") },
  ];
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <p className="flex items-center gap-2.5 text-sm font-medium">
        <span className="relative flex size-2" aria-hidden>
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:animate-none" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        {a.title}
      </p>
      <p className="mt-3 text-muted">{a.text}</p>
      <dl className="mt-5 divide-y divide-line border-t border-line text-sm">
        {rows.map((r) => (
          <div key={r.k} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="text-muted">{r.k}</dt>
            <dd className="min-w-0 truncate text-right">{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
