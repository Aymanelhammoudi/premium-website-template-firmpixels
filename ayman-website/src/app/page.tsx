import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { QuickScan } from "@/components/sections/QuickScan";
import { About } from "@/components/sections/About";
import { VelocityBand } from "@/components/sections/VelocityBand";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Growth } from "@/components/sections/Growth";
import { CvSection } from "@/components/sections/CvSection";
import { Contact } from "@/components/sections/Contact";
import { testimonials } from "@content/site";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <QuickScan />
      <Experience />
      <About />
      <VelocityBand words={["Luisteren", "Oplossen", "Afmaken", "Mensen", "Vertrouwen", "Vooruitgang"]} />
      <Expertise />
      <Skills />
      <Growth />
      <Projects />
      {testimonials.length > 0 && <Testimonials />}
      <CvSection />
      <Contact />
    </>
  );
}
