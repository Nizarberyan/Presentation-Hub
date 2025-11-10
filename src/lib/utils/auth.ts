import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
import User from '$lib/models/User';
import { connectDB } from './db';

export function generateToken(userId: string): string {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1d' });
}

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return decoded;
  } catch {
    return null;
  }
}

export async function getUser(event: RequestEvent) {
  const token = event.cookies.get('token') || event.request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) return null;

  const decoded = await verifyToken(token);
  if (!decoded) return null;

  try {
    await connectDB();
    const user = await User.findById(decoded.id);
    return user;
  } catch {
    return null;
  }
}