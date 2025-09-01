import express from 'express';
import { logger } from '../shared/services/logger.js';
import contentService from '../services/contentService.js';

const router = express.Router();

// @route   GET /api/content
// @desc    Get all content for user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const filters = req.query;
    
    const content = await contentService.getUserContent(userId, filters);

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    logger.error('Content fetch error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   POST /api/content
// @desc    Create new content
// @access  Private
router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const contentData = req.body;
    
    const content = await contentService.createContent(contentData, userId);

    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: content
    });
  } catch (error) {
    logger.error('Content creation error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   GET /api/content/:id
// @desc    Get content by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const content = await contentService.getContentById(id, userId);

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    logger.error('Content fetch error:', error);
    if (error.message === 'Content not found') {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   PUT /api/content/:id
// @desc    Update content
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;
    
    const content = await contentService.updateContent(id, updateData, userId);

    res.json({
      success: true,
      message: 'Content updated successfully',
      data: content
    });
  } catch (error) {
    logger.error('Content update error:', error);
    if (error.message === 'Content not found') {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    res.status(400).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   DELETE /api/content/:id
// @desc    Delete content
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    await contentService.deleteContent(id, userId);

    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    logger.error('Content deletion error:', error);
    if (error.message === 'Content not found') {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   PATCH /api/content/:id/status
// @desc    Change content status
// @access  Private
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { status } = req.body;
    
    const content = await contentService.changeContentStatus(id, status, userId);

    res.json({
      success: true,
      message: 'Content status updated successfully',
      data: content
    });
  } catch (error) {
    logger.error('Content status update error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   GET /api/content/campaign/:campaignId
// @desc    Get content by campaign
// @access  Private
router.get('/campaign/:campaignId', async (req, res) => {
  try {
    const { campaignId } = req.params;
    const userId = req.user.id;
    
    const content = await contentService.getContentByCampaign(campaignId, userId);

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    logger.error('Campaign content fetch error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   POST /api/content/:id/duplicate
// @desc    Duplicate content
// @access  Private
router.post('/:id/duplicate', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title } = req.body;
    
    const newContent = await contentService.duplicateContent(id, userId, title);

    res.status(201).json({
      success: true,
      message: 'Content duplicated successfully',
      data: newContent
    });
  } catch (error) {
    logger.error('Content duplication error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   GET /api/content/stats
// @desc    Get content statistics
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user.id;
    const { timeRange } = req.query;
    
    const stats = await contentService.getContentStats(userId, timeRange);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    logger.error('Content stats error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   GET /api/content/search
// @desc    Search content
// @access  Private
router.get('/search', async (req, res) => {
  try {
    const userId = req.user.id;
    const { q: searchTerm, ...filters } = req.query;
    
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        error: 'Search term is required'
      });
    }
    
    const content = await contentService.searchContent(userId, searchTerm, filters);

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    logger.error('Content search error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

export default router;
