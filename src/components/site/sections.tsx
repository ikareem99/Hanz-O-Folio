"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, useMemo } from "react";

import { SectionTitle } from "./SiteLayout";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SearchInput } from "@/components/ui/SearchInput";

export function ProjectsSection({ limit, showSearch, items = [] }: { limit?: number; showSearch?: boolean; items?: any[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(
      (p) => p.title?.toLowerCase().includes(lowerQuery) || p.subtitle?.toLowerCase().includes(lowerQuery) || 
      p.keywords?.some((k: string) => k.toLowerCase().includes(lowerQuery))
    );
  }, [query, items]);

  const displayItems = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section>
      <ScrollReveal>
        <SectionTitle top="RECENT" bottom="PROJECTS" />
      </ScrollReveal>
      
      {showSearch && (
        <ScrollReveal>
          <SearchInput 
            placeholder="Search projects..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </ScrollReveal>
      )}

      <div>
        {displayItems.map((p, index) => (
          <ScrollReveal key={p.title || index} delay={0.1 + index * 0.1}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex items-center gap-5 rounded-2xl px-4 py-5 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <img
                src={p.imgSrc || (p.img && p.img.src)} // fallback for seed data compatibility
                alt={`${p.title} project preview`}
                loading="lazy"
                className="h-[var(--proj-img-h)] w-[var(--proj-img-w)] shrink-0 rounded-lg object-cover transition-opacity duration-300 group-hover:opacity-85"
              />
              <div className="flex-1">
                <h3 className="t-card-title">{p.title}</h3>
                <p className="mt-1 t-body text-muted-foreground">{p.subtitle}</p>
              </div>
              <ArrowUpRight className="size-6 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        ))}
      </div>
      
      {limit && items.length > limit && !showSearch && (
        <ScrollReveal>
          <div className="mt-8 text-center">
            <Link href="/projects" className="inline-block rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground">
              View All
            </Link>
          </div>
        </ScrollReveal>
      )}
    </section>
  );
}

export function ExperienceSection({ limit, showSearch, items = [] }: { limit?: number; showSearch?: boolean; items?: any[] }) {
  const yearsExp = new Date().getFullYear() - 2024;
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(
      (e) => e.company?.toLowerCase().includes(lowerQuery) || e.description?.toLowerCase().includes(lowerQuery) || 
      e.keywords?.some((k: string) => k.toLowerCase().includes(lowerQuery))
    );
  }, [query, items]);

  const displayItems = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section>
      <ScrollReveal>
        <SectionTitle top={`${yearsExp}+ YEARS OF`} bottom="EXPERIENCE" />
      </ScrollReveal>

      {showSearch && (
        <ScrollReveal>
          <SearchInput 
            placeholder="Search experience..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </ScrollReveal>
      )}

      <div className={showSearch ? "mt-4" : "mt-6"}>
        {displayItems.map((e, index) => (
          <ScrollReveal key={e.company || index} delay={0.1 + index * 0.1}>
            <a href="#" className="group flex items-center gap-5 cursor-pointer rounded-2xl px-4 py-5 transition-colors duration-300 hover:bg-white/[0.04]">
              <div className="flex-1">
                <h3 className="t-card-title transition-colors duration-300 group-hover:text-primary">
                  {e.company}
                </h3>
                <p className="mt-3 max-w-[520px] t-body text-muted-foreground">{e.description}</p>
                <p className="mt-4 t-meta text-muted-foreground">{e.period}</p>
              </div>
              <ArrowUpRight className="size-6 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </ScrollReveal>
        ))}
      </div>

      {limit && items.length > limit && !showSearch && (
        <ScrollReveal>
          <div className="mt-8 text-center">
            <Link href="/experience" className="inline-block rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground">
              View All
            </Link>
          </div>
        </ScrollReveal>
      )}
    </section>
  );
}

