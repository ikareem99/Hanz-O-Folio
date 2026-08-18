'use server';

import connectToDatabase from '@/lib/mongodb';
import Message from '@/models/Message';
import RateLimit from '@/models/RateLimit';
import { headers } from 'next/headers';

export async function sendMessage(formData: FormData) {
  try {
    // 1. Honeypot check
    const honeypot = formData.get('website_url') as string;
    if (honeypot) {
      // If the hidden field is filled, it's a bot. We silently "succeed" to fool it.
      return { success: true };
    }

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const budget = formData.get('budget') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      return { success: false, error: 'Name, email, and message are required.' };
    }

    await connectToDatabase();

    // 2. Rate Limit check
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    
    if (ip !== 'unknown') {
      const submissionCount = await RateLimit.countDocuments({ ip, action: 'contact' });
      if (submissionCount >= 3) {
        return { success: false, error: 'You have submitted too many messages recently. Please try again later.' };
      }
      
      // Save rate limit record
      await RateLimit.create({ ip, action: 'contact' });
    }

    // 3. Save message
    
    await Message.create({
      name,
      email,
      budget,
      message
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, error: 'Failed to send message. Please try again later.' };
  }
}
