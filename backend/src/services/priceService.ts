import axios from 'axios';
import { SERPAPI_API_KEY } from '../config/env';

/**
 * Interface representing the structure of price data for a single item
 */
interface PriceData {
  item: string;
  price: string;
  link: string;
  image: string;
  description: string;
  merchant: string;
}

/**
 * Fetches prices from Google Shopping via SerpApi
 */
const fetchGoogleShoppingPrices = async (item: string): Promise<PriceData[]> => {
  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        api_key: SERPAPI_API_KEY,
        engine: 'google_shopping',
        q: item,
        location: 'India',
        google_domain: 'google.co.in',
        gl: 'in',
        hl: 'en'
      }
    });

    const shoppingResults = response.data.shopping_results || [];

    return shoppingResults.map((result: any) => ({
      item: result.title,
      price: result.price.replace('₹', '').trim(), // Remove the extra INR symbol
      link: result.link,
      image: result.thumbnail,
      description: result.snippet || '',
      merchant: result.source || ''
    }));
  } catch (error) {
    console.error('Error fetching Google Shopping prices:', error);
    return [];
  }
};

/**
 * Fetches prices from all platforms and sorts them
 */
export const fetchPricesFromPlatforms = async (item: string): Promise<PriceData[]> => {
  const prices = await fetchGoogleShoppingPrices(item);
  return sortByPlatformPriority(prices);
};

/**
 * Sorts prices by platform priority
 */
const sortByPlatformPriority = (prices: PriceData[]): PriceData[] => {
  const priorityOrder = ['Blinkit', 'Instamart', 'Zepto', 'Amazon Fresh', 'BigBasket'];
  
  return prices.sort((a, b) => {
    const aIndex = priorityOrder.indexOf(a.merchant);
    const bIndex = priorityOrder.indexOf(b.merchant);
    
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    
    return aIndex - bIndex;
  });
};

/**
 * Compares prices and sorts them in ascending order
 */
export const comparePrices = (prices: PriceData[]): PriceData[] => {
  return prices.sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ''));
    const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ''));
    return priceA - priceB;
  });
};