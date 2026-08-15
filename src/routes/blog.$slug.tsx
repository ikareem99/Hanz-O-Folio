import { createFileRoute, notFound } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/SiteLayout";
import { posts } from "@/data/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found — Aaabad Ahmed" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Aaabad Ahmed` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:image", content: post.cover },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: post.cover },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();

  return (
    <SiteLayout>
      <article>
        <img
          src={post.cover}
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
