import { getSupabaseClient } from '../shared/db/connection.js';
import { logger } from '../shared/services/logger.js';
import nodemailer from 'nodemailer';

class NotificationService {
  constructor() {
    this.supabase = getSupabaseClient();
    this.emailTransporter = this.createEmailTransporter();
  }

  /**
   * Create email transporter
   */
  createEmailTransporter() {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  /**
   * Create notification
   */
  async createNotification(notificationData, userId) {
    try {
      const { 
        title, 
        message, 
        type = 'info', 
        related_id = null, 
        related_type = null 
      } = notificationData;

      if (!title || !message) {
        throw new Error('Title and message are required');
      }

      const validTypes = ['info', 'success', 'warning', 'error'];
      if (!validTypes.includes(type)) {
        throw new Error('Invalid notification type');
      }

      const { data: notification, error } = await this.supabase
        .from('notifications')
        .insert([{
          user_id: userId,
          title,
          message,
          type,
          related_id,
          related_type,
          is_read: false
        }])
        .select()
        .single();

      if (error) {
        logger.error('Error creating notification:', error);
        throw new Error('Failed to create notification');
      }

      logger.info(`Notification created: ${title} for user ${userId}`);
      return notification;
    } catch (error) {
      logger.error('Create notification error:', error);
      throw error;
    }
  }

  /**
   * Get user notifications
   */
  async getUserNotifications(userId, filters = {}) {
    try {
      let query = this.supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId);

      // Apply filters
      if (filters.type) {
        query = query.eq('type', filters.type);
      }
      if (filters.is_read !== undefined) {
        query = query.eq('is_read', filters.is_read);
      }
      if (filters.related_type) {
        query = query.eq('related_type', filters.related_type);
      }
      if (filters.related_id) {
        query = query.eq('related_id', filters.related_id);
      }

      const { data: notifications, error } = await query
        .order('created_at', { ascending: false });

      if (error) {
        logger.error('Error fetching notifications:', error);
        throw new Error('Failed to fetch notifications');
      }

      return notifications || [];
    } catch (error) {
      logger.error('Get user notifications error:', error);
      throw error;
    }
  }

