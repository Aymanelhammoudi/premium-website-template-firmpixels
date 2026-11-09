import { getSite, type Locale } from "@content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Contact } from "@/components/sections/Contact";
import { Availability } from "@/components/sections/Availability";
import { QuickLinks } from "@/components/sections/QuickLinks";
import { crumbs, pageMetadata } from "./page";

export const contactMetadata = (locale: Locale) => pageMetadata(locale, "contact");

export function ContactView({ locale }: { locale: Locale }) {
  const { contact, pages, person, ui } = getSite(locale);
  return (
    <>
      <PageHeader
        crumbs={crumbs(locale, "contact")}
        crumbsLabel={ui.detail.crumbs}
        {...pages.contact}
        aside={<Availability person={person} ui={{ availability: ui.availability }} />}
      />
      <Contact heading={false} contact={contact} person={person} ui={{ contact: ui.contact }} />
      <QuickLinks locale={locale} />
    </>
  );
}
