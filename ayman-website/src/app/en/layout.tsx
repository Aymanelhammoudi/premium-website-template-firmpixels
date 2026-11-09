import type { Metadata } from "next";
import { alternates, getSite } from "@content";

const { seo, person } = getSite("en");

export const metadata: Metadata = {
  title: { default: seo.title, template: `%s | ${person.fullName}` },
  description: seo.description,
  alternates: alternates("/", "/en/", "en"),
  openGraph: {
    type: "profile",
    locale: "en_GB",
    url: "/en/",
    siteName: person.fullName,
    title: seo.title,
    description: seo.description,
    images: [{ url: "/og/home-en.png", width: 1200, height: 630, alt: seo.title }],
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: ["/og/home-en.png"] },
};

export default function EnglishLayout({ children }: LayoutProps<"/en">) {
  return <div lang="en">{children}</div>;
}
