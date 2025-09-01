import { useState } from 'react';
import { AI_TEMPLATES } from '../AITemplates';

// Mock data for specific Q&A responses
const MOCK_RESPONSES = {
  "which platforms should i focus on": `🎯 **Platform Selection Strategy** - Here's how to choose the right platforms for your business:

**📊 Audience Analysis First:**
• **Facebook**: 2.9B+ users, ages 25-65+, great for broad reach and community building
• **Instagram**: 2B+ users, ages 18-34, perfect for visual storytelling and brand awareness  
• **LinkedIn**: 900M+ users, B2B professionals, ideal for thought leadership and networking
• **TikTok**: 1B+ users, ages 13-35, excellent for viral content and Gen Z engagement
• **YouTube**: 2.5B+ users, all ages, best for educational content and long-form video

**🎯 Choose Based on Your Goals:**

**For Brand Awareness:**
• Instagram (visual appeal) + TikTok (viral potential) + Facebook (broad reach)

**For Lead Generation:**
• LinkedIn (B2B) + Facebook (detailed targeting) + Instagram (engagement)

**For E-commerce Sales:**
• Instagram (shopping features) + Facebook (conversion ads) + TikTok (trending products)

**For B2B Marketing:**
• LinkedIn (professional audience) + Facebook (supplementary reach)

**💡 Pro Tips:**
• Start with 2-3 platforms maximum to maintain quality
• Focus on platforms where your target audience is most active
• Consider your content creation capacity and resources
• Test performance on each platform before scaling up
• Use platform-specific features (Stories, Reels, LinkedIn Articles)

**📈 Recommended Starting Mix:**
• **B2C Businesses**: Instagram + Facebook + TikTok
• **B2B Services**: LinkedIn + Facebook + Instagram
• **E-commerce**: Instagram + Facebook + YouTube
• **Local Businesses**: Facebook + Instagram + Google My Business

Remember: It's better to excel on 2-3 platforms than to be mediocre on 5-6!`,

  "how can i improve my campaign performance": `📊 **Campaign Performance Optimization Guide** - Here are proven strategies to boost your results:

**🎯 Key Performance Metrics to Track:**
• **Reach & Impressions**: Track how many people see your content
• **Engagement Rate**: Measure likes, comments, shares, and clicks
• **Conversion Rate**: Monitor desired actions (purchases, sign-ups)
• **ROAS (Return on Ad Spend)**: Calculate revenue per dollar spent
• **Click-Through Rate (CTR)**: Measure ad effectiveness

**🚀 Optimization Strategies:**

**1. Audience Targeting:**
• Refine demographics based on performance data
• Look for patterns in who's engaging most
• Use lookalike audiences for better reach
• Test different interest combinations

**2. Ad Creative Optimization:**
• A/B test different images and videos
• Test various headlines and CTAs
• Use platform-specific formats (Stories, Reels, etc.)
• Keep testing until you find winners

**3. Timing & Frequency:**
• Post when your audience is most active
• Use platform analytics for peak times
• Avoid over-posting (quality over quantity)
• Consider time zones for global audiences

**4. Budget Allocation:**
• Shift budget to top-performing campaigns
• Don't be afraid to pause underperforming ads
• Increase spend on winners gradually (20-30% at a time)
• Set aside 10-20% for testing new strategies

**5. A/B Testing Framework:**
• Test one variable at a time
• Run tests for at least 7-14 days
• Use statistical significance for decisions
• Document what works for future campaigns

**💡 Pro Tips:**
• Monitor performance daily for the first week
• Set up automated rules for optimization
• Use retargeting to reach warm audiences
• Always have a clear goal and success metrics

Remember: Optimization is an ongoing process, not a one-time fix!`,

  "what's the best budget allocation strategy": `💰 **Strategic Budget Allocation Guide** - Here's how to maximize your marketing ROI:

**📊 Budget Planning Framework:**

**1. Start Small & Scale:**
• Begin with $500-1000 to test performance
• Understand what works before scaling up
• Test across different platforms and formats
• Document learnings for future campaigns

**2. Track Key Metrics:**
• **ROAS (Return on Ad Spend)**: Revenue ÷ Ad Spend
• **CPA (Cost Per Acquisition)**: Ad Spend ÷ Conversions
• **CPC (Cost Per Click)**: Ad Spend ÷ Clicks
• **CTR (Click-Through Rate)**: Clicks ÷ Impressions

**3. Smart Allocation Strategy:**

**By Platform Performance:**
• Allocate 60-70% to top-performing platforms
• Use 20-30% for testing new channels
• Reserve 10% for experimental campaigns

**By Campaign Type:**
• **Awareness**: 30-40% of budget
• **Consideration**: 40-50% of budget
• **Conversion**: 20-30% of budget

**By Ad Format:**
• Video ads: 40-50% (highest engagement)
• Image ads: 30-40% (cost-effective)
• Story/Reel ads: 20-30% (trending formats)

**4. Seasonal Budget Planning:**
• **Q4 (Holiday Season)**: Increase budget by 50-100%
• **Q1 (New Year)**: Focus on brand awareness
• **Q2-Q3**: Balanced approach with testing

**5. Scaling Guidelines:**
• Increase budget by 20-30% increments
• Monitor performance for 3-7 days after changes
• Scale winners, pause losers
• Never double spend overnight

**💡 Pro Tips:**
• Set daily and lifetime budget caps
• Use automated bidding for efficiency
• Consider lifetime value (LTV) in calculations
• Always have a clear goal before spending

**📈 Sample Budget Allocation:**
• **Facebook**: 40% ($2,000 of $5,000)
• **Instagram**: 30% ($1,500 of $5,000)
• **LinkedIn**: 20% ($1,000 of $5,000)
• **Testing**: 10% ($500 of $5,000)

Remember: It's better to start small and scale up than to overspend on unproven strategies!`,

  "default": `I'm here to help with your marketing and campaign questions! I can provide guidance on:

📊 **Performance metrics and analytics** - Understanding what to track and how to interpret your data
🎯 **Campaign optimization strategies** - Proven techniques to improve your results
📱 **Platform-specific best practices** - How to maximize your presence on each social media platform
💰 **Budget planning and allocation** - Strategic approaches to spending your marketing budget effectively
🚀 **Campaign planning and execution** - Step-by-step guidance for creating successful campaigns

Just ask me about any of these topics, or if you're ready to create a new campaign, say "plan a campaign" and I'll guide you through the entire process from brief to launch!

What would you like to know more about?`
};

