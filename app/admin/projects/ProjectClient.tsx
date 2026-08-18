'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createProject, updateProject, deleteProject } from '@/actions/admin';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Edit } from 'lucide-react';
import ImageInput from '../components/ImageInput';

export default function ProjectClient({ projects }: { projects: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imgSrc: '',
    keywords: '',
    priority: 0,
  });

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({ title: '', subtitle: '', imgSrc: '', keywords: '', priority: 0 });
    setIsOpen(true);
  };

  const handleOpenEdit = (project: any) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      subtitle: project.subtitle,
      imgSrc: project.imgSrc || '',
      keywords: project.keywords?.join(', ') || '',
      priority: project.priority || 0,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      keywords: formData.keywords.split(',').map((k) => k.trim()).filter(Boolean),
      priority: Number(formData.priority) || 0,
    };

    if (editingId) {
      await updateProject(editingId, dataToSubmit);
    } else {
      await createProject(dataToSubmit);
    }
    setIsOpen(false);
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Project' : 'Add Project'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input required value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} />
            </div>
            <ImageInput 
              label="Image Source" 
              value={formData.imgSrc} 
              onChange={(val) => setFormData({ ...formData, imgSrc: val })} 
            />
            <div className="space-y-2">
              <Label>Keywords (comma separated)</Label>
              <Input value={formData.keywords} onChange={(e) => setFormData({ ...formData, keywords: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Priority (Lowest number appears first)</Label>
              <Input type="number" required value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
