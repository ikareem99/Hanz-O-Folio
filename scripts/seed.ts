import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
// Use path to get absolute path to env file
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Since we are running outside of Next.js for the seed, we need to redefine schemas briefly 
// or import them if the TypeScript setup allows it. For a simple script, redefining is easiest to avoid Next.js alias issues.
const ProjectSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  imgSrc: String,
  keywords: [String],
});
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const ExperienceSchema = new mongoose.Schema({
  company: String,
  description: String,
  period: String,
  keywords: [String],
});
const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);

const ToolSchema = new mongoose.Schema({
  name: String,
  role: String,
  iconSrc: String,
  keywords: [String],
});
const Tool = mongoose.models.Tool || mongoose.model('Tool', ToolSchema);

const PostSchema = new mongoose.Schema({
  slug: String,
  title: String,
  excerpt: String,
  date: String,
  read: String,
  coverSrc: String,
  keywords: [String],
  body: [{ heading: String, paragraphs: [String] }]
});
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

// Hardcoded data (normally imported from src/data/site.ts, but simplified here to avoid import alias issues)
const projects = [
  { imgSrc: "/assets/najmai.jpeg", title: "LudoT", subtitle: "Automated Ludo Playing Robot (Python + C++)", keywords: ["robotics", "python", "c++", "ai", "machine learning", "coding"] },
  { imgSrc: "/assets/damas.png", title: "Movie Manager", subtitle: "Recommendation System in C++", keywords: ["recommendation", "c++", "data structures", "coding"] },
  { imgSrc: "/assets/majd.png", title: "RUSH HOUR", subtitle: "2D Driving Simulation (C++)", keywords: ["simulation", "game", "c++", "coding"] },
  { imgSrc: "/assets/faseelh.png", title: "Nike/Movie App", subtitle: "React.js & Tailwind CSS", keywords: ["react", "tailwind", "frontend", "web", "coding"] },
];

const experience = [
  { company: "Synergy Flow Labs", description: "Remotely Worked as an Associate Software Engineer and Jr. Data Scientist, focusing on machine learning and scalable solutions.", period: "Jun 2025 - Present", keywords: ["software engineer", "data scientist", "machine learning", "coding", "ai", "python"] },
];

const tools = [
  { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", name: "Python", role: "Core Language", keywords: ["coding", "language", "backend", "machine learning", "ml", "ai"] },
  { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", name: "C++", role: "Systems & Logic", keywords: ["coding", "language", "system", "performance"] },
  { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg", name: "Pandas", role: "Data Analysis", keywords: ["data analysis", "python", "library", "coding"] },
  { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg", name: "NumPy", role: "Numerical Computing", keywords: ["numerical computing", "python", "library", "coding"] },
  { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", name: "VS Code", role: "Code Editor", keywords: ["editor", "ide", "coding", "development"] },
  { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg", name: "Jupyter", role: "Notebooks", keywords: ["notebooks", "coding", "data science", "python"] },
  { iconSrc: "/assets/chatgpt.png", name: "ChatGPT", role: "AI Assistant", keywords: ["ai", "assistant", "productivity", "generative"] },
];

const posts = [
  {
    slug: "building-an-automated-ludo-robot",
    title: "Building an Automated Ludo Robot with Python & C++",
    excerpt: "Exploring the challenges and successes of building LudoT, a robot capable of playing the classic board game Ludo using intelligent move selection.",
    date: "Aug 15, 2026",
    read: "5min read",
    coverSrc: "/assets/blog1.jpg",
    keywords: ["robotics", "c++", "python", "ai", "coding"],
    body: [
      { heading: "The Concept", paragraphs: ["The idea behind LudoT was to merge hardware control with algorithmic pathfinding..."] }
    ],
  }
];

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error("Please set MONGODB_URI in your .env.local file");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.");

  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log("Seeded Projects");

  await Experience.deleteMany({});
  await Experience.insertMany(experience);
  console.log("Seeded Experience");

  await Tool.deleteMany({});
  await Tool.insertMany(tools);
  console.log("Seeded Tools");

  await Post.deleteMany({});
  await Post.insertMany(posts);
  console.log("Seeded Posts");

  console.log("Done seeding!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error seeding data:", err);
  process.exit(1);
});
