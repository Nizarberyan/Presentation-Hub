import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { connectDB } from '$lib/utils/db';
import User from '$lib/models/User';
import { generateToken } from '$lib/utils/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    await connectDB();
    
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return json({ error: 'Invalid credentials' }, { status: 401 });
    }

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