import mongoose from 'mongoose';

const ToolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  iconSrc: { type: String, required: true }, // Store string URL or local path
  keywords: { type: [String], default: [] },
  priority: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Tool || mongoose.model('Tool', ToolSchema);
