import { CvView, cvMetadata } from "@/views/CvView";

export const metadata = cvMetadata("nl");

export default function CvPage() {
  return <CvView locale="nl" />;
}
