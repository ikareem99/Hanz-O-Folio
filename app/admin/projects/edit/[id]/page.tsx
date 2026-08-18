import { getProjectById } from '@/lib/data';
import ProjectEditor from '../../components/ProjectEditor';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Project',
};

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = await getProjectById(params.id);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="p-6">
      <ProjectEditor initialData={project} />
    </div>
  );
}
