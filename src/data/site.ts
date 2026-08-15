import najmaiImg from "@/assets/najmai.jpeg";
import damasImg from "@/assets/damas.png";
import majdImg from "@/assets/majd.png";
import faseelhImg from "@/assets/faseelh.png";
import abjadImg from "@/assets/abjad.png";
import baytImg from "@/assets/bayt.webp";
import stabraqImg from "@/assets/stabraq.jpg";
import postwingImg from "@/assets/postwing.png";
import framerIcon from "@/assets/framer.png";
import figmaIcon from "@/assets/figma.png";
import lemonIcon from "@/assets/lemon.png";
import chatgptIcon from "@/assets/chatgpt.png";
import notionIcon from "@/assets/notion.png";
import nextjsIcon from "@/assets/nextjs.png";
import blog1 from "@/assets/blog1.jpg";
import blog2 from "@/assets/blog2.jpg";
import blog3 from "@/assets/blog3.jpg";
import blog4 from "@/assets/blog4.jpg";
import blog5 from "@/assets/blog5.jpg";

export const stats = [
  { value: "+12", line1: "YEARS OF", line2: "EXPERIENCE" },
  { value: "+46", line1: "PROJECTS", line2: "COMPLETED" },
  { value: "+20", line1: "WORLDWIDE", line2: "CLIENTS" },
];

export const projects = [
  { img: najmaiImg, title: "NajmAI", subtitle: "SaaS Framer Template" },
  { img: damasImg, title: "Damas", subtitle: "Free Framer Template" },
  { img: majdImg, title: "Majd", subtitle: "Free Portfolio Template" },
  { img: faseelhImg, title: "Faseelh", subtitle: "Free Framer Template" },
  { img: abjadImg, title: "ABJAD", subtitle: "Portfolio Framer Template" },
  { img: baytImg, title: "Bayt", subtitle: "Real Estate Framer Template" },
  { img: stabraqImg, title: "Stabraq", subtitle: "Portfolio Framer Template" },
  { img: postwingImg, title: "PostWing", subtitle: "Social Media Scheduler" },
];

export const experience = [
  {
    company: "PixelForge Studios",
    description:
      "Led the design team in creating user-centric mobile and web applications, improving the user experience and increasing user engagement.",
    period: "Jan 2020 - Present",
  },
  {
    company: "BlueWave Innovators",
    description:
      "Developed and implemented design strategies for new product lines, collaborated closely with engineers and product managers.",
    period: "Jun 2017 - Dec 2019",
  },
  {
    company: "TrendCraft Solutions",
    description:
      "Designed user interfaces for e-commerce platforms, focusing on enhancing usability and visual appeal.",
    period: "Mar 2015 - May 2017",
  },
  {
    company: "Visionary Labs",
    description:
      "Assisted in the creation of wireframes and prototypes for various digital products, contributed to user research and testing.",
    period: "Sep 2013 - Feb 2015",
  },
];

