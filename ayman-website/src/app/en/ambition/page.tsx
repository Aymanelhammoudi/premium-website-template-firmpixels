import { AmbitionView, ambitionMetadata } from "@/views/AmbitionView";

export const metadata = ambitionMetadata("en");

export default function Page() {
  return <AmbitionView locale="en" />;
}
