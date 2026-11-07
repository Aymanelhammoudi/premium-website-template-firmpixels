import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden pt-24">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
      <div className="container-x">
        <p className="eyebrow mb-6">404 · Pagina niet gevonden</p>
        <h1 className="heading text-[clamp(3.2rem,10vw,9rem)]">
          Deze pagina
          <br />
          <em>is niet beschikbaar.</em>
        </h1>
        <p className="mt-8 max-w-md text-lg text-muted">
          De link klopt niet (meer). Geen probleem, op de homepage vind je alles over mij.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-gold px-6 font-medium text-on-gold transition-colors hover:bg-gold-2"
        >
          Terug naar de homepage
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
