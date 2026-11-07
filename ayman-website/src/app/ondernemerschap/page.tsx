import { TrackView, trackMetadata } from "@/views/TrackView";

export const metadata = trackMetadata("nl", "ondernemer");

export default function Page() {
  return <TrackView locale="nl" track="ondernemer" />;
}
