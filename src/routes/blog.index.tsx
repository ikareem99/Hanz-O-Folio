import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/SiteLayout";
import { PostsSection } from "@/components/site/sections";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Personal Thoughts — Hanzala Kareem" },
      {
        name: "description",
        content: "Articles on machine learning, C++ simulation, algorithms, and AI development.",
      },
      { property: "og:title", content: "Personal Thoughts — Hanzala Kareem" },
      {
        property: "og:description",
        content: "Articles on machine learning, C++ simulation, algorithms, and AI development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Personal Thoughts — Hanzala Kareem",
          description: "Articles on machine learning, C++ simulation, algorithms, and AI development.",
          url: "https://ikareem.netlify.app/blog",
          author: {
            "@type": "Person",
            name: "Hanzala Kareem",
          },
        }),
      },
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
