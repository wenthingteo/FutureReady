import express from 'express';

const router = express.Router();

// @route   POST /api/webhooks
// @desc    Webhook endpoint (placeholder)
// @access  Public
router.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'Webhook endpoint - coming soon!'
  });
});

export default router;
