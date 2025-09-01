import express from 'express';
import { logger } from '../shared/services/logger.js';
import campaignService from '../services/campaignService.js';

const router = express.Router();

// @route   GET /api/campaigns
// @desc    Get all campaigns for user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const filters = req.query; // Support filtering by status, platform, dates
    
    const campaigns = await campaignService.getUserCampaigns(userId, filters);

    res.json({
      success: true,
      data: campaigns
    });
  } catch (error) {
    logger.error('Campaigns fetch error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   POST /api/campaigns
// @desc    Create new campaign
// @access  Private
router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const campaignData = req.body;
    
    const campaign = await campaignService.createCampaign(campaignData, userId);

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: campaign
    });
  } catch (error) {
    logger.error('Campaign creation error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   GET /api/campaigns/:id
// @desc    Get campaign by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const campaign = await campaignService.getCampaignById(id, userId);

    res.json({
      success: true,
      data: campaign
    });
  } catch (error) {
    logger.error('Campaign fetch error:', error);
    if (error.message === 'Campaign not found') {
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

// @route   PUT /api/campaigns/:id
// @desc    Update campaign
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;
    
    const campaign = await campaignService.updateCampaign(id, updateData, userId);

    res.json({
      success: true,
      message: 'Campaign updated successfully',
      data: campaign
    });
  } catch (error) {
    logger.error('Campaign update error:', error);
    if (error.message === 'Campaign not found') {
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

// @route   DELETE /api/campaigns/:id
// @desc    Delete campaign
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    await campaignService.deleteCampaign(id, userId);

    res.json({
      success: true,
      message: 'Campaign deleted successfully'
    });
  } catch (error) {
    logger.error('Campaign deletion error:', error);
    if (error.message === 'Campaign not found') {
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

// @route   PATCH /api/campaigns/:id/status
// @desc    Change campaign status
// @access  Private
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { status } = req.body;
    
    const campaign = await campaignService.changeCampaignStatus(id, status, userId);

    res.json({
      success: true,
      message: 'Campaign status updated successfully',
      data: campaign
    });
  } catch (error) {
    logger.error('Campaign status update error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   GET /api/campaigns/:id/stats
// @desc    Get campaign statistics
// @access  Private
router.get('/:id/stats', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const stats = await campaignService.getCampaignStats(id, userId);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    logger.error('Campaign stats error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   POST /api/campaigns/:id/duplicate
// @desc    Duplicate campaign
// @access  Private
router.post('/:id/duplicate', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { name } = req.body;
    
    const newCampaign = await campaignService.duplicateCampaign(id, userId, name);

    res.status(201).json({
      success: true,
      message: 'Campaign duplicated successfully',
      data: newCampaign
    });
  } catch (error) {
    logger.error('Campaign duplication error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

export default router;
