import { SiteLayout } from "@/components/site/SiteLayout";
import { PostsSection } from "@/components/site/sections";
import { getPosts } from "@/lib/data";

export const metadata = {
  title: "Personal Thoughts — Hanzala Kareem",
  description: "Articles on machine learning, C++ simulation, algorithms, and AI development.",
  openGraph: {
    title: "Personal Thoughts — Hanzala Kareem",
    description: "Articles on machine learning, C++ simulation, algorithms, and AI development.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Personal Thoughts — Hanzala Kareem",
  description: "Articles on machine learning, C++ simulation, algorithms, and AI development.",
  url: "https://ikareem.netlify.app/blog",
  author: {
    "@type": "Person",
    name: "Hanzala Kareem",
  },
};

export default async function BlogPage() {
  const postsData = await getPosts();

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostsSection showSearch enablePagination items={postsData} />
    </SiteLayout>
  );
}