export function ToolsSection({ limit, showSearch, items = [] }: { limit?: number; showSearch?: boolean; items?: any[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(
      (t) => t.name?.toLowerCase().includes(lowerQuery) || t.role?.toLowerCase().includes(lowerQuery) || 
      t.keywords?.some((k: string) => k.toLowerCase().includes(lowerQuery))
    );
  }, [query, items]);

  const displayItems = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section>
      <ScrollReveal>
        <SectionTitle top="PREMIUM" bottom="TOOLS" />
      </ScrollReveal>

      {showSearch && (
        <ScrollReveal>
          <SearchInput 
            placeholder="Search tools (e.g., coding, python)..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </ScrollReveal>
      )}

      <div className={`grid sm:grid-cols-2 gap-2 ${showSearch ? 'mt-4' : 'mt-9'}`}>
        {displayItems.map((t, index) => (
          <ScrollReveal key={t.name || index} delay={0.1 + index * 0.1}>
            <a href="#" className="group flex items-center gap-4 cursor-pointer rounded-2xl px-4 py-5 transition-colors duration-300 hover:bg-white/[0.04]">
              <img
                src={t.iconSrc || (typeof t.icon === "string" ? t.icon : t.icon?.src)} // fallback for seed data compatibility
                alt={`${t.name} logo`}
                loading="lazy"
                className="size-[60px] shrink-0 rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="min-w-0">
                <h3 className="text-[24px] leading-[28.8px] font-semibold">{t.name}</h3>
                <p className="t-body text-muted-foreground">{t.role}</p>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>

      {limit && items.length > limit && !showSearch && (
        <ScrollReveal>
          <div className="mt-8 text-center">
            <Link href="/tools" className="inline-block rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground">
              View All
            </Link>
          </div>
        </ScrollReveal>
      )}
    </section>
  );
}

export function PostsSection({ limit, showSearch, enablePagination, items = [] }: { limit?: number; showSearch?: boolean; enablePagination?: boolean; items?: any[] }) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(15);

  const filtered = useMemo(() => {
    if (!query) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(
      (p) => p.title?.toLowerCase().includes(lowerQuery) || p.excerpt?.toLowerCase().includes(lowerQuery) || 
      p.keywords?.some((k: string) => k.toLowerCase().includes(lowerQuery))
    );
  }, [query, items]);

  const displayItems = limit ? filtered.slice(0, limit) : (enablePagination ? filtered.slice(0, visibleCount) : filtered);

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 15);
  };

  return (
    <section>
      <ScrollReveal>
        <SectionTitle top="PERSONAL" bottom="THOUGHTS" />
      </ScrollReveal>

      {showSearch && (
        <ScrollReveal>
          <SearchInput 
            placeholder="Search articles..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </ScrollReveal>
      )}

      <div className={showSearch ? "mt-4" : "mt-[50px]"}>
        {displayItems.map((p, index) => (
          <ScrollReveal key={p.slug || index} delay={0.1 + index * 0.1}>
            <Link
              href={`/blog/${p.slug}`}
              className="group flex flex-col rounded-2xl px-4 py-5 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="t-card-title max-w-[480px] transition-colors duration-300 group-hover:text-primary">
                  {p.title}
                </h3>
                <ArrowUpRight className="size-6 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              <p className="mt-3 max-w-[480px] t-body text-muted-foreground">{p.excerpt}</p>
              <div className="mt-4 flex items-center justify-between t-meta text-muted-foreground">
                <span>{p.date}</span>
                <span>{p.read}</span>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {limit && items.length > limit && !showSearch && (
        <ScrollReveal>
          <div className="mt-8 text-center">
            <Link href="/blog" className="inline-block rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground">
              View All
            </Link>
          </div>
        </ScrollReveal>
      )}

      {enablePagination && filtered.length > visibleCount && (
        <ScrollReveal>
          <div className="mt-8 text-center">
            <button 
              onClick={handleViewMore}
              className="inline-block rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
            >
              View more
            </button>
          </div>
        </ScrollReveal>
      )}
    </section>
  );
}
