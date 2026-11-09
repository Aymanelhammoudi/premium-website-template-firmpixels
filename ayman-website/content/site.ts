/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALLE INHOUD VAN DE WEBSITE STAAT IN DIT ÉNE BESTAND.
 *
 *  - Pas teksten aan tussen de aanhalingstekens "…" en sla op.
 *  - Een veld leeg laten ("" of []) = het onderdeel wordt automatisch verborgen.
 *  - Regels met  [INVULLEN: …]  zijn nog niet bevestigd / ontbreken. Vul ze in of
 *    laat ze leeg; ze worden pas getoond als je ze invult.
 *  - Bron van alle teksten: content/bron.md (opgehaald van aymanzakelijk.nl).
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ───────────── Types (hoef je niet aan te passen) ───────────── */

import type { PageKey } from "./routes";


export type Track = "sales" | "ondernemer";

export type BrandIcon = "phone" | "key" | "door" | "bag" | "sofa" | "sun" | "swap" | "browser";

export type Experience = {
  /** wordt ook de paginanaam: /ervaring/<id>/ */
  id: string;
  track: Track;
  /** filtergroep binnen het spoor */
  group: "sales" | "retail" | "marketplace" | "webshops" | "eigen-bedrijf";
  company: string;
  role: string;
  period: string;
  current?: boolean;
  /** grote tegel op de homepage */
  featured?: boolean;
  sector: string;
  /** logo-bestand in public/images/logos/ … */
  logo?: string;
  /** … of een tekstlogo (bv. "bol") … */
  wordmark?: string;
  /** … of een icoon */
  icon?: BrandIcon;
  /** merken die je verkocht (logo's op de pagina) */
  brands?: { name: string; logo: string }[];
  summary: string;
  /** optioneel verhaal in stappen */
  story?: { title: string; text: string }[];
  tasks: string[];
  /** "Wat dit zegt over mij" */
  value: string;
  tags: string[];
};

export type Project = {
  id: string;
  name: string;
  url: string;
  domain: string;
  category: string;
  image?: string;
  description: string;
  checked: string;
  /** false = staat klaar maar wordt (nog) niet getoond */
  published: boolean;
};

export type SkillGroup = {
  id: string;
  title: string;
  intro: string;
  practice: string;
  skills: string[];
};

/* ───────────── Persoon & contact ───────────── */

export const person = {
  firstName: "Ayman",
  lastName: "El Hammoudi",
  fullName: "Ayman El Hammoudi",
  initials: "ae",
  role: "Verkoopadviseur & e-commerceondernemer",
  roleShort: ["Verkoopadviseur", "E-commerceondernemer"],
  region: "Noord-Holland",
  age: 23,
  email: "aymanae075@gmail.com",
  phoneDisplay: "06 1906 7349",
  phoneHref: "+31619067349",
  languages: ["Nederlands", "Engels"],
  siteUrl: "https://www.aymanzakelijk.nl",
  portrait: "/images/ayman-portret.webp",
  portraitAlt: "Zakelijk portret van Ayman El Hammoudi",
  /** [INVULLEN: LinkedIn-URL, bv. "https://www.linkedin.com/in/…"] */
  linkedin: "",
  /** [INVULLEN: Instagram-URL — optioneel] */
  instagram: "",
};

export const seo = {
  title: "Ayman El Hammoudi — Verkoopadviseur & e-commerceondernemer",
  description:
    "Ayman El Hammoudi, verkoopadviseur bij VodafoneZiggo en e-commerceondernemer uit Noord-Holland. Bekijk zijn ervaring in sales, retail, bol, Amazon en eigen webshops, en download zijn cv.",
};

/* ───────────── Navigatie ───────────── */

export const nav = [
  { key: "experience", label: "Ervaring" },
  { key: "ventures", label: "Ondernemerschap" },
  { key: "about", label: "Over mij" },
  { key: "skills", label: "Vaardigheden" },
  { key: "ambition", label: "Ambitie" },
  { key: "websites", label: "Websites" },
  { key: "cv", label: "Cv" },
] as { key: PageKey; label: string }[];

/* ───────────── Hero ───────────── */

export const hero = {
  status: "Open voor gesprekken over een nieuwe functie",
  tagline: ["Mensen.", "Vertrouwen.", "Vooruitgang."],
  intro:
    "Een commerciële professional uit Noord-Holland met ervaring in klantadvies, retail, deur-tot-deurverkoop, high-ticket sales en e-commerce.",
  footnote: "Praktisch, leergierig en klantgericht.",
  primaryCta: { label: "Download mijn cv", href: "/cv/CV_Ayman_El_Hammoudi.pdf" },
  secondaryCta: { label: "Bekijk mijn ervaring", href: "/ervaring/" },
};

/* Werkgevers voor de logoband */
export const employers = [
  { name: "VodafoneZiggo", logo: "/images/logos/vodafone.svg" },
  { name: "OPPO", logo: "/images/logos/oppo.svg" },
  { name: "COOP", logo: "/images/logos/coop.svg" },
  { name: "PLUS", logo: "/images/logos/plus.svg" },
  { name: "Picnic", logo: "/images/logos/picnic.svg" },
  { name: "Budget Thuis", logo: "/images/logos/budget-thuis.svg" },
  { name: "Odido", logo: "/images/logos/odido.svg" },
  { name: "KPN", logo: "/images/logos/kpn.svg" },
  { name: "bol", wordmark: "bol" },
  { name: "Amazon", wordmark: "amazon" },
] as { name: string; logo?: string; wordmark?: string }[];

/* ───────────── In het kort (voor werkgevers) ───────────── */

export const quickScan = {
  title: "In het kort.",
  titleAccent: "Voor werkgevers & recruiters.",
  current: {
    label: "Huidige functie",
    role: "Verkoopadviseur",
    company: "VodafoneZiggo",
    since: "Sinds juli 2025",
    logo: "/images/logos/vodafone.svg",
  },
  sectors: ["Telecomretail", "Deur-tot-deurverkoop", "High-ticket sales", "Marketplaces (bol, Amazon)", "Eigen webshops", "Magazijn & retail"],
  strengths: ["Adviesverkoop", "Closing", "Behoefteanalyse", "Bezwaren behandelen", "Ondernemerschap", "Eigenaarschap"],
  seeking:
    "Ik zoek geen snelle titel, maar een omgeving waarin prestaties, ontwikkeling en betrouwbaarheid samenkomen.",
};

/* ───────────── Over mij ───────────── */

export const about = {
  statement: "Goed advies begint met écht luisteren.",
  /** woorden in de statement die extra nadruk krijgen */
  statementAccent: "écht luisteren.",
  lead: "Ik wil begrijpen wat iemand nodig heeft. Daar begint voor mij een goed gesprek.",
  story: [
    "Ik ben 23 jaar, woon in Noord-Holland en ontwikkel mij op het snijvlak van commercie, klantcontact en ondernemerschap.",
    "Als verkoopadviseur bij VodafoneZiggo help ik klanten verschillende telecomproducten en diensten begrijpen. Daarbij combineer ik persoonlijke service met aandacht voor commerciële doelstellingen.",
    "Eerder werkte ik in merkpresentatie, deur-tot-deurverkoop, high-ticket sales, supermarktretail en in het magazijn van Picnic. Daardoor kan ik gemakkelijk schakelen tussen klantcontact, zelfstandig werken en samenwerken in een team.",
    "Daarnaast ben ik ondernemer. Sinds 2021 verkoop ik via bol, ik verkocht een jaar via Amazon, had eigen webshops en bouwde een bedrijf in groene energie op dat ik met winst heb verkocht. Zo leerde ik zelf beslissen, rekenen en op tijd bijsturen.",
  ],
  traits: ["Klantgericht", "Praktisch", "Leergierig", "Ondernemend"],
  stats: [
    { value: 15, suffix: "", label: "ervaringen in sales, retail en e-commerce" },
    { value: 2021, suffix: "", label: "sinds dit jaar verkooppartner op bol" },
    { value: 1, suffix: "", label: "eigen bedrijf opgebouwd en met winst verkocht" },
    { value: 2, suffix: "", label: "talen: Nederlands & Engels" },
  ],
  principlesTitle: "Drie principes. Elke dag opnieuw.",
  principles: [
    {
      title: "Luisteren.",
      text: "Eerst begrijpen wat iemand belangrijk vindt. De juiste vraag brengt een gesprek verder.",
    },
    {
      title: "Oplossen.",
      text: "Opties helder uitleggen en samen een passende keuze maken. Zonder onnodige complexiteit.",
    },
    {
      title: "Afmaken.",
      text: "Afspraken nakomen en aandacht houden voor de ervaring van begin tot eind.",
    },
  ],
};

