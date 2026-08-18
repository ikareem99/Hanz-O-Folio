import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subtitle: { type: String, required: true },
  imgSrc: { type: String, required: true }, // Store string path instead of imported module
  keywords: { type: [String], default: [] },
  priority: { type: Number, default: 0 },
  content: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
