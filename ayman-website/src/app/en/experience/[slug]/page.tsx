import { ExperienceView, experienceMetadata, experienceParams } from "@/views/ExperienceView";

export function generateStaticParams() {
  return experienceParams("en");
}

export async function generateMetadata(props: PageProps<"/en/experience/[slug]">) {
  const { slug } = await props.params;
  return experienceMetadata("en", slug);
}

export default async function Page(props: PageProps<"/en/experience/[slug]">) {
  const { slug } = await props.params;
  return <ExperienceView locale="en" slug={slug} />;
}
