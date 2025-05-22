import { Request, Response, NextFunction } from 'express';
import { db } from '../db';
import { profileSchema } from '../db';
import { eq } from 'drizzle-orm';

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Fetch all profiles
    const profiles = await db.select().from(profileSchema);
    
    res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
};

export const createProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, isActive, role } = req.body;

    // Check if email already exists
    const existingProfiles = await db.select().from(profileSchema).where(eq(profileSchema.email, email));
    
    if (existingProfiles.length > 0) {
      res.status(409).json({ error: 'Email already exists' });
      return;
    }

    // Create a new profile
    const newProfile = await db.insert(profileSchema).values({
      name,
      email,
      password,
      isActive,
      role,
    }).returning();

    res.status(201).json(newProfile);
  } catch (error) {
    next(error);
  }
};

export const getProfileByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.params;

    // Fetch profile by email
    const profiles = await db.select().from(profileSchema).where(eq(profileSchema.email, email));
    
    if (!profiles.length) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }
    
    res.status(200).json(profiles[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteProfileByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.params;

    // Check if profile exists
    const profiles = await db.select().from(profileSchema).where(eq(profileSchema.email, email));
    
    if (!profiles.length) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    // Soft delete by setting isActive to false
    await db.update(profileSchema)
      .set({ isActive: false })
      .where(eq(profileSchema.email, email));
    
    res.status(200).json({ message: 'Profile deactivated successfully' });
  } catch (error) {
    next(error);
  }
};
