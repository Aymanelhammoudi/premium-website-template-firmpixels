import type { Metadata } from "next";
import { Experience } from "@/components/sections/Experience";
import { CtaBand } from "@/components/sections/CtaBand";
import { person } from "@content/site";

export const metadata: Metadata = {
  title: "Alle ervaring",
  description: `De volledige loopbaan van ${person.fullName}: sales en retail in loondienst, en ondernemerschap in e-commerce.`,
  alternates: { canonical: "/ervaring/" },
};

export default function ErvaringPage() {
  return (
    <>
      <Experience />
      <CtaBand />
    </>
  );
}
