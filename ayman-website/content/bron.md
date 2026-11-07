# Bron — inhoud van www.aymanzakelijk.nl (opgehaald 6 november 2026)

Dit bestand is de **feitelijke bron** voor de nieuwe site. Alles op de nieuwe site komt hieruit,
of uit het Codex-projectpakket (`Ayman_El_Hammoudi_Compleet_Codex_Project.zip`) dat Ayman aanleverde.
Er is niets verzonnen. Onderaan staat de letterlijke tekst van alle 9 pagina's.

## Kerngegevens

| Veld | Waarde | Bron |
|---|---|---|
| Naam | Ayman El Hammoudi | site |
| Functietitel | Verkoopadviseur · Webdesigner | site (hero, JSON-LD) |
| Tagline | Mensen. Vertrouwen. Vooruitgang. | site (home h1) |
| Leeftijd | 23 jaar | site (over mij) |
| Regio | Noord-Holland (woonplaats Assendelft staat alleen in cv/zip — site noemt alleen regio) | site |
| E-mail | aymanae075@gmail.com | site |
| Telefoon | 06 1906 7349 (+31619067349) | site (cv, contact) |
| Talen | Nederlands en Engels | site (cv) |
| Opleiding | MBO Financiële Administratie — ROC TOP (afrondingsstatus nog te bevestigen, zie zip) | site (cv) |
| Social links | **geen** gevonden (geen LinkedIn/Instagram/GitHub op de site) | — |
| Testimonials | **geen** op de site | — |
| Certificaten / awards | **geen bevestigde**. Het grafische cv noemt awards; de zip markeert die als *niet geverifieerd* | zip FEITENCHECK |

## Werkervaring (7 rollen)
1. VodafoneZiggo — Verkoopadviseur — **juli 2025 – heden** — Telecomretail
2. Eigen onderneming — Websiteontwikkeling & webdesign — heden — Digitale dienstverlening
3. OPPO — Merkambassadeur — eerdere ervaring — Smartphones & merkactivatie
4. Direct sales — Deur-aan-deurverkoop · Telecom (Vodafone, KPN, Budget) — eerdere ervaring
5. Coop — Winkelmedewerker — eerdere ervaring — Supermarktretail
6. PLUS — Winkelmedewerker — eerdere ervaring — Supermarktretail
7. Picnic — Operationele werkzaamheden — eerdere ervaring — E-commerce operatie

Alleen VodafoneZiggo heeft een bevestigde periode. De site zegt zelf: *"Exacte periodes en functietitels
staan alleen vermeld waar ze zijn bevestigd."*

## Projecten
- Rijschool Rewald — https://www.rijschoolrewald.com/ — rijschool — preview `project-1.webp`
- Paardrijles Zaanstad — https://www.paardrijleszaanstad.nl/ — paardensport — preview `project-2.webp`
- (alleen in zip, niet op live site, betrokkenheid nog te bevestigen) Potter's Glory Designs — https://www.pottersglorydesigns.com/ ; PWA Manege — https://www.pwamanege.nl/

## Afbeeldingen (gedownload naar `public/images/`)
- `ayman-portret.webp` (800×1000) en `ayman-portret-480.webp` — zakelijk portret
- `projecten/rijschool-rewald.webp`, `projecten/paardrijles-zaanstad.webp` (1200×833) — echte websitescreenshots
- `logos/{vodafone,oppo,coop,plus,picnic}.svg` — werkgeverslogo's (alleen ter herkenning; site meldt "Niet gelieerd aan genoemde werkgevers")
- `cv-preview.webp` + `/cv.pdf` (= `CV_Ayman_El_Hammoudi_Vernieuwd.pdf`, identiek aan de zip-versie)
- Niet overgenomen: 4–5 AI-sfeerbeelden (kantoor, adviesruimte, werkplek, showroom). De site labelt ze zelf als
  "AI-sfeerbeeld · geen foto van …"; in een premium persoonlijke site voelen ze als stock, dus de nieuwe site
  werkt met typografie, het portret en echte projectscreenshots.

## Huidige stijl (analyse)
- **Kleuren:** midnight navy `#071426`, panel `#0c1c30`, warm goud `#d5b579`, ivoor `#f3efe7`, muted `#a9b5c3`.
- **Fonts:** Cormorant Garamond (serif koppen, cursief goud accent) + Manrope (body).
- **Sfeer:** editorial, "executive", rustig en verzorgd. Navy/goud/ivoor is ook de huisstijl van het cv en favicon.
- **Wat beter kan:**
  1. Inhoud is versnipperd over 9 losse pagina's; een recruiter moet veel klikken. → één sterke onepager + losse ATS-cv-pagina.
  2. Weinig interactie: alleen reveal-on-scroll en een accordion. → kinetische typografie, scroll-gestuurde effecten, tilt, magnetische knoppen, cursor, filters.
  3. AI-sfeerbeelden voegen niets persoonlijks toe. → vervangen door typografie en echte screenshots.
  4. `noindex` + `robots: Disallow /` → de site is onvindbaar in Google. (Nieuwe site is indexeerbaar; zie vragenlijst.)
  5. Geen light mode, geen social links, geen OG-afbeelding.

