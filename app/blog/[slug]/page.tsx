import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { SiteLayout } from "@/components/site/SiteLayout";
import { getPosts } from "@/lib/data";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find((p: any) => p.slug === slug);
  if (!post) {
    return {
      title: "Not found — Hanzala Kareem",
      robots: { index: false },
    };
  }

  const coverSrc = post.coverSrc || (post.cover && post.cover.src);

  return {
    title: `${post.title} — Hanzala Kareem`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Hanzala Kareem"],
      images: [{ url: coverSrc }],
    },
    twitter: {
      card: "summary_large_image",
      images: [coverSrc],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find((p: any) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const coverSrc = post.coverSrc || (post.cover && post.cover.src);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: coverSrc,
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
          src={coverSrc}
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
          {post.content ? (
            <div 
              className="prose prose-invert prose-lg max-w-none 
                prose-p:text-[18px] prose-p:leading-[1.6] prose-p:text-white/85 
                prose-headings:font-bold prose-headings:tracking-[-0.02em]
                prose-h2:text-[32px] prose-h2:leading-[1.2] prose-h2:mt-12
                prose-h3:text-[24px] prose-h3:mt-8
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-lg prose-img:w-full"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          ) : (
            // Fallback for old posts that weren't migrated
            post.body?.map((block: any) => (
              <section key={block.heading}>
                <h2 className="text-[32px] leading-[1.2] font-bold tracking-[-0.02em]">
                  {block.heading}
                </h2>
                <div className="mt-5 space-y-5">
                  {block.paragraphs.map((text: string) => (
                    <p key={text.slice(0, 24)} className="text-[18px] leading-[1.6] text-white/85">
                      {text}
                    </p>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </article>
    </SiteLayout>
  );
}
