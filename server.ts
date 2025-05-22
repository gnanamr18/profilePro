import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import profileRoute from './routes/profileRoute';
import loginRoute from './routes/loginRoute';
// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Request URL:', req.url);
  console.log('Request Method:', req.method);
  console.log('Content-Type:', req.header('Content-Type'));
  console.log('Headers:', req.headers);
  next();
});

// Handle mismatched Content-Type middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'POST' && 
      req.headers['content-type']?.includes('application/x-www-form-urlencoded') && 
      req.headers['content-length']) {
    
    // Create a body parser that will handle the raw request
    const rawBodyParser = express.text({ type: 'application/x-www-form-urlencoded' });
    
    rawBodyParser(req, res, () => {
      try {
        // Check if the body starts with a { which indicates it might be JSON
        const rawBody = req.body as string;
        if (rawBody && (rawBody.trim().startsWith('{') || rawBody.trim().startsWith('{'))) {
          try {
            // Try to parse as JSON
            req.body = JSON.parse(rawBody);
            console.log('Detected and parsed JSON data sent with wrong Content-Type');
          } catch (e) {
            console.log('Failed to parse as JSON, continuing with original body');
          }
        }
        next();
      } catch (error) {
        next(error);
      }
    });
  } else {
    next();
  }
});

// Standard body parsers
app.use(express.json({
  limit: '10mb'
}));

app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}));

// Log parsed body
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Parsed Body:', req.body);
  next();
});

// Use routes
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/login', loginRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
