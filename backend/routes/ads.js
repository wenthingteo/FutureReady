import express from 'express';

const router = express.Router();

// @route   GET /api/ads
// @desc    Get ads (placeholder)
// @access  Private
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Ads route - coming soon!',
    data: []
  });
});

export default router;
