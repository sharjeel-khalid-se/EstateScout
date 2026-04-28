import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import connectDB from './config/db.js';


dotenv.config();

// Connect to database
connectDB();

const app = express()
const uploadsPath = path.resolve(process.cwd(), 'uploads')

const allowedOrigins = new Set([
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://estate-scout-psi.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean))

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true)
    }

    try {
      const originHost = new URL(origin).hostname
      const isVercelPreview = originHost.endsWith('.vercel.app')

      if (allowedOrigins.has(origin) || isVercelPreview) {
        return callback(null, true)
      }
    } catch (error) {
      // Fall through to the rejection below
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

// Middleware
app.use(cors(corsOptions));

app.use('/uploads', express.static(uploadsPath));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// auth routes
import authRoutes from './routes/auth.routes.js';
app.use('/api/auth', authRoutes);

// property routes
import propertyRoutes from './routes/property.routes.js';
app.use('/api/properties', propertyRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