## Feitencheck uit het zip-pakket (bewust NIET op de site gezet)
- "4 jaar VodafoneZiggo" / "Sales Manager" — tegenstrijdig met contract (start juli 2025).
- Awards ("Beste Verkoopadviseur 2025", "Beste Telefonieverkoper", "Beste Winkelverkoop Amsterdam", "Beste OPPO telefoonverkoper", Disney-incentive) — niet geverifieerd.
- OPPO-periode, duur deur-aan-deurverkoop (3,5 jaar), Picnic-functietitel (orderpicker?) — onzeker.
- Geboortedatum, rijbewijs, woonplaats — privacy; niet nodig op de site.
- `sollicitatie/de-bommel/` + e-mailconcept — privé, niet opgenomen.

---

# Letterlijke paginatekst

## index.html

```text
Verkoopadviseur · Webdesigner
#h1 Mensen. / Vertrouwen. / Vooruitgang.
Ik ben Ayman El Hammoudi. / Een commerciële professional uit Noord-Holland met ervaring in klantadvies, retail, directe verkoop en zelfstandig webdesign.
[A cv.html] Bekijk mijn cv
[A werkervaring.html] Mijn werkervaring
✦
Werkzaam in Noord-Holland / Praktisch, leergierig en klantgericht.
[IMG assets/images/ayman-portret-800.webp | Zakelijk portret van Ayman El Hammoudi]
Persoonlijk. Professioneel. Ondernemend.
Ayman El Hammoudi
Retail · Sales · Webdesign
Profiel voor werkgevers en opdrachtgevers
[A #expertise] Bekijk mijn sterke punten ↓
01 / Profiel
Ervaring opgebouwd bij
[IMG assets/logos/vodafone.svg | Logo van VodafoneZiggo] VodafoneZiggo
[IMG assets/logos/oppo.svg | Logo van OPPO] OPPO
[IMG assets/logos/coop.svg | Logo van COOP] COOP
[IMG assets/logos/plus.svg | Logo van PLUS] PLUS
[IMG assets/logos/picnic.svg | Logo van Picnic] Picnic
01
In één oogopslag
#h2 Duidelijk in gesprek. / Sterk in uitvoering.
Mijn kracht ligt in de combinatie van contact leggen, behoeften begrijpen en verantwoordelijkheid nemen voor de volgende stap.
01 / COMMERCIE
#h3 Advies & verkoop
Ik luister gericht, vergelijk mogelijkheden en leg een oplossing begrijpelijk uit. Ervaring uit telecom, retail en directe verkoop.
[A werkervaring.html] Bekijk mijn loopbaan
02 / SAMENWERKING
◎
#h3 Contact & betrouwbaarheid
Ik communiceer helder, blijf professioneel bij vragen of bezwaren en kom afspraken na in klant- en teamcontact.
[A vaardigheden.html] Bekijk mijn sterke punten
03 / INITIATIEF
⌘
#h3 Webdesign & eigenaarschap
Ik werk ideeën zelfstandig uit tot een bruikbare website en begeleid de opdrachtgever van intake tot oplevering.
[A portfolio.html] Bekijk twee projecten
[IMG assets/images/sales-adviesruimte.webp | Illustratieve ruimte voor een persoonlijk adviesgesprek] AI-sfeerbeeld · geen werkplek of projectfoto
02
De persoon achter het werk
#h2 Goed advies / begint met / écht luisteren.
Ik wil begrijpen wat iemand nodig heeft. Daar begint voor mij een goed gesprek.
Die overtuiging neem ik mee in mijn werk bij VodafoneZiggo, mijn eerdere verkoopervaring en de websites die ik voor ondernemers maak.
[A over-mij.html] Meer over mij
03
Geselecteerd werk
#h2 Van een idee naar / een online visitekaartje.
Een selectie uit mijn werk als zelfstandig webdesigner.
[A portfolio.html] Alle projecten
[A https://www.rijschoolrewald.com/] ● ● ●
rijschoolrewald.com
[IMG assets/previews/project-1.webp | Websitepreview van Rijschool Rewald]
Bekijk website
Opent in een nieuw tabblad
rijschool
01
#h3  [A https://www.rijschoolrewald.com/] Rijschool Rewald
Rijschoolwebsite met informatie over lessen en mogelijkheden om contact op te nemen.
Websitepreview · november 2026
[A https://www.paardrijleszaanstad.nl/] ● ● ●
paardrijleszaanstad.nl
[IMG assets/previews/project-2.webp | Websitepreview van Paardrijles Zaanstad]
Bekijk website
Opent in een nieuw tabblad
paardensport
02
#h3  [A https://www.paardrijleszaanstad.nl/] Paardrijles Zaanstad
Een digitale presentatie van paardrijlessen in de Zaanstreek.
Websitepreview · november 2026
De volgende stap
#h2 Een goed gesprek. / Een nieuw begin.
Over sales, een nieuwe uitdaging of een website voor jouw onderneming. Ik maak graag kennis.
[A contact.html] Laten we kennismaken
[A mailto:aymanae075@gmail.com] aymanae075@gmail.com
```

