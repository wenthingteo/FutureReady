import express from 'express';

const router = express.Router();

// @route   GET /api/analytics
// @desc    Get analytics (placeholder)
// @access  Private
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Analytics route - coming soon!',
    data: []
  });
});

export default router;
