import { Router, Request, Response, NextFunction } from 'express';
import { loginController } from '../Controller/loginController';

const router = Router();

const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await loginController(req, res, next);
  } catch (error) {
    next(error);
  }
};

router.post('/', loginHandler);

export default router;