## over-mij.html

```text
01
Over mij
#h1 Persoonlijk in contact. / Ondernemend van nature.
Een commerciële achtergrond, een nieuwsgierige blik en plezier in het helpen van mensen.
[IMG assets/images/ayman-portret-800.webp | Portret van Ayman El Hammoudi] Ayman El Hammoudi · Noord-Holland
AE
Mijn verhaal
#h2 Aangenaam. / Ik ben Ayman.
Ik ben 23 jaar, woon in Noord-Holland en ontwikkel mij op het snijvlak van commercie, klantcontact en ondernemerschap.
Als verkoopadviseur bij VodafoneZiggo help ik klanten verschillende telecomproducten en diensten begrijpen. Daarbij combineer ik persoonlijke service met aandacht voor commerciële doelstellingen.
Eerder werkte ik in merkpresentatie, directe verkoop, supermarktretail en een operationele e-commerceomgeving. Daardoor kan ik gemakkelijk schakelen tussen klantcontact, zelfstandig werken en samenwerken in een team.
Naast mijn werk ontwikkel ik websites voor ondernemers. Dat vraagt om initiatief, goed luisteren, structuur aanbrengen en verantwoordelijkheid nemen tot de oplevering.
Klantgericht
Praktisch
Leergierig
Ondernemend
02
Mijn manier van werken
#h2 Drie principes. / Elke dag opnieuw.
01
#h3 Luisteren.
Eerst begrijpen wat iemand belangrijk vindt. De juiste vraag brengt een gesprek verder.
02
#h3 Oplossen.
Opties helder uitleggen en samen een passende keuze maken. Zonder onnodige complexiteit.
03
#h3 Afmaken.
Afspraken nakomen en aandacht houden voor de ervaring van begin tot eind.
03
Ondernemerschap
#h2 Ook online gaat / het om mensen.
Een website is vaak het eerste contact met een bedrijf. Daarom combineer ik mijn commerciële ervaring met aandacht voor tekst, uitstraling en gebruiksgemak.
[A portfolio.html] Bekijk mijn webprojecten
[IMG assets/images/premium-kantoor.webp | Illustratieve kantoorruimte voor ondernemerschap] AI-sfeerbeeld · geen foto van mijn kantoor
De volgende stap
#h2 Een goed gesprek. / Een nieuw begin.
Over sales, een nieuwe uitdaging of een website voor jouw onderneming. Ik maak graag kennis.
[A contact.html] Laten we kennismaken
[A mailto:aymanae075@gmail.com] aymanae075@gmail.com
```

## werkervaring.html

