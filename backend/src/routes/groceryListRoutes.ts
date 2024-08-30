import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Grocery list routes placeholder' });
});

export default router;