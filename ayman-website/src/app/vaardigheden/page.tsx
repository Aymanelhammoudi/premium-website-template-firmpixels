import { SkillsView, skillsMetadata } from "@/views/SkillsView";

export const metadata = skillsMetadata("nl");

export default function Page() {
  return <SkillsView locale="nl" />;
}
