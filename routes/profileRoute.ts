import { Router, Request, Response, NextFunction } from 'express';
import { getProfile, createProfile } from '../Controller/profileController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

// Wrapper middleware for getProfile
const profileHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await getProfile(req, res);
  } catch (error) {
    next(error);
  }
};

// Wrapper middleware for createProfile
const createProfileHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await createProfile(req, res);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/profile - Protected route
router.get('/', authMiddleware, profileHandler);

// POST /api/v1/profile
router.post('/', createProfileHandler);

export default router;
