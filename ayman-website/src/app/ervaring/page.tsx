import { OverviewView, overviewMetadata } from "@/views/OverviewView";

export const metadata = overviewMetadata("nl");

export default function ErvaringPage() {
  return <OverviewView locale="nl" />;
}
