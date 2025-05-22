import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import profileRoute from './routes/profileRoute';
import loginRoute from './routes/loginRoute';
// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // ← Add this for JSON body parsing
app.use(express.urlencoded({ extended: true }));




// Use routes
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/login', loginRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
