import { AmbitionView, ambitionMetadata } from "@/views/AmbitionView";

export const metadata = ambitionMetadata("nl");

export default function Page() {
  return <AmbitionView locale="nl" />;
}
