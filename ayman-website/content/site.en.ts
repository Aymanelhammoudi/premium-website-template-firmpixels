/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ENGLISH CONTENT — same structure as content/site.ts (Dutch).
 *  Wherever www.aymanzakelijk.nl/en/ has English copy, it is used verbatim.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Experience, Project, SkillGroup, Track } from "./site";
import type { PageKey } from "./routes";

export const person = {
  firstName: "Ayman",
  lastName: "El Hammoudi",
  fullName: "Ayman El Hammoudi",
  initials: "ae",
  role: "Sales Adviser & e-commerce entrepreneur",
  roleShort: ["Sales Adviser", "E-commerce entrepreneur"],
  region: "North Holland",
  age: 23,
  email: "aymanae075@gmail.com",
  phoneDisplay: "06 1906 7349",
  phoneHref: "+31619067349",
  languages: ["Dutch", "English"],
  siteUrl: "https://www.aymanzakelijk.nl",
  portrait: "/images/ayman-portret.webp",
  portraitAlt: "Professional portrait of Ayman El Hammoudi",
  linkedin: "",
  instagram: "",
};

export const seo = {
  title: "Ayman El Hammoudi — Sales Adviser & e-commerce entrepreneur",
  description:
    "Ayman El Hammoudi, Sales Adviser at VodafoneZiggo and e-commerce entrepreneur from North Holland. Explore his experience in sales, retail, bol, Amazon and independent online stores, and download his CV.",
};

export const nav = [
  { key: "experience", label: "Experience" },
  { key: "ventures", label: "Entrepreneurship" },
  { key: "about", label: "About" },
  { key: "skills", label: "Skills" },
  { key: "ambition", label: "Ambition" },
  { key: "websites", label: "Websites" },
  { key: "cv", label: "CV" },
] as { key: PageKey; label: string }[];

export const hero = {
  status: "Open to conversations about a new role",
  tagline: ["People.", "Trust.", "Progress."],
  intro:
    "A commercially minded professional from North Holland with experience in customer advice, retail, door-to-door sales, high-ticket sales and e-commerce.",
  footnote: "Practical, curious and customer-focused.",
  primaryCta: { label: "Download my CV", href: "/cv/CV_Ayman_El_Hammoudi_EN.pdf" },
  secondaryCta: { label: "View my experience", href: "/en/experience/" },
};

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

export const quickScan = {
  title: "At a glance.",
  titleAccent: "For employers & recruiters.",
  current: {
    label: "Current role",
    role: "Sales Adviser",
    company: "VodafoneZiggo",
    since: "Since July 2025",
    logo: "/images/logos/vodafone.svg",
  },
  sectors: ["Telecommunications retail", "Door-to-door sales", "High-ticket sales", "Marketplaces (bol, Amazon)", "Online stores", "Warehouse & retail"],
  strengths: ["Consultative selling", "Closing", "Needs analysis", "Objection handling", "Entrepreneurship", "Ownership"],
  seeking:
    "I am looking for an environment where performance, development and reliability reinforce one another.",
};

export const about = {
  statement: "Good advice starts with genuine listening.",
  statementAccent: "genuine listening.",
  lead: "I want to understand what someone needs. That is where a good conversation begins.",
  story: [
    "I am 23 and based in North Holland, developing my career at the intersection of commerce, customer contact and entrepreneurship.",
    "As a Sales Adviser at VodafoneZiggo, I help customers understand telecommunications products and services. I combine personal service with attention to commercial objectives.",
    "My previous experience includes brand representation, door-to-door sales, high-ticket sales, grocery retail and order picking in a Picnic fulfilment centre. These roles taught me to move confidently between customer contact, independent work and teamwork.",
    "I am also an entrepreneur. I have sold through bol since 2021, spent a year selling on Amazon, ran independent online stores and built a renewable-energy business that I sold at a profit. That taught me to make decisions, work with the numbers and adjust at the right time.",
  ],
  traits: ["Customer-focused", "Practical", "Curious", "Entrepreneurial"],
  stats: [
    { value: 15, suffix: "", label: "experiences in sales, retail and e-commerce" },
    { value: 2021, suffix: "", label: "the year I became a bol seller" },
    { value: 1, suffix: "", label: "own business built and sold at a profit" },
    { value: 2, suffix: "", label: "languages: Dutch & English" },
  ],
  principlesTitle: "Three principles. Every day.",
  principles: [
    { title: "Listen.", text: "Understand what matters first. The right question moves a conversation forward." },
    { title: "Solve.", text: "Explain the options clearly and arrive at a suitable choice without unnecessary complexity." },
    { title: "Deliver.", text: "Honour commitments and maintain attention to the experience from beginning to end." },
  ],
};

export const expertise = {
  title: "Clear in conversation.",
  titleAccent: "Strong in execution.",
  intro: "My strength lies in making contact, understanding needs and taking responsibility for the next step.",
  items: [
    {
      label: "Commercial",
      icon: "chat" as const,
      title: "Advice and sales",
      text: "I listen carefully, compare options and explain solutions clearly. My experience covers telecommunications, retail and direct sales.",
      link: { label: "View my career", href: "/en/experience/" },
    },
    {
      label: "Collaboration",
      icon: "handshake" as const,
      title: "Communication and reliability",
      text: "I communicate clearly, respond professionally to questions or concerns and honour commitments to customers and colleagues.",
      link: { label: "Explore my strengths", href: "/en/skills/" },
    },
    {
      label: "Entrepreneurship",
      icon: "browser" as const,
      title: "E-commerce and ownership",
      text: "I have experience with online stores, marketplaces, commercial partnerships and building and selling a business.",
      link: { label: "View my ventures", href: "/en/entrepreneurship/" },
    },
  ],
};

