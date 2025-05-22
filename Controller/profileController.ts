import { Request, Response } from 'express';
import { db } from '../db';
import { profileSchema } from '../db';

export const getProfile = async (req: Request, res: Response) => {
  try {
    // Fetch all profiles
    const profiles = await db.select().from(profileSchema);
    
    res.status(200).json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createProfile = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isActive } = req.body;

    // Create a new profile
    const newProfile = await db.insert(profileSchema).values({
      name,
      email,
      password,
      isActive,
    }).returning();

    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
