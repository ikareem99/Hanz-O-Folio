import { getProjects } from '@/lib/data';
import ProjectClient from './ProjectClient';

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <ProjectClient projects={projects} />
  );
}
