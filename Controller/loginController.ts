//create login controller

import { Request, Response, NextFunction } from 'express';
import { createToken } from '../service/util';
import { getUserByEmail } from '../service/userService'; // Assume this service exists


export const loginController = async (req: Request, res: Response,next:NextFunction): Promise<Response> => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        if (user.password !== password) { // In a real-world scenario, use hashed passwords
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Not an admin.' });
        }

        const token = createToken({ id: user.id, role: user.role });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export default loginController;