```text
02
Werkervaring
#h1 Een loopbaan in contact. / Een brede blik op sales.
Zeven rollen die samen een profiel vormen in adviesverkoop, retail, directe acquisitie, digitale dienstverlening en operationele samenwerking.
01
Profiel in één oogopslag
#h2 Wat een recruiter / direct mag onthouden.
Mijn ervaring loopt uiteen, maar de rode draad is duidelijk: contact leggen, luisteren, helder uitleggen en verantwoordelijkheid nemen voor een goed resultaat.
01
#h3 Commercieel
Ervaring met adviesverkoop, directe acquisitie, productdemonstraties en het behandelen van vragen en bezwaren.
02
#h3 Klantgericht
Gewend om verschillende klantvragen te vertalen naar begrijpelijke opties en een passende vervolgstap.
03
#h3 Ondernemend
Zelf websites opzetten voor ondernemers, van intake en structuur tot oplevering en ondersteuning.
04
#h3 Breed inzetbaar
Ervaring in telecom, supermarktretail, e-commerceprocessen en zelfstandig digitaal werk.
[IMG assets/images/sales-adviesruimte.webp | Illustratieve omgeving voor een adviesgesprek] AI-sfeerbeeld · geen foto van een werkgever
02
De rode draad
#h2 Luisteren. / Uitleggen. / Verantwoordelijkheid nemen.
Op de winkelvloer, aan de deur, bij een productdemonstratie of in een webproject: ik begin bij de vraag, maak mogelijkheden begrijpelijk en werk toe naar een concrete volgende stap.
Daardoor zijn mijn ervaringen uit verschillende sectoren goed met elkaar te verbinden.
#h2 Mijn loopbaan
Open iedere functie voor werkzaamheden, kerncompetenties en de waarde die ik uit die ervaring meeneem.
[A cv.html] Bekijk mijn volledige cv
Exacte periodes en functietitels staan alleen vermeld waar ze zijn bevestigd. Bedrijfslogo’s dienen uitsluitend ter herkenning van de genoemde werkervaring.
Alles
Sales
Retail & operatie
Digitaal
7 ervaringen
01
[IMG assets/logos/vodafone.svg | Logo van VodafoneZiggo] VodafoneZiggo
Juli 2025 — heden
Huidig
Telecomretail
#h2 VodafoneZiggo
#h3 Verkoopadviseur
In een klantgerichte winkelomgeving adviseer ik consumenten over telecomproducten, abonnementen en aanvullende diensten. Ik combineer service met commerciële scherpte en zoek naar een oplossing die past bij het gebruik en de situatie van de klant.
Adviesverkoop
Behoefteanalyse
Telecom
Service
Commerciële doelen
Bekijk werkzaamheden en toegevoegde waarde +
#h4 Werkzaamheden
Klantbehoeften achterhalen door gericht te luisteren en door te vragen.
Producten, abonnementen en aanvullende diensten duidelijk vergelijken en toelichten.
Verkoopgesprekken professioneel afronden en vragen of bezwaren zorgvuldig behandelen.
Bijdragen aan klanttevredenheid, winkelservice en commerciële doelstellingen.
#h4 Wat deze rol toevoegt
Een sterke combinatie van persoonlijk advies, productkennis en resultaatgericht werken.
02
AE
Heden
Huidig
Digitale dienstverlening
#h2 Eigen onderneming
#h3 Websiteontwikkeling & webdesign
Als zelfstandig webdesigner begeleid ik ondernemers van de eerste vraag tot een bruikbare online presentatie. Daarbij combineer ik klantcontact, structuur, vormgeving en technische uitvoering.
Klantintake
Webdesign
WordPress
Shopify
Projecteigenaarschap
Bekijk werkzaamheden en toegevoegde waarde +
#h4 Werkzaamheden
Doel, doelgroep en inhoud van een website samen met de opdrachtgever verhelderen.
Klantwensen vertalen naar navigatie, pagina-indeling en een passende visuele stijl.
Websites uitwerken met onder meer WordPress, Shopify en e-commercekennis.
Opdrachtgevers begeleiden tijdens feedback, oplevering en ondersteuning daarna.
#h4 Wat deze rol toevoegt
Bewijs van initiatief, zelfstandigheid en het vermogen om een klantvraag van gesprek tot oplevering te begeleiden.
03
[IMG assets/logos/oppo.svg | Logo van OPPO] OPPO
Eerdere ervaring
Smartphones & merkactivatie
#h2 OPPO
#h3 Merkambassadeur
Binnen telecomretail vertegenwoordigde ik OPPO richting winkelbezoekers. De rol draaide om productdemonstraties, begrijpelijke uitleg en een consistente merkpresentatie.
Productdemonstratie
Merkbeleving
Presenteren
Telecomretail
Bekijk werkzaamheden en toegevoegde waarde +
#h4 Werkzaamheden
Smartphones demonstreren en belangrijke functies begrijpelijk uitleggen.
Productvoordelen verbinden aan de wensen van verschillende typen gebruikers.
Vragen over toestellen beantwoorden en klanten helpen bij hun vergelijking.
Bijdragen aan een herkenbare, professionele presentatie van het merk.
#h4 Wat deze rol toevoegt
Ervaring met zichtbaar vertegenwoordigen van een merk en complexe productinformatie eenvoudig overbrengen.
04
Direct sales
Eerdere ervaring
Direct sales
#h2 Direct sales
#h3 Deur-aan-deurverkoop · Telecom
In directe verkoop voor telecomcampagnes van onder andere Vodafone, KPN en Budget legde ik actief contact met potentiële klanten en presenteerde ik diensten in een kort, persoonlijk gesprek.
Acquisitie
Overtuigingskracht
Weerbaarheid
Gespreksopening
Bekijk werkzaamheden en toegevoegde waarde +
#h4 Werkzaamheden
Zelfstandig nieuwe gesprekken openen en snel vertrouwen opbouwen.
In korte tijd de situatie en mogelijke behoefte van een prospect verkennen.
Diensten helder presenteren en koppelen aan relevante voordelen.
Respectvol omgaan met afwijzing, vragen en bezwaren.
#h4 Wat deze rol toevoegt
Een stevige commerciële basis: initiatief nemen, helder communiceren en professioneel blijven onder druk.
05
[IMG assets/logos/coop.svg | Logo van COOP] COOP
Eerdere ervaring
Supermarktretail
#h2 Coop
#h3 Winkelmedewerker
Op de winkelvloer droeg ik bij aan klantservice, een verzorgde presentatie en de dagelijkse winkelwerkzaamheden. Deze omgeving vormde een praktische basis voor servicegericht en collegiaal werken.
Klantservice
Winkelpresentatie
Voorraad
Teamwerk
Bekijk werkzaamheden en toegevoegde waarde +
#h4 Werkzaamheden
Klanten helpen en praktische vragen op de winkelvloer beantwoorden.
Bijdragen aan een nette, overzichtelijke en uitnodigende winkelpresentatie.
Producten en voorraad zorgvuldig verwerken binnen de dagelijkse operatie.
Samenwerken met collega’s tijdens wisselende werkzaamheden en drukke momenten.
#h4 Wat deze rol toevoegt
Een betrouwbare retailbasis met aandacht voor tempo, presentatie en samenwerking.
06
[IMG assets/logos/plus.svg | Logo van PLUS] PLUS
Eerdere ervaring
Supermarktretail
#h2 PLUS
#h3 Winkelmedewerker
Bij PLUS deed ik verdere ervaring op met klantcontact en uitvoerend winkelwerk in een dynamische omgeving waar service en een verzorgde winkel samenkomen.
Klantcontact
Nauwkeurigheid
Flexibiliteit
Samenwerken
Bekijk werkzaamheden en toegevoegde waarde +
#h4 Werkzaamheden
Klanten behulpzaam en benaderbaar te woord staan.
Bijdragen aan een nette, overzichtelijke winkel en verzorgde schappen.
Dagelijkse werkzaamheden nauwkeurig en in samenwerking uitvoeren.
Snel schakelen wanneer prioriteiten op de winkelvloer veranderen.
#h4 Wat deze rol toevoegt
Aanvullende ervaring in service, werktempo en verantwoordelijkheid op de winkelvloer.
07
[IMG assets/logos/picnic.svg | Logo van Picnic] Picnic
Eerdere ervaring
E-commerce operatie
#h2 Picnic
#h3 Operationele werkzaamheden
Bij Picnic deed ik ervaring op in een operationele e-commerceomgeving. De werkzaamheden vroegen om nauwkeurigheid, een constant werktempo en goede afstemming met collega’s.
Operationele discipline
Procesmatig werken
Tempo
Teamwerk
Bekijk werkzaamheden en toegevoegde waarde +
#h4 Werkzaamheden
Dagelijkse operationele taken volgens een duidelijke werkwijze uitvoeren.
Nauwkeurig werken in een omgeving met tempo en vaste processen.
Afstemmen met collega’s om het gezamenlijke proces soepel te laten verlopen.
Verantwoordelijkheid nemen voor de kwaliteit van toegewezen taken.
#h4 Wat deze rol toevoegt
Ervaring met procesgericht werken, betrouwbaarheid en samenwerken in een snel bewegende operatie.
De volgende stap
#h2 Een goed gesprek. / Een nieuw begin.
Over sales, een nieuwe uitdaging of een website voor jouw onderneming. Ik maak graag kennis.
[A contact.html] Laten we kennismaken
[A mailto:aymanae075@gmail.com] aymanae075@gmail.com
```

