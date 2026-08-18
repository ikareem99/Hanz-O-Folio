import Project from '@/models/Project';
import Post from '@/models/Post';
import Experience from '@/models/Experience';
import Tool from '@/models/Tool';
import Message from '@/models/Message';
import connectToDatabase from '@/lib/mongodb';

export async function getModel(collectionName: string) {
  await connectToDatabase();
  
  switch (collectionName.toLowerCase()) {
    case 'projects': return Project;
    case 'posts': return Post;
    case 'experience': return Experience;
    case 'tools': return Tool;
    case 'messages': return Message;
    default: return null;
  }
}
