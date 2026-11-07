import { CvView, cvMetadata } from "@/views/CvView";

export const metadata = cvMetadata("en");

export default function CvPageEn() {
  return <CvView locale="en" />;
}
