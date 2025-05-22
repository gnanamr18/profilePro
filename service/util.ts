//create the web token when user login
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserPayload } from '../types';

export const createToken = (user: UserPayload): string => {
    return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '1h' });
}; 