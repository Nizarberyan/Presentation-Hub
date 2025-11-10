import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { connectDB } from '$lib/utils/db';
import Presentation from '$lib/models/Presentation';
import { getUser } from '$lib/utils/auth';

export const GET: RequestHandler = async (event) => {
  try {
    await connectDB();
    const presentations = await Presentation.find().sort({ createdAt: -1 });
    return json(presentations);
  } catch (error) {
    return json({ error: 'Server error' }, { status: 500 });
  }
};

export const POST: RequestHandler = async (event) => {
  try {
    await connectDB();
    
    const user = await getUser(event);
    if (!user) {
      return json({ error: 'Authentication required' }, { status: 401 });
    }

    const { date, binome, titre, description } = await event.request.json();
    
    if (!date || !binome || !titre || !description) {
      return json({ error: 'All fields are required' }, { status: 400 });
    }

    const presentation = new Presentation({
      date,
      binome,
      titre,
      description
    });

    await presentation.save();
    return json(presentation);
  } catch (error) {
    return json({ error: 'Server error' }, { status: 500 });
  }
};