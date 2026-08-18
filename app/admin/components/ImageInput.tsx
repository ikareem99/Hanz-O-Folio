'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { uploadImage } from '@/actions/admin';
import { UploadCloud, Link as LinkIcon, Loader2 } from 'lucide-react';

interface ImageInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function ImageInput({ value, onChange, label = 'Image Source' }: ImageInputProps) {
  const [mode, setMode] = useState<'url' | 'upload'>('upload');
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await uploadImage(formData);
      if (res.success) {
        onChange(res.url);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <div className="flex gap-2">
          <Button 
            type="button" 
            variant={mode === 'upload' ? 'default' : 'outline'} 
            size="sm" 
            className="h-7 text-xs px-2"
            onClick={() => setMode('upload')}
          >
            <UploadCloud className="size-3 mr-1" /> Upload
          </Button>
          <Button 
            type="button" 
            variant={mode === 'url' ? 'default' : 'outline'} 
            size="sm" 
            className="h-7 text-xs px-2"
            onClick={() => setMode('url')}
          >
            <LinkIcon className="size-3 mr-1" /> URL
          </Button>
        </div>
      </div>
      
      {mode === 'url' ? (
        <Input 
          placeholder="https://... or /assets/..."
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
        />
      ) : (
        <div className="space-y-2">
          <Input 
            type="file" 
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
          />
          {isUploading && <div className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="size-4 animate-spin" /> Uploading...</div>}
          {value && !isUploading && (
            <div className="text-sm text-muted-foreground break-all">
              Current: {value}
            </div>
          )}
        </div>
      )}
      
      {value && (
        <div className="mt-2 w-full h-32 relative rounded-md border border-border overflow-hidden bg-muted/20 flex items-center justify-center">
          <img src={value} alt="Preview" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </div>
  );
}
