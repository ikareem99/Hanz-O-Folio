import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/SiteLayout";
import { ProjectsSection } from "@/components/site/sections";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Hanzala Kareem" },
      {
        name: "description",
        content:
          "Selected machine learning and C++ projects by Hanzala Kareem.",
      },
      { property: "og:title", content: "Projects — Hanzala Kareem" },
      {
        property: "og:description",
        content: "Selected projects by Hanzala Kareem, machine learning engineer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Projects — Hanzala Kareem",
          description: "Machine Learning and C++ projects built by Hanzala Kareem.",
          url: "https://ikareem.netlify.app/projects",
        }),
      },
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
