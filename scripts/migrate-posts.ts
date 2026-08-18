import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const PostSchema = new mongoose.Schema({
  slug: String,
  title: String,
  excerpt: String,
  date: String,
  read: String,
  coverSrc: String,
  keywords: [String],
  body: [{ heading: String, paragraphs: [String] }],
  content: String
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB.");

  const posts = await Post.find({});
  console.log(`Found ${posts.length} posts to migrate.`);

  for (const post of posts) {
    if (post.body && post.body.length > 0 && !post.content) {
      let html = '';
      for (const section of post.body) {
        if (section.heading) {
          html += `<h2>${section.heading}</h2>`;
        }
        if (section.paragraphs && section.paragraphs.length > 0) {
          for (const p of section.paragraphs) {
            html += `<p>${p}</p>`;
          }
        }
      }
      post.content = html;
      post.body = undefined; // clear old body
      await post.save();
      console.log(`Migrated post: ${post.slug}`);
    } else {
      console.log(`Skipped post (already migrated or no body): ${post.slug}`);
    }
  }

  console.log("Migration complete!");
  await mongoose.disconnect();
}

migrate().catch(console.error);
