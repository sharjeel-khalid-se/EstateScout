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
import { hasCloudinaryConfig } from './utils/cloudinary.js';

// Middleware
app.use(cors);

// Serve local uploads only when Cloudinary is NOT configured. On Vercel
// we rely on direct uploads to Cloudinary and cannot write to disk.
if (!hasCloudinaryConfig) {
  app.use('/uploads', express.static(uploadsPath));
}


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
