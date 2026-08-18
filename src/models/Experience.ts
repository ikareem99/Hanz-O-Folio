import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  description: { type: String, required: true },
  period: { type: String, required: true },
  keywords: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