/* ───────────── Expertise / wat ik doe ───────────── */

export const expertise = {
  title: "Duidelijk in gesprek.",
  titleAccent: "Sterk in uitvoering.",
  intro:
    "Mijn kracht ligt in de combinatie van contact leggen, behoeften begrijpen en verantwoordelijkheid nemen voor de volgende stap.",
  items: [
    {
      label: "Commercie",
      icon: "chat" as const,
      title: "Advies & verkoop",
      text: "Ik luister gericht, vergelijk mogelijkheden en leg een oplossing begrijpelijk uit. Ervaring uit telecom, retail en directe verkoop.",
      link: { label: "Bekijk mijn loopbaan", href: "/ervaring/" },
    },
    {
      label: "Samenwerking",
      icon: "handshake" as const,
      title: "Contact & betrouwbaarheid",
      text: "Ik communiceer helder, blijf professioneel bij vragen of bezwaren en kom afspraken na in klant- en teamcontact.",
      link: { label: "Bekijk mijn sterke punten", href: "/vaardigheden/" },
    },
    {
      label: "Ondernemerschap",
      icon: "browser" as const,
      title: "E-commerce & eigenaarschap",
      text: "Ik heb ervaring met eigen webshops, marketplaces, commerciële samenwerkingen en het bouwen en verkopen van een onderneming.",
      link: { label: "Bekijk mijn ondernemerschap", href: "/ondernemerschap/" },
    },
  ],
};

/* ───────────── Ervaring (twee sporen) ───────────── */

export const tracks: Record<Track, { label: string; title: string; titleAccent: string; intro: string }> = {
  sales: {
    label: "Spoor 01 · Sales & retail",
    title: "In loondienst",
    titleAccent: "en in sales.",
    intro:
      "Van de winkelvloer en de deur tot telefonische closing: rollen waarin ik dagelijks met klanten in gesprek ben en verantwoordelijkheid neem voor resultaat.",
  },
  ondernemer: {
    label: "Spoor 02 · Ondernemerschap",
    title: "Als ondernemer",
    titleAccent: "in e-commerce.",
    intro:
      "Marketplaces, eigen webshops, samenwerkingen en een eigen bedrijf in groene energie (2018 — 2020). Hier leerde ik zelf beslissen, rekenen en op tijd bijsturen.",
  },
};

/* ───────────── Paginakoppen (multi-pagina) ───────────── */

export const pages = {
  about: {
    eyebrow: "Over mij",
    title: "Persoonlijk in contact.",
    accent: "Ondernemend van nature.",
    intro: "Een commerciële achtergrond, een nieuwsgierige blik en plezier in het helpen van mensen.",
  },
  experience: {
    eyebrow: "Ervaring",
    title: "Een loopbaan in contact.",
    accent: "Een brede blik op sales.",
    intro: "Van de winkelvloer en de deur tot telefonische closing: rollen waarin ik dagelijks met klanten in gesprek ben en verantwoordelijkheid neem voor resultaat.",
  },
  ventures: {
    eyebrow: "Ondernemerschap",
    title: "Gebouwd door te doen.",
    accent: "Geleerd door te verkopen.",
    intro: "Een overzicht van mijn ervaring met marketplaces, webshops, commerciële samenwerkingen en sales.",
  },
  skills: {
    eyebrow: "Vaardigheden",
    title: "Commercieel denken.",
    accent: "Persoonlijk handelen.",
    intro: "Mijn vaardigheden verbinden klantadvies, communicatie en digitale uitvoering. Toegepast in de praktijk, zonder betekenisloze scores.",
  },
  websites: {
    eyebrow: "Websites",
    title: "Naast mijn werk:",
    accent: "websites voor ondernemers.",
    intro: "Als zelfstandig webdesigner bouw ik websites voor lokale ondernemers. Dat vraagt om initiatief, goed luisteren, structuur aanbrengen en verantwoordelijkheid nemen tot de oplevering.",
  },
  cv: {
    eyebrow: "Curriculum vitae",
    title: "Mijn ervaring.",
    accent: "Direct in beeld.",
    intro: "Bekijk mijn cv direct op deze pagina, open de pdf op volledig formaat of download hem voor later.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Een mogelijkheid bespreken?",
    accent: "Neem direct contact op.",
    intro: "Voor een functie in sales of retail, een commerciële samenwerking of een websiteproject ben ik rechtstreeks bereikbaar.",
  },
  ambition: {
    eyebrow: "Ambitie & toekomst",
    title: "Blijven leren.",
    accent: "Steeds verder bouwen.",
    intro: "Waar ik naartoe wil, wat ik onderweg wil ontwikkelen en welke werkomgeving daarbij past.",
  },
};

/* ───────────── Homepage: hoogtepunten ───────────── */

export const home = {
  highlightsTitle: "Drie dingen",
  highlightsAccent: "om te onthouden.",
  highlights: [
    { id: "vodafoneziggo", label: "Nu", text: "Verkoopadviseur bij VodafoneZiggo, sinds juli 2025." },
    { id: "bol", label: "Sinds 2021", text: "Verkooppartner op bol, naast mijn baan." },
    { id: "groene-energie", label: "2018 — 2020", text: "Eigen bedrijf in groene energie opgebouwd en met winst verkocht." },
  ],
  tracksTitle: "Twee sporen.",
  tracksAccent: "Eén rode draad.",
  tracksIntro: "Ik combineer ervaring in loondienst met ondernemerschap. Kies een spoor voor alle details.",
};

export const experienceIntro = {
  title: "Twee sporen.",
  titleAccent: "Eén rode draad.",
  intro:
    "Ik combineer ervaring in loondienst met ondernemerschap. Klik op een onderdeel om te zien wat ik daar deed en wat het over mij zegt.",
  thread:
    "Op de winkelvloer, aan de deur, aan de telefoon of in mijn eigen webshop: ik begin bij de vraag, maak mogelijkheden begrijpelijk en werk toe naar een concrete volgende stap.",
  note: "Exacte periodes en functietitels staan alleen vermeld waar ze zijn bevestigd. Bedrijfslogo’s dienen uitsluitend ter herkenning; ik ben niet gelieerd aan de genoemde merken. Samenwerkingspartners en eigen ondernemingen zijn bewust anoniem.",
  trackFilters: {
    sales: [
      { id: "alles", label: "Alles" },
      { id: "sales", label: "Sales" },
      { id: "retail", label: "Retail & operatie" },
    ],
    ondernemer: [
      { id: "alles", label: "Alles" },
      { id: "marketplace", label: "Marketplaces" },
      { id: "webshops", label: "Webshops & samenwerkingen" },
      { id: "eigen-bedrijf", label: "Eigen bedrijf" },
    ],
  } as Record<Track, { id: string; label: string }[]>,
  filters: [
    { id: "alles", label: "Alles" },
    { id: "sales", label: "Sales & retail" },
    { id: "ondernemer", label: "Ondernemerschap" },
  ] as { id: "alles" | Track; label: string }[],
};

