import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { SectionTitle } from "./SiteLayout";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { experience, posts, projects, tools } from "@/data/site";

export function ProjectsSection({ limit }: { limit?: number }) {
  return (
    <section>
      <ScrollReveal>
        <SectionTitle top="RECENT" bottom="PROJECTS" />
      </ScrollReveal>
      <div>
        {projects.slice(0, limit).map((p, index) => (
          <ScrollReveal key={p.title} delay={0.1 + index * 0.1}>
            <a
            href="#"
            className="group flex items-center gap-5 rounded-2xl px-4 py-5 transition-colors duration-300 hover:bg-white/[0.04]"
          >
            <img
              src={p.img}
              alt={`${p.title} project preview`}
              loading="lazy"
              className="h-[var(--proj-img-h)] w-[var(--proj-img-w)] shrink-0 rounded-lg object-cover transition-opacity duration-300 group-hover:opacity-85"
            />
            <div className="flex-1">
              <h3 className="t-card-title">{p.title}</h3>
              <p className="mt-1 t-body text-muted-foreground">{p.subtitle}</p>

            </div>
            <ArrowUpRight className="size-6 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export function ExperienceSection({ limit }: { limit?: number }) {
  return (
    <section>
      <ScrollReveal>
        <SectionTitle top="12 YEARS OF" bottom="EXPERIENCE" />
      </ScrollReveal>
      <div className="mt-6 space-y-[45px] px-4">
        {experience.slice(0, limit).map((e, index) => (
          <ScrollReveal key={e.company} delay={0.1 + index * 0.1}>
            <div className="group">
            <h3 className="t-card-title transition-colors duration-300 group-hover:text-primary">
              {e.company}
            </h3>
            <p className="mt-3 max-w-[520px] t-body text-muted-foreground">{e.description}</p>
            <p className="mt-4 t-meta text-muted-foreground">{e.period}</p>

            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export function ToolsSection() {
  return (
    <section>
      <ScrollReveal>
        <SectionTitle top="PREMIUM" bottom="TOOLS" />
      </ScrollReveal>
      <div className="mt-9 grid gap-x-4 gap-y-[42px] px-4 sm:grid-cols-2">
        {tools.map((t, index) => (
          <ScrollReveal key={t.name} delay={0.1 + index * 0.1}>
            <div className="group flex items-center gap-4">
            <img
              src={t.icon}
              alt={`${t.name} logo`}
              loading="lazy"
              className="size-[60px] shrink-0 rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="min-w-0">
              <h3 className="text-[24px] leading-[28.8px] font-semibold">{t.name}</h3>
              <p className="t-body text-muted-foreground">{t.role}</p>
            </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export function PostsSection({ limit }: { limit?: number }) {
  return (
    <section>
      <ScrollReveal>
        <SectionTitle top="DESIGN" bottom="THOUGHTS" />
      </ScrollReveal>
      <div className="mt-[50px] space-y-[60px] px-4">
        {posts.slice(0, limit).map((p, index) => (
          <ScrollReveal key={p.slug} delay={0.1 + index * 0.1}>
            <Link
              to="/blog/$slug"
            params={{ slug: p.slug }}
            className="group flex max-w-[480px] flex-col"
          >
            <h3 className="t-card-title transition-colors duration-300 group-hover:text-primary">
              {p.title}
            </h3>
            <p className="mt-3 t-body text-muted-foreground">{p.excerpt}</p>
            <div className="mt-4 flex items-center justify-between t-meta text-muted-foreground">

              <span>{p.date}</span>
              <span>{p.read}</span>
            </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
