import { SiteLayout } from "@/components/site/SiteLayout";
import { ExperienceSection } from "@/components/site/sections";
import { getExperience } from "@/lib/data";

export const metadata = {
  title: "Experience — Hanzala Kareem",
  description: "Machine learning and software engineering experience across product teams.",
  openGraph: {
    title: "Experience — Hanzala Kareem",
    description: "Machine learning and software engineering experience across product teams.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function ExperiencePage() {
  const experienceData = await getExperience();

  return (
    <SiteLayout>
      <ExperienceSection showSearch items={experienceData} />
    </SiteLayout>
  );
}
