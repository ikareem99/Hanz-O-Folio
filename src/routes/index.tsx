import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Layers, LayoutPanelTop } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import {
  ExperienceSection,
  PostsSection,
  ProjectsSection,
  ToolsSection,
} from "@/components/site/sections";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { stats } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hanzala Kareem — Machine Learning Engineer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Hanzala Kareem, a machine learning engineer crafting intelligent solutions.",
      },
      { property: "og:title", content: "Hanzala Kareem — Machine Learning Engineer Portfolio" },
      {
        property: "og:description",
        content:
          "Portfolio of Hanzala Kareem, a machine learning engineer crafting intelligent solutions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          dateCreated: "2024-01-01T12:00:00+00:00",
          dateModified: new Date().toISOString(),
          mainEntity: {
            "@type": "Person",
            name: "Hanzala Kareem",
            alternateName: "ikareem99",
            identifier: "ikareem99",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <section className="max-[1199px]:text-center">
        <ScrollReveal priority>
          <h1 className="t-display">
            <span className="block text-foreground">AI / ML</span>
            <span className="block text-heading-ghost">Engineer</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.1} priority>
          <p className="mt-[10px] max-w-[480px] t-lede max-[1199px]:mx-auto text-muted-foreground">
            Passionate about building intelligent systems and extracting insights from data. Specializing in Python, C++, and building end-to-end ML solutions.
          </p>
        </ScrollReveal>


        <div className="mt-[60px] flex flex-wrap gap-x-10 gap-y-8 max-[1199px]:justify-center">
          {stats.map((s, index) => (
            <ScrollReveal key={s.value} delay={0.2 + index * 0.1}>
              <div className="text-[length:var(--fs-stat)] leading-[var(--lh-stat)] font-semibold tracking-[-0.01em]">
                {s.value}
              </div>
              <p className="text-[length:var(--fs-stat-label)] leading-[var(--lh-stat-label)] tracking-[var(--ls-stat-label)] text-muted-foreground uppercase">

                {s.line1}
                <br />
                {s.line2}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-[60px] grid gap-[30px] text-left sm:grid-cols-[300fr_366fr]">
          <ScrollReveal delay={0.4} className="h-full">
            <article className="wave-pattern group relative flex h-[240px] flex-col justify-between overflow-hidden rounded-[10px] bg-primary p-5 text-primary-foreground transition-transform duration-300 hover:-translate-y-1">
              <Layers className="size-7" strokeWidth={1.8} />
              <div className="flex items-end justify-between gap-4">
                <h3 className="max-w-[260px] text-[24px] leading-[1.1] font-medium uppercase">
                  AI & Data Science, ML Models
                </h3>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-current/50 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </article>
          </ScrollReveal>
          <ScrollReveal delay={0.5} className="h-full">
            <article className="zigzag-pattern group relative flex h-[240px] flex-col justify-between overflow-hidden rounded-[10px] bg-lime p-5 text-lime-foreground transition-transform duration-300 hover:-translate-y-1">
              <LayoutPanelTop className="size-7" strokeWidth={1.8} />
              <div className="flex items-end justify-between gap-4">
                <h3 className="max-w-[300px] text-[24px] leading-[1.1] font-medium uppercase">
                  Python, Pandas, Numpy, Scikit-Learn, TensorFlow
                </h3>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-current/50 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <ProjectsSection limit={3} />
      <ExperienceSection limit={3} />
      <ToolsSection />
      <PostsSection limit={3} />
    </SiteLayout>
  );
}
