import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import priceRoutes from './routes/priceRoutes';
import userRoutes from './routes/userRoutes';
import groceryListRoutes from './routes/groceryListRoutes';
import communityRoutes from './routes/communityRoutes';
import { MONGODB_URI, PORT } from './config/env';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
app.use('/api/prices', priceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/grocery-lists', groceryListRoutes);
app.use('/api/community', communityRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;