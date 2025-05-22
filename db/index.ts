import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { profile } from './schema';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Check if DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined in environment variables');
  process.exit(1);
}

// Create a new PostgreSQL pool using a connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Drizzle ORM with the pool
const db = drizzle(pool);

export { db, profile as profileSchema }; 