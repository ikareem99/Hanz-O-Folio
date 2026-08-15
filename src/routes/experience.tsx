import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/SiteLayout";
import { ExperienceSection } from "@/components/site/sections";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Hanzala Kareem" },
      {
        name: "description",
        content:
          "Twelve years of design and engineering experience across studios, startups and product teams.",
      },
      { property: "og:title", content: "Experience — Hanzala Kareem" },
      {
        property: "og:description",
        content: "Twelve years of design and engineering experience across product teams.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <SiteLayout>
      <ExperienceSection />
    </SiteLayout>
  );
}