export const tracks: Record<Track, { label: string; title: string; titleAccent: string; intro: string }> = {
  sales: {
    label: "Track 01 · Sales & retail",
    title: "In employment",
    titleAccent: "and in sales.",
    intro:
      "From the shop floor and the doorstep to closing by phone: roles in which I speak with customers every day and take responsibility for results.",
  },
  ondernemer: {
    label: "Track 02 · Entrepreneurship",
    title: "As an entrepreneur",
    titleAccent: "in e-commerce.",
    intro:
      "Marketplaces, independent online stores, partnerships and my own renewable-energy business (2018 — 2020). This is where I learned to decide, calculate and adjust at the right time.",
  },
};

export const pages = {
  about: {
    eyebrow: "About",
    title: "Personal in conversation.",
    accent: "Entrepreneurial by nature.",
    intro: "A commercial background, a curious outlook and a genuine interest in helping people.",
  },
  experience: {
    eyebrow: "Experience",
    title: "A career built on contact.",
    accent: "A broad perspective on sales.",
    intro: "From the shop floor and the doorstep to closing by phone: roles in which I speak with customers every day and take responsibility for results.",
  },
  ventures: {
    eyebrow: "Entrepreneurship",
    title: "Built through action.",
    accent: "Learned through selling.",
    intro: "An overview of my experience with marketplaces, online stores, commercial partnerships and sales.",
  },
  skills: {
    eyebrow: "Skills",
    title: "Commercial thinking.",
    accent: "A personal approach.",
    intro: "My skills connect customer advice, communication and digital execution, grounded in practice rather than arbitrary scores.",
  },
  websites: {
    eyebrow: "Websites",
    title: "Alongside my job:",
    accent: "websites for business owners.",
    intro: "As an independent web designer, I build websites for local business owners. This requires initiative, careful listening, structure and ownership through to delivery.",
  },
  cv: {
    eyebrow: "Curriculum vitae",
    title: "My experience.",
    accent: "Clearly presented.",
    intro: "Read my CV on this page, open the full PDF or download a copy for later.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Discuss an opportunity?",
    accent: "Contact me directly.",
    intro: "I am available to discuss sales or retail roles, commercial partnerships and website projects.",
  },
  ambition: {
    eyebrow: "Ambition and future",
    title: "Keep learning.",
    accent: "Keep building.",
    intro: "Where I want to go, what I want to develop and the type of working environment in which I can contribute.",
  },
};

export const home = {
  highlightsTitle: "Three things",
  highlightsAccent: "worth remembering.",
  highlights: [
    { id: "vodafoneziggo", label: "Now", text: "Sales Adviser at VodafoneZiggo since July 2025." },
    { id: "bol", label: "Since 2021", text: "Seller on bol, alongside my job." },
    { id: "groene-energie", label: "2018 — 2020", text: "Built my own renewable-energy business and sold it at a profit." },
  ],
  tracksTitle: "Two tracks.",
  tracksAccent: "One common thread.",
  tracksIntro: "I combine employment with entrepreneurship. Choose a track for all the details.",
};

export const experienceIntro = {
  title: "Two tracks.",
  titleAccent: "One common thread.",
  intro:
    "I combine employment with entrepreneurship. Select any item to see what I did there and what it says about me.",
  thread:
    "Whether on the shop floor, at a customer's door, on the phone or in my own online store, I begin with the question, make the options clear and work towards a concrete next step.",
  note: "Exact dates and job titles are shown only where they have been confirmed. Company logos are used solely to identify the experience described; I am not affiliated with these brands. Business partners and my own ventures are intentionally anonymous.",
  trackFilters: {
    sales: [
      { id: "alles", label: "All" },
      { id: "sales", label: "Sales" },
      { id: "retail", label: "Retail & operations" },
    ],
    ondernemer: [
      { id: "alles", label: "All" },
      { id: "marketplace", label: "Marketplaces" },
      { id: "webshops", label: "Online stores & partnerships" },
      { id: "eigen-bedrijf", label: "Own business" },
    ],
  } as Record<Track, { id: string; label: string }[]>,
  filters: [
    { id: "alles", label: "All" },
    { id: "sales", label: "Sales & retail" },
    { id: "ondernemer", label: "Entrepreneurship" },
  ] as { id: "alles" | Track; label: string }[],
};

