import { TrackView, trackMetadata } from "@/views/TrackView";

export const metadata = trackMetadata("nl", "sales");

export default function Page() {
  return <TrackView locale="nl" track="sales" />;
}
