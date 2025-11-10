import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { connectDB } from '$lib/utils/db';
import User from '$lib/models/User';
import { generateToken } from '$lib/utils/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    await connectDB();
    
    const { email, password, name, role = 'student' } = await request.json();
    
    if (!email || !password || !name) {
      return json({ error: 'Email, password, and name are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return json({ error: 'User already exists' }, { status: 400 });
    }

    const user = new User({ email, password, name, role });
    await user.save();

    const token = generateToken(user._id.toString());
    
    cookies.set('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24
    });

    return json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    return json({ error: 'Server error' }, { status: 500 });
  }
};