export const experience: Experience[] = [
  /* ── Track 01 · Sales & retail ── */
  {
    id: "vodafoneziggo",
    track: "sales",
    group: "sales",
    company: "VodafoneZiggo",
    role: "Sales Adviser",
    period: "July 2025 — present",
    current: true,
    featured: true,
    sector: "Telecommunications retail",
    logo: "/images/logos/vodafone.svg",
    summary:
      "In a customer-facing retail environment, I advise consumers on telecommunications products, plans and additional services. I combine attentive service with commercial awareness and look for a solution that suits each customer's needs and circumstances.",
    tasks: [
      "Identify customer needs by listening carefully and asking focused questions.",
      "Compare and explain products, plans and additional services in clear language.",
      "Bring sales conversations to a professional close and address questions or concerns with care.",
      "Contribute to customer satisfaction, service standards and commercial objectives.",
    ],
    value: "A strong combination of personal advice, product knowledge and results-focused work.",
    tags: ["Consultative selling", "Needs analysis", "Telecommunications", "Customer service", "Commercial objectives"],
  },
  {
    id: "high-ticket-closer",
    track: "sales",
    group: "sales",
    company: "High-ticket closing",
    role: "Sales Closer · e-commerce coaching",
    period: "Previous sales experience",
    featured: true,
    sector: "High-ticket sales",
    icon: "phone",
    summary:
      "As a high-ticket closer, I spoke with established e-commerce entrepreneurs who wanted to grow further. I assessed whether support from an experienced coaching company suited their next stage and connected them with that company and its coaches. The programmes were worth several thousand euros, and many entrepreneurs who took the step went on to increase their revenue with the coaches' help.",
    tasks: [
      "Conduct sales conversations with entrepreneurs who already ran an e-commerce business.",
      "Map out ambitions, challenges and the potential fit with a coaching programme.",
      "Explain an investment of several thousand euros honestly and clearly.",
      "Connect suitable entrepreneurs with the coaching company and its coaches.",
    ],
    value: "I can lead a conversation about a major decision calmly and honestly, and I know when something is or is not the right fit.",
    tags: ["High-ticket sales", "Closing", "Qualification", "Discovery", "Trust"],
  },
  {
    id: "deur-tot-deurverkoop",
    track: "sales",
    group: "sales",
    company: "Door-to-door sales",
    role: "Direct sales · telecommunications and energy",
    period: "Previous experience",
    featured: true,
    sector: "Direct sales",
    icon: "door",
    brands: [
      { name: "Budget Thuis", logo: "/images/logos/budget-thuis.svg" },
      { name: "Odido", logo: "/images/logos/odido.svg" },
      { name: "KPN", logo: "/images/logos/kpn.svg" },
    ],
    summary:
      "In door-to-door sales, I sold services from Budget Thuis, Odido and KPN. I approached prospective customers, quickly assessed their situation and presented a suitable offer in a personal conversation.",
    tasks: [
      "Open new conversations independently and establish rapport quickly.",
      "Explore a prospect's situation and potential needs within a short conversation.",
      "Present services clearly and connect them to relevant customer benefits.",
      "Respond professionally to rejection, questions and objections.",
    ],
    value: "A solid commercial foundation: taking initiative, communicating clearly and remaining professional under pressure.",
    tags: ["Door-to-door sales", "Prospecting", "Needs analysis", "Objection handling"],
  },
  {
    id: "the-secret-skill",
    track: "sales",
    group: "sales",
    company: "The Secret Skill",
    role: "Sales Representative · course sales",
    period: "2020",
    featured: true,
    sector: "Sales education",
    icon: "key",
    summary:
      "In 2020, I worked in sales for The Secret Skill, then led by Rébien Ghazali. I spoke with prospective participants about a course designed to develop their sales skills.",
    tasks: [
      "Discuss the interests and learning goals of prospective participants.",
      "Explain the course content and assess its relevance to their goals.",
      "Gain experience selling a knowledge-based product by telephone.",
    ],
    value: "This is where I learned sales as a craft: structure in a conversation, asking the right questions and a clear close.",
    tags: ["Course sales", "Telephone sales", "Qualification", "Sales development"],
  },
  {
    id: "oppo",
    track: "sales",
    group: "sales",
    company: "OPPO",
    role: "Brand Ambassador",
    period: "Previous experience",
    sector: "Smartphones and brand activation",
    logo: "/images/logos/oppo.svg",
    summary:
      "I represented OPPO in telecommunications retail. The role centred on product demonstrations, accessible explanations and a consistent presentation of the brand.",
    tasks: [
      "Demonstrate smartphones and explain key features in accessible language.",
      "Connect product benefits to the needs of different users.",
      "Answer questions about devices and help customers compare their options.",
      "Contribute to a recognisable and professional brand presentation.",
    ],
    value: "Experience representing a visible consumer brand and making complex product information easy to understand.",
    tags: ["Product demonstrations", "Brand experience", "Presentation", "Telecommunications retail"],
  },
  {
    id: "picnic",
    track: "sales",
    group: "retail",
    company: "Picnic",
    role: "Warehouse Order Picker",
    period: "Previous experience",
    sector: "E-commerce logistics",
    logo: "/images/logos/picnic.svg",
    summary:
      "I gained hands-on experience as an order picker in a Picnic fulfilment centre. I collected and checked groceries within established processes, where accuracy, a consistent pace and coordination with colleagues were essential.",
    tasks: [
      "Collect orders using the designated warehouse route and process.",
      "Check products and quantities before each order moved to the next stage.",
      "Work accurately at a consistent pace within established logistics processes.",
      "Keep the work area organised and coordinate with colleagues to maintain a smooth flow.",
    ],
    value: "Practical warehouse experience in order picking, quality control and teamwork within a logistics operation.",
    tags: ["Order picking", "Warehouse operations", "Accuracy", "Working at pace", "Teamwork"],
  },
  {
    id: "coop",
    track: "sales",
    group: "retail",
    company: "Coop",
    role: "Store Assistant",
    period: "Previous experience",
    sector: "Grocery retail",
    logo: "/images/logos/coop.svg",
    summary:
      "On the shop floor, I contributed to customer service, product presentation and day-to-day store operations. This environment gave me a practical foundation in service, reliability and teamwork.",
    tasks: [
      "Assist customers and answer practical questions on the shop floor.",
      "Help maintain a tidy, accessible and welcoming store presentation.",
      "Process products and stock carefully as part of daily operations.",
      "Work with colleagues across varied tasks and busy periods.",
    ],
    value: "A dependable retail foundation with attention to pace, presentation and cooperation.",
    tags: ["Customer service", "Merchandising", "Stock handling", "Teamwork"],
  },
  {
    id: "plus",
    track: "sales",
    group: "retail",
    company: "PLUS",
    role: "Store Assistant",
    period: "Previous experience",
    sector: "Grocery retail",
    logo: "/images/logos/plus.svg",
    summary:
      "At PLUS, I gained further experience in customer contact and practical store operations within a dynamic environment where service and presentation go hand in hand.",
    tasks: [
      "Provide approachable and helpful assistance to customers.",
      "Contribute to tidy shelves and a well-organised store.",
      "Complete daily tasks accurately and in cooperation with colleagues.",
      "Adapt quickly when priorities on the shop floor change.",
    ],
    value: "Additional experience in service, pace and responsibility on the shop floor.",
    tags: ["Customer contact", "Accuracy", "Adaptability", "Teamwork"],
  },

  /* ── Track 02 · Entrepreneurship ── */
  {
    id: "bol",
    track: "ondernemer",
    group: "marketplace",
    company: "bol",
    role: "Seller · marketplace partner",
    period: "2021 — present",
    current: true,
    featured: true,
    sector: "Marketplace",
    wordmark: "bol",
    summary:
      "I have sold products through bol, the largest online store in the Netherlands and Belgium, since 2021. This has given me practical experience in product selection, listings, online sales and the day-to-day attention required to operate on a marketplace.",
    tasks: [
      "Select products and ranges and offer them online as a bol seller.",
      "Maintain listings, prices and offers within the bol partner platform.",
      "Keep track of orders, stock and customer questions.",
      "Develop practical knowledge of marketplace and e-commerce operations.",
    ],
    value: "I know how online selling works in practice, from choosing a product to a satisfied customer.",
    tags: ["Marketplace seller", "Marketplaces", "Product range", "Online sales", "E-commerce"],
  },
  {
    id: "amazon",
    track: "ondernemer",
    group: "marketplace",
    company: "Amazon",
    role: "Seller · Seller Central",
    period: "One year",
    featured: true,
    sector: "Marketplace",
    wordmark: "amazon",
    summary:
      "I spent one year selling through Amazon, an international marketplace. I used both Fulfilment by Amazon (FBA), with my products shipped from Amazon's warehouse, and shipping from my own stock (Fulfilled by Merchant, FBM).",
    tasks: [
      "Manage product listings in Amazon Seller Central.",
      "Send stock to Amazon's warehouse for FBA fulfilment.",
      "Ship orders from my own stock (FBM).",
      "Work within Amazon's platform structure, requirements and guidelines.",
    ],
    value: "I understand the logistics behind online sales: when to outsource fulfilment and when to handle it yourself.",
    tags: ["Amazon", "FBA", "FBM", "Seller Central", "Inventory management"],
  },
  {
    id: "webshops",
    track: "ondernemer",
    group: "webshops",
    company: "Independent online stores",
    role: "E-commerce Entrepreneur",
    period: "Multiple ventures",
    featured: true,
    sector: "Online stores",
    icon: "bag",
    summary:
      "I set up several online stores and successfully sold clothing, home and kitchen products, baby toys and electronics.",
    tasks: [
      "Set up and manage online stores across several product categories.",
      "Select and present products for different target audiences.",
      "Oversee the sales process from order to delivery.",
      "Build practical experience in online sales and entrepreneurship.",
    ],
    value: "I can build a sales channel from scratch and keep it running independently.",
    tags: ["Online stores", "Product selection", "Clothing", "Home & kitchen", "Electronics"],
  },
  {
    id: "groene-energie",
    track: "ondernemer",
    group: "eigen-bedrijf",
    company: "Renewable energy",
    role: "Owner · solar-panel and EV-charger sales",
    period: "2018 — 2020",
    featured: true,
    sector: "Own business",
    icon: "sun",
    summary:
      "From 2018 to 2020, I built a business in renewable energy. Working with a Dutch supplier, I sold solar panels and electric-vehicle chargers. During the COVID-19 period, a shortage of installers and rising product and purchasing costs reduced margins. I therefore sold the business at a profit in 2020.",
    story: [
      { title: "2018 · Built", text: "Set up my own business in solar panels and EV chargers." },
      { title: "Partnered", text: "Sold solar panels and EV chargers through a partnership with a Dutch supplier." },
      { title: "The market shifted", text: "During COVID-19: a shortage of installers and rising product and purchasing costs." },
      { title: "2020 · Sold at a profit", text: "Made a commercial decision and sold the business at a profit." },
    ],
    tasks: [
      "Sell solar panels and electric-vehicle chargers through a Dutch supplier.",
      "Build a commercial partnership and develop the business.",
      "Respond commercially to changing market conditions and complete a profitable sale of the business in 2020.",
    ],
    value: "I can read the numbers, assess the market realistically and make a difficult decision on time and on commercial grounds.",
    tags: ["Own business", "Renewable energy", "B2B partnerships", "Sales", "Commercial judgement"],
  },
  {
    id: "webshop-bemiddeling",
    track: "ondernemer",
    group: "webshops",
    company: "Buying & selling online stores",
    role: "Online-store acquisition broker",
    period: "Previous experience",
    featured: true,
    sector: "Acquisitions",
    icon: "swap",
    summary:
      "I acquired online stores and websites and sold them on. I also helped entrepreneurs who wanted to start something new sell their existing online store: I brought buyer and seller together, guided the sale and earned a commission.",
    tasks: [
      "Acquire online stores and websites and sell them on.",
      "Find and approach a suitable buyer on behalf of sellers.",
      "Guide buyer and seller until the handover was complete.",
      "Work on a commission basis: paid only when a sale succeeds.",
    ],
    value: "I can negotiate, align the interests of two parties and see a deal through to the end.",
    tags: ["Brokerage", "Acquisitions", "Negotiation", "Commission"],
  },
  {
    id: "meubelverkoop",
    track: "ondernemer",
    group: "webshops",
    company: "Furniture e-commerce",
    role: "Online Sales Partner for a Dutch furniture company",
    period: "Previous venture",
    sector: "Partnership",
    icon: "sofa",
    summary:
      "I sold products online for a Dutch furniture company. This partnership combined e-commerce with the digital presentation of an established product range.",
    tasks: [
      "Present and sell furniture products online.",
      "Work with the range of a Dutch business partner.",
      "Apply e-commerce skills within the home and furniture sector.",
    ],
    value: "I can enter business partnerships and represent an existing brand with care.",
    tags: ["Furniture", "E-commerce", "Partnerships", "Online presentation"],
  },
  {
    id: "webdesign",
    track: "ondernemer",
    group: "eigen-bedrijf",
    company: "Independent business",
    role: "Website development and web design",
    period: "Present",
    current: true,
    sector: "Digital services",
    icon: "browser",
    summary:
      "As an independent web designer, I guide business owners from the initial brief to a practical online presence. My work combines client communication, information architecture, visual design and technical implementation.",
    tasks: [
      "Clarify the website's purpose, audience and content with the client.",
      "Translate client requirements into navigation, page structure and a suitable visual direction.",
      "Develop websites using WordPress, Shopify and practical e-commerce knowledge.",
      "Guide clients through feedback, delivery and follow-up support.",
    ],
    value: "Evidence of initiative, independence and the ability to take a client brief from conversation to delivery.",
    tags: ["Client discovery", "Web design", "WordPress", "Shopify", "Project ownership"],
  },
];

