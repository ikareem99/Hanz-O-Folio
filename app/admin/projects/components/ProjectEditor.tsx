'use client';

import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { createProject, updateProject, uploadImage } from '@/actions/admin';
import ImageInput from '../../components/ImageInput';
import { marked } from 'marked';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface ProjectEditorProps {
  initialData?: any;
}

export default function ProjectEditor({ initialData }: ProjectEditorProps) {
  const router = useRouter();
  const quillRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [pasteModalOpen, setPasteModalOpen] = useState(false);
  const [pastedMarkdown, setPastedMarkdown] = useState('');
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    subtitle: initialData?.subtitle || '',
    imgSrc: initialData?.imgSrc || '',
    keywords: initialData?.keywords?.join(', ') || '',
    priority: initialData?.priority || 0,
    content: initialData?.content || ''
  });

  useEffect(() => {
    const addTooltips = () => {
      const buttons = document.querySelectorAll('.ql-toolbar button');
      buttons.forEach(btn => {
        const className = btn.className;
        if (className.includes('ql-bold')) btn.setAttribute('title', 'Bold');
        if (className.includes('ql-italic')) btn.setAttribute('title', 'Italic');
        if (className.includes('ql-underline')) btn.setAttribute('title', 'Underline');
        if (className.includes('ql-strike')) btn.setAttribute('title', 'Strikethrough');
        if (className.includes('ql-blockquote')) btn.setAttribute('title', 'Blockquote');
        const buttonValue = (btn as HTMLButtonElement).value;
        if (className.includes('ql-list') && buttonValue === 'ordered') btn.setAttribute('title', 'Numbered List');
        if (className.includes('ql-list') && buttonValue === 'bullet') btn.setAttribute('title', 'Bulleted List');
        if (className.includes('ql-indent') && buttonValue === '-1') btn.setAttribute('title', 'Decrease Indent');
        if (className.includes('ql-indent') && buttonValue === '+1') btn.setAttribute('title', 'Increase Indent');
        if (className.includes('ql-link')) btn.setAttribute('title', 'Insert Link');
        if (className.includes('ql-image')) btn.setAttribute('title', 'Insert Image');
        if (className.includes('ql-video')) btn.setAttribute('title', 'Insert Video');
        if (className.includes('ql-clean')) btn.setAttribute('title', 'Remove Formatting');
      });

      const pickers = document.querySelectorAll('.ql-toolbar .ql-picker-label');
      pickers.forEach(picker => {
        const parent = picker.parentElement;
        if (parent && parent.classList.contains('ql-header')) {
          picker.setAttribute('title', 'Heading Level');
        }
      });
    };

    const timeout = setTimeout(addTooltips, 500);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const dataToSubmit = {
      ...formData,
      keywords: formData.keywords.split(',').map((k: string) => k.trim()).filter(Boolean),
      priority: Number(formData.priority) || 0,
    };

    if (initialData && initialData._id) {
      await updateProject(initialData._id, dataToSubmit);
    } else {
      await createProject(dataToSubmit);
    }
    router.push('/admin/projects');
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        
        try {
          const res = await uploadImage(uploadFormData);
          if (res.success) {
            setTimeout(() => {
              const editor = quillRef.current?.getEditor();
              if (editor) {
                const range = editor.getSelection(true);
                editor.insertEmbed(range.index, 'image', res.url);
                editor.setSelection(range.index + 1);
              }
            }, 0);
          } else {
            alert('Failed to upload image');
          }
        } catch (error) {
          console.error(error);
          alert('Error uploading image');
        }
      }
    };
  }, []);

  const handleMarkdownUpload = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.md,text/markdown');
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        try {
          const text = await file.text();
          const html = await marked.parse(text);
          setFormData(prev => ({
            ...prev,
            content: prev.content ? prev.content + '<br/>' + html : html
          }));
        } catch (error) {
          console.error("Failed to parse markdown", error);
          alert('Error reading markdown file');
        }
      }
    };
  }, []);

  const handleMarkdownPaste = async () => {
    if (!pastedMarkdown.trim()) return;
    try {
      const html = await marked.parse(pastedMarkdown);
      setFormData(prev => ({
        ...prev,
        content: prev.content ? prev.content + '<br/>' + html : html
      }));
      setPasteModalOpen(false);
      setPastedMarkdown('');
    } catch (error) {
      console.error("Failed to parse pasted markdown", error);
      alert('Error reading pasted markdown');
    }
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [imageHandler]);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent',
    'link', 'image', 'video'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold">{initialData ? 'Edit Project' : 'Add New Project'}</h1>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => router.push('/admin/projects')}>Cancel</Button>
          <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Project'}</Button>
        </div>
      </div>

      {/* Meta Data */}
      <div className="space-y-4 p-6 border rounded-md bg-card">
        <h3 className="font-semibold text-lg">Project Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Subtitle</Label>
          <Input required value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} />
        </div>
        
        <ImageInput 
          label="Preview Image Source" 
          value={formData.imgSrc} 
          onChange={(val) => setFormData({ ...formData, imgSrc: val })} 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Keywords (comma separated)</Label>
            <Input value={formData.keywords} onChange={(e) => setFormData({ ...formData, keywords: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Priority (Lowest number appears first)</Label>
            <Input type="number" required value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })} />
          </div>
        </div>
      </div>

      {/* Content Builder */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Project Content</h3>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={handleMarkdownUpload} size="sm">
              Upload .md File
            </Button>
            <Dialog open={pasteModalOpen} onOpenChange={setPasteModalOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="secondary" size="sm">
                  Paste Markdown
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Paste Markdown</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Textarea 
                    placeholder="Paste your raw Markdown here..."
                    className="min-h-[400px] font-mono text-sm"
                    value={pastedMarkdown}
                    onChange={(e) => setPastedMarkdown(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setPasteModalOpen(false)}>Cancel</Button>
                    <Button type="button" onClick={handleMarkdownPaste}>Insert Markdown</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="bg-card text-foreground rounded-md overflow-hidden border flex flex-col">
          <style dangerouslySetInnerHTML={{__html: `
            .ql-toolbar { 
              border-top: none !important; 
              border-left: none !important; 
              border-right: none !important; 
              border-color: var(--border) !important; 
              background: var(--muted);
              position: sticky;
              top: 0;
              z-index: 10;
            }
            .ql-container { 
              border: none !important; 
              font-size: 16px; 
              max-height: 60vh;
              overflow-y: auto;
            }
            .ql-editor { 
              min-height: 400px; 
            }
            .ql-editor.ql-blank::before { color: var(--muted-foreground); }
            .ql-snow .ql-stroke { stroke: var(--foreground); }
            .ql-snow .ql-fill { fill: var(--foreground); }
            .ql-snow .ql-picker { color: var(--foreground); }
            .ql-snow .ql-picker-options { background-color: var(--popover); border-color: var(--border); }
            .ql-snow .ql-picker-item { color: var(--foreground); }
            .ql-snow .ql-picker-item:hover { color: var(--primary) !important; }
            .ql-snow .ql-picker-item.ql-selected { color: var(--primary) !important; }
            .ql-snow .ql-tooltip { background-color: var(--popover); border-color: var(--border); color: var(--popover-foreground); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
            .ql-snow .ql-tooltip input[type=text] { border-color: var(--border); background-color: var(--input); color: var(--foreground); }
          `}} />
          <ReactQuill 
            ref={quillRef}
            theme="snow"
            value={formData.content}
            onChange={(val) => setFormData({ ...formData, content: val })}
            modules={modules}
            formats={formats}
            placeholder="Write your beautiful project deep-dive here..."
          />
        </div>
      </div>
    </form>
  );
}