export const tools = [
  { icon: framerIcon, name: "Framer", role: "Website Builder" },
  { icon: figmaIcon, name: "Figma", role: "Design Tool" },
  { icon: lemonIcon, name: "Lemon Squeezy", role: "Payments Provider" },
  { icon: chatgptIcon, name: "ChatGPT", role: "AI Assistant" },
  { icon: notionIcon, name: "Notion", role: "Productivity Tool" },
  { icon: nextjsIcon, name: "Nextjs", role: "React framework" },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  cover: string;
  body: { heading: string; paragraphs: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "starting-a-career-in-web-design",
    title: "Starting and Growing a Career in Web Design",
    excerpt:
      "As the internet continues to develop and grow exponentially, jobs related to the industry do too, particularly those that relate to web design and development.",
    date: "Apr 8, 2022",
    read: "6min read",
    cover: blog1,
    body: [
      {
        heading: "Where to begin",
        paragraphs: [
          "A design career rarely starts with a perfect portfolio. It starts with curiosity: pulling apart interfaces you like, rebuilding them, and noticing why some choices feel effortless while others fight the user.",
          "Pick a small, real problem and ship a solution for it. One finished project teaches more than ten unfinished explorations, and it gives you something concrete to talk about.",
        ],
      },
      {
        heading: "Build the craft, then the range",
        paragraphs: [
          "Depth first: typography, spacing, colour, and hierarchy. Once those decisions become instinctive, widen your range into interaction, motion, and the front-end code that brings work to life.",
          "Feedback accelerates everything. Share work early, ask specific questions, and treat critique as data rather than judgement.",
        ],
      },
      {
        heading: "Growing over time",
        paragraphs: [
          "Careers compound through reputation. Write about what you learn, keep your case studies honest about trade-offs, and stay generous with the people around you.",
        ],
      },
    ],
  },
  {
    slug: "create-a-landing-page-that-performs-great",
    title: "Create a Landing Page That Performs Great",
    excerpt:
      "Whether you work in marketing, sales, or product design, you understand the importance of a quality landing page. Landing pages are standalone pages built to convert.",
    date: "Mar 15, 2022",
    read: "6min read",
    cover: blog2,
    body: [
      {
        heading: "What is a landing page?",
        paragraphs: [
          "A landing page is a standalone page built around a single outcome. Everything on it — the headline, the proof, the button — exists to move a visitor one step closer to that outcome.",
          "Because the goal is narrow, the page can be ruthless about what it includes. Anything that does not support the action is a distraction.",
        ],
      },
      {
        heading: "Landing pages vs. front pages",
        paragraphs: [
          "A homepage serves many audiences: it explains the brand, lists features, links to jobs and support. A landing page serves one audience arriving from one campaign.",
          "That difference shows up in navigation. Homepages invite exploration; landing pages remove exits so attention stays on a single call to action.",
        ],
      },
      {
        heading: "Best practices that hold up",
        paragraphs: [
          "Lead with the outcome, not the feature list. Match the wording of the ad that brought the visitor here so the page feels like a continuation, not a detour.",
          "Keep forms short, put social proof near the decision point, and make the page fast — performance is a conversion feature.",
          "Then test. Small, isolated changes with enough traffic behind them will teach you more about your audience than any checklist.",
        ],
      },
    ],
  },
  {
    slug: "how-can-designers-prepare-for-the-future",
    title: "How Can Designers Prepare for the Future?",
    excerpt:
      "Tools change fast, but the fundamentals of clarity, hierarchy, and empathy age remarkably well. Here is how to invest your time.",
    date: "Feb 28, 2022",
    read: "6min read",
    cover: blog3,
    body: [
      {
        heading: "Tools are temporary",
        paragraphs: [
          "Every few years a new tool reshapes the workflow. Designers who tie their identity to a single tool spend those years catching up; designers who tie it to judgement simply move.",
        ],
      },
      {
        heading: "Learn adjacent skills",
        paragraphs: [
          "Understanding how things get built makes your work more likely to survive implementation. A working knowledge of the front end, of data, and of writing pays back constantly.",
        ],
      },
      {
        heading: "Stay close to people",
        paragraphs: [
          "Automation is good at production and bad at deciding what matters. Time spent with real users is the part of the job that will not be handed off.",
        ],
      },
    ],
  },
  {
    slug: "building-a-navigation-component",
    title: "Building a Navigation Component with Variables",
    excerpt:
      "A navigation bar looks simple until you account for states, breakpoints, and every page it has to describe. Variables keep it sane.",
    date: "Feb 6, 2022",
    read: "6min read",
    cover: blog4,
    body: [
      {
        heading: "Start with the states",
        paragraphs: [
          "Default, hover, active, focus, disabled. Sketch them before you draw a single pixel of chrome — the states are the component; the styling is decoration on top.",
        ],
      },
      {
        heading: "Drive it with variables",
        paragraphs: [
          "Store the label, the icon, and the destination as properties instead of duplicating layers. One source of truth means one place to fix things later.",
        ],
      },
      {
        heading: "Respect the small screen",
        paragraphs: [
          "Navigation is the first thing to break on mobile. Decide early what collapses, what stays, and how a user knows where they are.",
        ],
      },
    ],
  },
  {
    slug: "how-to-create-an-effective-design-portfolio",
    title: "How to Create an Effective Design Portfolio",
    excerpt:
      "A portfolio is not an archive. It is an argument for the kind of work you want to do next, told through a handful of projects.",
    date: "Jan 12, 2022",
    read: "6min read",
    cover: blog5,
    body: [
      {
        heading: "Fewer, deeper projects",
        paragraphs: [
          "Three well-told case studies beat twelve thumbnails. Show the problem, the constraint that made it hard, and the decision you are proudest of.",
        ],
      },
      {
        heading: "Write like a colleague",
        paragraphs: [
          "Skip the process theatre. Explain what you tried, what failed, and what you would change — that is the part hiring managers actually read.",
        ],
      },
      {
        heading: "Make it easy to contact you",
        paragraphs: [
          "Put your email where it cannot be missed, keep the page fast, and make sure it looks right on a phone. The best work still needs a clear path to a reply.",
        ],
      },
    ],
  },
];