  /**
   * Mark notification as read
   */
  async markNotificationAsRead(notificationId, userId) {
    try {
      const { data: notification, error } = await this.supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        logger.error('Error marking notification as read:', error);
        throw new Error('Failed to mark notification as read');
      }

      logger.info(`Notification marked as read: ${notificationId} by user ${userId}`);
      return notification;
    } catch (error) {
      logger.error('Mark notification as read error:', error);
      throw error;
    }
  }

  /**
   * Mark all notifications as read
   */
  async markAllNotificationsAsRead(userId) {
    try {
      const { error } = await this.supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', userId)
        .eq('is_read', false);

      if (error) {
        logger.error('Error marking all notifications as read:', error);
        throw new Error('Failed to mark all notifications as read');
      }

      logger.info(`All notifications marked as read for user ${userId}`);
      return true;
    } catch (error) {
      logger.error('Mark all notifications as read error:', error);
      throw error;
    }
  }

  /**
   * Delete notification
   */
  async deleteNotification(notificationId, userId) {
    try {
      const { error } = await this.supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId)
        .eq('user_id', userId);

      if (error) {
        logger.error('Error deleting notification:', error);
        throw new Error('Failed to delete notification');
      }

      logger.info(`Notification deleted: ${notificationId} by user ${userId}`);
      return true;
    } catch (error) {
      logger.error('Delete notification error:', error);
      throw error;
    }
  }

  /**
   * Get unread notification count
   */
  async getUnreadCount(userId) {
    try {
      const { count, error } = await this.supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_read', false);

      if (error) {
        logger.error('Error getting unread count:', error);
        throw new Error('Failed to get unread count');
      }

      return count || 0;
    } catch (error) {
      logger.error('Get unread count error:', error);
      throw error;
    }
  }

  /**
   * Send email notification
   */
  async sendEmailNotification(userId, emailData) {
    try {
      // Get user email
      const { data: user } = await this.supabase
        .from('users')
        .select('email, first_name')
        .eq('id', userId)
        .single();

      if (!user || !user.email) {
        throw new Error('User email not found');
      }

      const { subject, html, text } = emailData;

      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@futureready.com',
        to: user.email,
        subject: subject,
        html: html,
        text: text
      };

      const info = await this.emailTransporter.sendMail(mailOptions);

      logger.info(`Email sent successfully to ${user.email}: ${info.messageId}`);
      return info;
    } catch (error) {
      logger.error('Send email notification error:', error);
      throw error;
    }
  }

  /**
   * Send campaign completion notification
   */
  async sendCampaignCompletionNotification(campaignId, userId) {
    try {
      const { data: campaign } = await this.supabase
        .from('campaigns')
        .select('name, end_date')
        .eq('id', campaignId)
        .eq('user_id', userId)
        .single();

      if (!campaign) {
        throw new Error('Campaign not found');
      }

      // Create in-app notification
      await this.createNotification({
        title: 'Campaign Completed',
        message: `Your campaign "${campaign.name}" has completed successfully.`,
        type: 'success',
        related_id: campaignId,
        related_type: 'campaign'
      }, userId);

      // Send email notification
      const emailData = {
        subject: `Campaign Completed: ${campaign.name}`,
        html: `
          <h2>Campaign Completed Successfully!</h2>
          <p>Your campaign <strong>${campaign.name}</strong> has completed on ${new Date(campaign.end_date).toLocaleDateString()}.</p>
          <p>Check your dashboard for detailed results and insights.</p>
        `,
        text: `Campaign ${campaign.name} completed successfully on ${new Date(campaign.end_date).toLocaleDateString()}.`
      };

      await this.sendEmailNotification(userId, emailData);

      logger.info(`Campaign completion notification sent for campaign ${campaignId}`);
      return true;
    } catch (error) {
      logger.error('Send campaign completion notification error:', error);
      throw error;
    }
  }

  /**
   * Send content approval notification
   */
  async sendContentApprovalNotification(contentId, userId, approved = true) {
    try {
      const { data: content } = await this.supabase
        .from('content')
        .select('title, content_type')
        .eq('id', contentId)
        .eq('user_id', userId)
        .single();

      if (!content) {
        throw new Error('Content not found');
      }

      const status = approved ? 'approved' : 'rejected';
      const notificationType = approved ? 'success' : 'warning';

      // Create in-app notification
      await this.createNotification({
        title: `Content ${approved ? 'Approved' : 'Rejected'}`,
        message: `Your ${content.content_type} "${content.title}" has been ${status}.`,
        type: notificationType,
        related_id: contentId,
        related_type: 'content'
      }, userId);

      // Send email notification
      const emailData = {
        subject: `Content ${approved ? 'Approved' : 'Rejected'}: ${content.title}`,
        html: `
          <h2>Content ${approved ? 'Approved' : 'Rejected'}!</h2>
          <p>Your ${content.content_type} <strong>${content.title}</strong> has been ${status}.</p>
          ${approved ? '<p>Your content is now ready for scheduling and publishing.</p>' : '<p>Please review and make necessary changes.</p>'}
        `,
        text: `Content ${content.title} has been ${status}.`
      };

      await this.sendEmailNotification(userId, emailData);

      logger.info(`Content approval notification sent for content ${contentId}`);
      return true;
    } catch (error) {
      logger.error('Send content approval notification error:', error);
      throw error;
    }
  }

  /**
   * Send scheduling reminder notification
   */
  async sendSchedulingReminderNotification(scheduleId, userId) {
    try {
      const { data: schedule } = await this.supabase
        .from('content_schedule')
        .select(`
          scheduled_time,
          content (
            title,
            content_type
          )
        `)
        .eq('id', scheduleId)
        .eq('user_id', userId)
        .single();

      if (!schedule) {
        throw new Error('Schedule not found');
      }

      const scheduledTime = new Date(schedule.scheduled_time);
      const timeUntilScheduled = scheduledTime.getTime() - Date.now();
      const hoursUntilScheduled = Math.floor(timeUntilScheduled / (1000 * 60 * 60));

      if (hoursUntilScheduled <= 24) {
        // Create in-app notification
        await this.createNotification({
          title: 'Content Publishing Reminder',
          message: `Your ${schedule.content.content_type} "${schedule.content.title}" is scheduled to publish in ${hoursUntilScheduled} hours.`,
          type: 'info',
          related_id: scheduleId,
          related_type: 'schedule'
        }, userId);

        // Send email reminder
        const emailData = {
          subject: `Reminder: Content Publishing Soon - ${schedule.content.title}`,
          html: `
            <h2>Content Publishing Reminder</h2>
            <p>Your ${schedule.content.content_type} <strong>${schedule.content.title}</strong> is scheduled to publish in ${hoursUntilScheduled} hours.</p>
            <p>Scheduled time: ${scheduledTime.toLocaleString()}</p>
          `,
          text: `Content ${schedule.content.title} is scheduled to publish in ${hoursUntilScheduled} hours.`
        };

        await this.sendEmailNotification(userId, emailData);
      }

      logger.info(`Scheduling reminder notification sent for schedule ${scheduleId}`);
      return true;
    } catch (error) {
      logger.error('Send scheduling reminder notification error:', error);
      throw error;
    }
  }

  /**
   * Get notification statistics
   */
  async getNotificationStats(userId, timeRange = '30d') {
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

      const { data: notifications, error } = await this.supabase
        .from('notifications')
        .select('type, is_read, created_at')
        .eq('user_id', userId)
        .gte('created_at', startDate.toISOString());

      if (error) {
        logger.error('Error fetching notification stats:', error);
        throw new Error('Failed to fetch notification statistics');
      }

      const stats = {
        total: notifications.length,
        unread: notifications.filter(n => !n.is_read).length,
        byType: {},
        timeRange
      };

      notifications.forEach(notification => {
        if (!stats.byType[notification.type]) {
          stats.byType[notification.type] = 0;
        }
        stats.byType[notification.type]++;
      });

      return stats;
    } catch (error) {
      logger.error('Get notification stats error:', error);
      throw error;
    }
  }

  /**
   * Clean up old notifications
   */
  async cleanupOldNotifications(daysToKeep = 90) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      const { error } = await this.supabase
        .from('notifications')
        .delete()
        .lt('created_at', cutoffDate.toISOString())
        .eq('is_read', true);

      if (error) {
        logger.error('Error cleaning up old notifications:', error);
        throw new Error('Failed to cleanup old notifications');
      }

      logger.info(`Old notifications cleanup completed for notifications older than ${daysToKeep} days`);
      return true;
    } catch (error) {
      logger.error('Cleanup old notifications error:', error);
      throw error;
    }
  }
}

export default new NotificationService();
