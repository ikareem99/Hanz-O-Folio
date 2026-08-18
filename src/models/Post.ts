import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  date: { type: String, required: true },
  read: { type: String, required: true },
  coverSrc: { type: String, required: true }, // Store string path
  keywords: { type: [String], default: [] },
  body: [{
    heading: { type: String, required: true },
    paragraphs: { type: [String], required: true }
  }],
  priority: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
