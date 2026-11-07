# aymanzakelijk.nl — persoonlijke website van Ayman El Hammoudi

Persoonlijke cv- en portfoliosite. Next.js (App Router) + TypeScript + Tailwind CSS 4 +
Framer Motion + Lenis, volledig statisch geëxporteerd (`out/`).

## Snel starten

```bash
cd ayman-website
npm install
npm run dev        # http://localhost:3000
npm run build      # maakt de statische site in out/
npm run lint
```

## Teksten, foto's en projecten aanpassen

**Alle inhoud staat in één bestand: [`content/site.ts`](content/site.ts).** Je hoeft geen componenten aan te raken.

| Wat | Waar in `content/site.ts` |
|---|---|
| Naam, e-mail, telefoon, LinkedIn | `person` |
| Hero-tekst en knoppen | `hero` |
| Over mij, cijfers, principes | `about` |
| Werkervaring (tijdlijn) | `experience` — één blok per baan |
| Projecten | `projects` — zet `published: true` om een project te tonen |
| Vaardigheden | `skillGroups` |
| Opleiding / certificaten / testimonials | `education`, `certificates`, `testimonials` (leeg = verborgen) |

- **Foto vervangen:** zet een nieuwe foto (WebP, staand 4:5, ± 800×1000) in `public/images/` en pas `person.portrait` aan.
- **Project toevoegen:** screenshot (1200×833) in `public/images/projecten/`, kopieer een blok in `projects`, vul in, `published: true`.
- **Cv vervangen:** overschrijf `public/cv.pdf` (en eventueel `public/images/cv-preview.webp`).
- Regels met `[INVULLEN: …]` zijn nog niet bevestigd — zie `content/bron.md`.

## Online zetten op Vercel (met aymanzakelijk.nl)

1. Push deze repository naar GitHub.
2. Ga naar [vercel.com/new](https://vercel.com/new) → importeer de repository.
3. Zet **Root Directory** op `ayman-website`. Framework: Next.js (automatisch). Klik **Deploy**.
4. (Optioneel) **Settings → Environment Variables:** `NEXT_PUBLIC_FORM_ENDPOINT` = je Formspree-URL (zie `.env.example`), daarna opnieuw deployen.
5. **Settings → Domains** → voeg `aymanzakelijk.nl` en `www.aymanzakelijk.nl` toe. Vercel toont welke DNS-records
   je bij je domeinprovider moet zetten (meestal een `A`-record `76.76.21.21` voor het hoofddomein en een `CNAME`
   `cname.vercel-dns.com` voor `www`). Na een paar minuten tot uren is de site live met HTTPS.

> Let op: de huidige site staat op `noindex` (onvindbaar in Google). Deze nieuwe site is wél indexeerbaar,
> met sitemap, robots.txt, Open Graph-afbeelding en `Person`-structured data.

## Structuur

```
content/site.ts          ← alle teksten en data
content/bron.md          ← letterlijke broninhoud van de oude site + feitencheck
src/app/                 ← pagina's: / (onepager), /cv (ATS-cv), 404, sitemap, robots, OG-image
src/components/sections  ← Hero, About, Expertise, Experience, Projects, Skills, Growth, CvSection, Contact
src/components/layout    ← Header, Footer, Cursor, SmoothScroll, ScrollProgress, ThemeToggle
src/components/ui        ← Reveal, TiltCard, Magnetic, ScrollText, CountUp, Spotlight, Icons
```

## Interactie & effecten

Kopregels die uit een masker omhoog schuiven · lichtvlek die de muis volgt · 3D-kantelend portret en
cv met glans · magnetische knoppen met tekst-roll · gouden cursor met labels ("Bekijk", "Open") ·
woord-voor-woord oplichtende tekst bij scrollen · kinetische tekstband die reageert op scrollsnelheid ·
tijdlijn die zich tekent + zwevend werkgeverslogo · filters met glijdende pill · tabbladen met blur-overgang ·
thema-wissel met cirkel-onthulling · optellende cijfers · filmkorrel · parallax · smooth scroll.
Alles respecteert `prefers-reduced-motion` en werkt met toetsenbord.
