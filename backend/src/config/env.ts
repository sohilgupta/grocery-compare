/**
 * Environment configuration
 * This file exports environment variables with fallback values
 */

import dotenv from 'dotenv';

dotenv.config();

// Google API key for accessing Google Shopping API
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'your_google_api_key';

// MongoDB connection URI
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery-compare';

// Port number for the server to listen on
export const PORT = process.env.PORT || 5000;

// Zepto API key
export const ZEPTO_API_KEY = process.env.ZEPTO_API_KEY || 'your_zepto_api_key';

// Instamart API key
export const INSTAMART_API_KEY = process.env.INSTAMART_API_KEY || 'your_instamart_api_key';

// Blinkit API key
export const BLINKIT_API_KEY = process.env.BLINKIT_API_KEY || 'your_blinkit_api_key';

// Amazon Fresh API key
export const AMAZON_FRESH_API_KEY = process.env.AMAZON_FRESH_API_KEY || 'your_amazon_fresh_api_key';

// Serpapi API key
export const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY || '';

if (!SERPAPI_API_KEY) {
  console.error('SERPAPI_API_KEY is not set in the environment variables');
  process.exit(1);
}