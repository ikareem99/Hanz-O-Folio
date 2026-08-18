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
  { value: "+2", line1: "YEARS OF", line2: "EXPERIENCE" },
  { value: "+10", line1: "PROJECTS", line2: "COMPLETED" },
  { value: "+5", line1: "AWARDS &", line2: "CERTIFICATIONS" },
];

export const projects = [
  { img: najmaiImg, title: "LudoT", subtitle: "Automated Ludo Playing Robot (Python + C++)", keywords: ["robotics", "python", "c++", "ai", "machine learning", "coding"] },
  { img: damasImg, title: "Movie Manager", subtitle: "Recommendation System in C++", keywords: ["recommendation", "c++", "data structures", "coding"] },
  { img: majdImg, title: "RUSH HOUR", subtitle: "2D Driving Simulation (C++)", keywords: ["simulation", "game", "c++", "coding"] },
  { img: faseelhImg, title: "Nike/Movie App", subtitle: "React.js & Tailwind CSS", keywords: ["react", "tailwind", "frontend", "web", "coding"] },
];

export const experience = [
  {
    company: "Synergy Flow Labs",
    description:
      "Remotely Worked as an Associate Software Engineer and Jr. Data Scientist, focusing on machine learning and scalable solutions.",
    period: "Jun 2025 - Present",
    keywords: ["software engineer", "data scientist", "machine learning", "coding", "ai", "python"]
  },
];

export const tools = [
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", name: "Python", role: "Core Language", keywords: ["coding", "language", "backend", "machine learning", "ml", "ai"] },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", name: "C++", role: "Systems & Logic", keywords: ["coding", "language", "system", "performance"] },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg", name: "Pandas", role: "Data Analysis", keywords: ["data analysis", "python", "library", "coding"] },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg", name: "NumPy", role: "Numerical Computing", keywords: ["numerical computing", "python", "library", "coding"] },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", name: "VS Code", role: "Code Editor", keywords: ["editor", "ide", "coding", "development"] },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg", name: "Jupyter", role: "Notebooks", keywords: ["notebooks", "coding", "data science", "python"] },
  { icon: chatgptIcon, name: "ChatGPT", role: "AI Assistant", keywords: ["ai", "assistant", "productivity", "generative"] },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  cover: any;
  keywords?: string[];
  body: { heading: string; paragraphs: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "building-an-automated-ludo-robot",
    title: "Building an Automated Ludo Robot with Python & C++",
    excerpt:
      "Exploring the challenges and successes of building LudoT, a robot capable of playing the classic board game Ludo using intelligent move selection.",
    date: "Aug 15, 2026",
    read: "5min read",
    cover: blog1,
    keywords: ["robotics", "c++", "python", "ai", "coding"],
    body: [
      {
        heading: "The Concept",
        paragraphs: [
          "The idea behind LudoT was to merge hardware control with algorithmic pathfinding. We needed a reliable way to compute the smartest possible move in a game of chance and strategy.",
          "By implementing the core game logic in Python, we were able to quickly iterate on the AI strategy, while the ESP32 microcontroller handled the physical execution of moves.",
        ],
      },
      {
        heading: "Hardware & Software Integration",
        paragraphs: [
          "We utilized MQTT to bridge our Python backend with the C++ code running on the ESP32. This decoupled architecture meant our AI could run on a powerful machine while the microcontroller focused purely on motor control.",
        ],
      }
    ],
  },
  {
    slug: "data-structures-in-recommendation-systems",
    title: "Data Structures in Recommendation Systems",
    excerpt:
      "A deep dive into how trees, graphs, and hash tables form the backbone of modern recommendation engines, as seen in the Movie Manager project.",
    date: "Jul 22, 2026",
    read: "8min read",
    cover: blog2,
    keywords: ["c++", "data structures", "algorithms", "coding", "recommendation"],
    body: [
      {
        heading: "Why Data Structures Matter",
        paragraphs: [
          "When managing vast amounts of movie data, simple arrays just won't cut it. Efficient querying and relation-mapping require graphs and fast lookup tables.",
        ],
      },
      {
        heading: "Implementing the Core",
        paragraphs: [
          "In Movie Manager, we utilized heavily optimized C++ data structures to quickly traverse user preferences and map them to similar films.",
        ],
      }
    ],
  },
  {
    slug: "mastering-cplusplus-for-simulation",
    title: "Mastering C++ for Game Simulation",
    excerpt:
      "Lessons learned while developing the 2D driving logic and features for the Rush Hour simulation game.",
    date: "May 10, 2026",
    read: "6min read",
    cover: blog3,
    keywords: ["c++", "simulation", "gaming", "coding"],
    body: [
      {
        heading: "Performance is Key",
        paragraphs: [
          "C++ gives you the control needed to maintain high frame rates in simulation games. Memory management and precise object lifecycles are crucial.",
        ],
      }
    ],
  },
];
