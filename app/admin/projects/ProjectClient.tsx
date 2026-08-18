'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { deleteProject } from '@/actions/admin';
import { Trash2, Edit } from 'lucide-react';
import Link from 'next/link';

export default function ProjectClient({ projects }: { projects: any[] }) {
  const router = useRouter();

  const handleOpenNew = () => {
    router.push('/admin/projects/new');
  };

  const handleOpenEdit = (project: any) => {
    router.push(`/admin/projects/edit/${project._id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button onClick={handleOpenNew}>Add Project</Button>
      </div>

      <div className="rounded-md border bg-card overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[600px]">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-4 font-medium w-[80px]">Priority</th>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Subtitle</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="p-4 text-muted-foreground">{p.priority || 0}</td>
                <td className="p-4 font-medium">{p.title}</td>
                <td className="p-4 text-muted-foreground">{p.subtitle}</td>
                <td className="p-4 flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(p)}>
                    <Edit className="size-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(p._id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-muted-foreground">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
