import { useState } from 'react';
import { AI_TEMPLATES } from '../AITemplates';

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
    const lowerMessage = message.toLowerCase();
    
    // Performance and analytics questions
    if (lowerMessage.includes('performance') || lowerMessage.includes('results') || lowerMessage.includes('metrics')) {
      await simulateTyping(`Here are the key performance metrics you should track for your campaigns:

📊 **Reach & Impressions**: Track how many people see your content and how often it's displayed
🎯 **Engagement Rate**: Measure likes, comments, shares, and clicks to understand audience interaction
💰 **Conversion Rate**: Monitor how many viewers take desired actions (purchases, sign-ups, etc.)
📈 **ROAS (Return on Ad Spend)**: Calculate revenue generated per dollar spent on advertising
⏱️ **Click-Through Rate (CTR)**: Measure ad effectiveness and audience interest

These metrics work together to give you a complete picture of your campaign performance. Focus on improving the metrics that align with your specific goals - whether that's brand awareness, engagement, or conversions.`);
    }
    
    // Optimization questions
    else if (lowerMessage.includes('optimize') || lowerMessage.includes('improve') || lowerMessage.includes('better')) {
      await simulateTyping(`Here are proven strategies to optimize your campaigns and improve performance:

🎯 **Audience Targeting**: Refine your target demographics and interests based on performance data. Look for patterns in who's engaging most with your content.

📱 **Ad Creative**: Test different images, videos, and copy variations. A/B test headlines, CTAs, and visual elements to find what resonates best.

⏰ **Timing**: Post when your audience is most active. Use platform analytics to identify peak engagement times.

💰 **Budget Allocation**: Shift budget to top-performing platforms and ad formats. Don't be afraid to pause underperforming campaigns.

🔄 **A/B Testing**: Continuously test and optimize elements. Start with one variable at a time to clearly identify what drives better results.

Remember, optimization is an ongoing process. Monitor your results regularly and be ready to adjust your strategy based on performance data.`);
    }
    
    // Platform-specific questions
    else if (lowerMessage.includes('facebook') || lowerMessage.includes('instagram') || lowerMessage.includes('linkedin') || lowerMessage.includes('tiktok')) {
      await simulateTyping(`Each social media platform has unique strengths and audience characteristics:

📘 **Facebook**: Great for broad reach and detailed targeting. Perfect for brand awareness campaigns and reaching older demographics. Best for: Lead generation, brand awareness, community building.

📷 **Instagram**: Perfect for visual content and brand awareness. Excellent for lifestyle brands and reaching younger audiences. Best for: Visual storytelling, influencer partnerships, product showcases.

💼 **LinkedIn**: Ideal for B2B and professional audiences. Great for thought leadership and business networking. Best for: B2B marketing, professional services, industry networking.

🎵 **TikTok**: Excellent for viral content and younger demographics. Perfect for trend-driven marketing and creative content. Best for: Brand awareness, viral campaigns, reaching Gen Z.

Choose platforms based on your target audience, content type, and campaign goals. Don't spread yourself too thin - focus on 2-3 platforms where your audience is most active.`);
    }
    
    // Budget questions
    else if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('spend')) {
      await simulateTyping(`Here's a strategic approach to budget planning for your campaigns:

💰 **Start Small**: Begin with $500-1000 to test performance across different platforms and ad formats. This helps you understand what works before scaling up.

📊 **Track ROI**: Monitor return on investment for each platform and campaign. Calculate your cost per acquisition (CPA) and return on ad spend (ROAS) to make informed decisions.

🎯 **Allocate Smart**: Distribute budget based on platform performance. Put more money behind campaigns and platforms that are delivering better results.

📈 **Scale Up**: Increase budget on top-performing campaigns gradually. Don't double your spend overnight - increase by 20-30% and monitor performance.

💡 **Pro Tips**: 
- Set aside 10-20% of your budget for testing new strategies
- Consider seasonal trends when planning your budget
- Always have a clear goal and success metrics before spending

Remember, it's better to start small and scale up than to overspend on unproven strategies.`);
    }
    
    // General marketing questions
    else if (lowerMessage.includes('marketing') || lowerMessage.includes('strategy') || lowerMessage.includes('campaign')) {
      await simulateTyping(`Effective marketing strategies are built on these fundamental principles:

🎯 **Define Clear Goals**: Set specific, measurable objectives (SMART goals). Whether it's increasing brand awareness by 25% or generating 100 new leads, clear goals guide your strategy.

👥 **Know Your Audience**: Research and understand your target market deeply. Create detailed buyer personas and understand their pain points, motivations, and preferred communication channels.

📱 **Multi-Platform Approach**: Use multiple channels for maximum reach, but maintain consistent messaging across platforms. Each platform serves different purposes in your overall strategy.

📊 **Data-Driven Decisions**: Use analytics to guide your strategy. Track performance metrics and be ready to pivot based on what the data tells you.

🔄 **Continuous Optimization**: Regularly test and improve campaigns. Marketing is not a set-it-and-forget-it activity - it requires ongoing attention and refinement.

💡 **Key Success Factors**: 
- Consistency in messaging and branding
- Authentic engagement with your audience
- Regular content creation and posting
- Monitoring and responding to trends
- Building long-term relationships, not just transactions

The most successful marketers combine creativity with data analysis to create campaigns that resonate with their audience while achieving business objectives.`);
    }
    
    // Default response
    else {
      await simulateTyping(`I'm here to help with your marketing and campaign questions! I can provide guidance on:

📊 **Performance metrics and analytics** - Understanding what to track and how to interpret your data
🎯 **Campaign optimization strategies** - Proven techniques to improve your results
📱 **Platform-specific best practices** - How to maximize your presence on each social media platform
💰 **Budget planning and allocation** - Strategic approaches to spending your marketing budget effectively
🚀 **Campaign planning and execution** - Step-by-step guidance for creating successful campaigns

Just ask me about any of these topics, or if you're ready to create a new campaign, say "plan a campaign" and I'll guide you through the entire process from brief to launch!

What would you like to know more about?`);
    }
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
