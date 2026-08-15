import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/SiteLayout";
import { PostsSection } from "@/components/site/sections";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Design Thoughts — Aaabad Ahmed" },
      {
        name: "description",
        content: "Essays on design careers, landing pages, portfolios and building for the web.",
      },
      { property: "og:title", content: "Design Thoughts — Aaabad Ahmed" },
      {
        property: "og:description",
        content: "Essays on design careers, landing pages, portfolios and building for the web.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <SiteLayout>
      <PostsSection />
    </SiteLayout>
  );
}
