import connectToDatabase from "./mongodb";
import Project from "@/models/Project";
import Experience from "@/models/Experience";
import Tool from "@/models/Tool";
import Post from "@/models/Post";
import { 
  projects as fallbackProjects, 
  experience as fallbackExperience, 
  tools as fallbackTools, 
  posts as fallbackPosts 
} from "@/data/site";

export async function getProjects() {
  const db = await connectToDatabase();
  if (!db) return fallbackProjects;
  
  const items = await Project.find({}).sort({ priority: 1 }).lean();
  return items.length ? JSON.parse(JSON.stringify(items)) : fallbackProjects;
}

export async function getExperience() {
  const db = await connectToDatabase();
  if (!db) return fallbackExperience;
  
  const items = await Experience.find({}).sort({ priority: 1 }).lean();
  return items.length ? JSON.parse(JSON.stringify(items)) : fallbackExperience;
}

export async function getTools() {
  const db = await connectToDatabase();
  if (!db) return fallbackTools;
  
  const items = await Tool.find({}).sort({ priority: 1 }).lean();
  return items.length ? JSON.parse(JSON.stringify(items)) : fallbackTools;
}

export async function getPosts() {
  const db = await connectToDatabase();
  if (!db) return fallbackPosts;
  
  const items = await Post.find({}).sort({ priority: 1 }).lean();
  return items.length ? JSON.parse(JSON.stringify(items)) : fallbackPosts;
}