export const experienceBySlug = (slug: string) => experience.find((e) => e.id === slug);

export const projectsIntro = {
  label: "Websites I built",
  title: "Alongside my job:",
  titleAccent: "websites for business owners.",
  intro:
    "As an independent web designer, I build websites for local business owners. This requires initiative, careful listening, structure and ownership through to delivery.",
  note: "The previews show the websites as checked in November 2026. External websites may change later. No unverified results or visitor numbers are mentioned.",
  processTitle: "How I approach a project.",
  processIntro:
    "I begin with the goal of the business and the information a visitor needs. I then work out the structure, the look and the ways to get in touch.",
  process: ["Discuss goals and audience", "Structure pages and content", "Develop the design and process feedback", "Check and deliver"],
};

export const projects: Project[] = [
  {
    id: "rijschool-rewald",
    name: "Rijschool Rewald",
    url: "https://www.rijschoolrewald.com/",
    domain: "rijschoolrewald.com",
    category: "Driving school",
    image: "/images/projecten/rijschool-rewald.webp",
    description:
      "A driving-school website that presents lesson options clearly and makes it easy for prospective students to get in touch.",
    checked: "Website preview · November 2026",
    published: true,
  },
  {
    id: "paardrijles-zaanstad",
    name: "Paardrijles Zaanstad",
    url: "https://www.paardrijleszaanstad.nl/",
    domain: "paardrijleszaanstad.nl",
    category: "Equestrian",
    image: "/images/projecten/paardrijles-zaanstad.webp",
    description: "A digital introduction to personalised horse-riding lessons in the Zaan region.",
    checked: "Website preview · November 2026",
    published: true,
  },
];

