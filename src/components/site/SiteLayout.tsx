import { Link, useRouterState } from "@tanstack/react-router";
import {
  Briefcase,
  Facebook,
  Flame,
  FolderClosed,
  Github,
  Home,
  Instagram,
  Linkedin,
  PenSquare,
  Wrench,
} from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";

import profileImg from "@/assets/profile.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const navItems = [
  { icon: Home, to: "/", label: "Home" },
  { icon: FolderClosed, to: "/projects", label: "Projects" },
  { icon: Briefcase, to: "/experience", label: "Experience" },
  { icon: Wrench, to: "/tools", label: "Tools" },
  { icon: PenSquare, to: "/blog", label: "Thoughts" },
] as const;

function NavBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide if scrolling down and past 50px, show if scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-[var(--nav-top)] z-50 flex justify-center px-4 transition-all duration-300 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0"
        }`}
    >
      <nav className="pointer-events-auto flex h-12 items-center gap-[18px] rounded-[16px] bg-white/[0.03] px-5 backdrop-blur-md">
        {navItems.map(({ icon: Icon, to, label }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={label}
              to={to}
              aria-label={label}
              className="group relative flex size-9 items-center justify-center rounded-lg text-foreground"
            >
              <span
                className={`absolute inset-0 rounded-lg bg-white/10 transition-opacity duration-200 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
              />
              <Icon className="relative size-5" strokeWidth={1.8} />
              <span className="pointer-events-none absolute top-[46px] left-1/2 -translate-x-1/2 translate-y-1 scale-95 rounded-full bg-white/10 px-[10px] py-1 text-[12px] leading-[12px] whitespace-nowrap text-white opacity-0 backdrop-blur-md transition-all duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

function ProfileCard() {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[16px] bg-card px-5 py-[30px] text-card-foreground">
        {/* Top arc: anchored to the card's top-left, sweeping right over the photo */}
        <svg
          className="pointer-events-none absolute top-[-20px] left-[-20px] z-20 h-[170px] w-[240px]"
          viewBox="0 0 240 170"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M 10 40 A 100 100 0 0 0 190 10"
            stroke="var(--primary)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="4 14"
            fill="none"
          />
        </svg>

        <img
          src={profileImg}
          alt="Portrait of Hanzala Kareem"
          className="relative z-10 mx-auto h-[var(--card-img-h)] w-[var(--card-img-w)] rounded-[16px] object-cover"
        />
        <p className="relative z-10 mt-6 text-center text-[36px] leading-[39.6px] font-bold tracking-[-0.04em]">
          Hanzala Kareem
        </p>
        <div className="relative z-10 mt-4 flex pl-[90px]">
          {/* Bottom arc: anchored relative to the badge container so they perfectly join on all devices */}
          <svg
            className="pointer-events-none absolute left-[-20px] top-0 z-[-1] h-[100px] w-[150px]"
            viewBox="0 0 150 100"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M 0 80 A 160 160 0 0 0 115 32"
              stroke="var(--primary)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="4 14"
              fill="none"
            />
          </svg>
          <span className="relative -top-2 flex size-9 items-center justify-center rounded-full bg-primary">
            <Flame className="size-5 text-primary-foreground" />
          </span>
        </div>
        <p className="relative z-10 mx-auto mt-[47px] w-[300px] max-w-full text-center text-[18px] leading-[19.8px] font-medium text-[#6a6b6e]">
          Into AI/ML. I'm the Master of my Fate, the Captain of my Soul.
        </p>

        <div className="relative z-10 mt-[30px] flex items-center justify-center gap-4 text-primary">
          {[
            { Icon: Linkedin, href: "https://pk.linkedin.com/in/hanzala-kareem", label: "LinkedIn" },
            { Icon: Github, href: "https://github.com/ikareem99/", label: "GitHub" },
            { Icon: Instagram, href: "https://www.instagram.com/ikareem99/", label: "Instagram" },
            { Icon: Facebook, href: "https://www.facebook.com/ikareem99/", label: "Facebook" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex size-9 items-center justify-center rounded-md transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-70"
            >
              <Icon className="size-6" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SectionTitle({ top, bottom }: { top: string; bottom: string }) {
  return (
    <h2 className="t-section mb-5 text-center sm:text-left">
      <span className="block text-foreground">{top}</span>
      <span className="block text-heading-ghost">{bottom}</span>
    </h2>
  );
}

export function ContactSection() {
  const label = "mb-[10px] block text-[12px] leading-[14.4px] font-medium text-[#888888]";
  const field =
    "h-10 w-full rounded-lg bg-heading-ghost px-3 text-[14px] leading-[16.8px] text-foreground outline-none transition-colors placeholder:text-[#999999] focus:ring-1 focus:ring-primary/60";

  return (
    <section id="contact">
      <SectionTitle top="LET'S WORK" bottom="TOGETHER" />
      <form
        className="mt-5 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          e.currentTarget.reset();
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={label}>
              Name
            </label>
            <input id="name" name="name" placeholder="Your Name" className={field} />
          </div>
          <div>
            <label htmlFor="email" className={label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your@email.com"
              className={field}
            />
          </div>
        </div>
        <div>
          <label htmlFor="budget" className={label}>
            Budget
          </label>
          <Select name="budget" defaultValue="">
            <SelectTrigger className={field}>
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<3k">&lt;$3k</SelectItem>
              <SelectItem value="3k-5k">$3k - $5k</SelectItem>
              <SelectItem value="5k-10k">$5k - $10k</SelectItem>
              <SelectItem value=">10k">&gt;$10k</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="message" className={label}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            className="h-[100px] w-full resize-none rounded-lg bg-heading-ghost p-3 text-[14px] leading-[16.8px] text-foreground outline-none transition-colors placeholder:text-[#999999] focus:ring-1 focus:ring-primary/60"
          />
        </div>
        <button
          type="submit"
          className="h-10 w-full rounded-lg bg-primary text-[14px] leading-[16.8px] font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-90"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="site-shell pb-24">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <ProfileCard />
        </aside>
        <main className="min-w-0 space-y-[var(--section-gap)]">
          {children}
          <ContactSection />
        </main>
      </div>
      <footer className="pb-10 text-center text-[15px] text-muted-foreground">
        Made by <span className="text-primary">Hanzala Kareem</span>
      </footer>
    </div>
  );
}
