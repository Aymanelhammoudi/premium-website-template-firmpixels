# aymanzakelijk.nl — persoonlijke website van Ayman El Hammoudi

Persoonlijke cv-site, gericht op toekomstige werkgevers en recruiters. Next.js (App Router) + TypeScript + Tailwind CSS 4 +
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
- **Cv-pdf bijwerken:** de pdf wordt gemaakt uit de online cv-pagina (`/cv`), dus met dezelfde gegevens als
  `content/site.ts`. Na een wijziging:
  ```bash
  npm run build
  npx serve out -l 4321                  # laat dit draaien in een tweede terminal
  npx -y playwright@1 install chromium   # alleen de eerste keer
  npm run cv:pdf                         # maakt public/cv.pdf en public/images/cv-preview.jpg
  npm run build                          # zet de nieuwe pdf in out/
  ```
  Liever je eigen pdf? Overschrijf dan gewoon `public/cv.pdf`.
- Regels met `[INVULLEN: …]` zijn nog niet bevestigd — zie `content/bron.md`.

## Online zetten zonder GitHub (aanbevolen)

1. `npm run build` → de map `out/` is je complete website (of gebruik `ayman-website-statisch.zip`).
2. Cloudflare-dashboard → **Workers & Pages → Create → Pages → Upload assets** → sleep de map `out` erin → **Deploy**.
3. **Custom domains** → voeg `aymanzakelijk.nl` en `www.aymanzakelijk.nl` toe.

Alternatief: sleep de map `out` naar https://app.netlify.com/drop.

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

## Ervaring: twee sporen, elk een eigen pagina

- Alle ervaring staat in `experience` in `content/site.ts`, verdeeld over `track: "sales"` en `track: "ondernemer"`.
- Elk onderdeel krijgt automatisch een eigen pagina op `/ervaring/<id>/`, plus een plek in de tijdlijn op `/ervaring/` en in het cv.
- Logo: zet `logo: "/images/logos/naam.svg"`, of gebruik `wordmark` (tekstlogo) of `icon` (lijnicoon).
  Heb je de officiële logo's van bol of Amazon? Zet ze in `public/images/logos/` en vervang `wordmark: "bol"` door `logo: "/images/logos/bol.svg"`.
- `featured: true` = brede tegel op de homepage. Houd per spoor het aantal tegels zo dat het raster netjes sluit.

## Interactie & effecten

Kopregels die uit een masker omhoog schuiven · lichtvlek die de muis volgt · 3D-kantelend portret en
cv met glans · magnetische knoppen met tekst-roll · gouden cursor met labels ("Bekijk", "Open") ·
woord-voor-woord oplichtende tekst bij scrollen · kinetische tekstband die reageert op scrollsnelheid ·
tijdlijn die zich tekent + zwevend werkgeverslogo · filters met glijdende pill · tabbladen met blur-overgang ·
thema-wissel met cirkel-onthulling · optellende cijfers · filmkorrel · parallax · smooth scroll.
Alles respecteert `prefers-reduced-motion` en werkt met toetsenbord.
