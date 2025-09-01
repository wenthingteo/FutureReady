import { getSupabaseClient } from '../shared/db/connection.js';
import { logger } from '../shared/services/logger.js';

class AnalyticsService {
  constructor() {
    this.supabase = getSupabaseClient();
  }

  /**
   * Record analytics data for content or campaign
   */
  async recordAnalytics(analyticsData, userId) {
    try {
      const { 
        content_id, 
        campaign_id, 
        platform, 
        metrics, 
        date = new Date().toISOString().split('T')[0] 
      } = analyticsData;

      if (!platform || !metrics) {
        throw new Error('Platform and metrics are required');
      }

      // Validate ownership
      if (content_id) {
        const { data: content } = await this.supabase
          .from('content')
          .select('id')
          .eq('id', content_id)
          .eq('user_id', userId)
          .single();

        if (!content) {
          throw new Error('Content not found or access denied');
        }
      }

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

      // Check for existing analytics
      let existingAnalytics = null;
      if (content_id) {
        const { data } = await this.supabase
          .from('analytics')
          .select('id, metrics')
          .eq('content_id', content_id)
          .eq('platform', platform)
          .eq('date', date)
          .single();
        existingAnalytics = data;
      } else if (campaign_id) {
        const { data } = await this.supabase
          .from('analytics')
          .select('id, metrics')
          .eq('campaign_id', campaign_id)
          .eq('platform', platform)
          .eq('date', date)
          .single();
        existingAnalytics = data;
      }

      let result;
      if (existingAnalytics) {
        // Update existing analytics
        const mergedMetrics = this.mergeMetrics(existingAnalytics.metrics, metrics);
        const { data: updatedAnalytics, error } = await this.supabase
          .from('analytics')
          .update({ metrics: mergedMetrics })
          .eq('id', existingAnalytics.id)
          .select()
          .single();

        if (error) {
          logger.error('Error updating analytics:', error);
          throw new Error('Failed to update analytics');
        }

        result = updatedAnalytics;
      } else {
        // Create new analytics entry
        const { data: newAnalytics, error } = await this.supabase
          .from('analytics')
          .insert([{
            content_id,
            campaign_id,
            platform,
            metrics,
            date
          }])
          .select()
          .single();

        if (error) {
          logger.error('Error creating analytics:', error);
          throw new Error('Failed to create analytics');
        }

        result = newAnalytics;
      }

      logger.info(`Analytics recorded for ${content_id || campaign_id} on ${platform}`);
      return result;
    } catch (error) {
      logger.error('Record analytics error:', error);
      throw error;
    }
  }

  /**
   * Get analytics for a specific content item
   */
  async getContentAnalytics(contentId, userId, filters = {}) {
    try {
      // Verify content ownership
      const { data: content } = await this.supabase
        .from('content')
        .select('id')
        .eq('id', contentId)
        .eq('user_id', userId)
        .single();

      if (!content) {
        throw new Error('Content not found or access denied');
      }

      let query = this.supabase
        .from('analytics')
        .select('*')
        .eq('content_id', contentId);

      if (filters.platform) {
        query = query.eq('platform', filters.platform);
      }
      if (filters.start_date) {
        query = query.gte('date', filters.start_date);
      }
      if (filters.end_date) {
        query = query.lte('date', filters.end_date);
      }

      const { data: analytics, error } = await query
        .order('date', { ascending: false });

      if (error) {
        logger.error('Error fetching content analytics:', error);
        throw new Error('Failed to fetch content analytics');
      }

      return analytics || [];
    } catch (error) {
      logger.error('Get content analytics error:', error);
      throw error;
    }
  }