export const skillsIntro = {
  title: "Commercial thinking.",
  titleAccent: "A personal approach.",
  intro:
    "My skills connect customer advice, communication and digital execution, grounded in practice rather than arbitrary scores.",
};

export const skillGroups: SkillGroup[] = [
  {
    id: "verkoop",
    title: "Sales and customer advice",
    intro: "I ask focused questions, compare options and make the customer’s decision easier to understand.",
    practice: "Applied at VodafoneZiggo, OPPO, in door-to-door sales and high-ticket closing.",
    skills: ["Consultative selling", "Needs analysis", "Prospecting", "Product explanation", "Objection handling", "Customer relationships"],
  },
  {
    id: "communicatie",
    title: "Communication and teamwork",
    intro: "I remain approachable, communicate clearly and adapt to the customer, colleague or client.",
    practice: "Developed across telecommunications, grocery retail, operational work and client projects.",
    skills: ["Active listening", "Customer contact", "Teamwork", "Independent work", "Reliability", "Professional adaptability"],
  },
  {
    id: "web",
    title: "E-commerce and web design",
    intro: "I translate a business need into a clear website and guide the process through to a practical result.",
    practice: "Built through bol (since 2021), Amazon, independent online stores and websites for business owners.",
    skills: ["Marketplaces (bol, Amazon)", "Online stores", "Web design", "WordPress", "Shopify", "Digital communication"],
  },
];

