import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/SiteLayout";
import { ToolsSection } from "@/components/site/sections";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Tools — Hanzala Kareem" },
      {
        name: "description",
        content: "The core tools and tech stack behind the work: Python, C++, Pandas, Numpy and more.",
      },
      { property: "og:title", content: "Tools — Hanzala Kareem" },
      {
        property: "og:description",
        content: "The core tools and tech stack behind the work: Python, C++, Pandas, Numpy and more.",
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
          name: "Tools — Hanzala Kareem",
          description: "The core tech stack used by Hanzala Kareem.",
          url: "https://ikareem.netlify.app/tools",
        }),
      },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <SiteLayout>
      <ToolsSection />
    </SiteLayout>
  );
}
