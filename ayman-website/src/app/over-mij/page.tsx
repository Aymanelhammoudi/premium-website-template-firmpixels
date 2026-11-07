import { AboutView, aboutMetadata } from "@/views/AboutView";

export const metadata = aboutMetadata("nl");

export default function Page() {
  return <AboutView locale="nl" />;
}
