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

export type ExperienceCategory = "sales" | "retail" | "digitaal";

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  current?: boolean;
  sector: string;
  category: ExperienceCategory;
  logo?: string;
  summary: string;
  tasks: string[];
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
  role: "Verkoopadviseur & webdesigner",
  roleShort: ["Verkoopadviseur", "Webdesigner"],
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
  title: "Ayman El Hammoudi — Verkoopadviseur & webdesigner",
  description:
    "Ayman El Hammoudi, verkoopadviseur bij VodafoneZiggo uit Noord-Holland. Bekijk zijn ervaring in sales en retail, zijn sterke punten en download zijn cv.",
};

/* ───────────── Navigatie ───────────── */

export const nav = [
  { id: "ervaring", label: "Ervaring" },
  { id: "over", label: "Over mij" },
  { id: "vaardigheden", label: "Vaardigheden" },
  { id: "werk", label: "Initiatief" },
  { id: "cv", label: "Cv" },
  { id: "contact", label: "Contact" },
];

/* ───────────── Hero ───────────── */

export const hero = {
  status: "Open voor gesprekken over een nieuwe functie",
  tagline: ["Mensen.", "Vertrouwen.", "Vooruitgang."],
  intro:
    "Een commerciële professional uit Noord-Holland met ervaring in klantadvies, retail, directe verkoop en zelfstandig webdesign.",
  footnote: "Praktisch, leergierig en klantgericht.",
  primaryCta: { label: "Download mijn cv", href: "/cv.pdf" },
  secondaryCta: { label: "Bekijk mijn ervaring", href: "#ervaring" },
};

/* Werkgevers voor de logoband */
export const employers = [
  { name: "VodafoneZiggo", logo: "/images/logos/vodafone.svg" },
  { name: "OPPO", logo: "/images/logos/oppo.svg" },
  { name: "COOP", logo: "/images/logos/coop.svg" },
  { name: "PLUS", logo: "/images/logos/plus.svg" },
  { name: "Picnic", logo: "/images/logos/picnic.svg" },
];

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
  sectors: ["Telecomretail", "Direct sales", "Supermarktretail", "E-commerce operatie", "Webdesign"],
  strengths: ["Adviesverkoop", "Behoefteanalyse", "Bezwaren behandelen", "Klantcontact", "Eigenaarschap"],
  seeking:
    "Ik zoek geen snelle titel, maar een omgeving waarin prestaties, ontwikkeling en betrouwbaarheid samenkomen.",
};

/* ───────────── Over mij ───────────── */

export const about = {
  statement: "Goed advies begint met écht luisteren.",
  lead: "Ik wil begrijpen wat iemand nodig heeft. Daar begint voor mij een goed gesprek.",
  story: [
    "Ik ben 23 jaar, woon in Noord-Holland en ontwikkel mij op het snijvlak van commercie, klantcontact en ondernemerschap.",
    "Als verkoopadviseur bij VodafoneZiggo help ik klanten verschillende telecomproducten en diensten begrijpen. Daarbij combineer ik persoonlijke service met aandacht voor commerciële doelstellingen.",
    "Eerder werkte ik in merkpresentatie, directe verkoop, supermarktretail en een operationele e-commerceomgeving. Daardoor kan ik gemakkelijk schakelen tussen klantcontact, zelfstandig werken en samenwerken in een team.",
    "Naast mijn werk ontwikkel ik websites voor ondernemers. Dat vraagt om initiatief, goed luisteren, structuur aanbrengen en verantwoordelijkheid nemen tot de oplevering.",
  ],
  traits: ["Klantgericht", "Praktisch", "Leergierig", "Ondernemend"],
  stats: [
    { value: 7, suffix: "", label: "rollen in sales, retail & digitaal" },
    { value: 5, suffix: "", label: "bekende namen, van VodafoneZiggo tot Picnic" },
    { value: 2, suffix: "", label: "websites live voor ondernemers" },
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
      link: { label: "Bekijk mijn loopbaan", href: "#ervaring" },
    },
    {
      label: "Samenwerking",
      icon: "handshake" as const,
      title: "Contact & betrouwbaarheid",
      text: "Ik communiceer helder, blijf professioneel bij vragen of bezwaren en kom afspraken na in klant- en teamcontact.",
      link: { label: "Bekijk mijn sterke punten", href: "#vaardigheden" },
    },
    {
      label: "Initiatief",
      icon: "browser" as const,
      title: "Webdesign & eigenaarschap",
      text: "Ik werk ideeën zelfstandig uit tot een bruikbare website en begeleid de opdrachtgever van intake tot oplevering.",
      link: { label: "Bekijk mijn eigen projecten", href: "#werk" },
    },
  ],
};

