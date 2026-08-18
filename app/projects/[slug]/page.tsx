import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { SiteLayout } from "@/components/site/SiteLayout";
import { getProjects } from "@/lib/data";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p: any) => p.slug === slug);
  if (!project) {
    return {
      title: "Not found — Hanzala Kareem",
      robots: { index: false },
    };
  }

  const coverSrc = project.imgSrc || (project.cover && project.cover.src);

  return {
    title: `${project.title} — Hanzala Kareem`,
    description: project.subtitle,
    openGraph: {
      title: project.title,
      description: project.subtitle,
      type: "article",
      authors: ["Hanzala Kareem"],
      images: [{ url: coverSrc }],
    },
    twitter: {
      card: "summary_large_image",
      images: [coverSrc],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p: any) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const coverSrc = project.imgSrc || (project.cover && project.cover.src);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: project.title,
    image: coverSrc,
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
          alt={project.title}
          className="h-[430px] w-full rounded-lg object-cover"
        />
        <h1 className="mt-8 text-[clamp(2.25rem,4.5vw,56px)] leading-[1.08] font-bold tracking-[-0.03em]">
          {project.title}
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">{project.subtitle}</p>

        <div className="mt-14 space-y-12">
          {project.content ? (
            <div 
              className="prose prose-invert prose-lg max-w-none 
                prose-p:text-[18px] prose-p:leading-[1.6] prose-p:text-white/85 
                prose-headings:font-bold prose-headings:tracking-[-0.02em]
                prose-h2:text-[32px] prose-h2:leading-[1.2] prose-h2:mt-12
                prose-h3:text-[24px] prose-h3:mt-8
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-lg prose-img:w-full"
              dangerouslySetInnerHTML={{ __html: project.content }} 
            />
          ) : (
            <p className="text-[18px] leading-[1.6] text-white/85 italic">
              No detailed content available for this project yet.
            </p>
          )}
        </div>
      </article>
    </SiteLayout>
  );
}
