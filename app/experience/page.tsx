import { SiteLayout } from "@/components/site/SiteLayout";
import { ExperienceSection } from "@/components/site/sections";

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

export default function ExperiencePage() {
  return (
    <SiteLayout>
      <ExperienceSection />
    </SiteLayout>
  );
}
