import { Router } from 'express';
import { getProfile, createProfile, getProfileByEmail, deleteProfileByEmail } from '../Controller/profileController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

// GET /api/v1/profile - Protected route
router.get('/', authMiddleware, getProfile);

// Email-based routes
router.get('/email/:email', authMiddleware, getProfileByEmail);
router.delete('/email/:email', authMiddleware, deleteProfileByEmail);

// POST /api/v1/profile
router.post('/', createProfile);

export default router;
