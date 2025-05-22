import { JwtPayload } from 'jsonwebtoken';

export interface UserPayload extends JwtPayload {
    id: string;
    role: string;
}

export interface User {
    id: string;
    email: string;
    password: string;
    role: string;
}

declare namespace Express {
  export interface Request {
    body: {
      name: string;
      email: string;
      password: string;
      isActive: boolean;
      role: string;
    };
    user?: any; // You can replace 'any' with a more specific type if needed
  }
} 