import express from 'express';

const router = express.Router();

// @route   GET /api/ai-agent
// @desc    Get AI agent (placeholder)
// @access  Private
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'AI Agent route - coming soon!',
    data: []
  });
});

export default router;
