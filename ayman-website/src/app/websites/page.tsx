import { WebsitesView, websitesMetadata } from "@/views/WebsitesView";

export const metadata = websitesMetadata("nl");

export default function Page() {
  return <WebsitesView locale="nl" />;
}