export const experience: Experience[] = [
  /* ── Spoor 01 · Sales & retail ── */
  {
    id: "vodafoneziggo",
    track: "sales",
    group: "sales",
    company: "VodafoneZiggo",
    role: "Verkoopadviseur",
    period: "Juli 2025 — heden",
    current: true,
    featured: true,
    sector: "Telecomretail",
    logo: "/images/logos/vodafone.svg",
    summary:
      "In een klantgerichte winkelomgeving adviseer ik consumenten over telecomproducten, abonnementen en aanvullende diensten. Ik combineer service met commerciële scherpte en zoek naar een oplossing die past bij het gebruik en de situatie van de klant.",
    tasks: [
      "Klantbehoeften achterhalen door gericht te luisteren en door te vragen.",
      "Producten, abonnementen en aanvullende diensten duidelijk vergelijken en toelichten.",
      "Verkoopgesprekken professioneel afronden en vragen of bezwaren zorgvuldig behandelen.",
      "Bijdragen aan klanttevredenheid, winkelservice en commerciële doelstellingen.",
    ],
    value: "Een sterke combinatie van persoonlijk advies, productkennis en resultaatgericht werken.",
    tags: ["Adviesverkoop", "Behoefteanalyse", "Telecom", "Service", "Commerciële doelen"],
  },
  {
    id: "high-ticket-closer",
    track: "sales",
    group: "sales",
    company: "High-ticket closing",
    role: "Sales closer · coaching voor e-commerceondernemers",
    period: "Eerdere saleservaring",
    featured: true,
    sector: "High-ticket sales",
    icon: "phone",
    summary:
      "Als high-ticket closer sprak ik e-commerceondernemers die al goed draaiden en wilden doorgroeien. Ik onderzocht of begeleiding door een ervaren coachingbedrijf bij hun volgende stap paste en bracht hen samen met dat bedrijf en zijn coaches. Het ging om trajecten van enkele duizenden euro’s. Veel ondernemers die de stap zetten, behaalden daarna met hulp van de coaches meer omzet.",
    tasks: [
      "Verkoopgesprekken voeren met ondernemers die al een lopend e-commercebedrijf hadden.",
      "Ambities, knelpunten en de mogelijke aansluiting op coaching helder in kaart brengen.",
      "Een investering van enkele duizenden euro’s eerlijk en begrijpelijk toelichten.",
      "Geschikte ondernemers in contact brengen met het coachingbedrijf en zijn coaches.",
    ],
    value:
      "Ik kan een gesprek over een grote beslissing rustig en eerlijk leiden, en weet wanneer iets wél of níet past.",
    tags: ["High-ticket sales", "Closing", "Kwalificatie", "Doorvragen", "Vertrouwen"],
  },
  {
    id: "deur-tot-deurverkoop",
    track: "sales",
    group: "sales",
    company: "Deur-tot-deurverkoop",
    role: "Direct sales · telecom en energie",
    period: "Eerdere ervaring",
    featured: true,
    sector: "Direct sales",
    icon: "door",
    brands: [
      { name: "Budget Thuis", logo: "/images/logos/budget-thuis.svg" },
      { name: "Odido", logo: "/images/logos/odido.svg" },
      { name: "KPN", logo: "/images/logos/kpn.svg" },
    ],
    summary:
      "In deur-tot-deurverkoop verkocht ik diensten van Budget Thuis, Odido en KPN. Ik benaderde potentiële klanten actief, bracht hun situatie in korte tijd in kaart en presenteerde een passend aanbod in een persoonlijk gesprek.",
    tasks: [
      "Zelfstandig nieuwe gesprekken openen en snel vertrouwen opbouwen.",
      "In korte tijd de situatie en mogelijke behoefte van een prospect verkennen.",
      "Diensten helder presenteren en koppelen aan relevante voordelen.",
      "Respectvol omgaan met afwijzing, vragen en bezwaren.",
    ],
    value:
      "Een stevige commerciële basis: initiatief nemen, helder communiceren en professioneel blijven onder druk.",
    tags: ["Deur-tot-deurverkoop", "Acquisitie", "Behoefteanalyse", "Bezwaren behandelen"],
  },
  {
    id: "the-secret-skill",
    track: "sales",
    group: "sales",
    company: "The Secret Skill",
    role: "Salesmedewerker · cursusverkoop",
    period: "2020",
    featured: true,
    sector: "Salesopleiding",
    icon: "key",
    summary:
      "In 2020 werkte ik in sales voor The Secret Skill, destijds onder leiding van Rébien Ghazali. Ik sprak geïnteresseerden over een cursus waarmee zij hun verkoopvaardigheden konden ontwikkelen en beter werden in sales.",
    tasks: [
      "Interesse en leerdoelen van potentiële deelnemers bespreken.",
      "De inhoud en mogelijke aansluiting van de salescursus toelichten.",
      "Ervaring opdoen met telefonische verkoop van een kennisproduct.",
    ],
    value: "Hier leerde ik sales als vak: structuur in een gesprek, doorvragen en een duidelijke afronding.",
    tags: ["Cursusverkoop", "Telefonische sales", "Kwalificatie", "Salesontwikkeling"],
  },
  {
    id: "oppo",
    track: "sales",
    group: "sales",
    company: "OPPO",
    role: "Merkambassadeur",
    period: "Eerdere ervaring",
    sector: "Smartphones & merkactivatie",
    logo: "/images/logos/oppo.svg",
    summary:
      "Binnen telecomretail vertegenwoordigde ik OPPO richting winkelbezoekers. De rol draaide om productdemonstraties, begrijpelijke uitleg en een consistente merkpresentatie.",
    tasks: [
      "Smartphones demonstreren en belangrijke functies begrijpelijk uitleggen.",
      "Productvoordelen verbinden aan de wensen van verschillende typen gebruikers.",
      "Vragen over toestellen beantwoorden en klanten helpen bij hun vergelijking.",
      "Bijdragen aan een herkenbare, professionele presentatie van het merk.",
    ],
    value:
      "Ervaring met zichtbaar vertegenwoordigen van een merk en complexe productinformatie eenvoudig overbrengen.",
    tags: ["Productdemonstratie", "Merkbeleving", "Presenteren", "Telecomretail"],
  },
  {
    id: "picnic",
    track: "sales",
    group: "retail",
    company: "Picnic",
    role: "Orderpicker · magazijn",
    period: "Eerdere ervaring",
    sector: "E-commerce logistiek",
    logo: "/images/logos/picnic.svg",
    summary:
      "In het magazijn van Picnic deed ik ervaring op als orderpicker. Ik verzamelde en controleerde boodschappen volgens vaste processen, waarbij nauwkeurigheid, tempo en goede afstemming met collega’s belangrijk waren.",
    tasks: [
      "Bestellingen verzamelen aan de hand van de aangegeven magazijnroute en werkwijze.",
      "Producten en aantallen controleren voordat een bestelling verderging in het proces.",
      "Nauwkeurig en in een constant tempo werken binnen vaste logistieke processen.",
      "De werkplek ordelijk houden en met collega’s afstemmen voor een soepele doorstroom.",
    ],
    value:
      "Praktische magazijnervaring met orderpicking, kwaliteitscontrole en samenwerken binnen een logistiek proces.",
    tags: ["Orderpicking", "Magazijnwerk", "Nauwkeurigheid", "Werktempo", "Teamwerk"],
  },
  {
    id: "coop",
    track: "sales",
    group: "retail",
    company: "Coop",
    role: "Winkelmedewerker",
    period: "Eerdere ervaring",
    sector: "Supermarktretail",
    logo: "/images/logos/coop.svg",
    summary:
      "Op de winkelvloer droeg ik bij aan klantservice, een verzorgde presentatie en de dagelijkse winkelwerkzaamheden. Deze omgeving vormde een praktische basis voor servicegericht en collegiaal werken.",
    tasks: [
      "Klanten helpen en praktische vragen op de winkelvloer beantwoorden.",
      "Bijdragen aan een nette, overzichtelijke en uitnodigende winkelpresentatie.",
      "Producten en voorraad zorgvuldig verwerken binnen de dagelijkse operatie.",
      "Samenwerken met collega’s tijdens wisselende werkzaamheden en drukke momenten.",
    ],
    value: "Een betrouwbare retailbasis met aandacht voor tempo, presentatie en samenwerking.",
    tags: ["Klantservice", "Winkelpresentatie", "Voorraad", "Teamwerk"],
  },
  {
    id: "plus",
    track: "sales",
    group: "retail",
    company: "PLUS",
    role: "Winkelmedewerker",
    period: "Eerdere ervaring",
    sector: "Supermarktretail",
    logo: "/images/logos/plus.svg",
    summary:
      "Bij PLUS deed ik verdere ervaring op met klantcontact en uitvoerend winkelwerk in een dynamische omgeving waar service en een verzorgde winkel samenkomen.",
    tasks: [
      "Klanten behulpzaam en benaderbaar te woord staan.",
      "Bijdragen aan een nette, overzichtelijke winkel en verzorgde schappen.",
      "Dagelijkse werkzaamheden nauwkeurig en in samenwerking uitvoeren.",
      "Snel schakelen wanneer prioriteiten op de winkelvloer veranderen.",
    ],
    value: "Aanvullende ervaring in service, werktempo en verantwoordelijkheid op de winkelvloer.",
    tags: ["Klantcontact", "Nauwkeurigheid", "Flexibiliteit", "Samenwerken"],
  },

  /* ── Spoor 02 · Ondernemerschap ── */
  {
    id: "bol",
    track: "ondernemer",
    group: "marketplace",
    company: "bol",
    role: "Verkooppartner · marketplaceverkoper",
    period: "2021 — heden",
    current: true,
    featured: true,
    sector: "Marketplace",
    wordmark: "bol",
    summary:
      "Sinds 2021 verkoop ik als verkooppartner via bol, de grootste online winkel van Nederland en België. Daardoor heb ik praktijkervaring opgebouwd met productkeuze, aanbod, online verkoop en de dagelijkse aandacht die een marketplace vraagt.",
    tasks: [
      "Producten en assortiment selecteren en als verkooppartner online aanbieden.",
      "Productpagina’s, prijzen en aanbod onderhouden binnen het bol-partnerplatform.",
      "Bestellingen, voorraad en klantvragen bijhouden.",
      "Ervaring opbouwen met marketplaceverkoop en e-commerceprocessen.",
    ],
    value: "Ik weet hoe online verkopen in de praktijk werkt, van productkeuze tot een tevreden klant.",
    tags: ["Verkooppartner", "Marketplace", "Assortiment", "Online verkoop", "E-commerce"],
  },
  {
    id: "amazon",
    track: "ondernemer",
    group: "marketplace",
    company: "Amazon",
    role: "Verkoper · Seller Central",
    period: "1 jaar",
    featured: true,
    sector: "Marketplace",
    wordmark: "amazon",
    summary:
      "Een jaar lang verkocht ik als verkoper via Amazon, een internationaal marketplaceplatform. Ik werkte met zowel Fulfilment by Amazon (FBA), waarbij mijn producten vanuit het magazijn van Amazon werden verzonden, als met verzending vanuit eigen voorraad (Fulfilled by Merchant, FBM).",
    tasks: [
      "Productaanbod beheren in Amazon Seller Central.",
      "Voorraad naar het Amazon-magazijn sturen voor verzending via FBA.",
      "Bestellingen vanuit eigen voorraad zelf verzenden (FBM).",
      "Werken met de structuur, eisen en richtlijnen van Amazon.",
    ],
    value:
      "Ik ken de logistiek achter online verkoop: wanneer je het uitbesteedt en wanneer je het zelf doet.",
    tags: ["Amazon", "FBA", "FBM", "Seller Central", "Voorraadbeheer"],
  },
  {
    id: "webshops",
    track: "ondernemer",
    group: "webshops",
    company: "Eigen webshops",
    role: "E-commerceondernemer",
    period: "Meerdere ondernemingen",
    featured: true,
    sector: "Webshops",
    icon: "bag",
    summary:
      "Ik heb verschillende webshops opgezet en succesvol producten verkocht in kleding, woon- en thuisartikelen, keukenartikelen, babyspeelgoed en elektronica.",
    tasks: [
      "Webshops en productcategorieën opzetten en beheren.",
      "Producten kiezen en presenteren voor verschillende doelgroepen.",
      "Het verkoopproces van bestelling tot levering bewaken.",
      "Praktijkervaring opdoen met online verkoop en ondernemerschap.",
    ],
    value: "Ik kan een verkoopkanaal vanaf nul opbouwen en zelfstandig draaiende houden.",
    tags: ["Webshops", "Productselectie", "Kleding", "Wonen & keuken", "Elektronica"],
  },
  {
    id: "groene-energie",
    track: "ondernemer",
    group: "eigen-bedrijf",
    company: "Groene energie",
    role: "Eigenaar · verkoop zonnepanelen en laadpalen",
    period: "2018 — 2020",
    featured: true,
    sector: "Eigen bedrijf",
    icon: "sun",
    summary:
      "Van 2018 tot 2020 bouwde ik een eigen onderneming in groene energie op. Via een samenwerking met een Nederlandse leverancier verkocht ik zonnepanelen en laadpalen. Tijdens de coronaperiode zorgden een tekort aan installateurs en monteurs en stijgende product- en inkoopkosten voor een steeds lagere marge. Daarom heb ik het bedrijf in 2020 met winst verkocht.",
    story: [
      { title: "2018 · Opgebouwd", text: "Een eigen bedrijf opgezet in zonnepanelen en laadpalen." },
      { title: "Samengewerkt", text: "Via een samenwerking met een Nederlandse leverancier zonnepanelen en laadpalen verkocht." },
      { title: "Markt veranderde", text: "Tijdens corona: een tekort aan installateurs en monteurs en stijgende product- en inkoopkosten." },
      { title: "2020 · Met winst verkocht", text: "Een zakelijk besluit genomen en het bedrijf met winst overgedragen." },
    ],
    tasks: [
      "Zonnepanelen en laadpalen verkopen via een Nederlandse leverancier.",
      "Een commerciële samenwerking opbouwen en de onderneming ontwikkelen.",
      "In 2020 zakelijk reageren op veranderde marktomstandigheden en het bedrijf met winst overdragen.",
    ],
    value:
      "Ik kan cijfers lezen, de markt realistisch beoordelen en een moeilijke beslissing op tijd en zakelijk nemen.",
    tags: ["Eigen bedrijf", "Groene energie", "B2B-samenwerking", "Sales", "Ondernemersbesluit"],
  },
  {
    id: "webshop-bemiddeling",
    track: "ondernemer",
    group: "webshops",
    company: "Webshops kopen & verkopen",
    role: "Bemiddelaar bij webshopovernames",
    period: "Eerdere ervaring",
    featured: true,
    sector: "Overnames",
    icon: "swap",
    summary:
      "Ik heb webshops en websites overgenomen en weer doorverkocht. Daarnaast hielp ik ondernemers die met iets nieuws wilden beginnen om hun bestaande webshop te verkopen: ik bracht koper en verkoper samen, begeleidde de verkoop en ontving daarvoor een commissie.",
    tasks: [
      "Webshops en websites overnemen en weer doorverkopen.",
      "Voor verkopers een geschikte koper zoeken en benaderen.",
      "Koper en verkoper begeleiden tot de overdracht rond was.",
      "Werken op commissiebasis: alleen een vergoeding bij een geslaagde verkoop.",
    ],
    value: "Ik kan onderhandelen, belangen van twee partijen verbinden en een deal tot het einde begeleiden.",
    tags: ["Bemiddeling", "Overnames", "Onderhandelen", "Commissie"],
  },
  {
    id: "meubelverkoop",
    track: "ondernemer",
    group: "webshops",
    company: "Meubelverkoop",
    role: "Online verkooppartner van een Nederlands meubelbedrijf",
    period: "Eerdere onderneming",
    sector: "Samenwerking",
    icon: "sofa",
    summary:
      "Voor een Nederlands meubelbedrijf verkocht ik artikelen online. In deze samenwerking combineerde ik e-commerce met de online presentatie van een bestaand assortiment.",
    tasks: [
      "Meubelartikelen online presenteren en verkopen.",
      "Werken met het assortiment van een Nederlandse samenwerkingspartner.",
      "E-commerce inzetten binnen de woon- en meubelbranche.",
    ],
    value: "Ik kan zakelijke samenwerkingen aangaan en een bestaand merk zorgvuldig vertegenwoordigen.",
    tags: ["Meubels", "E-commerce", "Samenwerking", "Online presentatie"],
  },
  {
    id: "webdesign",
    track: "ondernemer",
    group: "eigen-bedrijf",
    company: "Eigen onderneming",
    role: "Websiteontwikkeling & webdesign",
    period: "Heden",
    current: true,
    sector: "Digitale dienstverlening",
    icon: "browser",
    summary:
      "Als zelfstandig webdesigner begeleid ik ondernemers van de eerste vraag tot een bruikbare online presentatie. Daarbij combineer ik klantcontact, structuur, vormgeving en technische uitvoering.",
    tasks: [
      "Doel, doelgroep en inhoud van een website samen met de opdrachtgever verhelderen.",
      "Klantwensen vertalen naar navigatie, pagina-indeling en een passende visuele stijl.",
      "Websites uitwerken met onder meer WordPress, Shopify en e-commercekennis.",
      "Opdrachtgevers begeleiden tijdens feedback, oplevering en ondersteuning daarna.",
    ],
    value:
      "Bewijs van initiatief, zelfstandigheid en het vermogen om een klantvraag van gesprek tot oplevering te begeleiden.",
    tags: ["Klantintake", "Webdesign", "WordPress", "Shopify", "Projecteigenaarschap"],
  },
];

