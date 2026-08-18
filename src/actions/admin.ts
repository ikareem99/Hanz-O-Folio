'use server';

import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/mongodb';
import Project from '@/models/Project';
import Experience from '@/models/Experience';
import Tool from '@/models/Tool';
import Post from '@/models/Post';

// Check auth helper (simple version for server actions)
import { cookies } from 'next/headers';
async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token || token !== 'authenticated') {
    throw new Error('Unauthorized');
  }
}

import { writeFile } from 'fs/promises';
import { join } from 'path';

// --- IMAGE UPLOAD ---
export async function uploadImage(formData: FormData) {
  await verifyAuth();
  const file = formData.get('file') as File;
  
  if (!file) {
    throw new Error('No file uploaded');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // create a unique filename
  const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const filename = `${uniquePrefix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  
  // write to public/uploads
  const filepath = join(process.cwd(), 'public', 'uploads', filename);
  await writeFile(filepath, buffer);
  
  return { success: true, url: `/uploads/${filename}` };
}

// --- PROJECTS ---
export async function createProject(data: any) {
  await verifyAuth();
  await connectToDatabase();
  const newDoc = await Project.create(data);
  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
  return { success: true, id: newDoc._id.toString() };
}

export async function updateProject(id: string, data: any) {
  await verifyAuth();
  await connectToDatabase();
  await Project.findByIdAndUpdate(id, data);
  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
  return { success: true };
}

export async function deleteProject(id: string) {
  await verifyAuth();
  await connectToDatabase();
  await Project.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
  return { success: true };
}

// --- EXPERIENCE ---
export async function createExperience(data: any) {
  await verifyAuth();
  await connectToDatabase();
  const newDoc = await Experience.create(data);
  revalidatePath('/');
  revalidatePath('/experience');
  revalidatePath('/admin/experience');
  return { success: true, id: newDoc._id.toString() };
}

export async function updateExperience(id: string, data: any) {
  await verifyAuth();
  await connectToDatabase();
  await Experience.findByIdAndUpdate(id, data);
  revalidatePath('/');
  revalidatePath('/experience');
  revalidatePath('/admin/experience');
  return { success: true };
}

export async function deleteExperience(id: string) {
  await verifyAuth();
  await connectToDatabase();
  await Experience.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/experience');
  revalidatePath('/admin/experience');
  return { success: true };
}

// --- TOOLS ---
export async function createTool(data: any) {
  await verifyAuth();
  await connectToDatabase();
  const newDoc = await Tool.create(data);
  revalidatePath('/');
  revalidatePath('/tools');
  revalidatePath('/admin/tools');
  return { success: true, id: newDoc._id.toString() };
}

export async function updateTool(id: string, data: any) {
  await verifyAuth();
  await connectToDatabase();
  await Tool.findByIdAndUpdate(id, data);
  revalidatePath('/');
  revalidatePath('/tools');
  revalidatePath('/admin/tools');
  return { success: true };
}

export async function deleteTool(id: string) {
  await verifyAuth();
  await connectToDatabase();
  await Tool.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/tools');
  revalidatePath('/admin/tools');
  return { success: true };
}

// --- POSTS ---
export async function createPost(data: any) {
  await verifyAuth();
  await connectToDatabase();
  const newDoc = await Post.create(data);
  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath('/admin/posts');
  return { success: true, id: newDoc._id.toString() };
}

export async function updatePost(id: string, data: any) {
  await verifyAuth();
  await connectToDatabase();
  await Post.findByIdAndUpdate(id, data);
  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath('/admin/posts');
  revalidatePath(`/blog/${data.slug}`);
  return { success: true };
}

export async function deletePost(id: string) {
  await verifyAuth();
  await connectToDatabase();
  await Post.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath('/admin/posts');
  return { success: true };
}
