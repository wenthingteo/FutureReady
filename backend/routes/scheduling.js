import express from 'express';
import { logger } from '../shared/services/logger.js';
import schedulingService from '../services/schedulingService.js';

const router = express.Router();

// @route   GET /api/scheduling
// @desc    Get all scheduled content for user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const filters = req.query;
    
    const scheduledContent = await schedulingService.getUserScheduledContent(userId, filters);

    res.json({
      success: true,
      data: scheduledContent
    });
  } catch (error) {
    logger.error('Scheduled content fetch error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   POST /api/scheduling
// @desc    Schedule content for publishing
// @access  Private
router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const scheduleData = req.body;
    
    const schedule = await schedulingService.scheduleContent(scheduleData, userId);

    res.status(201).json({
      success: true,
      message: 'Content scheduled successfully',
      data: schedule
    });
  } catch (error) {
    logger.error('Content scheduling error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   PUT /api/scheduling/:id
// @desc    Update scheduled content
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;
    
    const schedule = await schedulingService.updateScheduledContent(id, updateData, userId);

    res.json({
      success: true,
      message: 'Scheduled content updated successfully',
      data: schedule
    });
  } catch (error) {
    logger.error('Scheduled content update error:', error);
    if (error.message === 'Schedule not found or access denied') {
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

// @route   DELETE /api/scheduling/:id
// @desc    Cancel scheduled content
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    await schedulingService.cancelScheduledContent(id, userId);

    res.json({
      success: true,
      message: 'Scheduled content cancelled successfully'
    });
  } catch (error) {
    logger.error('Scheduled content cancellation error:', error);
    if (error.message === 'Schedule not found or access denied') {
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

// @route   GET /api/scheduling/upcoming
// @desc    Get upcoming scheduled content
// @access  Private
router.get('/upcoming', async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit } = req.query;
    
    const upcomingContent = await schedulingService.getUpcomingScheduledContent(userId, parseInt(limit) || 10);

    res.json({
      success: true,
      data: upcomingContent
    });
  } catch (error) {
    logger.error('Upcoming scheduled content error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   GET /api/scheduling/calendar
// @desc    Get scheduling calendar view
// @access  Private
router.get('/calendar', async (req, res) => {
  try {
    const userId = req.user.id;
    const { start_date, end_date, platform } = req.query;
    
    if (!start_date || !end_date) {
      return res.status(400).json({
        success: false,
        error: 'Start date and end date are required'
      });
    }
    
    const calendar = await schedulingService.getSchedulingCalendar(userId, start_date, end_date, platform);

    res.json({
      success: true,
      data: calendar
    });
  } catch (error) {
    logger.error('Scheduling calendar error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   POST /api/scheduling/bulk
// @desc    Bulk schedule content
// @access  Private
router.post('/bulk', async (req, res) => {
  try {
    const userId = req.user.id;
    const { scheduleItems } = req.body;
    
    if (!Array.isArray(scheduleItems) || scheduleItems.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Schedule items array is required'
      });
    }
    
    const result = await schedulingService.bulkScheduleContent(scheduleItems, userId);

    res.status(201).json({
      success: true,
      message: 'Bulk scheduling completed',
      data: result
    });
  } catch (error) {
    logger.error('Bulk scheduling error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   GET /api/scheduling/stats
// @desc    Get scheduling statistics
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user.id;
    const { timeRange } = req.query;
    
    const stats = await schedulingService.getSchedulingStats(userId, timeRange);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    logger.error('Scheduling stats error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   PATCH /api/scheduling/:id/reschedule
// @desc    Reschedule content
// @access  Private
router.patch('/:id/reschedule', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { scheduled_time } = req.body;
    
    if (!scheduled_time) {
      return res.status(400).json({
        success: false,
        error: 'New scheduled time is required'
      });
    }
    
    const schedule = await schedulingService.rescheduleContent(id, scheduled_time, userId);

    res.json({
      success: true,
      message: 'Content rescheduled successfully',
      data: schedule
    });
  } catch (error) {
    logger.error('Content rescheduling error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

// @route   GET /api/scheduling/failed
// @desc    Get failed schedules
// @access  Private
router.get('/failed', async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit } = req.query;
    
    const failedSchedules = await schedulingService.getFailedSchedules(userId, parseInt(limit) || 20);

    res.json({
      success: true,
      data: failedSchedules
    });
  } catch (error) {
    logger.error('Failed schedules error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
});

export default router;
