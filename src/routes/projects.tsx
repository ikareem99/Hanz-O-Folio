import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/SiteLayout";
import { ProjectsSection } from "@/components/site/sections";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Aaabad Ahmed" },
      {
        name: "description",
        content:
          "Selected projects by Aaabad Ahmed: SaaS, portfolio and real-estate products built with care.",
      },
      { property: "og:title", content: "Projects — Aaabad Ahmed" },
      {
        property: "og:description",
        content: "Selected projects by Aaabad Ahmed, software engineer and product designer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <SiteLayout>
      <ProjectsSection />
    </SiteLayout>
  );
}