/* ───────────── Werkervaring ───────────── */

export const experienceIntro = {
  title: "Een loopbaan in contact.",
  titleAccent: "Een brede blik op sales.",
  intro:
    "Zeven rollen die samen een profiel vormen in adviesverkoop, retail, directe acquisitie, digitale dienstverlening en operationele samenwerking.",
  thread:
    "Op de winkelvloer, aan de deur, bij een productdemonstratie of in een webproject: ik begin bij de vraag, maak mogelijkheden begrijpelijk en werk toe naar een concrete volgende stap.",
  note: "Exacte periodes en functietitels staan alleen vermeld waar ze zijn bevestigd. Bedrijfslogo’s dienen uitsluitend ter herkenning van de genoemde werkervaring.",
  filters: [
    { id: "alles", label: "Alles" },
    { id: "sales", label: "Sales" },
    { id: "retail", label: "Retail & operatie" },
    { id: "digitaal", label: "Digitaal" },
  ] as { id: "alles" | ExperienceCategory; label: string }[],
};

export const experience: Experience[] = [
  {
    id: "vodafoneziggo",
    company: "VodafoneZiggo",
    role: "Verkoopadviseur",
    period: "Juli 2025 — heden",
    current: true,
    sector: "Telecomretail",
    category: "sales",
    logo: "/images/logos/vodafone.svg",
    summary:
      "In een klantgerichte winkelomgeving adviseer ik consumenten over telecomproducten, abonnementen en aanvullende diensten. Ik combineer service met commerciële scherpte en zoek naar een oplossing die past bij het gebruik en de situatie van de klant.",
    tasks: [
      "Klantbehoeften achterhalen door gericht te luisteren en door te vragen.",
      "Producten, abonnementen en aanvullende diensten duidelijk vergelijken en toelichten.",
      "Verkoopgesprekken professioneel afronden en vragen of bezwaren zorgvuldig behandelen.",
      "Bijdragen aan klanttevredenheid, winkelservice en commerciële doelstellingen.",
    ],
    value:
      "Een sterke combinatie van persoonlijk advies, productkennis en resultaatgericht werken.",
    tags: ["Adviesverkoop", "Behoefteanalyse", "Telecom", "Service", "Commerciële doelen"],
  },
  {
    id: "eigen-onderneming",
    company: "Eigen onderneming",
    role: "Websiteontwikkeling & webdesign",
    period: "Heden",
    current: true,
    sector: "Digitale dienstverlening",
    category: "digitaal",
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
  {
    id: "oppo",
    company: "OPPO",
    role: "Merkambassadeur",
    period: "Eerdere ervaring", // [INVULLEN: exacte periode, nog niet bevestigd]
    sector: "Smartphones & merkactivatie",
    category: "sales",
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
    id: "direct-sales",
    company: "Direct sales",
    role: "Deur-aan-deurverkoop · Telecom",
    period: "Eerdere ervaring", // [INVULLEN: duur, nog niet bevestigd]
    sector: "Direct sales",
    category: "sales",
    summary:
      "In directe verkoop voor telecomcampagnes van onder andere Vodafone, KPN en Budget legde ik actief contact met potentiële klanten en presenteerde ik diensten in een kort, persoonlijk gesprek.",
    tasks: [
      "Zelfstandig nieuwe gesprekken openen en snel vertrouwen opbouwen.",
      "In korte tijd de situatie en mogelijke behoefte van een prospect verkennen.",
      "Diensten helder presenteren en koppelen aan relevante voordelen.",
      "Respectvol omgaan met afwijzing, vragen en bezwaren.",
    ],
    value:
      "Een stevige commerciële basis: initiatief nemen, helder communiceren en professioneel blijven onder druk.",
    tags: ["Acquisitie", "Overtuigingskracht", "Weerbaarheid", "Gespreksopening"],
  },
  {
    id: "coop",
    company: "Coop",
    role: "Winkelmedewerker",
    period: "Eerdere ervaring",
    sector: "Supermarktretail",
    category: "retail",
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
    company: "PLUS",
    role: "Winkelmedewerker",
    period: "Eerdere ervaring",
    sector: "Supermarktretail",
    category: "retail",
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
  {
    id: "picnic",
    company: "Picnic",
    role: "Operationele werkzaamheden", // [INVULLEN: exacte functietitel, nog niet bevestigd]
    period: "Eerdere ervaring",
    sector: "E-commerce operatie",
    category: "retail",
    logo: "/images/logos/picnic.svg",
    summary:
      "Bij Picnic deed ik ervaring op in een operationele e-commerceomgeving. De werkzaamheden vroegen om nauwkeurigheid, een constant werktempo en goede afstemming met collega’s.",
    tasks: [
      "Dagelijkse operationele taken volgens een duidelijke werkwijze uitvoeren.",
      "Nauwkeurig werken in een omgeving met tempo en vaste processen.",
      "Afstemmen met collega’s om het gezamenlijke proces soepel te laten verlopen.",
      "Verantwoordelijkheid nemen voor de kwaliteit van toegewezen taken.",
    ],
    value:
      "Ervaring met procesgericht werken, betrouwbaarheid en samenwerken in een snel bewegende operatie.",
    tags: ["Operationele discipline", "Procesmatig werken", "Tempo", "Teamwerk"],
  },
];

/* ───────────── Projecten ───────────── */

export const projectsIntro = {
  label: "Eigen initiatief",
  title: "Naast mijn werk:",
  titleAccent: "zelf iets opbouwen.",
  intro:
    "Naast mijn baan ontwikkel ik websites voor ondernemers. Dat vraagt om initiatief, goed luisteren, structuur aanbrengen en verantwoordelijkheid nemen tot de oplevering.",
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
    practice: "Toegepast bij VodafoneZiggo, OPPO en directe telecomverkoop.",
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
    title: "Webdesign & uitvoering",
    intro:
      "Ik vertaal een zakelijke vraag naar een overzichtelijke website en begeleid het proces tot een bruikbare oplevering.",
    practice: "Zichtbaar in twee actuele projecten voor ondernemers.",
    skills: [
      "Websiteontwikkeling",
      "Webdesign",
      "WordPress",
      "Shopify",
      "E-commerce",
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
  /** Gegenereerd uit de online cv-pagina (/cv) met alleen bevestigde gegevens — zie README. */
  pdf: "/cv.pdf",
  preview: "/images/cv-preview.jpg",
  fileName: "CV_Ayman_El_Hammoudi.pdf",
  profile:
    "Commercieel ingestelde verkoopadviseur met ervaring in telecomretail, directe acquisitie, klantservice en zelfstandig webdesign. Sterk in luisteren, behoefteanalyse en het begrijpelijk presenteren van passende opties. Combineert persoonlijk klantcontact met resultaatgericht werken, eigenaarschap en een praktische digitale blik.",
  skills: [
    "Adviesverkoop",
    "Klantbehoefteanalyse",
    "Communicatie",
    "Acquisitie",
    "Productdemonstratie",
    "Klantservice",
    "Webdesign",
    "WordPress",
    "Shopify",
    "E-commerce",
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