## portfolio.html

```text
05
Portfolio
#h1 Twee actuele projecten. / Helder gepresenteerd.
Een gerichte selectie van websites die ik als eigen werk heb aangeleverd.
02
Actueel werk
#h2 Websites voor / lokale dienstverlening.
2 projecten
[A https://www.rijschoolrewald.com/] ● ● ●
rijschoolrewald.com
[IMG assets/previews/project-1.webp | Websitepreview van Rijschool Rewald]
Bekijk website
Opent in een nieuw tabblad
rijschool
01
#h3  [A https://www.rijschoolrewald.com/] Rijschool Rewald
Rijschoolwebsite met informatie over lessen en mogelijkheden om contact op te nemen.
Websitepreview · november 2026
[A https://www.paardrijleszaanstad.nl/] ● ● ●
paardrijleszaanstad.nl
[IMG assets/previews/project-2.webp | Websitepreview van Paardrijles Zaanstad]
Bekijk website
Opent in een nieuw tabblad
paardensport
02
#h3  [A https://www.paardrijleszaanstad.nl/] Paardrijles Zaanstad
Een digitale presentatie van paardrijlessen in de Zaanstreek.
Websitepreview · november 2026
De previews tonen de websites zoals gecontroleerd in november 2026. Externe websites kunnen later veranderen. De projecten zijn aangeleverd als eigen werk; er worden geen onbevestigde resultaten of bezoekerscijfers genoemd.
03
Mijn aanpak
#h2 Van vraag naar / een bruikbare website.
Ik begin bij het doel van de onderneming en de informatie die een bezoeker nodig heeft. Daarna werk ik structuur, uitstraling en contactmogelijkheden uit.
01
Doel en doelgroep bespreken
02
Pagina’s en inhoud structureren
03
Ontwerp uitwerken en feedback verwerken
04
Controleren en opleveren
[IMG assets/images/webdesign-werkplek.webp | Illustratieve werkplek voor webdesign] AI-sfeerbeeld · geen projectfoto
De volgende stap
#h2 Een goed gesprek. / Een nieuw begin.
Over sales, een nieuwe uitdaging of een website voor jouw onderneming. Ik maak graag kennis.
[A contact.html] Laten we kennismaken
[A mailto:aymanae075@gmail.com] aymanae075@gmail.com
```

## cv.html

