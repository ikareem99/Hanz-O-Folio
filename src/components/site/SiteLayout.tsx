import { Link, useRouterState } from "@tanstack/react-router";
import {
  Briefcase,
  Dribbble,
  Flame,
  FolderClosed,
  Home,
  Instagram,
  PenSquare,
  Twitter,
  Wrench,
  Youtube,
} from "lucide-react";
import type { ReactNode } from "react";

import profileImg from "@/assets/profile.jpg";

const navItems = [
  { icon: Home, to: "/", label: "Home" },
  { icon: FolderClosed, to: "/projects", label: "Projects" },
  { icon: Briefcase, to: "/experience", label: "Experience" },
  { icon: Wrench, to: "/tools", label: "Tools" },
  { icon: PenSquare, to: "/blog", label: "Thoughts" },
] as const;

function NavBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="pointer-events-none absolute inset-x-0 top-[var(--nav-top)] z-50 flex justify-center px-4">
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
                className={`absolute inset-0 rounded-lg bg-white/10 transition-opacity duration-200 ${
                  active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />
              <Icon className="relative size-[18px]" strokeWidth={1.8} />
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
          className="pointer-events-none absolute top-0 left-0 z-20 h-[130px] w-[290px]"
          viewBox="0 0 290 130"
          preserveAspectRatio="xMinYMin meet"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 26 C 28 92, 100 126, 172 110 C 230 96, 266 58, 280 12"
            stroke="var(--primary)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="5 14"
            strokeDashoffset="0"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>

        {/* Bottom arc: anchored to the card's bottom-left, curving up toward the badge */}
        <svg
          className="pointer-events-none absolute bottom-[150px] left-0 z-20 h-[150px] w-[200px] max-[809px]:hidden"
          viewBox="0 0 200 150"
          preserveAspectRatio="xMinYMax meet"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 8 C 14 66, 44 106, 92 122 C 122 132, 150 136, 176 137"
            stroke="var(--primary)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="5 14"
            strokeDashoffset="0"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>


        <img
          src={profileImg}
          alt="Portrait of Aaabad Ahmed"
          className="relative z-10 mx-auto h-[var(--card-img-h)] w-[var(--card-img-w)] rounded-[16px] object-cover"
        />
        <p className="relative z-10 mt-6 text-center text-[36px] leading-[39.6px] font-bold tracking-[-0.04em]">
          Aaabad Ahmed
        </p>
        <div className="relative z-10 mt-6 flex justify-center max-[809px]:hidden">
          <span className="ml-[-14%] flex size-9 items-center justify-center rounded-full bg-primary">
            <Flame className="size-5 text-primary-foreground" />
          </span>
        </div>
        <p className="relative z-10 mx-auto mt-4 w-[300px] min-[810px]:mt-[47px] max-w-full text-center text-[18px] leading-[19.8px] font-medium text-[#6a6b6e]">
          A Software Engineer who has developed countless innovative solutions.
        </p>

        <div className="relative z-10 mt-5 flex items-center justify-center gap-4 min-[810px]:mt-[30px] text-primary">
          {[
            { Icon: Dribbble, href: "https://dribbble.com", label: "Dribbble" },
            { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
            { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
            { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
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
    <h2 className="t-section mb-5">
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
          <select id="budget" name="budget" defaultValue="" className={field}>
            <option value="">Select…</option>
            <option>&lt;$3k</option>
            <option>$3k - $5k</option>
            <option>$5k - $10k</option>
            <option>&gt;$10k</option>
          </select>
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
        <aside className="lg:sticky lg:top-[110px] lg:self-start">
          <ProfileCard />
        </aside>
        <main className="min-w-0 space-y-[var(--section-gap)]">
          {children}
          <ContactSection />
        </main>
      </div>
      <footer className="pb-10 text-center text-[15px] text-muted-foreground">
        Made by <span className="text-primary">Aaabad Ahmed</span>
      </footer>
    </div>
  );
}