export const growth = {
  title: "What I already bring.",
  titleAccent: "Where I keep growing.",
  intro: "My development is not about titles, but about what different working environments have taught me.",
  bring: [
    { title: "Customer conversations", text: "From opening a conversation to asking follow-up questions, explaining options and handling doubts or objections professionally." },
    { title: "Brand & product", text: "Experience in telecommunications advice, product demonstrations and a polished presentation to customers." },
    { title: "Work discipline", text: "Retail and operational work strengthened my sense of pace, accuracy and teamwork." },
    { title: "Own initiative", text: "Through web design, I learn to plan, manage client expectations and take responsibility for delivery." },
  ],
  goals: [
    { title: "Deepen my commercial expertise.", text: "Develop further in needs analysis, advice, product knowledge, relationship building and bringing sales conversations to a professional close." },
    { title: "Take broader responsibility.", text: "Learn more about planning, teamwork, customer retention and guiding a process from first contact to result." },
    { title: "Build a strong business.", text: "Professionalise my experience in web design and services through better processes, stronger projects and lasting client relationships." },
  ],
  drive:
    "I grow by doing: holding conversations, asking for feedback, building product knowledge, working with experienced colleagues and reviewing what could be improved.",
  seeking:
    "I perform best in a team where customer focus, clear expectations and room to ask questions matter. I bring energy, initiative and broad practical experience.",
  seekingTags: ["On-the-job coaching", "Clear objectives", "Customer contact", "Personal responsibility"],
};

export const education = [
  { title: "Secondary vocational education (MBO), Financial Administration", school: "ROC TOP", period: "" },
];

export const certificates: { title: string; issuer: string; year: string }[] = [];
export const testimonials: { quote: string; name: string; role: string }[] = [];

export const cv = {
  pdf: "/cv/CV_Ayman_El_Hammoudi_EN.pdf",
  preview: "/images/cv-preview-en-720.webp",
  previewSize: { width: 720, height: 1018 },
  fileName: "CV_Ayman_El_Hammoudi_EN.pdf",
  ats: "/cv/CV_Ayman_El_Hammoudi_EN_ATS.pdf",
  atsFileName: "CV_Ayman_El_Hammoudi_EN_ATS.pdf",
  subtitle: "Sales Adviser · Retail and sales · Entrepreneur and web designer",
  profile:
    "Commercially minded sales adviser with experience in telecommunications retail, door-to-door sales, customer service, marketplaces and independent business. Strong in active listening, needs analysis and presenting suitable options clearly. Combines personal customer contact with a results-focused approach, ownership and practical digital knowledge.",
  skills: [
    "Consultative selling",
    "Needs analysis",
    "Door-to-door sales",
    "Closing",
    "Marketplace sales",
    "E-commerce",
    "Web design",
    "WordPress",
    "Shopify",
    "Order picking",
  ],
};

export const contact = {
  eyebrow: "Next step",
  title: "A good conversation.",
  titleAccent: "A fresh beginning.",
  intro:
    "I welcome conversations about roles that combine customer contact, advice, commerce and professional development. I would be pleased to meet you.",
  topics: ["A vacancy or role", "An introductory meeting", "A question about my CV"],
  privacy: "No tracking, no cookies. Your message comes straight to me.",
};

export const footer = {
  motto: ["Personal in conversation.", "Entrepreneurial in my approach."],
  disclaimer: "Personal portfolio · Not affiliated with the employers mentioned",
};

/* ───────────── Extra sections (verbatim from aymanzakelijk.nl/en) ───────────── */

/** Atmospheric images from aymanzakelijk.nl: not a workplace or employer. */
export const atmosphere = {
  sales: { src: "/images/sfeer/sales-adviesruimte.webp", alt: "Atmospheric image of a refined consultation room in navy and gold", caption: "Atmospheric image · not an employer location" },
  office: { src: "/images/sfeer/premium-kantoor.webp", alt: "Atmospheric image of a calm office in navy and gold", caption: "Atmospheric image · not my office" },
  web: { src: "/images/sfeer/webdesign-werkplek.webp", alt: "Atmospheric image of a desk with a laptop and a monitor", caption: "Atmospheric image · not my workplace" },
  growth: { src: "/images/sfeer/ambitie-ontwikkeling.webp", alt: "Atmospheric image of a desk with a notebook and a laptop at sunset", caption: "Atmospheric image created for this website" },
};

