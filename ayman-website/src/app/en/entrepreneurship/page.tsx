import { TrackView, trackMetadata } from "@/views/TrackView";

export const metadata = trackMetadata("en", "ondernemer");

export default function Page() {
  return <TrackView locale="en" track="ondernemer" />;
}
