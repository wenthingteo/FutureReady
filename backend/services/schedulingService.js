import { getSupabaseClient } from '../shared/db/connection.js';
import { logger } from '../shared/services/logger.js';

class SchedulingService {
  constructor() {
    this.supabase = getSupabaseClient();
  }

  /**
   * Get all scheduled content for a user
   */
  async getUserScheduledContent(userId, filters = {}) {
    try {
      let query = this.supabase
        .from('content_schedule')
        .select(`
          *,
          content (
            id,
            title,
            content_type,
            platform,
            status
          ),
          campaigns (
            id,
            name,
            status
          )
        `)
        .eq('user_id', userId);

      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.platform) {
        query = query.eq('platform', filters.platform);
      }
      if (filters.campaign_id) {
        query = query.eq('campaign_id', filters.campaign_id);
      }
      if (filters.start_date) {
        query = query.gte('scheduled_time', filters.start_date);
      }
      if (filters.end_date) {
        query = query.lte('scheduled_time', filters.end_date);
      }

      const { data: scheduledContent, error } = await query
        .order('scheduled_time', { ascending: true });

      if (error) {
        logger.error('Error fetching scheduled content:', error);
        throw new Error('Failed to fetch scheduled content');
      }

      return scheduledContent || [];
    } catch (error) {
      logger.error('Get scheduled content error:', error);
      throw error;
    }
  }

  /**
   * Schedule content for publishing
   */
  async scheduleContent(scheduleData, userId) {
    try {
      const { 
        content_id, 
        campaign_id, 
        platform, 
        scheduled_time, 
        timezone = 'UTC' 
      } = scheduleData;

      // Validate required fields
      if (!content_id || !platform || !scheduled_time) {
        throw new Error('Content ID, platform, and scheduled time are required');
      }

      // Validate content ownership
      const { data: content } = await this.supabase
        .from('content')
        .select('id, status, platform')
        .eq('id', content_id)
        .eq('user_id', userId)
        .single();

      if (!content) {
        throw new Error('Content not found or access denied');
      }

      // Check if content is approved
      if (content.status !== 'approved') {
        throw new Error('Content must be approved before scheduling');
      }

      // Validate campaign ownership if campaign_id is provided
      if (campaign_id) {
        const { data: campaign } = await this.supabase
          .from('campaigns')
          .select('id')
          .eq('id', campaign_id)
          .eq('user_id', userId)
          .single();

        if (!campaign) {
          throw new Error('Campaign not found or access denied');
        }
      }

      // Validate scheduled time (must be in the future)
      const scheduledDate = new Date(scheduled_time);
      if (scheduledDate <= new Date()) {
        throw new Error('Scheduled time must be in the future');
      }

      // Check for scheduling conflicts (same platform, overlapping time)
      const { data: conflicts } = await this.supabase
        .from('content_schedule')
        .select('id')
        .eq('platform', platform)
        .eq('status', 'scheduled')
        .overlaps('scheduled_time', scheduled_time, scheduled_time)
        .neq('content_id', content_id);

      if (conflicts && conflicts.length > 0) {
        throw new Error('Scheduling conflict detected for this platform and time');
      }

      const { data: schedule, error } = await this.supabase
        .from('content_schedule')
        .insert([{
          content_id,
          campaign_id,
          user_id: userId,
          platform,
          scheduled_time,
          timezone,
          status: 'scheduled'
        }])
        .select()
        .single();

      if (error) {
        logger.error('Error scheduling content:', error);
        throw new Error('Failed to schedule content');
      }

      // Update content status to scheduled
      await this.supabase
        .from('content')
        .update({ status: 'scheduled' })
        .eq('id', content_id);

      logger.info(`Content scheduled: ${content_id} for ${platform} at ${scheduled_time} by user ${userId}`);
      return schedule;
    } catch (error) {
      logger.error('Schedule content error:', error);
      throw error;
    }
  }

  /**
   * Update scheduled content
   */
  async updateScheduledContent(scheduleId, updateData, userId) {
    try {
      // Verify schedule ownership
      const { data: existingSchedule } = await this.supabase
        .from('content_schedule')
        .select('*')
        .eq('id', scheduleId)
        .eq('user_id', userId)
        .single();

      if (!existingSchedule) {
        throw new Error('Schedule not found or access denied');
      }

      // Validate scheduled time if being updated
      if (updateData.scheduled_time) {
        const scheduledDate = new Date(updateData.scheduled_time);
        if (scheduledDate <= new Date()) {
          throw new Error('Scheduled time must be in the future');
        }

        // Check for scheduling conflicts
        const { data: conflicts } = await this.supabase
          .from('content_schedule')
          .select('id')
          .eq('platform', existingSchedule.platform)
          .eq('status', 'scheduled')
          .overlaps('scheduled_time', updateData.scheduled_time, updateData.scheduled_time)
          .neq('id', scheduleId);

        if (conflicts && conflicts.length > 0) {
          throw new Error('Scheduling conflict detected for this platform and time');
        }
      }

      const { data: schedule, error } = await this.supabase
        .from('content_schedule')
        .update(updateData)
        .eq('id', scheduleId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        logger.error('Error updating scheduled content:', error);
        throw new Error('Failed to update scheduled content');
      }

      logger.info(`Scheduled content updated: ${scheduleId} by user ${userId}`);
      return schedule;
    } catch (error) {
      logger.error('Update scheduled content error:', error);
      throw error;
    }
  }

  /**
   * Cancel scheduled content
   */
  async cancelScheduledContent(scheduleId, userId) {
    try {
      // Verify schedule ownership
      const { data: schedule } = await this.supabase
        .from('content_schedule')
        .select('*')
        .eq('id', scheduleId)
        .eq('user_id', userId)
        .single();

      if (!schedule) {
        throw new Error('Schedule not found or access denied');
      }

      // Only allow cancellation of scheduled content
      if (schedule.status !== 'scheduled') {
        throw new Error('Only scheduled content can be cancelled');
      }

      const { error } = await this.supabase
        .from('content_schedule')
        .update({ 
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', scheduleId);

      if (error) {
        logger.error('Error cancelling scheduled content:', error);
        throw new Error('Failed to cancel scheduled content');
      }

      // Update content status back to approved
      await this.supabase
        .from('content')
        .update({ status: 'approved' })
        .eq('id', schedule.content_id);

      logger.info(`Scheduled content cancelled: ${scheduleId} by user ${userId}`);
      return true;
    } catch (error) {
      logger.error('Cancel scheduled content error:', error);
      throw error;
    }
  }

  /**
   * Get upcoming scheduled content
   */
  async getUpcomingScheduledContent(userId, limit = 10) {
    try {
      const now = new Date();

      const { data: upcomingContent, error } = await this.supabase
        .from('content_schedule')
        .select(`
          *,
          content (
            id,
            title,
            content_type,
            platform,
            status
          ),
          campaigns (
            id,
            name
          )
        `)
        .eq('user_id', userId)
        .eq('status', 'scheduled')
        .gte('scheduled_time', now.toISOString())
        .order('scheduled_time', { ascending: true })
        .limit(limit);

      if (error) {
        logger.error('Error fetching upcoming scheduled content:', error);
        throw new Error('Failed to fetch upcoming scheduled content');
      }

      return upcomingContent || [];
    } catch (error) {
      logger.error('Get upcoming scheduled content error:', error);
      throw error;
    }
  }

  /**
   * Get scheduling calendar view
   */
  async getSchedulingCalendar(userId, startDate, endDate, platform = null) {
    try {
      let query = this.supabase
        .from('content_schedule')
        .select(`
          *,
          content (
            id,
            title,
            content_type,
            status
          ),
          campaigns (
            id,
            name,
            status
          )
        `)
        .eq('user_id', userId)
        .gte('scheduled_time', startDate)
        .lte('scheduled_time', endDate);

      if (platform) {
        query = query.eq('platform', platform);
      }

      const { data: calendarData, error } = await query
        .order('scheduled_time', { ascending: true });

      if (error) {
        logger.error('Error fetching scheduling calendar:', error);
        throw new Error('Failed to fetch scheduling calendar');
      }

      // Group by date for calendar view
      const calendar = {};
      calendarData?.forEach(item => {
        const date = new Date(item.scheduled_time).toISOString().split('T')[0];
        if (!calendar[date]) {
          calendar[date] = [];
        }
        calendar[date].push(item);
      });

      return calendar;
    } catch (error) {
      logger.error('Get scheduling calendar error:', error);
      throw error;
    }
  }

  /**
   * Bulk schedule content
   */
  async bulkScheduleContent(scheduleItems, userId) {
    try {
      const results = [];
      const errors = [];

      for (const item of scheduleItems) {
        try {
          const schedule = await this.scheduleContent(item, userId);
          results.push(schedule);
        } catch (error) {
          errors.push({
            item,
            error: error.message
          });
        }
      }

      return {
        success: results.length,
        failed: errors.length,
        results,
        errors
      };
    } catch (error) {
      logger.error('Bulk schedule content error:', error);
      throw error;
    }
  }

  /**
   * Get scheduling statistics
   */
  async getSchedulingStats(userId, timeRange = '30d') {
    try {
      const now = new Date();
      let startDate;

      switch (timeRange) {
        case '7d':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case '90d':
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }

      const { data: scheduledContent, error } = await this.supabase
        .from('content_schedule')
        .select('status, platform, scheduled_time')
        .eq('user_id', userId)
        .gte('scheduled_time', startDate.toISOString());

      if (error) {
        logger.error('Error fetching scheduling stats:', error);
        throw new Error('Failed to fetch scheduling statistics');
      }

      // Calculate statistics
      const stats = {
        total: scheduledContent.length,
        byStatus: {},
        byPlatform: {},
        byDate: {},
        timeRange
      };

      scheduledContent.forEach(item => {
        // Count by status
        stats.byStatus[item.status] = (stats.byStatus[item.status] || 0) + 1;
        
        // Count by platform
        stats.byPlatform[item.platform] = (stats.byPlatform[item.platform] || 0) + 1;
        
        // Count by date
        const date = new Date(item.scheduled_time).toISOString().split('T')[0];
        stats.byDate[date] = (stats.byDate[date] || 0) + 1;
      });

      return stats;
    } catch (error) {
      logger.error('Get scheduling stats error:', error);
      throw error;
    }
  }

  /**
   * Reschedule content
   */
  async rescheduleContent(scheduleId, newScheduledTime, userId) {
    try {
      return await this.updateScheduledContent(scheduleId, {
        scheduled_time: newScheduledTime
      }, userId);
    } catch (error) {
      logger.error('Reschedule content error:', error);
      throw error;
    }
  }

  /**
   * Get failed schedules
   */
  async getFailedSchedules(userId, limit = 20) {
    try {
      const { data: failedSchedules, error } = await this.supabase
        .from('content_schedule')
        .select(`
          *,
          content (
            id,
            title,
            content_type,
            platform
          )
        `)
        .eq('user_id', userId)
        .eq('status', 'failed')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        logger.error('Error fetching failed schedules:', error);
        throw new Error('Failed to fetch failed schedules');
      }

      return failedSchedules || [];
    } catch (error) {
      logger.error('Get failed schedules error:', error);
      throw error;
    }
  }
}

export default new SchedulingService();