export const experienceBySlug = (slug: string) => experience.find((e) => e.id === slug);

/* ───────────── Projecten ───────────── */

export const projectsIntro = {
  label: "Websites die ik bouwde",
  title: "Naast mijn werk:",
  titleAccent: "websites voor ondernemers.",
  intro:
    "Als zelfstandig webdesigner bouw ik websites voor lokale ondernemers. Dat vraagt om initiatief, goed luisteren, structuur aanbrengen en verantwoordelijkheid nemen tot de oplevering.",
  note: "De previews tonen de websites zoals gecontroleerd in november 2026. Externe websites kunnen later veranderen. Er worden geen onbevestigde resultaten of bezoekerscijfers genoemd.",
  processTitle: "Zo pak ik een project aan.",
  processIntro:
    "Ik begin bij het doel van de onderneming en de informatie die een bezoeker nodig heeft. Daarna werk ik structuur, uitstraling en contactmogelijkheden uit.",
  process: [
    "Doel en doelgroep bespreken",
    "Pagina’s en inhoud structureren",
    "Ontwerp uitwerken en feedback verwerken",
    "Controleren en opleveren",
  ],
};

export const projects: Project[] = [
  {
    id: "rijschool-rewald",
    name: "Rijschool Rewald",
    url: "https://www.rijschoolrewald.com/",
    domain: "rijschoolrewald.com",
    category: "Rijschool",
    image: "/images/projecten/rijschool-rewald.webp",
    description:
      "Rijschoolwebsite met informatie over lessen en mogelijkheden om contact op te nemen.",
    checked: "Websitepreview · november 2026",
    published: true,
  },
  {
    id: "paardrijles-zaanstad",
    name: "Paardrijles Zaanstad",
    url: "https://www.paardrijleszaanstad.nl/",
    domain: "paardrijleszaanstad.nl",
    category: "Paardensport",
    image: "/images/projecten/paardrijles-zaanstad.webp",
    description: "Een digitale presentatie van paardrijlessen in de Zaanstreek.",
    checked: "Websitepreview · november 2026",
    published: true,
  },
  // [INVULLEN: bevestig je betrokkenheid + voeg een screenshot toe in public/images/projecten/, zet daarna published: true]
  {
    id: "potters-glory-designs",
    name: "Potter’s Glory Designs",
    url: "https://www.pottersglorydesigns.com/",
    domain: "pottersglorydesigns.com",
    category: "Zakelijk",
    description: "Websiteproject gericht op online presentatie en digitale dienstverlening.",
    checked: "",
    published: false,
  },
  {
    id: "pwa-manege",
    name: "PWA Manege",
    url: "https://www.pwamanege.nl/",
    domain: "pwamanege.nl",
    category: "Paardensport",
    description: "Project in de paardensportsector met informatie en online presentatie.",
    checked: "",
    published: false,
  },
];

