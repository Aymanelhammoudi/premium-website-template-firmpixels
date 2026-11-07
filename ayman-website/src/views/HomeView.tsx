import { getSite, type Locale } from "@content";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { QuickScan } from "@/components/sections/QuickScan";
import { Tracks } from "@/components/sections/Tracks";
import { About } from "@/components/sections/About";
import { VelocityBand } from "@/components/sections/VelocityBand";
import { Expertise } from "@/components/sections/Expertise";
import { Skills } from "@/components/sections/Skills";
import { Growth } from "@/components/sections/Growth";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { CvSection } from "@/components/sections/CvSection";
import { Contact } from "@/components/sections/Contact";

const strip = (s: string) => s.replace(/\.$/, "");

export function HomeView({ locale }: { locale: Locale }) {
  const { about, hero, testimonials } = getSite(locale);
  const band = [...about.principles.map((p) => strip(p.title)), ...hero.tagline.map(strip)];
  return (
    <>
      <Hero locale={locale} />
      <LogoMarquee locale={locale} />
      <QuickScan locale={locale} />
      <Tracks locale={locale} />
      <About locale={locale} />
      <VelocityBand words={band} />
      <Expertise locale={locale} />
      <Skills locale={locale} />
      <Growth locale={locale} />
      <Projects locale={locale} />
      {testimonials.length > 0 && <Testimonials locale={locale} />}
      <CvSection locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
