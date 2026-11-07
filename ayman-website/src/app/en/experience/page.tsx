import { TrackView, trackMetadata } from "@/views/TrackView";

export const metadata = trackMetadata("en", "sales");

export default function Page() {
  return <TrackView locale="en" track="sales" />;
}
