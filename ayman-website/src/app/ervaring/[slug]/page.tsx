import { ExperienceView, experienceMetadata, experienceParams } from "@/views/ExperienceView";

export function generateStaticParams() {
  return experienceParams("nl");
}

export async function generateMetadata(props: PageProps<"/ervaring/[slug]">) {
  const { slug } = await props.params;
  return experienceMetadata("nl", slug);
}

export default async function Page(props: PageProps<"/ervaring/[slug]">) {
  const { slug } = await props.params;
  return <ExperienceView locale="nl" slug={slug} />;
}