  /**
   * Get analytics for a specific campaign
   */
  async getCampaignAnalytics(campaignId, userId, filters = {}) {
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

      let query = this.supabase
        .from('analytics')
        .select('*')
        .eq('campaign_id', campaignId);

      if (filters.platform) {
        query = query.eq('platform', filters.platform);
      }
      if (filters.start_date) {
        query = query.gte('date', filters.start_date);
      }
      if (filters.end_date) {
        query = query.lte('date', filters.end_date);
      }

      const { data: analytics, error } = await query
        .order('date', { ascending: false });

      if (error) {
        logger.error('Error fetching campaign analytics:', error);
        throw new Error('Failed to fetch campaign analytics');
      }

      return analytics || [];
    } catch (error) {
      logger.error('Get campaign analytics error:', error);
      throw error;
    }
  }

  /**
   * Get user analytics summary
   */
  async getUserAnalyticsSummary(userId, timeRange = '30d') {
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

      const { data: analytics, error } = await this.supabase
        .from('analytics')
        .select(`
          *,
          content (
            id,
            title,
            content_type,
            platform
          ),
          campaigns (
            id,
            name,
            status
          )
        `)
        .or(`content.user_id.eq.${userId},campaigns.user_id.eq.${userId}`)
        .gte('date', startDate.toISOString().split('T')[0]);

      if (error) {
        logger.error('Error fetching user analytics summary:', error);
        throw new Error('Failed to fetch user analytics summary');
      }

      // Calculate summary statistics
      const summary = {
        totalRecords: analytics.length,
        totalEngagement: 0,
        totalReach: 0,
        totalImpressions: 0,
        totalClicks: 0,
        totalConversions: 0,
        byPlatform: {},
        byContentType: {},
        byDate: {},
        timeRange
      };

      analytics.forEach(item => {
        const metrics = item.metrics || {};
        
        summary.totalEngagement += metrics.engagement || 0;
        summary.totalReach += metrics.reach || 0;
        summary.totalImpressions += metrics.impressions || 0;
        summary.totalClicks += metrics.clicks || 0;
        summary.totalConversions += metrics.conversions || 0;

        // Group by platform
        if (!summary.byPlatform[item.platform]) {
          summary.byPlatform[item.platform] = {
            engagement: 0,
            reach: 0,
            impressions: 0,
            clicks: 0,
            conversions: 0
          };
        }
        summary.byPlatform[item.platform].engagement += metrics.engagement || 0;
        summary.byPlatform[item.platform].reach += metrics.reach || 0;
        summary.byPlatform[item.platform].impressions += metrics.impressions || 0;
        summary.byPlatform[item.platform].clicks += metrics.clicks || 0;
        summary.byPlatform[item.platform].conversions += metrics.conversions || 0;

        // Group by content type
        if (item.content) {
          const contentType = item.content.content_type;
          if (!summary.byContentType[contentType]) {
            summary.byContentType[contentType] = {
              engagement: 0,
              reach: 0,
              impressions: 0,
              clicks: 0,
              conversions: 0
            };
          }
          summary.byContentType[contentType].engagement += metrics.engagement || 0;
          summary.byContentType[contentType].reach += metrics.reach || 0;
          summary.byContentType[contentType].impressions += metrics.impressions || 0;
          summary.byContentType[contentType].clicks += metrics.clicks || 0;
          summary.byContentType[contentType].conversions += metrics.conversions || 0;
        }

        // Group by date
        if (!summary.byDate[item.date]) {
          summary.byDate[item.date] = {
            engagement: 0,
            reach: 0,
            impressions: 0,
            clicks: 0,
            conversions: 0
          };
        }
        summary.byDate[item.date].engagement += metrics.engagement || 0;
        summary.byDate[item.date].reach += metrics.reach || 0;
        summary.byDate[item.date].impressions += metrics.impressions || 0;
        summary.byDate[item.date].clicks += metrics.clicks || 0;
        summary.byDate[item.date].conversions += metrics.conversions || 0;
      });

      // Calculate rates
      summary.engagementRate = summary.totalImpressions > 0 ? 
        (summary.totalEngagement / summary.totalImpressions) * 100 : 0;
      summary.clickThroughRate = summary.totalImpressions > 0 ? 
        (summary.totalClicks / summary.totalImpressions) * 100 : 0;
      summary.conversionRate = summary.totalClicks > 0 ? 
        (summary.totalConversions / summary.totalClicks) * 100 : 0;

      return summary;
    } catch (error) {
      logger.error('Get user analytics summary error:', error);
      throw error;
    }
  }

  /**
   * Get top performing content
   */
  async getTopPerformingContent(userId, metric = 'engagement', limit = 10, timeRange = '30d') {
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

      const { data: analytics, error } = await this.supabase
        .from('analytics')
        .select(`
          *,
          content (
            id,
            title,
            content_type,
            platform
          )
        `)
        .not('content_id', 'is', null)
        .gte('date', startDate.toISOString().split('T')[0]);

      if (error) {
        logger.error('Error fetching top performing content:', error);
        throw new Error('Failed to fetch top performing content');
      }

      // Group analytics by content
      const contentPerformance = {};
      analytics.forEach(item => {
        if (item.content) {
          const contentId = item.content.id;
          if (!contentPerformance[contentId]) {
            contentPerformance[contentId] = {
              content: item.content,
              totalMetrics: {
                engagement: 0,
                reach: 0,
                impressions: 0,
                clicks: 0,
                conversions: 0
              }
            };
          }

          const metrics = item.metrics || {};
          contentPerformance[contentId].totalMetrics.engagement += metrics.engagement || 0;
          contentPerformance[contentId].totalMetrics.reach += metrics.reach || 0;
          contentPerformance[contentId].totalMetrics.impressions += metrics.impressions || 0;
          contentPerformance[contentId].totalMetrics.clicks += metrics.clicks || 0;
          contentPerformance[contentId].totalMetrics.conversions += metrics.conversions || 0;
        }
      });

      // Sort by metric and return top performers
      const sortedContent = Object.values(contentPerformance)
        .sort((a, b) => b.totalMetrics[metric] - a.totalMetrics[metric])
        .slice(0, limit);

      return sortedContent;
    } catch (error) {
      logger.error('Get top performing content error:', error);
      throw error;
    }
  }

  /**
   * Merge metrics from different sources
   */
  mergeMetrics(existingMetrics, newMetrics) {
    const merged = { ...existingMetrics };
    
    Object.keys(newMetrics).forEach(key => {
      if (typeof newMetrics[key] === 'number') {
        merged[key] = (merged[key] || 0) + newMetrics[key];
      } else {
        merged[key] = newMetrics[key];
      }
    });

    return merged;
  }

  /**
   * Calculate percentage change between two values
   */
  calculatePercentageChange(previous, current) {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    return ((current - previous) / previous) * 100;
  }
}

export default new AnalyticsService();