export const sections = {
  homePerson: {
    label: "The person behind the work",
    title: "Good advice starts with",
    accent: "genuine listening.",
    text: [
      "I want to understand what someone needs. That is where a good conversation begins.",
      "I bring that principle to my work at VodafoneZiggo, my previous sales roles and the websites I develop for business owners.",
    ],
    cta: "More about me",
  },
  homeWork: {
    label: "Selected work",
    title: "From an idea to",
    accent: "an effective online presence.",
    intro: "A selection of my work as an independent web designer.",
    cta: "All projects",
  },
  next: {
    label: "Next step",
    title: "A good conversation.",
    accent: "A fresh beginning.",
    text: "Whether you would like to discuss a sales role, a new opportunity or a website for your business, I would be pleased to meet you.",
    cta: "Start a conversation",
  },
  aboutOnline: {
    label: "Entrepreneurship",
    title: "Online work is also about",
    accent: "people.",
    text: [
      "Alongside my job, I develop websites for business owners. That requires initiative, careful listening, clear structure and responsibility through to delivery.",
      "A website is often a customer's first interaction with a business. I therefore combine commercial experience with careful attention to language, presentation and usability.",
    ],
    cta: "View my web projects",
  },
  aboutVentures: {
    label: "Entrepreneurial experience",
    title: "Beyond",
    accent: "website development.",
    intro: "My entrepreneurial background includes marketplaces, independent online stores, commercial partnerships, high-ticket sales and a renewable-energy business.",
    items: [
      { title: "bol and Amazon", text: "Product-sales experience across Dutch and international marketplaces." },
      { title: "Online stores", text: "Online sales across several product categories and a partnership with a furniture company." },
      { title: "Renewable energy", text: "Built a solar-panel and EV-charger business and subsequently completed a profitable sale." },
      { title: "Sales", text: "High-ticket closing and course sales for entrepreneurs and sales professionals." },
    ],
    cta: "Explore my ventures",
  },
  expProfile: {
    label: "Profile at a glance",
    title: "What a recruiter",
    accent: "should remember.",
    intro: "My experience covers several sectors, with a consistent focus on making contact, listening, explaining clearly and taking responsibility for a good outcome.",
    items: [
      { title: "Commercial", text: "Experience in consultative selling, direct acquisition, product demonstrations and objection handling." },
      { title: "Customer-focused", text: "Able to translate different customer needs into clear options and an appropriate next step." },
      { title: "Entrepreneurial", text: "Experience developing websites and online ventures, from initial idea to delivery and operation." },
      { title: "Adaptable", text: "Experience across telecommunications, grocery retail, e-commerce logistics and independent digital work." },
    ],
  },
  expThread: {
    label: "The common thread",
    lines: ["Listen.", "Explain.", "Take responsibility."],
    text: [
      "Whether on the shop floor, at a customer's door, during a product demonstration or in a web project, I begin with the question, make the options clear and work towards a concrete next step.",
      "This approach connects my experience across different sectors.",
    ],
    career: "My career",
    careerIntro: "Open each role to view responsibilities, core skills and the value I gained from the experience.",
    cv: "View my full CV",
  },
  ventGlance: {
    label: "At a glance",
    title: "From product idea to",
    accent: "practical experience.",
    intro: "My entrepreneurial experience ranges from online marketplaces and independent stores to coaching sales and a renewable-energy company. Each step taught me to evaluate opportunities, take responsibility and adapt to changing circumstances.",
    items: [
      { title: "Marketplaces", text: "Selling through bol since 2021 and one year of experience on Amazon." },
      { title: "Online stores", text: "Products in clothing, home, kitchen, baby-toy and electronics categories." },
      { title: "Own business", text: "Built a solar-panel and EV-charger business and completed a profitable sale." },
      { title: "Sales", text: "High-ticket conversations and course sales in e-commerce and sales development." },
    ],
    pick: "Choose what to explore",
    pickTitle: "Every experience. Its own place.",
    note: "These descriptions are based on my own practical experience. Unconfirmed revenue figures, client results and the brand names of private business partners are deliberately not mentioned.",
  },
  ventTake: {
    label: "What I bring",
    lines: ["Think commercially.", "Act independently.", "Adjust at the right time."],
    text: "Entrepreneurship taught me to make decisions, understand customers and markets, and evaluate difficult choices commercially. I bring that experience to every role and partnership.",
    cta: "Read about my ambition",
  },
  skillsFlow: {
    label: "From conversation to delivery",
    lines: ["Think.", "Develop.", "Deliver."],
    text: "My commercial and digital work reinforce one another. I begin with the customer's question and work towards a practical solution.",
    cta: "View the projects",
  },
  contactQuick: {
    label: "Find the right information quickly",
    title: "Everything an employer",
    accent: "needs to know.",
    items: [
      { key: "experience", title: "Experience", text: "Every role with responsibilities, skills and the value I gained from each environment." },
      { key: "skills", title: "Strengths", text: "A practical overview of sales, communication, teamwork and digital delivery." },
      { key: "ambition", title: "Ambition", text: "My goals for further development in commerce, responsibility and entrepreneurship." },
      { key: "cv", title: "Curriculum vitae", text: "Read the full CV online, open it at full size or download the English PDF." },
    ] as { key: PageKey; title: string; text: string }[],
    note: "These buttons open your own email or phone application. This website uses no tracking or cookies.",
  },
  ambition: {
    drive: {
      label: "What drives me",
      title: "Growing through",
      accent: "practical experience.",
      text: [
        "I want to develop into a versatile commercial professional who understands customers, takes responsibility and can turn ideas into action.",
        "I grow by doing: holding conversations, asking for feedback, building product knowledge, working with experienced colleagues and reviewing what could be improved.",
        "I am looking for an environment where performance, development and reliability reinforce one another.",
      ],
    },
    direction: {
      label: "My direction",
      title: "Three goals for",
      accent: "the coming years.",
      intro: "For me, ambition means continuing to learn and improving the quality of my work step by step.",
    },
    bring: { label: "What I already bring" },
    seek: {
      label: "What I am looking for",
      title: "A place to contribute",
      accent: "and continue growing.",
      cv: "View my CV",
      contact: "Contact me",
    },
  },
};

