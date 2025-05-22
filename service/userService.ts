import { User } from '../types';
import { db, profileSchema } from '../db';
import { eq } from 'drizzle-orm';

// This array is kept for reference but will no longer be used
// const users: User[] = [
//     { id: '1', email: 'admin@example.com', password: 'admin123', role: 'admin' },
//     { id: '2', email: 'user@example.com', password: 'user123', role: 'user' },
//     { id: '3', email: 'medha@example.com', password: '1234', role: 'admin' }
// ];

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
    try {
        // Query the database for a user with the matching email
        const results = await db.select()
            .from(profileSchema)
            .where(eq(profileSchema.email, email))
            .limit(1);
        
        // If a user is found, return it
        if (results.length > 0) {
            const user = results[0];
            return {
                id: user.id.toString(),
                email: user.email,
                password: user.password,
                role: user.role
            };
        }
        
        // Otherwise return undefined
        return undefined;
    } catch (error) {
        console.error('Error querying user by email:', error);
        return undefined;
    }
}; 