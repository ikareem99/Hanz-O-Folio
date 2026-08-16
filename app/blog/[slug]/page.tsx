import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { SiteLayout } from "@/components/site/SiteLayout";
import { posts } from "@/data/site";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: "Not found — Hanzala Kareem",
      robots: { index: false },
    };
  }

  return {
    title: `${post.title} — Hanzala Kareem`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Hanzala Kareem"],
      images: [{ url: post.cover.src }],
    },
    twitter: {
      card: "summary_large_image",
      images: [post.cover.src],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.cover.src,
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: "Hanzala Kareem",
    },
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <img
          src={post.cover.src}
          alt={post.title}
          className="h-[430px] w-full rounded-lg object-cover"
        />
        <div className="mt-4 flex items-center justify-between text-[16px] text-muted-foreground">
          <span>{post.date}</span>
          <span>{post.read}</span>
        </div>
        <h1 className="mt-4 text-[clamp(2.25rem,4.5vw,56px)] leading-[1.08] font-bold tracking-[-0.03em]">
          {post.title}
        </h1>

        <div className="mt-14 space-y-12">
          {post.body.map((block) => (
            <section key={block.heading}>
              <h2 className="text-[32px] leading-[1.2] font-bold tracking-[-0.02em]">
                {block.heading}
              </h2>
              <div className="mt-5 space-y-5">
                {block.paragraphs.map((text) => (
                  <p key={text.slice(0, 24)} className="text-[18px] leading-[1.6] text-white/85">
                    {text}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </SiteLayout>
  );
}
