import { getSupabaseClient } from '../shared/db/connection.js';
import { logger } from '../shared/services/logger.js';

class ContentService {
  constructor() {
    this.supabase = getSupabaseClient();
  }

  /**
   * Get all content for a user
   */
  async getUserContent(userId, filters = {}) {
    try {
      let query = this.supabase
        .from('content')
        .select(`
          *,
          campaigns (
            id,
            name,
            status
          )
        `)
        .eq('user_id', userId);

      // Apply filters
      if (filters.campaign_id) {
        query = query.eq('campaign_id', filters.campaign_id);
      }
      if (filters.content_type) {
        query = query.eq('content_type', filters.content_type);
      }
      if (filters.platform) {
        query = query.eq('platform', filters.platform);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.ai_generated !== undefined) {
        query = query.eq('ai_generated', filters.ai_generated);
      }

      const { data: content, error } = await query
        .order('created_at', { ascending: false });

      if (error) {
        logger.error('Error fetching content:', error);
        throw new Error('Failed to fetch content');
      }

      return content || [];
    } catch (error) {
      logger.error('Get content error:', error);
      throw error;
    }
  }

  /**
   * Get content by ID
   */
  async getContentById(contentId, userId) {
    try {
      const { data: content, error } = await this.supabase
        .from('content')
        .select(`
          *,
          campaigns (
            id,
            name,
            status,
            platforms
          )
        `)
        .eq('id', contentId)
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Content not found');
        }
        logger.error('Error fetching content:', error);
        throw new Error('Failed to fetch content');
      }

