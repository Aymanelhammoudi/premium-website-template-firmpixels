import { WebsitesView, websitesMetadata } from "@/views/WebsitesView";

export const metadata = websitesMetadata("en");

export default function Page() {
  return <WebsitesView locale="en" />;
}