/* ───────────── Vaardigheden ───────────── */

export const skillsIntro = {
  title: "Commercieel denken.",
  titleAccent: "Persoonlijk handelen.",
  intro:
    "Mijn vaardigheden verbinden klantadvies, communicatie en digitale uitvoering. Toegepast in de praktijk, zonder betekenisloze scores.",
};

export const skillGroups: SkillGroup[] = [
  {
    id: "verkoop",
    title: "Verkoop & klantadvies",
    intro:
      "Ik stel gerichte vragen, vergelijk mogelijkheden en maak de keuze voor een klant begrijpelijk.",
    practice: "Toegepast bij VodafoneZiggo, OPPO, deur-tot-deurverkoop en high-ticket closing.",
    skills: [
      "Adviesverkoop",
      "Behoefteanalyse",
      "Acquisitie",
      "Productuitleg",
      "Bezwaren behandelen",
      "Klantrelaties",
    ],
  },
  {
    id: "communicatie",
    title: "Communicatie & samenwerking",
    intro:
      "Ik blijf benaderbaar, communiceer duidelijk en stem mijn aanpak af op de klant, collega of opdrachtgever.",
    practice: "Ontwikkeld in telecom, supermarktretail, operationeel werk en klantprojecten.",
    skills: [
      "Actief luisteren",
      "Klantcontact",
      "Samenwerken",
      "Zelfstandig werken",
      "Afspraken nakomen",
      "Professioneel schakelen",
    ],
  },
  {
    id: "web",
    title: "E-commerce & webdesign",
    intro:
      "Ik vertaal een zakelijke vraag naar een overzichtelijke website en begeleid het proces tot een bruikbare oplevering.",
    practice: "Opgebouwd met bol (sinds 2021), Amazon, eigen webshops en websites voor ondernemers.",
    skills: [
      "Marketplaces (bol, Amazon)",
      "Eigen webshops",
      "Webdesign",
      "WordPress",
      "Shopify",
      "Digitale communicatie",
    ],
  },
];