export const ui = {
  lang: "en",
  langName: "English",
  skip: "Skip to content",
  nav2: {
    search: "Search",
    searchHint: "Search for a page or experience…",
    searchLabel: "Quick navigation",
    empty: "Nothing found. Try another word.",
    groupPages: "Pages",
    groupExperience: "Experience & entrepreneurship",
    home: "Home",
    contact: "Contact",
    close: "Close",
    navigate: "navigate",
    open: "open",
  },
  toc: "On this page",
  availability: { title: "Availability", text: "Open to conversations about a new role in sales, retail or e-commerce.", region: "Region", email: "Email", phone: "Phone", languages: "Languages" },
  homeUi: { highlights: "Highlights", tracks: "Experience", viewTrack: { sales: "View my experience", ondernemer: "View my entrepreneurship" }, items: "items" },
  caseTitle: "Case: renewable energy",
  footerCols: { pages: "Pages", contact: "Contact", language: "Language" },
  header: {
    navAria: "Main navigation",
    homeAria: "to the homepage",
    cta: "Let’s talk",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    menu: "Menu",
    mobileNavAria: "Mobile navigation",
    toDark: "Switch to dark mode",
    toLight: "Switch to light mode",
    langSwitch: "Language",
  },
  footer: {
    nav: "Navigation",
    allExperience: "All experience",
    onlineCv: "Online CV",
    localTime: "local time",
    backToTop: "Back to top",
    emailAria: "Send an email",
  },
  hero: {
    iAm: "I am",
    scroll: "Keep scrolling",
    index: "01 / Profile",
    side: "Personal. Professional. Entrepreneurial.",
    caption: "Sales · Retail · E-commerce",
  },
  marquee: "Experience gained at · sold for · sold through",
  quick: {
    label: "In 30 seconds",
    act: "Take action",
    download: "Download my CV",
    meet: "Schedule an introduction",
    meetSubject: "Invitation for an introductory meeting",
    at: "at",
    sectors: "Experience in",
    strengths: "Strong in",
    education: "Education",
    langRegion: "Languages & region",
    years: "years old",
    seeking: "What I am looking for",
  },
  tracks: {
    label: "Experience",
    overview: "Everything in one timeline",
    parts: "items · select to open",
    current: "Current",
    view: "See what I did",
    brands: "Brands sold",
    cursor: "View",
  },
  about: { label: "About", title: "Pleased to meet you.", accent: "I am Ayman.", traits: "How people know me", way: "How I work" },
  expertise: { label: "My strengths" },
  skills: {
    label: "Skills",
    tabsAria: "Skill groups",
    expertise: "Expertise",
    practice: "In practice",
    education: "Education",
    languages: "Languages",
    tools: "Tools",
    certificates: "Certificates",
  },
  growth: {
    label: "Development & ambition",
    viewsAria: "Choose a view",
    bring: "What I bring",
    goals: "Where I am heading",
    drive: "What drives me",
    seeking: "What I am looking for",
  },
  projects: {
    all: "All",
    filterAria: "Filter projects",
    visit: "visit website (opens in a new tab)",
    newTab: "(opens in a new tab)",
    cursor: "View",
    process: "Approach",
  },
  cvSection: {
    eyebrow: "Curriculum vitae",
    title: "My experience.",
    accent: "Clearly presented.",
    intro: "Download my designed CV, or the ATS version with searchable text for application systems. Prefer to read on screen? Open the online version.",
    note: "The designed CV is exactly the CV from aymanzakelijk.nl. The ATS version and the online version contain the same experience as this website.",
    download: "Download CV (PDF)",
    ats: "ATS version (text)",
    online: "View the online version",
    openAria: "Open CV as PDF (new tab)",
    previewAlt: "Preview of Ayman El Hammoudi’s English CV",
    otherLang: { label: "Nederlands cv", href: "/cv/CV_Ayman_El_Hammoudi.pdf" },
  },
  share: { idle: "Share this profile with a colleague", done: "Link copied" },
  contact: {
    topicLegend: "What is it about?",
    name: "Your name",
    email: "Your email address",
    message: "Your message",
    errName: "Please enter your name.",
    errEmail: "Please enter a valid email address.",
    errMessage: "Please write a message of at least 10 characters.",
    send: "Send message",
    sendMail: "Send via your email app",
    sending: "Sending…",
    sent: "Thank you! Your message has been sent. I will reply as soon as possible.",
    error: "Something went wrong. Please email me directly at",
    copy: "Copy",
    copied: "Copied",
    copyAria: "Copy email address",
    subject: "introduction via website",
  },
  cta: { title: "Does my experience", accent: "fit your team?", download: "Download my CV", meet: "Schedule an introduction" },
  overview: {
    label: "All experience in one place",
    title: "A career built on contact.",
    accent: "An entrepreneur in e-commerce.",
    intro: "All experience in one timeline. Filter by track, expand an item or open its full page.",
    thread: "The common thread",
    filterAria: "Filter experience",
    one: "role",
    many: "roles",
    tasks: "Responsibilities",
    says: "What this says about me",
    full: "Open the full page",
    details: "details",
    open: "Open",
    close: "Close",
    metaTitle: "All experience",
    metaDescription: "The full career of Ayman El Hammoudi: sales and retail in employment, and entrepreneurship in e-commerce.",
  },
  detail: {
    crumbs: "Breadcrumb",
    home: "Home",
    summary: "Summary",
    brands: "Brands I sold",
    story: "The story in four steps",
    did: "What I did",
    says: "What this says about me",
    keywords: "Keywords",
    other: "Other experience",
    prev: "Previous",
    next: "Next",
    all: "All experience in one place",
  },
  cvPage: {
    back: "← Back to the homepage",
    print: "Print / save as PDF",
    download: "Download designed CV",
    ats: "Download ATS version",
    eyebrow: "Curriculum vitae",
    profile: "Profile",
    work: "Experience & sales",
    venture: "Entrepreneurship",
    education: "Education",
    skills: "Skills",
    languages: "Languages",
    metaTitle: "Online CV",
    metaDescription: "Searchable, ATS-friendly CV of Ayman El Hammoudi: Sales Adviser and e-commerce entrepreneur from North Holland.",
  },
};
