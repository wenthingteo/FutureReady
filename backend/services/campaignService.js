import { getSupabaseClient } from '../shared/db/connection.js';
import { logger } from '../shared/services/logger.js';

class CampaignService {
  constructor() {
    this.supabase = getSupabaseClient();
  }

  /**
   * Get all campaigns for a user
   */
  async getUserCampaigns(userId, filters = {}) {
    try {
      let query = this.supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', userId);

      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.platform) {
        query = query.contains('platforms', [filters.platform]);
      }
      if (filters.startDate) {
        query = query.gte('start_date', filters.startDate);
      }
      if (filters.endDate) {
        query = query.lte('end_date', filters.endDate);
      }

      const { data: campaigns, error } = await query
        .order('created_at', { ascending: false });

      if (error) {
        logger.error('Error fetching campaigns:', error);
        throw new Error('Failed to fetch campaigns');
      }

      return campaigns || [];
    } catch (error) {
      logger.error('Get campaigns error:', error);
      throw error;
    }
  }

  /**
   * Get campaign by ID
   */
  async getCampaignById(campaignId, userId) {
    try {
      const { data: campaign, error } = await this.supabase
        .from('campaigns')
        .select('*')
        .eq('id', campaignId)
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Campaign not found');
        }
        logger.error('Error fetching campaign:', error);
        throw new Error('Failed to fetch campaign');
      }

      return campaign;
    } catch (error) {
      logger.error('Get campaign error:', error);
      throw error;
    }
  }

  /**
   * Create new campaign
   */
  async createCampaign(campaignData, userId) {
    try {
      const { name, description, budget, start_date, end_date, platforms, target_audience, goals } = campaignData;

      // Validate required fields
      if (!name || !start_date || !end_date) {
        throw new Error('Name, start date, and end date are required');
      }

      // Validate dates
      if (new Date(start_date) >= new Date(end_date)) {
        throw new Error('End date must be after start date');
      }

      // Validate budget
      if (budget && budget <= 0) {
        throw new Error('Budget must be greater than 0');
      }

      const { data: campaign, error } = await this.supabase
        .from('campaigns')
        .insert([{
          user_id: userId,
          name,
          description,
          budget,
          start_date,
          end_date,
          platforms: platforms || [],
          target_audience: target_audience || {},
          goals: goals || {},
          status: 'draft'
        }])
        .select()
        .single();

      if (error) {
        logger.error('Error creating campaign:', error);
        throw new Error('Failed to create campaign');
      }

      logger.info(`New campaign created: ${name} by user ${userId}`);
      return campaign;
    } catch (error) {
      logger.error('Create campaign error:', error);
      throw error;
    }
  }

  /**
   * Update campaign
   */
  async updateCampaign(campaignId, updateData, userId) {
    try {
      // Verify campaign ownership
      const existingCampaign = await this.getCampaignById(campaignId, userId);

      // Validate dates if they're being updated
      if (updateData.start_date && updateData.end_date) {
        if (new Date(updateData.start_date) >= new Date(updateData.end_date)) {
          throw new Error('End date must be after start date');
        }
      }

      // Validate budget
      if (updateData.budget && updateData.budget <= 0) {
        throw new Error('Budget must be greater than 0');
      }

      const { data: campaign, error } = await this.supabase
        .from('campaigns')
        .update(updateData)
        .eq('id', campaignId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        logger.error('Error updating campaign:', error);
        throw new Error('Failed to update campaign');
      }

      logger.info(`Campaign updated: ${campaignId} by user ${userId}`);
      return campaign;
    } catch (error) {
      logger.error('Update campaign error:', error);
      throw error;
    }
  }

  /**
   * Delete campaign
   */
  async deleteCampaign(campaignId, userId) {
    try {
      // Verify campaign ownership
      await this.getCampaignById(campaignId, userId);

      const { error } = await this.supabase
        .from('campaigns')
        .delete()
        .eq('id', campaignId)
        .eq('user_id', userId);

      if (error) {
        logger.error('Error deleting campaign:', error);
        throw new Error('Failed to delete campaign');
      }

      logger.info(`Campaign deleted: ${campaignId} by user ${userId}`);
      return true;
    } catch (error) {
      logger.error('Delete campaign error:', error);
      throw error;
    }
  }

  /**
   * Change campaign status
   */
  async changeCampaignStatus(campaignId, newStatus, userId) {
    try {
      const validStatuses = ['draft', 'active', 'paused', 'completed', 'cancelled'];
      
      if (!validStatuses.includes(newStatus)) {
        throw new Error('Invalid status');
      }

      // Verify campaign ownership
      const existingCampaign = await this.getCampaignById(campaignId, userId);

      // Additional validation for status changes
      if (newStatus === 'active' && existingCampaign.status === 'draft') {
        // Check if campaign has required fields for activation
        if (!existingCampaign.platforms || existingCampaign.platforms.length === 0) {
          throw new Error('Campaign must have at least one platform selected to activate');
        }
      }

      const { data: campaign, error } = await this.supabase
        .from('campaigns')
        .update({ status: newStatus })
        .eq('id', campaignId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        logger.error('Error updating campaign status:', error);
        throw new Error('Failed to update campaign status');
      }

      logger.info(`Campaign status changed: ${campaignId} to ${newStatus} by user ${userId}`);
      return campaign;
    } catch (error) {
      logger.error('Change campaign status error:', error);
      throw error;
    }
  }

  /**
   * Get campaign statistics
   */
  async getCampaignStats(campaignId, userId) {
    try {
      // Verify campaign ownership
      await this.getCampaignById(campaignId, userId);

      // Get content count
      const { count: contentCount } = await this.supabase
        .from('content')
        .select('*', { count: 'exact', head: true })
        .eq('campaign_id', campaignId);

      // Get analytics summary
      const { data: analytics } = await this.supabase
        .from('analytics')
        .select('metrics')
        .eq('campaign_id', campaignId);

      // Calculate total metrics
      const totalMetrics = analytics?.reduce((acc, item) => {
        const metrics = item.metrics || {};
        Object.keys(metrics).forEach(key => {
          if (typeof metrics[key] === 'number') {
            acc[key] = (acc[key] || 0) + metrics[key];
          }
        });
        return acc;
      }, {}) || {};

      return {
        contentCount: contentCount || 0,
        totalMetrics,
        analyticsCount: analytics?.length || 0
      };
    } catch (error) {
      logger.error('Get campaign stats error:', error);
      throw error;
    }
  }

  /**
   * Duplicate campaign
   */
  async duplicateCampaign(campaignId, userId, newName) {
    try {
      // Get original campaign
      const originalCampaign = await this.getCampaignById(campaignId, userId);

      // Create new campaign data
      const newCampaignData = {
        name: newName || `${originalCampaign.name} (Copy)`,
        description: originalCampaign.description,
        budget: originalCampaign.budget,
        platforms: originalCampaign.platforms,
        target_audience: originalCampaign.target_audience,
        goals: originalCampaign.goals,
        start_date: new Date().toISOString().split('T')[0], // Today
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
      };

      const newCampaign = await this.createCampaign(newCampaignData, userId);
      
      logger.info(`Campaign duplicated: ${campaignId} to ${newCampaign.id} by user ${userId}`);
      return newCampaign;
    } catch (error) {
      logger.error('Duplicate campaign error:', error);
      throw error;
    }
  }
}

export default new CampaignService();
