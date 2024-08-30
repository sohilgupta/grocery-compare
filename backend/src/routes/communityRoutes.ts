import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Community routes placeholder' });
});

export default router;