import express from 'express';
import { fetchPricesFromPlatforms } from '../services/priceService';

const router = express.Router();

router.get('/:item', async (req, res) => {
  try {
    console.log('Fetching prices for:', req.params.item);
    const prices = await fetchPricesFromPlatforms(req.params.item);
    console.log('Prices fetched for', req.params.item, ':', prices);
    res.json(prices);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ 
      message: 'Error fetching prices', 
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

export default router;