/* ───────────── Ontwikkeling & ambitie ───────────── */

export const growth = {
  title: "Wat ik al meebreng.",
  titleAccent: "Waar ik verder in groei.",
  intro:
    "Mijn ontwikkeling zit niet in losse titels, maar in wat verschillende werkomgevingen mij hebben geleerd.",
  bring: [
    {
      title: "Klantgesprekken",
      text: "Van een gesprek openen tot doorvragen, opties toelichten en professioneel omgaan met twijfels of bezwaren.",
    },
    {
      title: "Merk & product",
      text: "Ervaring met telecomadvies, productdemonstraties en een verzorgde presentatie richting klanten.",
    },
    {
      title: "Werkdiscipline",
      text: "Retail en operationeel werk hebben mijn gevoel voor tempo, nauwkeurigheid en samenwerking versterkt.",
    },
    {
      title: "Eigen initiatief",
      text: "Met webdesign leer ik zelf plannen, klantverwachtingen bewaken en verantwoordelijkheid nemen voor een oplevering.",
    },
  ],
  goals: [
    {
      title: "Commercieel verdiepen.",
      text: "Sterker worden in behoefteanalyse, advies, productkennis, relatieopbouw en het professioneel afronden van verkoopgesprekken.",
    },
    {
      title: "Breder verantwoordelijkheid dragen.",
      text: "Meer leren over planning, samenwerking, klantbehoud en het begeleiden van een traject van eerste contact tot resultaat.",
    },
    {
      title: "Een eigen bedrijf uitbouwen.",
      text: "Mijn ervaring in webdesign en dienstverlening verder professionaliseren met betere processen, sterkere projecten en langdurige klantrelaties.",
    },
  ],
  drive:
    "Voor mij ontstaat groei door te doen: gesprekken voeren, feedback vragen, productkennis opbouwen, samenwerken met ervaren collega’s en achteraf beoordelen wat beter kan.",
  seeking:
    "Ik kom het beste tot mijn recht in een team waar klantgerichtheid, duidelijke verwachtingen en ruimte om vragen te stellen belangrijk zijn. Ik breng energie, initiatief en brede praktijkervaring mee.",
  seekingTags: ["Coaching in de praktijk", "Duidelijke doelen", "Klantcontact", "Eigen verantwoordelijkheid"],
};

/* ───────────── Opleiding & certificaten ───────────── */

export const education = [
  {
    title: "MBO Financiële Administratie",
    school: "ROC TOP",
    period: "", // [INVULLEN: periode + of de opleiding is afgerond]
  },
];

/** [INVULLEN: certificaten, bv. { title: "…", issuer: "…", year: "2025" }] — leeg = verborgen */
export const certificates: { title: string; issuer: string; year: string }[] = [];

/** Alleen echte, toegestane citaten. Leeg = sectie verborgen. */
export const testimonials: { quote: string; name: string; role: string }[] = [];

/* ───────────── Cv ───────────── */

export const cv = {
  /** Origineel, vormgegeven cv — exact zoals op aymanzakelijk.nl */
  pdf: "/cv/CV_Ayman_El_Hammoudi.pdf",
  preview: "/images/cv-preview-720.webp",
  previewSize: { width: 720, height: 1018 },
  fileName: "CV_Ayman_El_Hammoudi.pdf",
  /** ATS-versie: doorzoekbare tekst, gemaakt met `npm run cv:pdf` uit de online cv-pagina */
  ats: "/cv/CV_Ayman_El_Hammoudi_ATS.pdf",
  atsFileName: "CV_Ayman_El_Hammoudi_ATS.pdf",
  subtitle: "Verkoopadviseur · Retail & sales · Ondernemer en webdesigner",
  profile:
    "Commercieel ingestelde verkoopadviseur met ervaring in telecomretail, deur-tot-deurverkoop, klantservice, marketplaces en zelfstandig ondernemerschap. Sterk in luisteren, behoefteanalyse en het begrijpelijk presenteren van passende opties. Combineert persoonlijk klantcontact met resultaatgericht werken, eigenaarschap en een praktische digitale blik.",
  skills: [
    "Adviesverkoop",
    "Klantbehoefteanalyse",
    "Deur-tot-deurverkoop",
    "Closing",
    "Marketplaceverkoop",
    "E-commerce",
    "Webdesign",
    "WordPress",
    "Shopify",
    "Orderpicking",
  ],
};


/* ───────────── Contact ───────────── */

export const contact = {
  eyebrow: "De volgende stap",
  title: "Een goed gesprek.",
  titleAccent: "Een nieuw begin.",
  intro:
    "Ik sta open voor gesprekken over functies waarin klantcontact, advies, commercie en ontwikkeling samenkomen. Ik maak graag kennis.",
  topics: ["Een vacature of functie", "Een kennismakingsgesprek", "Een vraag over mijn cv"],
  privacy: "Geen tracking, geen cookies. Je bericht gaat rechtstreeks naar mij.",
};

export const footer = {
  motto: ["Persoonlijk in contact.", "Ondernemend in mijn aanpak."],
  disclaimer: "Persoonlijk portfolio · Niet gelieerd aan genoemde werkgevers",
};

/* ───────────── Interfaceteksten (knoppen, labels, meldingen) ───────────── */

/* ───────────── Extra secties (letterlijk van aymanzakelijk.nl) ───────────── */

/** Sfeerbeelden van aymanzakelijk.nl: geen werkplek of werkgever. */
export const atmosphere = {
  sales: { src: "/images/sfeer/sales-adviesruimte.webp", alt: "Sfeerbeeld van een verzorgde adviesruimte in navy en goud", caption: "Sfeerbeeld · geen foto van een werkgever" },
  office: { src: "/images/sfeer/premium-kantoor.webp", alt: "Sfeerbeeld van een rustig kantoor in navy en goud", caption: "Sfeerbeeld · geen foto van mijn kantoor" },
  web: { src: "/images/sfeer/webdesign-werkplek.webp", alt: "Sfeerbeeld van een werkplek met een laptop en een monitor", caption: "Sfeerbeeld · geen foto van mijn werkplek" },
  growth: { src: "/images/sfeer/ambitie-ontwikkeling.webp", alt: "Sfeerbeeld van een bureau met een notitieboek en een laptop bij zonsondergang", caption: "Sfeerbeeld · gemaakt voor deze website" },
};