```text
06
Curriculum vitae
#h1 Mijn ervaring. / Direct in beeld.
Bekijk mijn cv direct op deze pagina, open de PDF op volledig formaat of download hem voor later.
PDF
Mijn cv
#h2 Bekijken of / direct meenemen.
Onderstaand staat mijn cv zoals het in het aangeleverde PDF-bestand is opgemaakt.
[A assets/cv/CV_Ayman_El_Hammoudi_Vernieuwd.pdf] Open cv als PDF
(opent in een nieuw tabblad)
[A assets/cv/CV_Ayman_El_Hammoudi_Vernieuwd.pdf] Download mijn cv ↓
De PDF-weergave wordt niet door deze browser ondersteund.
[A assets/cv/CV_Ayman_El_Hammoudi_Vernieuwd.pdf] Open mijn cv
[A assets/cv/CV_Ayman_El_Hammoudi_Vernieuwd.pdf]  [IMG assets/cv/CV_Ayman_El_Hammoudi_Preview.webp | Voorbeeld van het cv van Ayman El Hammoudi]
Online
Toegankelijke tekstversie
#h2 Mijn profiel / ook als webpagina.
Deze tekstversie is snel doorzoekbaar en prettig leesbaar op ieder scherm.
Online cv
#h2 Navigeer door  / mijn profiel.
[A assets/cv/CV_Ayman_El_Hammoudi_Vernieuwd.pdf] Download mijn cv ↓
Print tekstversie ↓
[A #cv-profiel] 01 / Profiel [A #cv-ervaring] 02 / Werkervaring [A #cv-opleiding] 03 / Opleiding [A #cv-vaardigheden] 04 / Vaardigheden & talenCurriculum vitae · 2026
#h2 Ayman El Hammoudi
Verkoopadviseur · Retail & sales · Webdesigner
Noord-Holland ·  [A mailto:aymanae075@gmail.com] aymanae075@gmail.com /  [A tel:+31619067349] 06 1906 7349
#h3 Profiel
Commercieel ingestelde verkoopadviseur met ervaring in telecomretail, directe acquisitie, klantservice en zelfstandig webdesign. Sterk in luisteren, behoefteanalyse en het begrijpelijk presenteren van passende opties. Combineert persoonlijk klantcontact met resultaatgericht werken, eigenaarschap en een praktische digitale blik.
#h3 Werkervaring
[IMG assets/logos/vodafone.svg | Logo van VodafoneZiggo] VodafoneZiggo
#h4 VodafoneZiggo — Verkoopadviseur
Juli 2025 — heden · Telecomretail
In een klantgerichte winkelomgeving adviseer ik consumenten over telecomproducten, abonnementen en aanvullende diensten. Ik combineer service met commerciële scherpte en zoek naar een oplossing die past bij het gebruik en de situatie van de klant.
Klantbehoeften achterhalen door gericht te luisteren en door te vragen.
Producten, abonnementen en aanvullende diensten duidelijk vergelijken en toelichten.
AE
#h4 Eigen onderneming — Websiteontwikkeling & webdesign
Heden · Digitale dienstverlening
Als zelfstandig webdesigner begeleid ik ondernemers van de eerste vraag tot een bruikbare online presentatie. Daarbij combineer ik klantcontact, structuur, vormgeving en technische uitvoering.
Doel, doelgroep en inhoud van een website samen met de opdrachtgever verhelderen.
Klantwensen vertalen naar navigatie, pagina-indeling en een passende visuele stijl.
[IMG assets/logos/oppo.svg | Logo van OPPO] OPPO
#h4 OPPO — Merkambassadeur
Eerdere ervaring · Smartphones & merkactivatie
Binnen telecomretail vertegenwoordigde ik OPPO richting winkelbezoekers. De rol draaide om productdemonstraties, begrijpelijke uitleg en een consistente merkpresentatie.
Smartphones demonstreren en belangrijke functies begrijpelijk uitleggen.
Productvoordelen verbinden aan de wensen van verschillende typen gebruikers.
Direct sales
#h4 Direct sales — Deur-aan-deurverkoop · Telecom
Eerdere ervaring · Direct sales
In directe verkoop voor telecomcampagnes van onder andere Vodafone, KPN en Budget legde ik actief contact met potentiële klanten en presenteerde ik diensten in een kort, persoonlijk gesprek.
Zelfstandig nieuwe gesprekken openen en snel vertrouwen opbouwen.
In korte tijd de situatie en mogelijke behoefte van een prospect verkennen.
[IMG assets/logos/coop.svg | Logo van COOP] COOP
#h4 Coop — Winkelmedewerker
Eerdere ervaring · Supermarktretail
Op de winkelvloer droeg ik bij aan klantservice, een verzorgde presentatie en de dagelijkse winkelwerkzaamheden. Deze omgeving vormde een praktische basis voor servicegericht en collegiaal werken.
Klanten helpen en praktische vragen op de winkelvloer beantwoorden.
Bijdragen aan een nette, overzichtelijke en uitnodigende winkelpresentatie.
[IMG assets/logos/plus.svg | Logo van PLUS] PLUS
#h4 PLUS — Winkelmedewerker
Eerdere ervaring · Supermarktretail
Bij PLUS deed ik verdere ervaring op met klantcontact en uitvoerend winkelwerk in een dynamische omgeving waar service en een verzorgde winkel samenkomen.
Klanten behulpzaam en benaderbaar te woord staan.
Bijdragen aan een nette, overzichtelijke winkel en verzorgde schappen.
[IMG assets/logos/picnic.svg | Logo van Picnic] Picnic
#h4 Picnic — Operationele werkzaamheden
Eerdere ervaring · E-commerce operatie
Bij Picnic deed ik ervaring op in een operationele e-commerceomgeving. De werkzaamheden vroegen om nauwkeurigheid, een constant werktempo en goede afstemming met collega’s.
Dagelijkse operationele taken volgens een duidelijke werkwijze uitvoeren.
Nauwkeurig werken in een omgeving met tempo en vaste processen.
#h3 Opleiding
MBO Financiële Administratie — ROC TOP
#h3 Vaardigheden
Adviesverkoop · Klantbehoefteanalyse · Communicatie · Acquisitie · Productdemonstratie · Klantservice · Webdesign · WordPress · Shopify · E-commerce
#h3 Talen
Nederlands en Engels
Ayman El Hammoudi · Professioneel profiel
```

