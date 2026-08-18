import { getPosts } from '@/lib/data';
import PostClient from './PostClient';

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <PostClient posts={posts} />
  );
}
