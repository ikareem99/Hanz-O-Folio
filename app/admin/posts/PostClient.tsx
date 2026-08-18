'use client';

import { Button } from '@/components/ui/button';
import { deletePost } from '@/actions/admin';
import { Trash2, Edit } from 'lucide-react';
import Link from 'next/link';

export default function PostClient({ posts }: { posts: any[] }) {

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deletePost(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link href="/admin/posts/new">
          <Button>Add Post</Button>
        </Link>
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
                  <Link href={`/admin/posts/edit/${p._id}`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="size-4" />
                    </Button>
                  </Link>
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
    </div>
  );
}
