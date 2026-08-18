import mongoose from 'mongoose';

const RateLimitSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  action: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // Expires after 1 hour (3600 seconds)
});

export default mongoose.models.RateLimit || mongoose.model('RateLimit', RateLimitSchema);