export const sections = {
  rail: {
    label: "Alle ervaring",
    title: "Elke ervaring.",
    accent: "Een eigen plek.",
    intro: "Scroll door alle onderdelen van mijn loopbaan en ondernemerschap. Open een kaart voor de volledige pagina.",
    hint: "Blijf scrollen",
    open: "Bekijk",
  },
  homePerson: {
    label: "De persoon achter het werk",
    title: "Goed advies begint met",
    accent: "écht luisteren.",
    text: [
      "Ik wil begrijpen wat iemand nodig heeft. Daar begint voor mij een goed gesprek.",
      "Die overtuiging neem ik mee in mijn werk bij VodafoneZiggo, mijn eerdere verkoopervaring en de websites die ik voor ondernemers maak.",
    ],
    cta: "Meer over mij",
  },
  homeWork: {
    label: "Geselecteerd werk",
    title: "Van een idee naar",
    accent: "een online visitekaartje.",
    intro: "Een selectie uit mijn werk als zelfstandig webdesigner.",
    cta: "Alle projecten",
  },
  next: {
    label: "De volgende stap",
    title: "Een goed gesprek.",
    accent: "Een nieuw begin.",
    text: "Over sales, een nieuwe uitdaging of een website voor jouw onderneming. Ik maak graag kennis.",
    cta: "Laten we kennismaken",
  },
  aboutOnline: {
    label: "Ondernemerschap",
    title: "Ook online gaat het om",
    accent: "mensen.",
    text: [
      "Naast mijn werk ontwikkel ik websites voor ondernemers. Dat vraagt om initiatief, goed luisteren, structuur aanbrengen en verantwoordelijkheid nemen tot de oplevering.",
      "Een website is vaak het eerste contact met een bedrijf. Daarom combineer ik mijn commerciële ervaring met aandacht voor tekst, uitstraling en gebruiksgemak.",
    ],
    cta: "Bekijk mijn webprojecten",
  },
  aboutVentures: {
    label: "Ondernemende ervaring",
    title: "Meer dan alleen",
    accent: "websiteontwikkeling.",
    intro: "Mijn ondernemerschap omvat marketplaces, eigen webshops, commerciële samenwerkingen, high-ticket sales en een bedrijf in groene energie.",
    items: [
      { title: "bol & Amazon", text: "Ervaring met productverkoop via Nederlandse en internationale marketplaces." },
      { title: "Eigen webshops", text: "Online verkoop in meerdere productcategorieën en samenwerking met een meubelbedrijf." },
      { title: "Groene energie", text: "Een bedrijf in zonnepanelen en laadpalen opgebouwd en met winst overgedragen." },
      { title: "Sales", text: "High-ticket closing en cursusverkoop voor ondernemers en salesprofessionals." },
    ],
    cta: "Bekijk mijn ondernemerschap",
  },
  expProfile: {
    label: "Profiel in één oogopslag",
    title: "Wat een recruiter",
    accent: "direct mag onthouden.",
    intro: "Mijn ervaring loopt uiteen, maar de rode draad is duidelijk: contact leggen, luisteren, helder uitleggen en verantwoordelijkheid nemen voor een goed resultaat.",
    items: [
      { title: "Commercieel", text: "Ervaring met adviesverkoop, directe acquisitie, productdemonstraties en het behandelen van vragen en bezwaren." },
      { title: "Klantgericht", text: "Gewend om verschillende klantvragen te vertalen naar begrijpelijke opties en een passende vervolgstap." },
      { title: "Ondernemend", text: "Zelf websites opzetten voor ondernemers, van intake en structuur tot oplevering en ondersteuning." },
      { title: "Breed inzetbaar", text: "Ervaring in telecom, supermarktretail, e-commerceprocessen en zelfstandig digitaal werk." },
    ],
  },
  expThread: {
    label: "De rode draad",
    lines: ["Luisteren.", "Uitleggen.", "Verantwoordelijkheid nemen."],
    text: [
      "Op de winkelvloer, aan de deur, bij een productdemonstratie of in een webproject: ik begin bij de vraag, maak mogelijkheden begrijpelijk en werk toe naar een concrete volgende stap.",
      "Daardoor zijn mijn ervaringen uit verschillende sectoren goed met elkaar te verbinden.",
    ],
    career: "Mijn loopbaan",
    careerIntro: "Open iedere functie voor werkzaamheden, kerncompetenties en de waarde die ik uit die ervaring meeneem.",
    cv: "Bekijk mijn volledige cv",
  },
  ventGlance: {
    label: "In één oogopslag",
    title: "Van productidee naar",
    accent: "praktijkervaring.",
    intro: "Mijn ondernemerschap loopt van online marketplaces en eigen webshops tot sales voor coaching en een onderneming in groene energie. Iedere stap heeft mij geleerd om kansen te beoordelen, verantwoordelijkheid te nemen en mij aan veranderende omstandigheden aan te passen.",
    items: [
      { title: "Marketplaces", text: "Verkoopervaring via bol sinds 2021 en één jaar via Amazon." },
      { title: "Webshops", text: "Productverkoop in onder meer kleding, wonen, keuken, babyspeelgoed en elektronica." },
      { title: "Eigen bedrijf", text: "Een onderneming in zonnepanelen en laadpalen opgebouwd en later met winst verkocht." },
      { title: "Sales", text: "High-ticket gesprekken en cursusverkoop binnen e-commerce en salesontwikkeling." },
    ],
    pick: "Kies wat je wilt bekijken",
    pickTitle: "Elke ervaring. Een eigen plek.",
    note: "Deze beschrijvingen zijn gebaseerd op mijn eigen praktijkervaring. Er worden bewust geen onbevestigde omzetcijfers, klantresultaten of merknamen van niet-publieke samenwerkingspartners genoemd.",
  },
  ventTake: {
    label: "Wat ik meeneem",
    lines: ["Commercieel denken.", "Zelf handelen.", "Op tijd bijsturen."],
    text: "Ondernemen heeft mij geleerd om zelf keuzes te maken, klanten en markten te begrijpen en ook moeilijke beslissingen zakelijk te beoordelen. Die ervaring neem ik mee naar iedere commerciële functie en samenwerking.",
    cta: "Lees mijn ambitie",
  },
  skillsFlow: {
    label: "Van gesprek naar uitvoering",
    lines: ["Meedenken.", "Uitwerken.", "Opleveren."],
    text: "Mijn commerciële en digitale werk sluiten op elkaar aan. Ik begin met de vraag van de klant en werk toe naar een bruikbare oplossing.",
    cta: "Bekijk de projecten",
  },
  contactQuick: {
    label: "Snel naar de juiste informatie",
    title: "Alles wat een werkgever",
    accent: "nodig heeft.",
    items: [
      { key: "experience", title: "Ervaring", text: "Alle rollen met werkzaamheden, vaardigheden en de waarde die ik uit iedere omgeving meeneem." },
      { key: "skills", title: "Sterke punten", text: "Een praktisch overzicht van verkoop, communicatie, samenwerking en digitale uitvoering." },
      { key: "ambition", title: "Ambitie", text: "Mijn doelen voor verdere ontwikkeling in commercie, verantwoordelijkheid en ondernemerschap." },
      { key: "cv", title: "Curriculum vitae", text: "Het juiste cv is direct op de website te lezen, volledig te openen en als PDF te downloaden." },
    ] as { key: PageKey; title: string; text: string }[],
    note: "De knoppen openen je eigen e-mail- of telefoonapp. Deze website gebruikt geen tracking of cookies.",
  },
  ambition: {
    drive: {
      label: "Wat mij drijft",
      title: "Groeien door",
      accent: "praktijkervaring.",
      text: [
        "Ik wil mij ontwikkelen tot een veelzijdige commerciële professional die klanten goed begrijpt, verantwoordelijkheid pakt en ideeën zelfstandig kan uitvoeren.",
        "Voor mij ontstaat groei door te doen: gesprekken voeren, feedback vragen, productkennis opbouwen, samenwerken met ervaren collega’s en achteraf beoordelen wat beter kan.",
        "Ik zoek daarom geen snelle titel, maar een omgeving waarin prestaties, ontwikkeling en betrouwbaarheid samenkomen.",
      ],
    },
    direction: {
      label: "Mijn richting",
      title: "Drie doelen voor",
      accent: "de komende jaren.",
      intro: "Ambitie betekent voor mij concreet blijven leren en de kwaliteit van mijn werk stap voor stap verhogen.",
    },
    bring: { label: "Wat ik al meebreng" },
    seek: {
      label: "Wat ik zoek",
      title: "Een plek om bij te dragen",
      accent: "én door te groeien.",
      cv: "Bekijk mijn cv",
      contact: "Neem contact op",
    },
  },
};

