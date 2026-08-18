'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createPost, updatePost, deletePost } from '@/actions/admin';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Edit, Plus, GripVertical } from 'lucide-react';
import ImageInput from '../components/ImageInput';

interface Section {
  heading: string;
  text: string;
}

export default function PostClient({ posts }: { posts: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    excerpt: '',
    date: '',
    read: '',
    coverSrc: '',
    keywords: '',
    priority: 0,
  });

  const [sections, setSections] = useState<Section[]>([
    { heading: '', text: '' }
  ]);

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({
      slug: '', title: '', excerpt: '', date: '', read: '', coverSrc: '', keywords: '', priority: 0
    });
    setSections([{ heading: 'Introduction', text: '' }]);
    setIsOpen(true);
  };

  const handleOpenEdit = (p: any) => {
    setEditingId(p._id);
    setFormData({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      read: p.read,
      coverSrc: p.coverSrc,
      keywords: p.keywords?.join(', ') || '',
      priority: p.priority || 0,
    });
    
    // Convert body array to sections array for the builder
    const mappedSections = (p.body || []).map((b: any) => ({
      heading: b.heading || '',
      text: (b.paragraphs || []).join('\n\n'),
    }));
    
    setSections(mappedSections.length > 0 ? mappedSections : [{ heading: '', text: '' }]);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deletePost(id);
    }
  };

  const updateSection = (index: number, field: keyof Section, value: string) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const addSection = () => {
    setSections([...sections, { heading: '', text: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format sections back to schema shape
    const formattedBody = sections.map(s => ({
      heading: s.heading,
      paragraphs: s.text.split('\n').map(p => p.trim()).filter(Boolean),
    }));

    const dataToSubmit = {
      ...formData,
      keywords: formData.keywords.split(',').map((k) => k.trim()).filter(Boolean),
      priority: Number(formData.priority) || 0,
      body: formattedBody,
    };

    if (editingId) {
      await updatePost(editingId, dataToSubmit);
    } else {
      await createPost(dataToSubmit);
    }
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button onClick={handleOpenNew}>Add Post</Button>
      </div>

      <div className="rounded-md border bg-card overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[600px]">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-4 font-medium w-[80px]">Priority</th>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Slug</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p._id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="p-4 text-muted-foreground">{p.priority || 0}</td>
                <td className="p-4 font-medium">{p.title}</td>
                <td className="p-4 text-muted-foreground">{p.date}</td>
                <td className="p-4 text-muted-foreground">{p.slug}</td>
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
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">No posts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Post' : 'Add Post'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Meta Data */}
            <div className="space-y-4 p-4 border rounded-md bg-muted/20">
              <h3 className="font-semibold">Post Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Read Time</Label>
                  <Input required value={formData.read} onChange={(e) => setFormData({ ...formData, read: e.target.value })} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Input required value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
              </div>
              
              <ImageInput 
                label="Cover Image Source" 
                value={formData.coverSrc} 
                onChange={(val) => setFormData({ ...formData, coverSrc: val })} 
              />
              
              <div className="space-y-2">
                <Label>Keywords (comma separated)</Label>
                <Input value={formData.keywords} onChange={(e) => setFormData({ ...formData, keywords: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Priority (Lowest number appears first)</Label>
                <Input type="number" required value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })} />
              </div>
            </div>

            {/* Content Builder */}
            <div className="space-y-4">
              <h3 className="font-semibold">Post Content</h3>
              
              <div className="space-y-4">
                {sections.map((section, index) => (
                  <div key={index} className="p-4 border rounded-md space-y-4 relative bg-card">
                    <div className="flex justify-between items-center">
                      <Label className="text-muted-foreground font-semibold flex items-center gap-2">
                        <GripVertical className="size-4" /> Section {index + 1}
                      </Label>
                      <Button type="button" variant="ghost" size="sm" className="text-destructive" onClick={() => removeSection(index)}>
                        Remove
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Heading</Label>
                      <Input 
                        placeholder="e.g. Introduction" 
                        value={section.heading} 
                        onChange={(e) => updateSection(index, 'heading', e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Paragraphs (Leave empty lines between paragraphs)</Label>
                      <textarea 
                        className="w-full min-h-[120px] p-2 border rounded-md text-sm bg-transparent"
                        placeholder="Write your text here..."
                        value={section.text}
                        onChange={(e) => updateSection(index, 'text', e.target.value)} 
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <Button type="button" variant="outline" className="w-full border-dashed" onClick={addSection}>
                <Plus className="size-4 mr-2" /> Add Section
              </Button>
            </div>

            <div className="flex justify-end gap-2 pt-4 sticky bottom-0 bg-card py-4 border-t mt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit">Save Post</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
