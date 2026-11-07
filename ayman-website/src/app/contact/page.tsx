import { ContactView, contactMetadata } from "@/views/ContactView";

export const metadata = contactMetadata("nl");

export default function Page() {
  return <ContactView locale="nl" />;
}