## vaardigheden.html

```text
03
Vaardigheden
#h1 Commercieel denken. / Persoonlijk handelen.
Mijn vaardigheden verbinden klantadvies, communicatie en digitale uitvoering. Toegepast in de praktijk, zonder betekenisloze scores.
01 / EXPERTISE
#h2 Verkoop & klantadvies
Ik stel gerichte vragen, vergelijk mogelijkheden en maak de keuze voor een klant begrijpelijk.
In de praktijkToegepast bij VodafoneZiggo, OPPO en directe telecomverkoop.
Adviesverkoop
Behoefteanalyse
Acquisitie
Productuitleg
Bezwaren behandelen
Klantrelaties
02 / EXPERTISE
#h2 Communicatie & samenwerking
Ik blijf benaderbaar, communiceer duidelijk en stem mijn aanpak af op de klant, collega of opdrachtgever.
In de praktijkOntwikkeld in telecom, supermarktretail, operationeel werk en klantprojecten.
Actief luisteren
Klantcontact
Samenwerken
Zelfstandig werken
Afspraken nakomen
Professioneel schakelen
03 / EXPERTISE
#h2 Webdesign & uitvoering
Ik vertaal een zakelijke vraag naar een overzichtelijke website en begeleid het proces tot een bruikbare oplevering.
In de praktijkZichtbaar in twee actuele projecten voor ondernemers.
Websiteontwikkeling
Webdesign
WordPress
Shopify
E-commerce
Digitale communicatie
[IMG assets/images/webdesign-werkplek.webp | Illustratieve werkplek voor websiteontwikkeling] AI-sfeerbeeld · geen foto van mijn werkplek
04
Van gesprek naar uitvoering
#h2 Meedenken. / Uitwerken. / Opleveren.
Mijn commerciële en digitale werk sluiten op elkaar aan. Ik begin met de vraag van de klant en werk toe naar een bruikbare oplossing.
[A portfolio.html] Bekijk de projecten
De volgende stap
#h2 Een goed gesprek. / Een nieuw begin.
Over sales, een nieuwe uitdaging of een website voor jouw onderneming. Ik maak graag kennis.
[A contact.html] Laten we kennismaken
[A mailto:aymanae075@gmail.com] aymanae075@gmail.com
```

## prestaties.html

```text
04
Professionele ontwikkeling
#h1 Wat ik al meebreng. / Waar ik verder in groei.
Een feitelijk overzicht van mijn ontwikkeling in commercie, uitvoering en zelfstandig initiatief.
01
Bewijs uit de praktijk
#h2 Ervaring die / op elkaar voortbouwt.
Mijn ontwikkeling zit niet in losse titels, maar in wat verschillende werkomgevingen mij hebben geleerd.
01
#h3 Klantgesprekken
Van een gesprek openen tot doorvragen, opties toelichten en professioneel omgaan met twijfels of bezwaren.
02
#h3 Merk & product
Ervaring met telecomadvies, productdemonstraties en een verzorgde presentatie richting klanten.
03
#h3 Werkdiscipline
Retail en operationeel werk hebben mijn gevoel voor tempo, nauwkeurigheid en samenwerking versterkt.
04
#h3 Eigen initiatief
Met webdesign leer ik zelf plannen, klantverwachtingen bewaken en verantwoordelijkheid nemen voor een oplevering.
02
Volgende stap
#h2 Meer leren. / Meer regie. / Meer waarde toevoegen.
Ik zoek omgevingen waarin ik mijn commerciële ervaring kan verdiepen, van sterke collega’s kan leren en steeds zelfstandiger verantwoordelijkheid kan dragen.
[A motivatie.html] Lees mijn ambitie
[IMG assets/images/ambitie-ontwikkeling.webp | Werkplek die leren, plannen en professionele groei verbeeldt] AI-sfeerbeeld · gemaakt voor deze website
De volgende stap
#h2 Een goed gesprek. / Een nieuw begin.
Over sales, een nieuwe uitdaging of een website voor jouw onderneming. Ik maak graag kennis.
[A contact.html] Laten we kennismaken
[A mailto:aymanae075@gmail.com] aymanae075@gmail.com
```