export const ui = {
  lang: "nl",
  langName: "Nederlands",
  skip: "Direct naar inhoud",
  nav2: {
    search: "Zoeken",
    searchHint: "Zoek een pagina of ervaring…",
    searchLabel: "Snel navigeren",
    empty: "Niets gevonden. Probeer een ander woord.",
    groupPages: "Pagina’s",
    groupExperience: "Ervaring & ondernemerschap",
    home: "Home",
    contact: "Contact",
    close: "Sluiten",
    navigate: "navigeren",
    open: "openen",
  },
  toc: "Op deze pagina",
  availability: { title: "Beschikbaarheid", text: "Open voor gesprekken over een nieuwe functie in sales, retail of e-commerce.", region: "Regio", email: "E-mail", phone: "Telefoon", languages: "Talen" },
  homeUi: { highlights: "Hoogtepunten", tracks: "Ervaring", viewTrack: { sales: "Bekijk mijn ervaring", ondernemer: "Bekijk mijn ondernemerschap" }, items: "onderdelen" },
  caseTitle: "Uitgelicht: groene energie",
  footerCols: { pages: "Pagina’s", contact: "Contact", language: "Taal" },
  header: {
    navAria: "Hoofdnavigatie",
    homeAria: "naar de homepage",
    cta: "Kennismaken",
    menuOpen: "Menu openen",
    menuClose: "Menu sluiten",
    menu: "Menu",
    mobileNavAria: "Mobiele navigatie",
    toDark: "Schakel naar donkere modus",
    toLight: "Schakel naar lichte modus",
    langSwitch: "Taal",
  },
  footer: {
    nav: "Navigatie",
    allExperience: "Alle ervaring",
    onlineCv: "Online cv",
    localTime: "lokale tijd",
    backToTop: "Terug naar boven",
    emailAria: "Stuur een e-mail",
  },
  hero: {
    iAm: "Ik ben",
    scroll: "Scroll verder",
    index: "01 / Profiel",
    side: "Persoonlijk. Professioneel. Ondernemend.",
    caption: "Sales · Retail · E-commerce",
  },
  marquee: "Ervaring opgebouwd bij · verkocht voor · verkocht via",
  quick: {
    label: "In 30 seconden",
    act: "Direct regelen",
    download: "Download mijn cv",
    meet: "Plan een kennismaking",
    meetSubject: "Uitnodiging kennismakingsgesprek",
    at: "bij",
    sectors: "Ervaring in",
    strengths: "Sterk in",
    education: "Opleiding",
    langRegion: "Talen & regio",
    years: "jaar",
    seeking: "Wat ik zoek",
  },
  tracks: {
    label: "Ervaring",
    overview: "Alles op een rij (tijdlijn)",
    parts: "onderdelen · klik om te openen",
    current: "Huidig",
    view: "Bekijk wat ik deed",
    brands: "Verkochte merken",
    cursor: "Bekijk",
  },
  about: { label: "Over mij", title: "Aangenaam.", accent: "Ik ben Ayman.", traits: "Zo ken je mij", way: "Mijn manier van werken" },
  expertise: { label: "Mijn sterke punten" },
  skills: {
    label: "Vaardigheden",
    tabsAria: "Vaardigheidsgroepen",
    expertise: "Expertise",
    practice: "In de praktijk",
    education: "Opleiding",
    languages: "Talen",
    tools: "Tools",
    certificates: "Certificaten",
  },
  growth: {
    label: "Ontwikkeling & ambitie",
    viewsAria: "Kies een weergave",
    bring: "Wat ik meebreng",
    goals: "Waar ik naartoe wil",
    drive: "Wat mij drijft",
    seeking: "Wat ik zoek",
  },
  projects: {
    all: "Alles",
    filterAria: "Filter projecten",
    visit: "bekijk website (opent in nieuw tabblad)",
    newTab: "(opent in nieuw tabblad)",
    cursor: "Bekijk",
    process: "Werkwijze",
  },
  cvSection: {
    eyebrow: "Curriculum vitae",
    title: "Mijn ervaring.",
    accent: "Direct in beeld.",
    intro: "Download mijn vormgegeven cv, of de ATS-versie met doorzoekbare tekst voor sollicitatiesystemen. Liever lezen op het scherm? Open de online versie.",
    note: "Het vormgegeven cv is exact het cv van aymanzakelijk.nl. De ATS-versie en de online versie bevatten dezelfde ervaring als deze website.",
    download: "Download cv (PDF)",
    ats: "ATS-versie (tekst)",
    online: "Bekijk de online versie",
    openAria: "Open cv als PDF (nieuw tabblad)",
    previewAlt: "Voorbeeld van het cv van Ayman El Hammoudi",
    otherLang: { label: "English CV", href: "/cv/CV_Ayman_El_Hammoudi_EN.pdf" },
  },
  share: { idle: "Deel dit profiel met een collega", done: "Link gekopieerd" },
  contact: {
    topicLegend: "Waar gaat het over?",
    name: "Je naam",
    email: "Je e-mailadres",
    message: "Je bericht",
    errName: "Vul je naam in.",
    errEmail: "Vul een geldig e-mailadres in.",
    errMessage: "Schrijf een bericht van minimaal 10 tekens.",
    send: "Verstuur bericht",
    sendMail: "Verstuur via je e-mailapp",
    sending: "Versturen…",
    sent: "Bedankt! Je bericht is verstuurd. Ik reageer zo snel mogelijk.",
    error: "Er ging iets mis. Mail me direct op",
    copy: "Kopieer",
    copied: "Gekopieerd",
    copyAria: "Kopieer e-mailadres",
    subject: "kennismaking via website",
  },
  cta: { title: "Past mijn ervaring", accent: "bij jouw team?", download: "Download mijn cv", meet: "Plan een kennismaking" },
  overview: {
    label: "Alle ervaring op een rij",
    title: "Een loopbaan in contact.",
    accent: "Een ondernemer in e-commerce.",
    intro: "Alle ervaring in één tijdlijn. Filter op spoor, klap een onderdeel open of open de volledige pagina.",
    thread: "De rode draad",
    filterAria: "Filter werkervaring",
    one: "ervaring",
    many: "ervaringen",
    tasks: "Werkzaamheden",
    says: "Wat dit zegt over mij",
    full: "Open de volledige pagina",
    details: "details",
    open: "Open",
    close: "Sluit",
    metaTitle: "Alle ervaring",
    metaDescription: "De volledige loopbaan van Ayman El Hammoudi: sales en retail in loondienst, en ondernemerschap in e-commerce.",
  },
  detail: {
    crumbs: "Kruimelpad",
    home: "Home",
    summary: "Samenvatting",
    brands: "Merken die ik verkocht",
    story: "Het verhaal in vier stappen",
    did: "Wat ik deed",
    says: "Wat dit zegt over mij",
    keywords: "Kernwoorden",
    other: "Andere ervaring",
    prev: "Vorige",
    next: "Volgende",
    all: "Alle ervaring op een rij",
  },
  cvPage: {
    back: "← Terug naar de homepage",
    print: "Print / bewaar als PDF",
    download: "Download vormgegeven cv",
    ats: "Download ATS-versie",
    eyebrow: "Curriculum vitae",
    profile: "Profiel",
    work: "Werkervaring & sales",
    venture: "Ondernemerschap",
    education: "Opleiding",
    skills: "Vaardigheden",
    languages: "Talen",
    metaTitle: "Online cv",
    metaDescription: "Doorzoekbaar, ATS-vriendelijk cv van Ayman El Hammoudi: verkoopadviseur en e-commerceondernemer uit Noord-Holland.",
  },
};
