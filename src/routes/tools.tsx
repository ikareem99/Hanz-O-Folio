import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/SiteLayout";
import { ToolsSection } from "@/components/site/sections";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Tools — Aaabad Ahmed" },
      {
        name: "description",
        content: "The premium tools behind the work: Framer, Figma, Notion, Next.js and more.",
      },
      { property: "og:title", content: "Tools — Aaabad Ahmed" },
      {
        property: "og:description",
        content: "The premium tools behind the work: Framer, Figma, Notion, Next.js and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