## motivatie.html

```text
07
Ambitie & toekomst
#h1 Blijven leren. / Steeds verder bouwen.
Waar ik naartoe wil, wat ik onderweg wil ontwikkelen en welke werkomgeving daarbij past.
01
Wat mij drijft
#h2 Groeien door / praktijkervaring.
Ik wil mij ontwikkelen tot een veelzijdige commerciële professional die klanten goed begrijpt, verantwoordelijkheid pakt en ideeën zelfstandig kan uitvoeren.
Voor mij ontstaat groei door te doen: gesprekken voeren, feedback vragen, productkennis opbouwen, samenwerken met ervaren collega’s en achteraf beoordelen wat beter kan.
Ik zoek daarom geen snelle titel, maar een omgeving waarin prestaties, ontwikkeling en betrouwbaarheid samenkomen.
[IMG assets/images/ambitie-ontwikkeling.webp | Werkplek die leren, plannen en professionele groei verbeeldt] AI-sfeerbeeld · gemaakt voor deze website
02
Mijn richting
#h2 Drie doelen voor / de komende jaren.
Ambitie betekent voor mij concreet blijven leren en de kwaliteit van mijn werk stap voor stap verhogen.
01
#h3 Commercieel verdiepen.
Sterker worden in behoefteanalyse, advies, productkennis, relatieopbouw en het professioneel afronden van verkoopgesprekken.
02
#h3 Breder verantwoordelijkheid dragen.
Meer leren over planning, samenwerking, klantbehoud en het begeleiden van een traject van eerste contact tot resultaat.
03
#h3 Een eigen bedrijf uitbouwen.
Mijn ervaring in webdesign en dienstverlening verder professionaliseren met betere processen, sterkere projecten en langdurige klantrelaties.
03
Wat ik zoek
#h2 Een plek om bij te dragen / én door te groeien.
Ik kom het beste tot mijn recht in een team waar klantgerichtheid, duidelijke verwachtingen en ruimte om vragen te stellen belangrijk zijn. Ik breng energie, initiatief en brede praktijkervaring mee.
Coaching in de praktijk
Duidelijke doelen
Klantcontact
Eigen verantwoordelijkheid
[A cv.html] Bekijk mijn cv
[A contact.html] Neem contact op
[IMG assets/images/sales-adviesruimte.webp | Illustratieve ruimte voor een professioneel gesprek] AI-sfeerbeeld · geen foto van een werkgever
```

## contact.html

```text
08
Contact
#h1 Een mogelijkheid bespreken? / Neem direct contact op.
Voor een functie in sales of retail, een commerciële samenwerking of een websiteproject ben ik rechtstreeks bereikbaar.
[IMG assets/images/ayman-portret-800.webp | Zakelijk portret van Ayman El Hammoudi]
Ayman El HammoudiVerkoopadviseur · Webdesigner · Noord-Holland
01
Direct contact
#h2 Laten we / kennismaken.
Ik sta open voor gesprekken over functies waarin klantcontact, advies, commercie en ontwikkeling samenkomen.
[A mailto:aymanae075@gmail.com?subject=Kennismaking%20met%20Ayman] E-mailaymanae075@gmail.com
[A tel:+31619067349] Telefoon06 1906 7349
RegioNoord-Holland
[A mailto:aymanae075@gmail.com?subject=Kennismaking%20met%20Ayman] Stuur een e-mail
Kopieer e-mailadres
De knoppen openen je eigen e-mail- of telefoonapp. Deze website gebruikt geen contactformulier, tracking of cookies.
02
Snel naar de juiste informatie
#h2 Alles wat een werkgever / nodig heeft.
01
#h3 Ervaring
Zeven rollen met werkzaamheden, vaardigheden en de waarde die ik uit iedere omgeving meeneem.
02
#h3 Sterke punten
Een praktisch overzicht van verkoop, communicatie, samenwerking en digitale uitvoering.
03
#h3 Ambitie
Mijn doelen voor verdere ontwikkeling in commercie, verantwoordelijkheid en ondernemerschap.
04
#h3 Curriculum vitae
Het juiste cv is direct op de website te lezen, volledig te openen en als PDF te downloaden.
[A cv.html] Bekijk mijn cv
[A werkervaring.html] Bekijk mijn ervaring
[A motivatie.html] Lees mijn ambitie
```