// Function to find the best matching response
const findMockResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for exact matches first
  for (const [key, response] of Object.entries(MOCK_RESPONSES)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  // Check for partial matches
  const partialMatches = {
    "platform": MOCK_RESPONSES["which platforms should i focus on"],
    "performance": MOCK_RESPONSES["how can i improve my campaign performance"],
    "budget": MOCK_RESPONSES["what's the best budget allocation strategy"]
  };
  
  for (const [key, response] of Object.entries(partialMatches)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  // Return default response if no match found
  return MOCK_RESPONSES["default"];
};

// Mock data for specific Q&A responses
const MOCK_RESPONSES = {
  // Platform-specific questions
  "which platforms should i focus on": `🎯 **Platform Selection Strategy** - Here's how to choose the right platforms for your business:

**📊 Audience Analysis First:**
• **Facebook**: 2.9B+ users, ages 25-65+, great for broad reach and community building
• **Instagram**: 2B+ users, ages 18-34, perfect for visual storytelling and brand awareness  
• **LinkedIn**: 900M+ users, B2B professionals, ideal for thought leadership and networking
• **TikTok**: 1B+ users, ages 13-35, excellent for viral content and Gen Z engagement
• **YouTube**: 2.5B+ users, all ages, best for educational content and long-form video

**🎯 Choose Based on Your Goals:**

**For Brand Awareness:**
• Instagram (visual appeal) + TikTok (viral potential) + Facebook (broad reach)

**For Lead Generation:**
• LinkedIn (B2B) + Facebook (detailed targeting) + Instagram (engagement)

**For E-commerce Sales:**
• Instagram (shopping features) + Facebook (conversion ads) + TikTok (trending products)

**For B2B Marketing:**
• LinkedIn (professional audience) + Facebook (supplementary reach)

**💡 Pro Tips:**
• Start with 2-3 platforms maximum to maintain quality
• Focus on platforms where your target audience is most active
• Consider your content creation capacity and resources
• Test performance on each platform before scaling up
• Use platform-specific features (Stories, Reels, LinkedIn Articles)

**📈 Recommended Starting Mix:**
• **B2C Businesses**: Instagram + Facebook + TikTok
• **B2B Services**: LinkedIn + Facebook + Instagram
• **E-commerce**: Instagram + Facebook + YouTube
• **Local Businesses**: Facebook + Instagram + Google My Business

Remember: It's better to excel on 2-3 platforms than to be mediocre on 5-6!`,

  // Performance questions
  "how can i improve my campaign performance": `📊 **Campaign Performance Optimization Guide** - Here are proven strategies to boost your results:

**🎯 Key Performance Metrics to Track:**
• **Reach & Impressions**: Track how many people see your content
• **Engagement Rate**: Measure likes, comments, shares, and clicks
• **Conversion Rate**: Monitor desired actions (purchases, sign-ups)
• **ROAS (Return on Ad Spend)**: Calculate revenue per dollar spent
• **Click-Through Rate (CTR)**: Measure ad effectiveness

**🚀 Optimization Strategies:**

**1. Audience Targeting:**
• Refine demographics based on performance data
• Look for patterns in who's engaging most
• Use lookalike audiences for better reach
• Test different interest combinations

**2. Ad Creative Optimization:**
• A/B test different images and videos
• Test various headlines and CTAs
• Use platform-specific formats (Stories, Reels, etc.)
• Keep testing until you find winners

**3. Timing & Frequency:**
• Post when your audience is most active
• Use platform analytics for peak times
• Avoid over-posting (quality over quantity)
• Consider time zones for global audiences

**4. Budget Allocation:**
• Shift budget to top-performing campaigns
• Don't be afraid to pause underperforming ads
• Increase spend on winners gradually (20-30% at a time)
• Set aside 10-20% for testing new strategies

**5. A/B Testing Framework:**
• Test one variable at a time
• Run tests for at least 7-14 days
• Use statistical significance for decisions
• Document what works for future campaigns

**💡 Pro Tips:**
• Monitor performance daily for the first week
• Set up automated rules for optimization
• Use retargeting to reach warm audiences
• Always have a clear goal and success metrics

Remember: Optimization is an ongoing process, not a one-time fix!`,

  // Budget questions
  "what's the best budget allocation strategy": `💰 **Strategic Budget Allocation Guide** - Here's how to maximize your marketing ROI:

**📊 Budget Planning Framework:**

**1. Start Small & Scale:**
• Begin with $500-1000 to test performance
• Understand what works before scaling up
• Test across different platforms and formats
• Document learnings for future campaigns

**2. Track Key Metrics:**
• **ROAS (Return on Ad Spend)**: Revenue ÷ Ad Spend
• **CPA (Cost Per Acquisition)**: Ad Spend ÷ Conversions
• **CPC (Cost Per Click)**: Ad Spend ÷ Clicks
• **CTR (Click-Through Rate)**: Clicks ÷ Impressions

**3. Smart Allocation Strategy:**

**By Platform Performance:**
• Allocate 60-70% to top-performing platforms
• Use 20-30% for testing new channels
• Reserve 10% for experimental campaigns

**By Campaign Type:**
• **Awareness**: 30-40% of budget
• **Consideration**: 40-50% of budget
• **Conversion**: 20-30% of budget

**By Ad Format:**
• Video ads: 40-50% (highest engagement)
• Image ads: 30-40% (cost-effective)
• Story/Reel ads: 20-30% (trending formats)

**4. Seasonal Budget Planning:**
• **Q4 (Holiday Season)**: Increase budget by 50-100%
• **Q1 (New Year)**: Focus on brand awareness
• **Q2-Q3**: Balanced approach with testing

**5. Scaling Guidelines:**
• Increase budget by 20-30% increments
• Monitor performance for 3-7 days after changes
• Scale winners, pause losers
• Never double spend overnight

**💡 Pro Tips:**
• Set daily and lifetime budget caps
• Use automated bidding for efficiency
• Consider lifetime value (LTV) in calculations
• Always have a clear goal before spending

**📈 Sample Budget Allocation:**
• **Facebook**: 40% ($2,000 of $5,000)
• **Instagram**: 30% ($1,500 of $5,000)
• **LinkedIn**: 20% ($1,000 of $5,000)
• **Testing**: 10% ($500 of $5,000)

Remember: It's better to start small and scale up than to overspend on unproven strategies!`,

  // Marketing strategy questions
  "what marketing strategy should i use": `🎯 **Comprehensive Marketing Strategy Guide** - Here's how to build a winning marketing approach:

**📋 Strategy Development Framework:**

**1. Define Clear Goals (SMART):**
• **Specific**: "Increase brand awareness by 25%"
• **Measurable**: "Generate 100 new leads per month"
• **Achievable**: Realistic targets based on resources
• **Relevant**: Aligned with business objectives
• **Time-bound**: "Within 3 months"

**2. Know Your Audience:**
• Create detailed buyer personas
• Understand pain points and motivations
• Research preferred communication channels
• Analyze competitor audiences
• Use data to refine targeting

**3. Choose Your Marketing Mix:**

**Digital Marketing Channels:**
• **Social Media**: Brand awareness and engagement
• **Search Engine Marketing**: Lead generation
• **Email Marketing**: Nurturing and conversions
• **Content Marketing**: Thought leadership
• **Influencer Marketing**: Authentic reach

**Traditional Channels:**
• **Print Media**: Local targeting
• **Radio/TV**: Mass awareness
• **Events**: Direct engagement
• **PR**: Credibility building

**4. Content Strategy:**
• **Educational Content**: Build trust and authority
• **Entertainment Content**: Increase engagement
• **Promotional Content**: Drive conversions
• **User-Generated Content**: Authenticity

**5. Campaign Planning:**
• **Awareness Stage**: Focus on reach and visibility
• **Consideration Stage**: Provide value and education
• **Decision Stage**: Offer solutions and incentives
• **Retention Stage**: Build loyalty and advocacy

**💡 Pro Tips:**
• Consistency is key across all channels
• Test and optimize continuously
• Focus on customer lifetime value
• Build long-term relationships
• Monitor and adapt to trends

**📊 Success Metrics:**
• Brand awareness and recognition
• Website traffic and engagement
• Lead generation and quality
• Conversion rates and sales
• Customer retention and loyalty

Remember: The best strategy is one that's tailored to your specific business, audience, and goals!`,

  // Facebook specific
  "how to advertise on facebook": `📘 **Facebook Advertising Complete Guide** - Master Facebook ads for maximum results:

**🎯 Facebook Ad Types & Best Uses:**

**1. Awareness Campaigns:**
• **Brand Awareness**: Increase brand recognition
• **Reach**: Maximize impressions
• Best for: New businesses, product launches
• Budget: $5-20 per day minimum

**2. Consideration Campaigns:**
• **Traffic**: Drive website visits
• **Engagement**: Increase interactions
• **App Installs**: Mobile app promotion
• **Video Views**: Video content promotion
• Best for: Building audience, content promotion

**3. Conversion Campaigns:**
• **Conversions**: Drive specific actions
• **Catalog Sales**: E-commerce product sales
• **Store Traffic**: Physical store visits
• **Lead Generation**: Collect contact information
• Best for: Sales, lead generation

**📊 Targeting Options:**

**Demographics:**
• Age: 18-65+ (Facebook's core audience)
• Gender: Male, Female, All
• Location: Countries, cities, radius targeting
• Language: Primary language preferences

**Interests & Behaviors:**
• **Interests**: Hobbies, activities, pages they like
• **Behaviors**: Purchase behavior, device usage
• **Life Events**: Recent moves, engagements, etc.
• **Connections**: Friends of people who like your page

**Custom Audiences:**
• **Website Visitors**: Retarget people who visited your site
• **Email Lists**: Target existing customers
• **Lookalike Audiences**: Find similar people to your best customers
• **Engagement**: Target people who engaged with your content

**💰 Budget & Bidding:**

**Budget Types:**
• **Daily Budget**: Maximum spend per day
• **Lifetime Budget**: Total spend for campaign duration

**Bidding Strategies:**
• **Lowest Cost**: Automatic optimization
• **Cost Cap**: Set maximum cost per result
• **Bid Cap**: Manual bid control
• **Target Cost**: Aim for specific cost per result

**📱 Ad Formats:**

**Image Ads:**
• Single image with text overlay
• Best for: Simple messaging, product showcases
• Size: 1,200 x 628 pixels (1.91:1 ratio)

**Video Ads:**
• 15 seconds to 240 minutes
• Best for: Storytelling, product demos
• Formats: Feed, Stories, Reels

**Carousel Ads:**
• Multiple images/videos in one ad
• Best for: Multiple products, step-by-step processes
• Up to 10 cards per carousel

**Collection Ads:**
• Instant experience with product catalog
• Best for: E-commerce, product discovery
• Mobile-optimized experience

**💡 Pro Tips:**
• Start with broad targeting, then narrow down
• Use high-quality images and videos
• Test different ad formats
• Monitor frequency (avoid ad fatigue)
• Use Facebook Pixel for better tracking
• A/B test everything: creative, copy, targeting

**📈 Optimization Checklist:**
• Set up Facebook Pixel
• Create custom audiences
• Use automatic placements initially
• Monitor frequency and reach
• Test different creative formats
• Optimize for your specific goal

Remember: Facebook advertising is about testing, learning, and optimizing continuously!`,

  // Instagram specific
  "how to advertise on instagram": `📷 **Instagram Advertising Master Guide** - Leverage Instagram's visual power:

**🎯 Instagram Ad Types & Strategies:**

**1. Feed Ads:**
• **Image Ads**: High-quality photos with compelling captions
• **Video Ads**: 3-60 seconds, vertical format preferred
• **Carousel Ads**: Up to 10 images/videos in one ad
• **Collection Ads**: Product catalog with instant shopping

**2. Story Ads:**
• **Photo Stories**: Full-screen vertical images
• **Video Stories**: 15 seconds maximum
• **Story Polls**: Interactive engagement
• **Story Stickers**: Location, hashtag, mention stickers

**3. Reels Ads:**
• **Reels Feed Ads**: Appear in Reels feed
• **Reels Explore Ads**: Appear in Explore tab
• **Reels Stories Ads**: Appear in Stories
• Duration: 5-60 seconds, vertical format

**4. Explore Ads:**
• **Explore Feed Ads**: Appear in Explore grid
• **Explore Stories Ads**: Appear in Explore Stories
• Best for: Discovery and new audience reach

**📊 Targeting Options:**

**Demographics:**
• Age: 13-65+ (Instagram's user base)
• Gender: Male, Female, All
• Location: Countries, cities, radius targeting
• Language: Primary language preferences

**Interests & Behaviors:**
• **Interests**: Fashion, beauty, travel, fitness, etc.
• **Behaviors**: Shopping behavior, device usage
• **Life Events**: Recent purchases, life changes
• **Connections**: Followers of specific accounts

**Custom Audiences:**
• **Website Visitors**: Retarget site visitors
• **Email Lists**: Target existing customers
• **Lookalike Audiences**: Find similar users
• **Engagement**: Target people who engaged with your content

**💰 Budget & Bidding:**

**Budget Recommendations:**
• **Minimum Daily Budget**: $5-10
• **Recommended Starting Budget**: $20-50 per day
• **Scaling Budget**: Increase by 20-30% increments

**Bidding Strategies:**
• **Lowest Cost**: Automatic optimization
• **Cost Cap**: Set maximum cost per result
• **Bid Cap**: Manual bid control
• **Target Cost**: Aim for specific cost per result

**📱 Ad Format Specifications:**

**Feed Ads:**
• **Image**: 1,080 x 1,080 pixels (1:1 ratio)
• **Video**: 1,080 x 1,080 pixels, 3-60 seconds
• **Carousel**: 1,080 x 1,080 pixels per image

**Story Ads:**
• **Image/Video**: 1,080 x 1,920 pixels (9:16 ratio)
• **Video Duration**: 15 seconds maximum
• **Interactive Elements**: Polls, questions, sliders

**Reels Ads:**
• **Video**: 1,080 x 1,920 pixels (9:16 ratio)
• **Duration**: 5-60 seconds
• **Audio**: Include trending music or original audio

**💡 Pro Tips:**

**Creative Best Practices:**
• Use high-quality, visually appealing content
• Keep text overlay minimal (less than 20% of image)
• Use bright, vibrant colors
• Include people in your ads when possible
• Test different creative styles

**Content Strategy:**
• Post consistently (1-2 times per day)
• Use relevant hashtags (up to 30 per post)
• Engage with your audience in comments
• Use Instagram Stories for behind-the-scenes content
• Collaborate with influencers for authentic reach

**Optimization Tips:**
• Monitor engagement rates (aim for 3-5%+)
• Track click-through rates (aim for 1-3%+)
• Test different ad formats
• Use Instagram Insights for performance data
• Optimize for your specific goal (awareness, consideration, conversion)

**📈 Performance Metrics:**
• **Reach**: Number of unique users who saw your ad
• **Impressions**: Total number of times your ad was shown
• **Engagement Rate**: Likes, comments, shares, saves
• **Click-Through Rate**: Clicks ÷ Impressions
• **Conversion Rate**: Conversions ÷ Clicks
• **Cost Per Result**: Ad spend ÷ Results

**🎨 Creative Examples:**

**Fashion Brand:**
• High-quality product photos
• Lifestyle shots with models
• Behind-the-scenes content
• User-generated content

**Food & Beverage:**
• Mouth-watering food photos
• Preparation process videos
• Customer testimonials
• Seasonal promotions

**Fitness & Wellness:**
• Before/after transformations
• Workout videos
• Motivational content
• Community engagement

Remember: Instagram is all about visual storytelling and authentic engagement!`,

  // LinkedIn specific
  "how to advertise on linkedin": `💼 **LinkedIn Advertising Complete Guide** - Target professionals effectively:

**🎯 LinkedIn Ad Types & Best Uses:**

**1. Sponsored Content:**
• **Single Image**: Professional images with compelling copy
• **Video**: Educational or thought leadership content
• **Carousel**: Multiple images for detailed information
• **Event**: Promote webinars, conferences, events
• Best for: Brand awareness, thought leadership

**2. Message Ads:**
• **Sponsored InMail**: Direct messages to LinkedIn inbox
• **Conversation Ads**: Interactive message experiences
• Best for: Lead generation, event promotion
• Character limit: 1,300 characters

**3. Dynamic Ads:**
• **Follower Ads**: Promote your company page
• **Spotlight Ads**: Showcase specific company information
• **Job Ads**: Promote job openings
• Best for: Company page growth, recruitment

**📊 Targeting Options:**

**Professional Demographics:**
• **Job Titles**: CEO, Manager, Director, etc.
• **Job Functions**: Marketing, Sales, Engineering, etc.
• **Job Seniority**: Entry, Senior, Manager, Director, VP, C-level
• **Company Size**: 1-10, 11-50, 51-200, 201-500, 500+ employees
• **Company Industry**: Technology, Healthcare, Finance, etc.

**Geographic Targeting:**
• **Countries**: Global or specific countries
• **Regions/States**: Specific geographic areas
• **Cities**: Major metropolitan areas
• **Radius Targeting**: Within specific miles of location

**Professional Interests:**
• **Member Groups**: LinkedIn groups they've joined
• **Member Interests**: Professional interests and activities
• **Skills**: Professional skills listed on profiles
• **Degrees**: Educational background

**Custom Audiences:**
• **Website Retargeting**: Target website visitors
• **Contact Lists**: Upload email addresses
• **Account Lists**: Target specific companies
• **Lookalike Audiences**: Find similar professionals

**💰 Budget & Bidding:**

**Budget Recommendations:**
• **Minimum Daily Budget**: $10-20
• **Recommended Starting Budget**: $50-100 per day
• **B2B Campaigns**: Higher budgets due to longer sales cycles

**Bidding Strategies:**
• **Lowest Cost**: Automatic optimization
• **Cost Cap**: Set maximum cost per result
• **Bid Cap**: Manual bid control
• **Target Cost**: Aim for specific cost per result

**📱 Ad Format Specifications:**

**Sponsored Content:**
• **Image**: 1,200 x 627 pixels (1.91:1 ratio)
• **Video**: 3 seconds to 10 minutes
• **Carousel**: 1,200 x 627 pixels per image
• **Text Limit**: 150 characters for headline, 600 for description

**Message Ads:**
• **Subject Line**: 60 characters maximum
• **Message Body**: 1,300 characters maximum
• **Call-to-Action**: Customizable buttons

**💡 Pro Tips:**

**Content Strategy:**
• Focus on professional value and insights
• Use thought leadership content
• Include industry-specific terminology
• Share case studies and success stories
• Provide educational content

**Targeting Best Practices:**
• Start with broad targeting, then narrow down
• Use job titles and functions for precise targeting
• Target decision-makers in your industry
• Use company size to match your ideal customer profile
• Test different targeting combinations

**Creative Guidelines:**
• Use professional, high-quality images
• Include people in business settings
• Use clear, professional typography
• Keep text overlay minimal
• Use LinkedIn's brand colors when appropriate

**Optimization Tips:**
• Monitor engagement rates (aim for 2-5%+)
• Track click-through rates (aim for 0.5-2%+)
• Test different ad formats
• Use LinkedIn Campaign Manager for detailed analytics
• Optimize for your specific goal

**📈 Performance Metrics:**
• **Reach**: Number of unique professionals reached
• **Impressions**: Total number of ad views
• **Engagement Rate**: Likes, comments, shares
• **Click-Through Rate**: Clicks ÷ Impressions
• **Conversion Rate**: Conversions ÷ Clicks
• **Cost Per Lead**: Ad spend ÷ Leads generated

**🎯 Industry-Specific Examples:**

**B2B Software:**
• Product demos and case studies
• Industry insights and trends
• Customer testimonials
• Free trial promotions

**Professional Services:**
• Thought leadership articles
• Industry expertise content
• Client success stories
• Service offerings

**Recruitment:**
• Company culture content
• Job opportunity highlights
• Employee testimonials
• Career development content

**📊 Campaign Examples:**

**Brand Awareness:**
• Thought leadership content
• Industry insights
• Company culture posts
• Educational content

**Lead Generation:**
• Webinar promotions
• Whitepaper downloads
• Free consultations
• Product demos

**Event Promotion:**
• Conference announcements
• Webinar registrations
• Networking event invites
• Industry meetups

Remember: LinkedIn is about building professional relationships and providing value to your target audience!`,

  // TikTok specific
  "how to advertise on tiktok": `🎵 **TikTok Advertising Master Guide** - Tap into viral potential:

**🎯 TikTok Ad Types & Strategies:**

**1. In-Feed Ads:**
• **Image Ads**: Static images with music overlay
• **Video Ads**: 5-60 seconds, vertical format
• **Spark Ads**: Boost existing organic content
• **Collection Ads**: Product catalog with shopping features
• Best for: Brand awareness, app installs, conversions

**2. TopView Ads:**
• **Video Ads**: Full-screen, sound-on experience
• **Duration**: 5-60 seconds
• **Placement**: First ad users see when opening app
• Best for: Maximum visibility and impact

**3. Branded Hashtag Challenges:**
• **Custom Hashtag**: Create branded challenge
• **User-Generated Content**: Encourage participation
• **Prize Incentives**: Offer rewards for participation
• Best for: Viral reach and engagement

**4. Branded Effects:**
• **Custom Filters**: Create branded AR effects
• **Interactive Elements**: Engage users with effects
• **Brand Integration**: Subtle brand placement
• Best for: Brand awareness and engagement

**📊 Targeting Options:**

**Demographics:**
• Age: 13-65+ (TikTok's expanding user base)
• Gender: Male, Female, All
• Location: Countries, cities, radius targeting
• Language: Primary language preferences

**Interests & Behaviors:**
• **Interests**: Music, dance, comedy, beauty, gaming, etc.
• **Behaviors**: App usage, purchase behavior
• **Life Events**: Recent purchases, life changes
• **Connections**: Followers of specific accounts

**Custom Audiences:**
• **Website Visitors**: Retarget site visitors
• **Email Lists**: Target existing customers
• **Lookalike Audiences**: Find similar users
• **Engagement**: Target people who engaged with your content

**💰 Budget & Bidding:**

**Budget Recommendations:**
• **Minimum Daily Budget**: $20-50
• **Recommended Starting Budget**: $100-500 per day
• **Viral Campaigns**: Higher budgets for maximum reach

**Bidding Strategies:**
• **Lowest Cost**: Automatic optimization
• **Cost Cap**: Set maximum cost per result
• **Bid Cap**: Manual bid control
• **Target Cost**: Aim for specific cost per result

**📱 Ad Format Specifications:**

**In-Feed Ads:**
• **Video**: 1,080 x 1,920 pixels (9:16 ratio)
• **Duration**: 5-60 seconds
• **Audio**: Include trending music or original audio
• **Text Overlay**: Keep minimal for better performance

**TopView Ads:**
• **Video**: 1,080 x 1,920 pixels (9:16 ratio)
• **Duration**: 5-60 seconds
• **Auto-play**: Sound-on by default
• **Skip Option**: Users can skip after 6 seconds

**💡 Pro Tips:**

**Creative Best Practices:**
• Use trending music and sounds
• Create authentic, relatable content
• Keep videos short and engaging (15-30 seconds)
• Use bright colors and dynamic visuals
• Include people in your ads
• Test different creative styles

**Content Strategy:**
• Follow current trends and challenges
• Use popular hashtags strategically
• Create content that fits TikTok's culture
• Engage with your audience in comments
• Collaborate with TikTok creators

**Optimization Tips:**
• Monitor engagement rates (aim for 5-10%+)
• Track video completion rates (aim for 70%+)
• Test different ad formats and creative
• Use TikTok Pixel for better tracking
• Optimize for your specific goal

**📈 Performance Metrics:**
• **Reach**: Number of unique users reached
• **Impressions**: Total number of ad views
• **Video Views**: Number of video completions
• **Engagement Rate**: Likes, comments, shares
• **Click-Through Rate**: Clicks ÷ Impressions
• **Conversion Rate**: Conversions ÷ Clicks

**🎨 Creative Examples:**

**Fashion & Beauty:**
• Product demonstrations
• Before/after transformations
• Styling tips and tutorials
• User-generated content

**Food & Beverage:**
• Recipe videos and cooking tips
• Product taste tests
• Behind-the-scenes content
• Customer testimonials

**Fitness & Wellness:**
• Workout videos and challenges
• Transformation stories
• Motivational content
• Community engagement

**📊 Campaign Examples:**

**Brand Awareness:**
• Trending challenge participation
• Influencer collaborations
• Behind-the-scenes content
• Brand storytelling

**App Installs:**
• App demonstration videos
• User testimonials
• Feature highlights
• Download incentives

**E-commerce Sales:**
• Product showcases
• User-generated reviews
• Limited-time offers
• Shopping features

**🎵 Music & Audio Tips:**
• Use trending songs and sounds
• Create original audio for brand recognition
• Test different music genres
• Ensure audio matches your brand voice
• Use TikTok's music library for compliance

**📱 Platform-Specific Features:**
• **Duets**: Collaborate with other creators
• **Stitches**: Respond to other videos
• **Effects**: Use AR filters and effects
• **Live Streaming**: Real-time engagement
• **Shopping**: Direct product links

Remember: TikTok is about creativity, authenticity, and being part of the community!`,

  // YouTube specific
  "how to advertise on youtube": `📺 **YouTube Advertising Complete Guide** - Reach billions of viewers:

**🎯 YouTube Ad Types & Strategies:**

**1. Skippable In-Stream Ads:**
• **Video Ads**: 12 seconds to 6 minutes
• **Skip Option**: Users can skip after 5 seconds
• **Placement**: Before, during, or after videos
• Best for: Brand awareness, consideration, conversions

**2. Non-Skippable In-Stream Ads:**
• **Video Ads**: 15-20 seconds maximum
• **No Skip Option**: Guaranteed view time
• **Placement**: Before, during, or after videos
• Best for: Brand awareness, message delivery

**3. Bumper Ads:**
• **Video Ads**: 6 seconds maximum
• **No Skip Option**: Short, impactful messages
• **Placement**: Before, during, or after videos
• Best for: Brand awareness, message reinforcement

**4. Display Ads:**
• **Image Ads**: Static images with text overlay
• **Overlay Ads**: Semi-transparent overlays
• **Placement**: Next to videos, search results
• Best for: Brand awareness, website traffic

**5. Video Discovery Ads:**
• **Thumbnail Ads**: Appear in search results and related videos
• **Custom Thumbnails**: Eye-catching images
• **Placement**: YouTube search and watch pages
• Best for: Brand awareness, video views

**📊 Targeting Options:**

**Demographics:**
• Age: 13-65+ (YouTube's global user base)
• Gender: Male, Female, All
• Location: Countries, cities, radius targeting
• Language: Primary language preferences
• Household Income: Affluence targeting

**Interests & Behaviors:**
• **Interests**: Hobbies, activities, topics they watch
• **Behaviors**: Purchase behavior, device usage
• **Life Events**: Recent purchases, life changes
• **Affinity Audiences**: Similar to TV audiences

**Custom Audiences:**
• **Website Retargeting**: Target website visitors
• **Email Lists**: Target existing customers
• **Video Remarketing**: Target video viewers
• **Lookalike Audiences**: Find similar users

**Content Targeting:**
• **Placements**: Specific videos, channels, websites
• **Topics**: Content categories and themes
• **Keywords**: Search terms and video content
• **Exclusions**: Avoid inappropriate content

**💰 Budget & Bidding:**

**Budget Recommendations:**
• **Minimum Daily Budget**: $10-20
• **Recommended Starting Budget**: $50-200 per day
• **Brand Awareness**: Higher budgets for reach
• **Performance**: Lower budgets for efficiency

**Bidding Strategies:**
• **Cost Per View (CPV)**: Pay per video view
• **Cost Per Thousand Impressions (CPM)**: Pay per 1,000 impressions
• **Cost Per Click (CPC)**: Pay per click
• **Target Cost Per Acquisition (tCPA)**: Automated bidding

**📱 Ad Format Specifications:**

**Skippable In-Stream:**
• **Video**: 12 seconds to 6 minutes
• **Aspect Ratio**: 16:9, 1:1, 9:16
• **Resolution**: 720p minimum, 1080p recommended
• **Audio**: Required for better performance

**Non-Skippable In-Stream:**
• **Video**: 15-20 seconds maximum
• **Aspect Ratio**: 16:9, 1:1, 9:16
• **Resolution**: 720p minimum
• **Audio**: Required

**Bumper Ads:**
• **Video**: 6 seconds maximum
• **Aspect Ratio**: 16:9, 1:1, 9:16
• **Resolution**: 720p minimum
• **Audio**: Required

**💡 Pro Tips:**

**Creative Best Practices:**
• Hook viewers in the first 5 seconds
• Use high-quality video and audio
• Include clear call-to-action
• Test different video lengths
• Use YouTube's brand guidelines

**Content Strategy:**
• Create educational or entertaining content
• Use storytelling to engage viewers
• Include product demonstrations
• Share customer testimonials
• Create series for ongoing engagement

**Optimization Tips:**
• Monitor view-through rates (aim for 70%+)
• Track click-through rates (aim for 1-3%+)
• Test different ad formats
• Use YouTube Analytics for insights
• Optimize for your specific goal

**📈 Performance Metrics:**
• **Views**: Number of video views
• **View-Through Rate**: Views ÷ Impressions
• **Click-Through Rate**: Clicks ÷ Impressions
• **Watch Time**: Total time spent watching
• **Engagement Rate**: Likes, comments, shares
• **Conversion Rate**: Conversions ÷ Clicks

**🎨 Creative Examples:**

**Product Demonstrations:**
• How-to videos and tutorials
• Product features and benefits
• Customer testimonials
• Behind-the-scenes content

**Brand Storytelling:**
• Company history and values
• Employee spotlights
• Community involvement
• Industry thought leadership

**Educational Content:**
• Industry insights and trends
• Expert interviews
• Webinar recordings
• Training and tutorials

**📊 Campaign Examples:**

**Brand Awareness:**
• Brand story videos
• Industry thought leadership
• Company culture content
• Community involvement

**Lead Generation:**
• Webinar promotions
• Whitepaper downloads
• Free consultations
• Product demos

**E-commerce Sales:**
• Product showcases
• Customer testimonials
• Limited-time offers
• Shopping features

**🎵 Audio & Music Tips:**
• Use high-quality audio
• Include background music
• Use voice-over for clarity
• Test different audio styles
• Follow YouTube's music policies

**📱 Platform-Specific Features:**
• **YouTube Shorts**: Short-form vertical videos
• **Live Streaming**: Real-time engagement
• **Community Posts**: Text and image updates
• **Memberships**: Exclusive content for subscribers
• **Merchandise**: Sell branded products

Remember: YouTube is about creating valuable, engaging content that resonates with your target audience!`,

  // Default response for unmatched queries
  "default": `I'm here to help with your marketing and campaign questions! I can provide guidance on:

📊 **Performance metrics and analytics** - Understanding what to track and how to interpret your data
🎯 **Campaign optimization strategies** - Proven techniques to improve your results
📱 **Platform-specific best practices** - How to maximize your presence on each social media platform
💰 **Budget planning and allocation** - Strategic approaches to spending your marketing budget effectively
🚀 **Campaign planning and execution** - Step-by-step guidance for creating successful campaigns

Just ask me about any of these topics, or if you're ready to create a new campaign, say "plan a campaign" and I'll guide you through the entire process from brief to launch!

What would you like to know more about?`
};

export const useAIAgent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState('welcome');
  const [campaignData, setCampaignData] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  
  // New mode state to track if we're in chat mode or action mode
  const [isActionMode, setIsActionMode] = useState(false);

  // New flow states
  const [briefData, setBriefData] = useState({});
  const [strategyCards, setStrategyCards] = useState([]);
  const [kanbanTasks, setKanbanTasks] = useState([]);
  const [scheduleData, setScheduleData] = useState([
    {
      id: 1,
      title: "Brand Video Launch",
      platform: "All Platforms",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "video"
    },
    {
      id: 2,
      title: "Social Post Series",
      platform: "Instagram",
      date: "2024-01-16",
      time: "2:00 PM",
      type: "post"
    },
    {
      id: 3,
      title: "LinkedIn Article",
      platform: "LinkedIn",
      date: "2024-01-17",
      time: "9:00 AM",
      type: "article"
    }
  ]);
  const [adsConfig, setAdsConfig] = useState({
    budget: {
      total: 5000,
      distribution: {
        facebook: 0.35,
        instagram: 0.30,
        linkedin: 0.20,
        tiktok: 0.15
      }
    },
    targeting: {
      ageRange: '25-45',
      interests: ['Technology', 'Business', 'Innovation'],
      location: 'United States',
      behavior: ['Engaged Shoppers', 'Business Decision Makers']
    }
  });
  const [kpiData, setKpiData] = useState({
    reach: 75000,
    impressions: 150000,
    clicks: 5000,
    conversions: 750,
    revenue: 15000,
    roas: 3.5,
    ctr: 3.33,
    cpa: 20,
    conversionRate: 15,
    budget: 5000
  });
  const [isLaunched, setIsLaunched] = useState(false);
  const [optimizationData, setOptimizationData] = useState({
    currentReach: "82,450",
    reachChange: 12.5,
    currentEngagement: "13.2%",
    engagementChange: 8.3,
    currentConversions: "647",
    conversionChange: 15.7,
    optimizationActions: [
      "Increased bid on high-performing ads",
      "Refined audience targeting",
      "Optimized ad creative rotation"
    ]
  });

  const simulateTyping = (message, delay = 2000) => {
    setIsTyping(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          content: message,
          isAgent: true,
          timestamp: new Date()
        }]);
        setIsTyping(false);
        resolve();
      }, delay);
    });
  };

  const addUserMessage = (message) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      content: message,
      isAgent: false,
      timestamp: new Date()
    }]);
  };

  // Function to detect if a message requires action mode (campaign planning/launching)
  const requiresActionMode = (message) => {
    const lowerMessage = message.toLowerCase();
    const actionKeywords = [
      'plan a campaign', 'launch a campaign', 'create a campaign', 'start a campaign', 
      'begin a campaign', 'setup a campaign', 'configure a campaign',
      'new campaign', 'create campaign', 'plan campaign', 'launch campaign',
      'set up campaign', 'get started with campaign', 'begin campaign', 'start campaign',
      'plan new', 'create new', 'launch new', 'start new', 'begin new',
      'plan my', 'create my', 'launch my', 'start my', 'begin my',
      'plan the', 'create the', 'launch the', 'start the', 'begin the'
    ];
    
    return actionKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      content: userMessage,
      isAgent: false,
      timestamp: new Date()
    }]);

    // Check if this message requires action mode
    if (requiresActionMode(userMessage) && !isActionMode) {
      setIsActionMode(true);
      setCurrentStep('welcome');
      // Don't call handleWelcomeMessage here - let the user go through BriefInput first
      return;
    }

    // If we're in action mode, handle step-based logic
    if (isActionMode) {
      if (currentStep === 'welcome') {
        await handleWelcomeMessage(userMessage);
      } else if (currentStep === 'strategy-cards') {
        await handleStrategyMessage(userMessage);
      } else if (currentStep === 'kanban-board') {
        await handleKanbanMessage(userMessage);
      } else if (currentStep === 'calendar-scheduling') {
        await handleCalendarMessage(userMessage);
      } else if (currentStep === 'ads-wizard') {
        await handleAdsMessage(userMessage);
      } else if (currentStep === 'kpi-preview') {
        await handleKPIMessage(userMessage);
      } else if (currentStep === 'optimization') {
        await handleOptimizationMessage(userMessage);
      }
    } else {
      // Chat mode - handle general questions
      await handleChatMessage(userMessage);
    }
  };

  const handleWelcomeMessage = async (briefText) => {
    // Start with a detailed thinking process
    await simulateTyping("🤔 Analyzing your campaign request...");
    await simulateTyping("📊 Researching market trends and competitor strategies in your industry...");
    await simulateTyping("🎯 Identifying your target audience and their behavior patterns...");
    await simulateTyping("💡 Generating strategic campaign approaches based on your goals...");
    await simulateTyping("📈 Evaluating platform performance data for optimal reach...");
    await simulateTyping("✨ Crafting personalized campaign strategies tailored to your needs...");
    await simulateTyping("✅ Based on my analysis, I've generated strategic campaign options for you to review.");
    
    // Generate strategy cards based on the AI recommendation from brief
    const strategies = [
      {
        id: 1,
        title: "Multi-Platform Awareness",
        description: "Build brand recognition across all major platforms with consistent messaging",
        platforms: ["Facebook", "Instagram", "LinkedIn"],
        budget: "$2,000",
        duration: "4 weeks",
        targetAudience: "Professionals aged 25-45",
        expectedReach: "50K-100K",
        expectedEngagement: "8-12%"
      },
      {
        id: 2,
        title: "Engagement-Focused",
        description: "Drive meaningful interactions and community building through interactive content",
        platforms: ["Instagram", "TikTok"],
        budget: "$1,500",
        duration: "3 weeks",
        targetAudience: "Gen Z and Millennials",
        expectedReach: "25K-50K",
        expectedEngagement: "15-25%"
      },
      {
        id: 3,
        title: "Conversion-Driven",
        description: "Focus on driving sales and lead generation with targeted advertising",
        platforms: ["Facebook", "LinkedIn"],
        budget: "$2,500",
        duration: "5 weeks",
        targetAudience: "B2B professionals",
        expectedReach: "30K-60K",
        expectedEngagement: "5-8%"
      }
    ];
    
    setStrategyCards(strategies);
    setCurrentStep('strategy-cards');
    
    // Automatic AI dialog after step transition
    setTimeout(async () => {
      await simulateTyping("🎯 Perfect! I've analyzed your brief and created strategic campaign options.");
      await simulateTyping("📊 Each strategy is optimized for your specific goals and target audience.");
      await simulateTyping("💡 Review the options below and select the one that best aligns with your vision.");
    }, 500);
  };

  const handleStrategyMessage = async (strategyTitle) => {
    await simulateTyping("🎉 Excellent choice! Now let me create a comprehensive content creation workflow...");
    await simulateTyping("📝 Planning content types and formats for each platform...");
    await simulateTyping("🎨 Designing visual elements and brand consistency guidelines...");
    await simulateTyping("✍️ Crafting compelling copy that resonates with your audience...");
    await simulateTyping("📱 Optimizing content for each social media platform's unique requirements...");
    await simulateTyping("⏰ Creating a structured workflow with clear deadlines and responsibilities...");
    await simulateTyping("✅ Your content creation workflow is ready! Here's your organized task board:");
    
    // Generate sample Kanban tasks
    const tasks = [
      {
        id: 1,
        title: "Create Brand Video",
        description: "30-second brand awareness video for all platforms",
        status: "todo",
        assignee: "Content Team",
        priority: "high",
        deadline: "3 days"
      },
      {
        id: 2,
        title: "Design Social Posts",
        description: "10 engaging social media posts with consistent branding",
        status: "todo",
        assignee: "Design Team",
        priority: "high",
        deadline: "2 days"
      },
      {
        id: 3,
        title: "Write Ad Copy",
        description: "Compelling ad copy for each platform",
        status: "todo",
        assignee: "Copy Team",
        priority: "medium",
        deadline: "2 days"
      },
      {
        id: 4,
        title: "Create Landing Page",
        description: "Conversion-optimized landing page for ads",
        status: "todo",
        assignee: "Web Team",
        priority: "high",
        deadline: "4 days"
      }
    ];
    
    setKanbanTasks(tasks);
    setCurrentStep('kanban-board');
    
    // Automatic AI dialog after step transition
    setTimeout(async () => {
      await simulateTyping("🎉 Excellent choice! I've created a comprehensive content creation workflow.");
      await simulateTyping("📝 Each task is designed to maximize your campaign's impact and engagement.");
      await simulateTyping("⏰ You can track progress and manage deadlines through this organized board.");
    }, 500);
  };

  const handleKanbanMessage = async (message) => {
    await simulateTyping("🎯 Perfect! Now let me create an AI-optimized content scheduling strategy...");
    await simulateTyping("📅 Analyzing your target audience's peak activity times across platforms...");
    await simulateTyping("🌍 Considering time zones and global audience reach...");
    await simulateTyping("📊 Reviewing historical engagement data for optimal posting windows...");
    await simulateTyping("🔄 Creating a balanced content distribution schedule...");
    await simulateTyping("⚡ Optimizing for maximum visibility and engagement potential...");
    await simulateTyping("✅ Your AI-optimized content schedule is ready! Here's your strategic posting plan:");
    
    // Generate sample schedule data
    const schedule = [
      {
        id: 1,
        title: "Brand Video Launch",
        platform: "All Platforms",
        date: "2024-01-15",
        time: "10:00 AM",
        type: "video"
      },
      {
        id: 2,
        title: "Social Post Series",
        platform: "Instagram",
        date: "2024-01-16",
        time: "2:00 PM",
        type: "post"
      },
      {
        id: 3,
        title: "LinkedIn Article",
        platform: "LinkedIn",
        date: "2024-01-17",
        time: "9:00 AM",
        type: "article"
      }
    ];
    
    setScheduleData(schedule);
    setCurrentStep('calendar-scheduling');
    
    // Automatic AI dialog after step transition
    setTimeout(async () => {
      await simulateTyping("🎯 Perfect! I've created an AI-optimized content scheduling strategy.");
      await simulateTyping("📅 Each time slot is carefully selected based on your audience's peak activity.");
      await simulateTyping("⚡ This schedule will maximize your content's visibility and engagement potential.");
    }, 500);
  };

  const handleCalendarMessage = async (message) => {
    await simulateTyping("💰 Great! Now let me configure your AI-powered advertising campaigns...");
    await simulateTyping("🎯 Setting up precise audience targeting based on demographics and interests...");
    await simulateTyping("📊 Analyzing platform-specific performance metrics and cost structures...");
    await simulateTyping("🎨 Optimizing ad formats and creative elements for each platform...");
    await simulateTyping("📈 Implementing smart bidding strategies for maximum ROI...");
    await simulateTyping("🔄 Creating cross-platform campaign coordination for consistent messaging...");
    await simulateTyping("✅ Your AI-optimized advertising configuration is ready! Here's your campaign setup:");
    
    // Generate sample ads configuration
    const ads = {
      facebook: {
        budget: 800,
        targeting: {
          age: [25, 45],
          interests: ["Technology", "Business"],
          location: "United States"
        },
        adFormats: ["Video", "Carousel", "Single Image"]
      },
      instagram: {
        budget: 600,
        targeting: {
          age: [18, 35],
          interests: ["Lifestyle", "Technology"],
          location: "United States"
        },
        adFormats: ["Story", "Feed", "Reels"]
      },
      linkedin: {
        budget: 600,
        targeting: {
          jobTitles: ["Manager", "Director", "CEO"],
          industries: ["Technology", "Marketing"],
          location: "United States"
        },
        adFormats: ["Sponsored Content", "Message Ads"]
      }
    };
    
    setAdsConfig(ads);
    setCurrentStep('ads-wizard');
    
    // Automatic AI dialog after step transition
    setTimeout(async () => {
      await simulateTyping("💰 Great! I've configured your AI-powered advertising campaigns.");
      await simulateTyping("🎯 Each platform is optimized with precise targeting and smart bidding strategies.");
      await simulateTyping("📊 This setup will maximize your ROI while reaching your ideal audience.");
    }, 500);
  };

  const handleAdsMessage = async (message) => {
    await simulateTyping("📊 Excellent! Now let me calculate your AI-forecasted campaign performance...");
    await simulateTyping("🔍 Analyzing historical campaign data and industry benchmarks...");
    await simulateTyping("📈 Running predictive models based on your targeting and budget allocation...");
    await simulateTyping("🎯 Calculating expected reach, engagement, and conversion rates...");
    await simulateTyping("💰 Estimating ROI and cost-per-acquisition metrics...");
    await simulateTyping("⚠️ Identifying potential risk factors and optimization opportunities...");
    await simulateTyping("✅ Your comprehensive performance forecast is ready! Here's what you can expect:");
    
    // Generate sample KPI data
    const kpis = {
      expectedReach: "75K-150K",
      expectedEngagement: "10-15%",
      expectedConversions: "500-1000",
      expectedROAS: "3.5x",
      costPerClick: "$0.50",
      costPerConversion: "$15.00"
    };
    
    setKpiData(kpis);
    setCurrentStep('kpi-preview');
    
    // Automatic AI dialog after step transition
    setTimeout(async () => {
      await simulateTyping("📊 Excellent! I've calculated your AI-forecasted campaign performance.");
      await simulateTyping("📈 These projections are based on historical data and industry benchmarks.");
      await simulateTyping("🎯 Review the metrics below and let me know if you'd like any adjustments.");
    }, 500);
  };

  const handleKPIMessage = async (message) => {
    await simulateTyping("Perfect! Your campaign is ready to launch. Let me set everything up for you.");
    
    setIsLaunched(true);
    
    // Start AI loading process instead of going to optimization
    setIsLoading(true);
    setLoadingProgress(0);
    setLoadingStep('Initializing Campaign');
    
    // Simulate campaign launch process
    const launchSteps = [
      { step: 'Initializing Campaign', duration: 1000 },
      { step: 'Setting up Facebook Ads', duration: 1500 },
      { step: 'Configuring Instagram Campaign', duration: 1200 },
      { step: 'Launching LinkedIn Ads', duration: 1000 },
      { step: 'Activating TikTok Campaign', duration: 800 },
      { step: 'Finalizing Campaign Setup', duration: 1000 }
    ];
    
    for (let i = 0; i < launchSteps.length; i++) {
      const { step, duration } = launchSteps[i];
      setLoadingStep(step);
      setLoadingProgress(((i + 1) / launchSteps.length) * 100);
      await new Promise(resolve => setTimeout(resolve, duration));
    }
    
    // Complete the loading
    setLoadingProgress(100);
    setLoadingStep('Campaign Launched Successfully!');
    setIsCompleted(true);
    
    // After a delay, show completion message
    setTimeout(() => {
      simulateTyping("🎉 Your campaign has been successfully launched across all platforms!");
      simulateTyping("I'll now monitor your campaign performance and provide real-time optimization suggestions.");
      simulateTyping("You can check back anytime to see live results and AI-powered recommendations.");
    }, 2000);
  };

  const handleOptimizationMessage = async (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('performance') || lowerMessage.includes('results')) {
      await simulateTyping("Here's your current campaign performance:");
      await simulateTyping(`• Reach: ${optimizationData.currentReach} (+${optimizationData.reachChange}%)`);
      await simulateTyping(`• Engagement: ${optimizationData.currentEngagement} (+${optimizationData.engagementChange}%)`);
      await simulateTyping(`• Conversions: ${optimizationData.currentConversions} (+${optimizationData.conversionChange}%)`);
    } else if (lowerMessage.includes('optimize') || lowerMessage.includes('improve')) {
      await simulateTyping("I'm continuously optimizing your campaign based on real-time data:");
      await simulateTyping("• Adjusting bid strategies for better cost efficiency");
      await simulateTyping("• Refining audience targeting based on performance");
      await simulateTyping("• Optimizing ad creative rotation for maximum engagement");
    } else {
      await simulateTyping("Your campaign is running smoothly! I'm here to help with any questions about performance, optimization, or campaign management.");
    }
  };

  // New function to handle general chat messages (not campaign planning)
  const handleChatMessage = async (message) => {
    // Use mock data system for specific responses
    const mockResponse = findMockResponse(message);
    await simulateTyping(mockResponse);
  };

  const handleQuickAction = (action) => {
    setInputValue(action);
    handleSendMessage();
  };

  // Reset clicked buttons when step changes
  const resetClickedButtons = () => {
    // This will be called by components to reset their button states
    return new Set();
  };

  // Function to reset to chat mode
  const resetToChatMode = () => {
    setIsActionMode(false);
    setCurrentStep('welcome');
    setBriefData({});
    setStrategyCards([]);
    setKanbanTasks([]);
    setScheduleData([
      {
        id: 1,
        title: "Brand Video Launch",
        platform: "All Platforms",
        date: "2024-01-15",
        time: "10:00 AM",
        type: "video"
      },
      {
        id: 2,
        title: "Social Post Series",
        platform: "Instagram",
        date: "2024-01-16",
        time: "2:00 PM",
        type: "post"
      },
      {
        id: 3,
        title: "LinkedIn Article",
        platform: "LinkedIn",
        date: "2024-01-17",
        time: "9:00 AM",
        type: "article"
      }
    ]);
    setAdsConfig({
      budget: {
        total: 5000,
        distribution: {
          facebook: 0.35,
          instagram: 0.30,
          linkedin: 0.20,
          tiktok: 0.15
        }
      },
      targeting: {
        ageRange: '25-45',
        interests: ['Technology', 'Business', 'Innovation'],
        location: 'United States',
        behavior: ['Engaged Shoppers', 'Business Decision Makers']
      }
    });
    setKpiData({
      reach: 75000,
      impressions: 150000,
      clicks: 5000,
      conversions: 750,
      revenue: 15000,
      roas: 3.5,
      ctr: 3.33,
      cpa: 20,
      conversionRate: 15,
      budget: 5000
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return {
    // State
    messages,
    inputValue,
    currentStep,
    campaignData,
    isTyping,
    isLoading,
    loadingProgress,
    loadingStep,
    isCompleted,
    isActionMode,
    
    // New flow states
    briefData,
    strategyCards,
    kanbanTasks,
    scheduleData,
    adsConfig,
    kpiData,
    isLaunched,
    optimizationData,
    
    // Actions
    setInputValue,
    handleSendMessage,
    handleKeyPress,
    handleQuickAction,
    handleWelcomeMessage,
    handleStrategyMessage,
    handleKanbanMessage,
    handleCalendarMessage,
    handleAdsMessage,
    handleKPIMessage,
    handleChatMessage,
    
    // State setters
    setBriefData,
    setStrategyCards,
    setKanbanTasks,
    setScheduleData,
    setAdsConfig,
    setKpiData,
    setIsLaunched,
    setOptimizationData,
    setIsActionMode,
    
    // Loading overlay
    setIsLoading,
    setIsCompleted,
    setLoadingProgress,
    
    // Utility functions
    resetClickedButtons,
    simulateTyping,
    addUserMessage,
    resetToChatMode,
    requiresActionMode
  };
};
