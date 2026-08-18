'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createTool, updateTool, deleteTool } from '@/actions/admin';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Edit } from 'lucide-react';
import ImageInput from '../components/ImageInput';

export default function ToolClient({ tools }: { tools: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    iconSrc: '',
    keywords: '',
    priority: 0,
  });

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({ name: '', role: '', iconSrc: '', keywords: '', priority: 0 });
    setIsOpen(true);
  };

  const handleOpenEdit = (t: any) => {
    setEditingId(t._id);
    setFormData({
      name: t.name,
      role: t.role,
      iconSrc: t.iconSrc || (typeof t.icon === "string" ? t.icon : t.icon?.src) || '',
      keywords: t.keywords?.join(', ') || '',
      priority: t.priority || 0,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this tool?')) {
      await deleteTool(id);
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
      await updateTool(editingId, dataToSubmit);
    } else {
      await createTool(dataToSubmit);
    }
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tools</h1>
        <Button onClick={handleOpenNew}>Add Tool</Button>
      </div>

      <div className="rounded-md border bg-card overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[600px]">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-4 font-medium w-[80px]">Priority</th>
              <th className="p-4 font-medium w-[80px]">Icon</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((t) => {
              const iconUrl = t.iconSrc || (typeof t.icon === "string" ? t.icon : t.icon?.src);
              return (
                <tr key={t._id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="p-4 text-muted-foreground">{t.priority || 0}</td>
                  <td className="p-4">
                    <img src={iconUrl} alt={t.name} className="w-8 h-8 object-contain" />
                  </td>
                  <td className="p-4 font-medium">{t.name}</td>
                  <td className="p-4 text-muted-foreground">{t.role}</td>
                  <td className="p-4 flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(t)}>
                      <Edit className="size-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(t._id)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
            {tools.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">No tools found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Tool' : 'Add Tool'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Name (e.g. Python)</Label>
              <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Role (e.g. Core Language)</Label>
              <Input required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
            </div>
            <ImageInput 
              label="Icon Source" 
              value={formData.iconSrc} 
              onChange={(val) => setFormData({ ...formData, iconSrc: val })} 
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
