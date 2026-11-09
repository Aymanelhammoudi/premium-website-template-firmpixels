import { Button } from "@/components/ui/Button";
import { ArrowRight, Search } from "@/components/ui/Icons";
import { SearchButton } from "@/components/ui/SearchButton";

/** 404: tweetalig, met het levende puntenveld en drie duidelijke uitwegen. */
export default function NotFound() {
  return (
    <section data-depth-root className="relative isolate flex min-h-[80svh] items-center overflow-hidden border-b border-line">
      <canvas data-dotfield aria-hidden className="pointer-events-none absolute inset-0 -z-10 size-full" />
      <div aria-hidden className="aurora -top-40 right-[-10%] -z-10 size-[34rem] bg-gold/12" />
      <div className="container-x py-24">
        <p className="eyebrow mb-6 inline-flex items-center gap-2">
          <span aria-hidden className="size-1.5 rounded-full bg-gold" />
          404 · Pagina niet gevonden · <span lang="en">Page not found</span>
        </p>
        <h1 className="heading text-[clamp(3rem,9vw,7.5rem)]">
          <span className="line-mask">
            <span className="line-up">Deze pagina</span>
          </span>
          <span className="line-mask">
            <em className="line-up" style={{ animationDelay: "0.08s" }}>
              is niet beschikbaar.
            </em>
          </span>
        </h1>
        <p className="enter mt-8 max-w-md text-lg text-muted">
          De link klopt niet (meer). Geen probleem: zoek direct wat je nodig hebt of ga terug naar de homepage.
        </p>
        <p lang="en" className="enter mt-2 max-w-md text-sm text-muted">
          This link no longer works. Search for what you need or return to the homepage.
        </p>
        <div className="enter mt-10 flex flex-wrap gap-3">
          <Button href="/" icon={<ArrowRight className="size-4" />}>
            Naar de homepage
          </Button>
          <Button href="/ervaring/" variant="ghost">
            Bekijk mijn ervaring
          </Button>
          <SearchButton className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium transition-colors hover:border-ink">
            <Search className="size-4" />
            Zoeken
            <kbd className="rounded border border-line px-1.5 font-mono text-[0.65rem] text-muted">⌘K</kbd>
          </SearchButton>
        </div>
      </div>
    </section>
  );
}
