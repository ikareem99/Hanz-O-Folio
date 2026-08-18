import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/data';
import PostEditor from '../../components/PostEditor';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return <PostEditor initialData={post} />;
}
