import { getSupabaseClient } from '../shared/db/connection.js';
import { logger } from '../shared/services/logger.js';
import OpenAI from 'openai';

class AIAgentService {
  constructor() {
    this.supabase = getSupabaseClient();
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  /**
   * Generate content using AI
   */
  async generateContent(prompt, userId, options = {}) {
    try {
      const {
        content_type = 'post',
        platform = 'general',
        tone = 'professional',
        length = 'medium',
        target_audience = 'general',
        campaign_context = null
      } = options;

      // Create AI generation log
      const { data: logEntry, error: logError } = await this.supabase
        .from('ai_generation_logs')
        .insert([{
          user_id: userId,
          prompt,
          model_used: 'gpt-4',
          status: 'processing'
        }])
        .select()
        .single();

      if (logError) {
        logger.error('Error creating AI log entry:', logError);
        throw new Error('Failed to create AI log entry');
      }

      try {
        // Build enhanced prompt with context
        let enhancedPrompt = this.buildEnhancedPrompt(prompt, {
          content_type,
          platform,
          tone,
          length,
          target_audience,
          campaign_context
        });

        // Generate content using OpenAI
        const completion = await this.openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a professional marketing content creator. Create engaging, platform-optimized content that drives engagement and conversions.'
            },
            {
              role: 'user',
              content: enhancedPrompt
            }
          ],
          max_tokens: this.getMaxTokens(length),
          temperature: 0.7
        });

        const generatedContent = completion.choices[0].message.content;
        const tokensUsed = completion.usage.total_tokens;
        const cost = this.calculateCost(tokensUsed);

        // Update log entry with success
        await this.supabase
          .from('ai_generation_logs')
          .update({
            generated_content: generatedContent,
            tokens_used: tokensUsed,
            cost,
            status: 'completed'
          })
          .eq('id', logEntry.id);

        logger.info(`AI content generated successfully for user ${userId}, tokens: ${tokensUsed}, cost: ${cost}`);

