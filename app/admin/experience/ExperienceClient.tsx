'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createExperience, updateExperience, deleteExperience } from '@/actions/admin';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Edit } from 'lucide-react';

export default function ExperienceClient({ experience }: { experience: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    description: '',
    period: '',
    keywords: '',
    priority: 0,
  });

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({ company: '', description: '', period: '', keywords: '', priority: 0 });
    setIsOpen(true);
  };

  const handleOpenEdit = (exp: any) => {
    setEditingId(exp._id);
    setFormData({
      company: exp.company,
      description: exp.description,
      period: exp.period,
      keywords: exp.keywords?.join(', ') || '',
      priority: exp.priority || 0,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      await deleteExperience(id);
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
      await updateExperience(editingId, dataToSubmit);
    } else {
      await createExperience(dataToSubmit);
    }
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Experience</h1>
        <Button onClick={handleOpenNew}>Add Experience</Button>
      </div>

      <div className="rounded-md border bg-card overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[600px]">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-4 font-medium w-[80px]">Priority</th>
              <th className="p-4 font-medium">Company / Title</th>
              <th className="p-4 font-medium">Period</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experience.map((exp) => (
              <tr key={exp._id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="p-4 text-muted-foreground">{exp.priority || 0}</td>
                <td className="p-4 font-medium">{exp.company}</td>
                <td className="p-4 text-muted-foreground">{exp.period}</td>
                <td className="p-4 flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(exp)}>
                    <Edit className="size-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(exp._id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </td>
              </tr>
            ))}
            {experience.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-muted-foreground">No experience found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Company / Role Title</Label>
              <Input required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Period (e.g. Jun 2025 - Present)</Label>
              <Input required value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
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
