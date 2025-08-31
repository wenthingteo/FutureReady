import { useState } from 'react';
import { AI_TEMPLATES } from '../AITemplates';
import { 
  SAMPLE_CAMPAIGN_IDEAS, 
  SAMPLE_CONTENT, 
  SAMPLE_SCHEDULE, 
  SAMPLE_BUDGET 
} from '../data/sampleData';

export const useAIAgent = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: AI_TEMPLATES.WELCOME.GREETING,
      isAgent: true,
      timestamp: new Date()
    },
    {
      id: 2,
      content: AI_TEMPLATES.WELCOME.INTRO,
      isAgent: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState('welcome');
  const [campaignData, setCampaignData] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const simulateTyping = (message, delay = 1500) => {
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

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping || (currentStep !== 'welcome' && currentStep !== 'campaign-summary')) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      content: userMessage,
      isAgent: false,
      timestamp: new Date()
    }]);

    if (currentStep === 'welcome') {
      // Simulate AI processing for new campaign
      await simulateTyping("Analyzing your request and understanding your goals...");
      await simulateTyping("Researching market trends and competitor strategies...");
      await simulateTyping("Generating creative campaign ideas...");
      await simulateTyping("I've analyzed your request and created some campaign ideas. Let's get started!");

      setCurrentStep('idea-selection');
    } else if (currentStep === 'campaign-summary') {
      // Handle summary phase questions
      await handleSummaryPhaseMessage(userMessage);
    }
  };

  const handleIdeaSelection = async (selectedIdea, ideaData) => {
    setCampaignData(prev => ({ ...prev, idea: selectedIdea }));
    
    // Add thinking process after idea selection
    await addThinkingProcess('idea-selection', ideaData);
    
    setCurrentStep('content-approval');
  };

  const handleContentApproval = async () => {
    setCampaignData(prev => ({ ...prev, content: SAMPLE_CONTENT }));
    
    // Add thinking process after content approval
    await addThinkingProcess('content-approval', SAMPLE_CONTENT);
    
    setCurrentStep('schedule-approval');
  };

  const handleScheduleApproval = async () => {
    setCampaignData(prev => ({ ...prev, schedule: SAMPLE_SCHEDULE }));
    
    // Add thinking process after schedule approval
    await addThinkingProcess('schedule-approval', SAMPLE_SCHEDULE);
    
    setCurrentStep('budget-approval');
  };

  const handleBudgetApproval = async () => {
    setCampaignData(prev => ({ ...prev, budget: SAMPLE_BUDGET }));
    
    // Add thinking process after budget approval
    await addThinkingProcess('budget-approval', SAMPLE_BUDGET);
    
    setCurrentStep('campaign-summary');
  };

  const simulateLoadingProgress = () => {
    const platforms = ['facebook', 'instagram', 'linkedin', 'tiktok', 'youtube'];
    const steps = [
      'Initializing campaign setup...',
      'Connecting to Facebook Ads Manager...',
      'Setting up Instagram campaigns...',
      'Configuring LinkedIn targeting...',
      'Creating TikTok ad campaigns...',
      'Optimizing YouTube content...',
      'Finalizing campaign launch...'
    ];

    let progress = 0;
    let stepIndex = 0;

    const progressInterval = setInterval(() => {
      progress += Math.random() * 15 + 5; // Random progress between 5-20%
      if (progress > 100) progress = 100;

      setLoadingProgress(Math.min(progress, 100));
      
      if (stepIndex < steps.length) {
        setLoadingStep(steps[stepIndex]);
        stepIndex++;
      }

      if (progress >= 100) {
        clearInterval(progressInterval);
        setIsCompleted(true);
        setTimeout(() => {
          setIsLoading(false);
          setIsCompleted(false);
          setLoadingProgress(0);
          setCurrentStep('welcome');
          setMessages([{
            id: Date.now(),
            content: AI_TEMPLATES.SUCCESS.CAMPAIGN_READY,
            isAgent: true,
            timestamp: new Date()
          }]);
          setCampaignData({});
        }, 2000);
      }
    }, 800);
  };

  const handleCampaignLaunch = async () => {
    setIsLoading(true);
    setLoadingProgress(0);
    setIsCompleted(false);
    setLoadingStep('Preparing campaign launch...');
    
    simulateLoadingProgress();
  };

  const handleQuickAction = (action) => {
    setInputValue(action);
    handleSendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSummaryPhaseMessage = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('explain') || lowerMessage.includes('strategy')) {
      await simulateTyping("Let me explain your campaign strategy in detail...");
      await simulateTyping("Your campaign is designed to maximize engagement and reach across multiple platforms. The strategy combines targeted content, optimal timing, and strategic budget allocation to achieve your goals.");
      await simulateTyping("The content is tailored to your target audience, the schedule is optimized for peak engagement times, and the budget is distributed to maximize ROI across all platforms.");
    } else if (lowerMessage.includes('modify') || lowerMessage.includes('change')) {
      await simulateTyping("I can help you modify your campaign! Here are the areas you can adjust:");
      await simulateTyping("• Content: We can revise the messaging, tone, or creative elements\n• Schedule: We can adjust posting times or frequency\n• Budget: We can redistribute budget across platforms\n• Targeting: We can refine your audience parameters");
      await simulateTyping("Which aspect would you like to modify? I can guide you through the changes step by step.");
    } else if (lowerMessage.includes('result') || lowerMessage.includes('expect') || lowerMessage.includes('performance')) {
      await simulateTyping("Based on your campaign strategy, here are the expected results:");
      await simulateTyping("• Reach: 50K-100K potential audience members\n• Engagement: 8-12% expected engagement rate\n• Conversions: 2-5% conversion rate depending on your goals\n• ROI: Expected 3-5x return on ad spend");
      await simulateTyping("These projections are based on industry benchmarks and your specific targeting parameters. Actual results may vary based on market conditions and content performance.");
    } else if (lowerMessage.includes('launch') || lowerMessage.includes('start')) {
      await simulateTyping("Ready to launch your campaign! I'll help you get everything set up.");
      await simulateTyping("The launch process will involve:\n• Setting up ad accounts on each platform\n• Uploading your content and creative assets\n• Configuring targeting parameters\n• Activating your campaigns");
      await simulateTyping("Would you like me to proceed with the campaign launch?");
    } else {
      await simulateTyping("I'm here to help with your campaign! You can ask me about:");
      await simulateTyping("• Campaign strategy and approach\n• Expected results and performance\n• Modifications and adjustments\n• Launch process and next steps");
      await simulateTyping("What would you like to know more about?");
    }
  };

  const addThinkingProcess = async (step, campaignData) => {
    const thinkingMessages = {
      'idea-selection': [
        "Great choice! I can see you've selected a campaign strategy that aligns well with your goals.",
        "Now let me analyze your selection and create tailored content that will resonate with your target audience...",
        "I'm researching the best content formats and messaging approaches for your campaign type...",
        "Perfect! I've prepared some engaging content options for you to review."
      ],
      'content-approval': [
        "Excellent! The content looks great and aligns perfectly with your campaign strategy.",
        "Now I'm analyzing the optimal posting schedule based on your target audience's behavior patterns...",
        "I'm researching peak engagement times across your selected platforms...",
        "I've created a strategic posting schedule that will maximize your content's reach and engagement!"
      ],
      'schedule-approval': [
        "Perfect timing strategy! This schedule will help you reach your audience when they're most active.",
        "Now I'm calculating the optimal budget allocation across your platforms...",
        "I'm analyzing cost-per-click trends and engagement rates to maximize your ROI...",
        "I've optimized your budget distribution to get the best results from your campaign!"
      ],
      'budget-approval': [
        "Excellent budget allocation! This distribution will help you achieve maximum impact.",
        "Now I'm compiling everything into a comprehensive campaign summary...",
        "I'm finalizing the campaign strategy and preparing launch recommendations...",
        "Your campaign is ready! Here's a complete overview of your strategy."
      ]
    };

    // Get contextual messages based on campaign data
    const getContextualMessages = (step, data) => {
      if (step === 'idea-selection' && data.title) {
        const campaignType = data.title;
        if (campaignType.includes('Product Launch')) {
          return [
            "Excellent choice! A product launch campaign is perfect for creating buzz and driving initial sales.",
            "I'm analyzing your product details and creating content that will generate excitement and anticipation...",
            "I'm researching successful product launch strategies and viral content patterns...",
            "Perfect! I've prepared compelling launch content that will make your product irresistible!"
          ];
        } else if (campaignType.includes('Brand Awareness')) {
          return [
            "Great strategy! Brand awareness campaigns are essential for building long-term customer relationships.",
            "I'm analyzing your brand identity and creating content that will increase recognition and trust...",
            "I'm researching viral content trends and influencer collaboration opportunities...",
            "Excellent! I've created brand-focused content that will boost your visibility and engagement!"
          ];
        } else if (campaignType.includes('Engagement')) {
          return [
            "Smart choice! Engagement campaigns are perfect for building a loyal community around your brand.",
            "I'm analyzing your audience behavior and creating interactive content that will spark conversations...",
            "I'm researching trending topics and community-building strategies...",
            "Perfect! I've prepared engaging content that will encourage meaningful interactions!"
          ];
        } else if (campaignType.includes('Lead Generation')) {
          return [
            "Strategic thinking! Lead generation campaigns will help you convert followers into customers.",
            "I'm analyzing conversion patterns and creating content that will drive qualified leads...",
            "I'm researching lead magnet strategies and call-to-action optimization...",
            "Excellent! I've created conversion-focused content that will maximize your lead capture!"
          ];
        }
      }
      
      if (step === 'content-approval' && data.socialPosts) {
        return [
          "Fantastic content! Your posts are engaging and perfectly aligned with your campaign goals.",
          "Now I'm analyzing your target audience's online behavior patterns to optimize posting times...",
          "I'm researching peak engagement hours and frequency optimization for your platforms...",
          "Perfect! I've created a strategic schedule that will maximize your content's reach and impact!"
        ];
      }
      
      if (step === 'schedule-approval' && data.length > 0) {
        return [
          "Excellent timing strategy! Your posting schedule is optimized for maximum audience engagement.",
          "Now I'm analyzing platform-specific cost trends and engagement rates for budget optimization...",
          "I'm calculating the optimal budget distribution to maximize your return on investment...",
          "Perfect! I've optimized your budget allocation to get the best results from your campaign!"
        ];
      }
      
      if (step === 'budget-approval' && data.facebook) {
        const totalBudget = Object.values(data).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);
        return [
          `Excellent budget allocation! Your $${totalBudget.toLocaleString()} investment is strategically distributed.`,
          "Now I'm compiling all your campaign elements into a comprehensive strategy overview...",
          "I'm finalizing launch recommendations and performance optimization strategies...",
          "Your campaign is ready! Here's a complete overview of your optimized strategy."
        ];
      }
      
      return thinkingMessages[step] || [];
    };

    const messages = getContextualMessages(step, campaignData);
    
    for (const message of messages) {
      await simulateTyping(message);
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
    
    // Actions
    setInputValue,
    handleSendMessage,
    handleKeyPress,
    handleQuickAction,
    handleIdeaSelection,
    handleContentApproval,
    handleScheduleApproval,
    handleBudgetApproval,
    handleCampaignLaunch,
    
    // Loading overlay
    setIsLoading,
    setIsCompleted,
    setLoadingProgress
  };
};