      return content;
    } catch (error) {
      logger.error('Get content error:', error);
      throw error;
    }
  }

  /**
   * Create new content
   */
  async createContent(contentData, userId) {
    try {
      const { 
        campaign_id, 
        title, 
        content_text, 
        content_type, 
        platform, 
        media_urls 
      } = contentData;

      // Validate required fields
      if (!title || !content_type || !platform) {
        throw new Error('Title, content type, and platform are required');
      }

      // Validate content type
      const validTypes = ['post', 'image', 'video', 'story', 'ad'];
      if (!validTypes.includes(content_type)) {
        throw new Error('Invalid content type');
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

      const { data: content, error } = await this.supabase
        .from('content')
        .insert([{
          user_id: userId,
          campaign_id,
          title,
          content_text,
          content_type,
          platform,
          media_urls: media_urls || [],
          ai_generated: false,
          status: 'draft'
        }])
        .select()
        .single();

      if (error) {
        logger.error('Error creating content:', error);
        throw new Error('Failed to create content');
      }

      logger.info(`New content created: ${title} by user ${userId}`);
      return content;
    } catch (error) {
      logger.error('Create content error:', error);
      throw error;
    }
  }

  /**
   * Update content
   */
  async updateContent(contentId, updateData, userId) {
    try {
      // Verify content ownership
      const existingContent = await this.getContentById(contentId, userId);

      // Validate content type if being updated
      if (updateData.content_type) {
        const validTypes = ['post', 'image', 'video', 'story', 'ad'];
        if (!validTypes.includes(updateData.content_type)) {
          throw new Error('Invalid content type');
        }
      }

      // Validate campaign ownership if campaign_id is being updated
      if (updateData.campaign_id) {
        const { data: campaign } = await this.supabase
          .from('campaigns')
          .select('id')
          .eq('id', updateData.campaign_id)
          .eq('user_id', userId)
          .single();

        if (!campaign) {
          throw new Error('Campaign not found or access denied');
        }
      }

      const { data: content, error } = await this.supabase
        .from('content')
        .update(updateData)
        .eq('id', contentId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        logger.error('Error updating content:', error);
        throw new Error('Failed to update content');
      }

      logger.info(`Content updated: ${contentId} by user ${userId}`);
      return content;
    } catch (error) {
      logger.error('Update content error:', error);
      throw error;
    }
  }

  /**
   * Delete content
   */
  async deleteContent(contentId, userId) {
    try {
      // Verify content ownership
      await this.getContentById(contentId, userId);

      const { error } = await this.supabase
        .from('content')
        .delete()
        .eq('id', contentId)
        .eq('user_id', userId);

      if (error) {
        logger.error('Error deleting content:', error);
        throw new Error('Failed to delete content');
      }

      logger.info(`Content deleted: ${contentId} by user ${userId}`);
      return true;
    } catch (error) {
      logger.error('Delete content error:', error);
      throw error;
    }
  }

  /**
   * Change content status
   */
  async changeContentStatus(contentId, newStatus, userId) {
    try {
      const validStatuses = ['draft', 'approved', 'scheduled', 'published', 'rejected'];
      
      if (!validStatuses.includes(newStatus)) {
        throw new Error('Invalid status');
      }

      // Verify content ownership
      await this.getContentById(contentId, userId);

      const { data: content, error } = await this.supabase
        .from('content')
        .update({ status: newStatus })
        .eq('id', contentId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        logger.error('Error updating content status:', error);
        throw new Error('Failed to update content status');
      }

      logger.info(`Content status changed: ${contentId} to ${newStatus} by user ${userId}`);
      return content;
    } catch (error) {
      logger.error('Change content status error:', error);
      throw error;
    }
  }

  /**
   * Get content by campaign
   */
  async getContentByCampaign(campaignId, userId) {
    try {
      // Verify campaign ownership
      const { data: campaign } = await this.supabase
        .from('campaigns')
        .select('id')
        .eq('id', campaignId)
        .eq('user_id', userId)
        .single();

      if (!campaign) {
        throw new Error('Campaign not found or access denied');
      }

      const { data: content, error } = await this.supabase
        .from('content')
        .select('*')
        .eq('campaign_id', campaignId)
        .order('created_at', { ascending: false });

      if (error) {
        logger.error('Error fetching campaign content:', error);
        throw new Error('Failed to fetch campaign content');
      }

      return content || [];
    } catch (error) {
      logger.error('Get campaign content error:', error);
      throw error;
    }
  }

  /**
   * Duplicate content
   */
  async duplicateContent(contentId, userId, newTitle) {
    try {
      // Get original content
      const originalContent = await this.getContentById(contentId, userId);

      // Create new content data
      const newContentData = {
        campaign_id: originalContent.campaign_id,
        title: newTitle || `${originalContent.title} (Copy)`,
        content_text: originalContent.content_text,
        content_type: originalContent.content_type,
        platform: originalContent.platform,
        media_urls: originalContent.media_urls,
        ai_generated: false,
        status: 'draft'
      };

      const newContent = await this.createContent(newContentData, userId);
      
      logger.info(`Content duplicated: ${contentId} to ${newContent.id} by user ${userId}`);
      return newContent;
    } catch (error) {
      logger.error('Duplicate content error:', error);
      throw error;
    }
  }

  /**
   * Get content statistics
   */
  async getContentStats(userId, timeRange = '30d') {
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

      const { data: content, error } = await this.supabase
        .from('content')
        .select('content_type, status, platform, created_at')
        .eq('user_id', userId)
        .gte('created_at', startDate.toISOString());

      if (error) {
        logger.error('Error fetching content stats:', error);
        throw new Error('Failed to fetch content statistics');
      }

      // Calculate statistics
      const stats = {
        total: content.length,
        byType: {},
        byStatus: {},
        byPlatform: {},
        aiGenerated: content.filter(c => c.ai_generated).length,
        timeRange
      };

      content.forEach(item => {
        // Count by type
        stats.byType[item.content_type] = (stats.byType[item.content_type] || 0) + 1;
        
        // Count by status
        stats.byStatus[item.status] = (stats.byStatus[item.status] || 0) + 1;
        
        // Count by platform
        stats.byPlatform[item.platform] = (stats.byPlatform[item.platform] || 0) + 1;
      });

      return stats;
    } catch (error) {
      logger.error('Get content stats error:', error);
      throw error;
    }
  }

  /**
   * Search content
   */
  async searchContent(userId, searchTerm, filters = {}) {
    try {
      let query = this.supabase
        .from('content')
        .select(`
          *,
          campaigns (
            id,
            name
          )
        `)
        .eq('user_id', userId)
        .or(`title.ilike.%${searchTerm}%,content_text.ilike.%${searchTerm}%`);

      // Apply additional filters
      if (filters.campaign_id) {
        query = query.eq('campaign_id', filters.campaign_id);
      }
      if (filters.content_type) {
        query = query.eq('content_type', filters.content_type);
      }
      if (filters.platform) {
        query = query.eq('platform', filters.platform);
      }

      const { data: content, error } = await query
        .order('created_at', { ascending: false });

      if (error) {
        logger.error('Error searching content:', error);
        throw new Error('Failed to search content');
      }

      return content || [];
    } catch (error) {
      logger.error('Search content error:', error);
      throw error;
    }
  }
}

export default new ContentService();
