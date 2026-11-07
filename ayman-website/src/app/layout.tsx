import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { alternates, getChrome, getSite } from "@content";
import { LocaleSync } from "@/components/layout/LocaleSync";

const { person, seo, cv, experience } = getSite("nl");
const chrome = getChrome();
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  // Alleen voor citaten en statements (rechtop): één bestand, vooraf geladen tegen verspringen.
  style: ["normal"],
  display: "swap",
});
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(person.siteUrl),
  title: { default: seo.title, template: `%s | ${person.fullName}` },
  description: seo.description,
  applicationName: person.fullName,
  authors: [{ name: person.fullName, url: person.siteUrl }],
  alternates: alternates("/", "/en/", "nl"),
  openGraph: {
    type: "profile",
    locale: "nl_NL",
    url: "/",
    siteName: person.fullName,
    title: seo.title,
    description: seo.description,
    firstName: person.firstName,
    lastName: person.lastName,
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#071426" },
    { media: "(prefers-color-scheme: light)", color: "#f5f1e8" },
  ],
};

// Zet het thema vóór de eerste paint, zodat er geen flits ontstaat.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.fullName,
  givenName: person.firstName,
  familyName: person.lastName,
  jobTitle: person.role,
  url: person.siteUrl,
  image: `${person.siteUrl}${person.portrait}`,
  email: `mailto:${person.email}`,
  telephone: person.phoneHref,
  address: { "@type": "PostalAddress", addressRegion: person.region, addressCountry: "NL" },
  knowsLanguage: ["nl", "en"],
  knowsAbout: cv.skills,
  worksFor: { "@type": "Organization", name: experience[0].company },
  alumniOf: { "@type": "EducationalOrganization", name: "ROC TOP" },
  ...(person.linkedin ? { sameAs: [person.linkedin] } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      data-theme="dark"
      suppressHydrationWarning
      className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <LocaleSync skip={{ nl: chrome.nl.ui.skip, en: chrome.en.ui.skip }} />
        <MotionConfig reducedMotion="user">
          <ScrollProgress />
          <Header chrome={chrome} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer chrome={chrome} />
          <CommandMenu chrome={chrome} />
        </MotionConfig>
      </body>
    </html>
  );
}