        return {
          content: generatedContent,
          metadata: {
            content_type,
            platform,
            tone,
            length,
            target_audience,
            tokens_used: tokensUsed,
            cost,
            log_id: logEntry.id
          }
        };

      } catch (aiError) {
        // Update log entry with error
        await this.supabase
          .from('ai_generation_logs')
          .update({
            status: 'failed',
            error_message: aiError.message
          })
          .eq('id', logEntry.id);

        logger.error('AI content generation failed:', aiError);
        throw new Error(`AI generation failed: ${aiError.message}`);
      }

    } catch (error) {
      logger.error('Generate content error:', error);
      throw error;
    }
  }

  /**
   * Generate campaign strategy
   */
  async generateCampaignStrategy(campaignData, userId) {
    try {
      const { name, description, target_audience, goals, budget, platforms } = campaignData;

      const prompt = `Create a comprehensive marketing campaign strategy for:
Campaign: ${name}
Description: ${description}
Target Audience: ${JSON.stringify(target_audience)}
Goals: ${JSON.stringify(goals)}
Budget: $${budget}
Platforms: ${platforms.join(', ')}

Provide:
1. Key messaging strategy
2. Content themes and topics
3. Platform-specific recommendations
4. Timeline and milestones
5. Success metrics and KPIs
6. Budget allocation recommendations
7. Risk mitigation strategies`;

      const result = await this.generateContent(prompt, userId, {
        content_type: 'strategy',
        length: 'long',
        tone: 'professional'
      });

      return result;
    } catch (error) {
      logger.error('Generate campaign strategy error:', error);
      throw error;
    }
  }

  /**
   * Generate content ideas
   */
  async generateContentIdeas(campaignId, userId, count = 10) {
    try {
      // Get campaign details
      const { data: campaign } = await this.supabase
        .from('campaigns')
        .select('*')
        .eq('id', campaignId)
        .eq('user_id', userId)
        .single();

      if (!campaign) {
        throw new Error('Campaign not found or access denied');
      }

      const prompt = `Generate ${count} creative content ideas for a marketing campaign:
Campaign: ${campaign.name}
Description: ${campaign.description}
Target Audience: ${JSON.stringify(campaign.target_audience)}
Goals: ${JSON.stringify(campaign.goals)}
Platforms: ${campaign.platforms.join(', ')}

For each idea, provide:
1. Content title
2. Content type (post, image, video, story, ad)
3. Key message
4. Platform optimization tips
5. Engagement hooks
6. Call-to-action suggestions

Format as a numbered list.`;

      const result = await this.generateContent(prompt, userId, {
        content_type: 'ideas',
        length: 'long',
        tone: 'creative'
      });

      return result;
    } catch (error) {
      logger.error('Generate content ideas error:', error);
      throw error;
    }
  }

  /**
   * Optimize existing content
   */
  async optimizeContent(contentId, userId, optimizationType = 'engagement') {
    try {
      // Get content details
      const { data: content } = await this.supabase
        .from('content')
        .select('*')
        .eq('id', contentId)
        .eq('user_id', userId)
        .single();

      if (!content) {
        throw new Error('Content not found or access denied');
      }

      let prompt;
      switch (optimizationType) {
        case 'engagement':
          prompt = `Optimize this content for maximum engagement on ${content.platform}:
Title: ${content.title}
Content: ${content.content_text}
Content Type: ${content.content_type}

Provide:
1. Optimized title (more engaging)
2. Optimized content (better hook, structure, call-to-action)
3. Hashtag recommendations
4. Best posting time suggestions
5. Engagement boosters (questions, polls, etc.)`;
          break;
        case 'conversion':
          prompt = `Optimize this content for maximum conversions on ${content.platform}:
Title: ${content.title}
Content: ${content.content_text}
Content Type: ${content.content_type}

Provide:
1. Conversion-focused title
2. Content with stronger value proposition
3. Multiple call-to-action options
4. Urgency/scarcity elements
5. Social proof suggestions`;
          break;
        default:
          prompt = `Optimize this content for better performance on ${content.platform}:
Title: ${content.title}
Content: ${content.content_text}
Content Type: ${content.content_type}

Provide comprehensive optimization suggestions.`;
      }

      const result = await this.generateContent(prompt, userId, {
        content_type: 'optimization',
        length: 'medium',
        tone: 'professional'
      });

      return result;
    } catch (error) {
      logger.error('Optimize content error:', error);
      throw error;
    }
  }

  /**
   * Get AI generation history
   */
  async getGenerationHistory(userId, filters = {}) {
    try {
      let query = this.supabase
        .from('ai_generation_logs')
        .select('*')
        .eq('user_id', userId);

      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.start_date) {
        query = query.gte('created_at', filters.start_date);
      }
      if (filters.end_date) {
        query = query.lte('created_at', filters.end_date);
      }

      const { data: history, error } = await query
        .order('created_at', { ascending: false });

      if (error) {
        logger.error('Error fetching AI generation history:', error);
        throw new Error('Failed to fetch generation history');
      }

      return history || [];
    } catch (error) {
      logger.error('Get generation history error:', error);
      throw error;
    }
  }

  /**
   * Get AI usage statistics
   */
  async getAIUsageStats(userId, timeRange = '30d') {
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

      const { data: logs, error } = await this.supabase
        .from('ai_generation_logs')
        .select('status, tokens_used, cost, created_at')
        .eq('user_id', userId)
        .gte('created_at', startDate.toISOString());

      if (error) {
        logger.error('Error fetching AI usage stats:', error);
        throw new Error('Failed to fetch AI usage statistics');
      }

      const stats = {
        total_generations: logs.length,
        successful: logs.filter(log => log.status === 'completed').length,
        failed: logs.filter(log => log.status === 'failed').length,
        total_tokens: logs.reduce((sum, log) => sum + (log.tokens_used || 0), 0),
        total_cost: logs.reduce((sum, log) => sum + (log.cost || 0), 0),
        average_tokens: logs.length > 0 ? logs.reduce((sum, log) => sum + (log.tokens_used || 0), 0) / logs.length : 0,
        timeRange
      };

      return stats;
    } catch (error) {
      logger.error('Get AI usage stats error:', error);
      throw error;
    }
  }

  /**
   * Build enhanced prompt with context
   */
  buildEnhancedPrompt(basePrompt, context) {
    let enhancedPrompt = basePrompt + '\n\n';

    if (context.content_type) {
      enhancedPrompt += `Content Type: ${context.content_type}\n`;
    }
    if (context.platform) {
      enhancedPrompt += `Platform: ${context.platform}\n`;
    }
    if (context.tone) {
      enhancedPrompt += `Tone: ${context.tone}\n`;
    }
    if (context.length) {
      enhancedPrompt += `Length: ${context.length}\n`;
    }
    if (context.target_audience) {
      enhancedPrompt += `Target Audience: ${context.target_audience}\n`;
    }
    if (context.campaign_context) {
      enhancedPrompt += `Campaign Context: ${context.campaign_context}\n`;
    }

    enhancedPrompt += '\nPlease ensure the content is optimized for the specified platform and follows best practices for engagement and conversion.';

    return enhancedPrompt;
  }

  /**
   * Get max tokens based on length preference
   */
  getMaxTokens(length) {
    switch (length) {
      case 'short':
        return 150;
      case 'medium':
        return 300;
      case 'long':
        return 600;
      case 'extended':
        return 1000;
      default:
        return 300;
    }
  }

  /**
   * Calculate cost based on tokens used
   */
  calculateCost(tokens) {
    // GPT-4 pricing: $0.03 per 1K input tokens, $0.06 per 1K output tokens
    // This is a simplified calculation
    const costPer1KTokens = 0.045; // Average of input/output
    return (tokens / 1000) * costPer1KTokens;
  }

  /**
   * Generate hashtag recommendations
   */
  async generateHashtags(content, platform, userId) {
    try {
      const prompt = `Generate relevant hashtags for this ${platform} content:
Content: ${content}

Provide:
1. 5-10 relevant hashtags
2. Mix of popular and niche hashtags
3. Platform-specific optimization
4. Trending hashtag suggestions if applicable

Format as a simple list.`;

      const result = await this.generateContent(prompt, userId, {
        content_type: 'hashtags',
        length: 'short',
        tone: 'informative'
      });

      return result;
    } catch (error) {
      logger.error('Generate hashtags error:', error);
      throw error;
    }
  }

  /**
   * Generate A/B testing variations
   */
  async generateABTestingVariations(contentId, userId, variationCount = 3) {
    try {
      const { data: content } = await this.supabase
        .from('content')
        .select('*')
        .eq('id', contentId)
        .eq('user_id', userId)
        .single();

      if (!content) {
        throw new Error('Content not found or access denied');
      }

      const prompt = `Create ${variationCount} A/B testing variations for this content:
Original Title: ${content.title}
Original Content: ${content.content_text}
Platform: ${content.platform}
Content Type: ${content.content_type}

For each variation, provide:
1. Alternative title
2. Alternative content
3. What you're testing (headline, CTA, tone, etc.)
4. Expected impact

Make each variation distinctly different to get meaningful test results.`;

      const result = await this.generateContent(prompt, userId, {
        content_type: 'ab_testing',
        length: 'long',
        tone: 'analytical'
      });

      return result;
    } catch (error) {
      logger.error('Generate A/B testing variations error:', error);
      throw error;
    }
  }
}

export default new AIAgentService();
