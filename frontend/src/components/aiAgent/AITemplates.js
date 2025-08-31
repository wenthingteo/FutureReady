// AI Agent Template System - Reusable Words and Phrases

export const AI_TEMPLATES = {
  // Welcome Messages
  WELCOME: {
    GREETING: "Hello! I'm your AI Campaign Assistant. I'm here to help you create amazing social media campaigns.",
    INTRO: "Let me guide you through creating a successful social media campaign step by step.",
    READY: "Ready to get started? Tell me what you'd like to promote today!",
    QUICK_START: "I can help you with product promotions, brand awareness, or any social media campaign you have in mind."
  },

  // Campaign Types
  CAMPAIGN_TYPES: {
    PRODUCT_PROMOTION: "Product Promotion",
    BRAND_AWARENESS: "Brand Awareness", 
    ENGAGEMENT: "Community Engagement",
    LEAD_GENERATION: "Lead Generation",
    EVENT_PROMOTION: "Event Promotion",
    SEASONAL: "Seasonal Campaign",
    EDUCATIONAL: "Educational Content"
  },

  // Thinking Process Messages
  THINKING: {
    ANALYZING: "Analyzing your request and understanding your goals...",
    RESEARCHING: "Researching market trends and competitor strategies...",
    GENERATING: "Generating creative campaign ideas tailored to your needs...",
    OPTIMIZING: "Optimizing content for maximum engagement across platforms...",
    SCHEDULING: "Creating optimal posting schedule for your target audience...",
    BUDGETING: "Allocating budget efficiently across different platforms...",
    FINALIZING: "Finalizing your campaign strategy and preparing for launch..."
  },

  // Todo List Items
  TODO: {
    IDEA_GENERATION: [
      "Analyze your target audience",
      "Research trending topics",
      "Generate campaign ideas",
      "Select best strategy"
    ],
    CONTENT_CREATION: [
      "Create engaging headlines",
      "Write platform-specific content",
      "Design visual elements",
      "Optimize for each platform"
    ],
    SCHEDULING: [
      "Determine optimal posting times",
      "Plan content calendar",
      "Set up automation",
      "Prepare cross-platform strategy"
    ],
    BUDGET_ALLOCATION: [
      "Calculate total budget",
      "Distribute across platforms",
      "Set bid strategies",
      "Plan ROI tracking"
    ],
    LAUNCH_PREPARATION: [
      "Review all content",
      "Set up tracking pixels",
      "Prepare launch sequence",
      "Schedule campaign start"
    ]
  },

  // Step Descriptions
  STEPS: {
    IDEA_SELECTION: "Choose Your Campaign Strategy",
    CONTENT_APPROVAL: "Review and Approve Content",
    SCHEDULE_APPROVAL: "Review Posting Schedule",
    BUDGET_APPROVAL: "Review Budget Allocation",
    CAMPAIGN_SUMMARY: "Campaign Summary & Launch"
  },

  // Success Messages
  SUCCESS: {
    IDEA_SELECTED: "Great choice! Your campaign strategy is ready.",
    CONTENT_APPROVED: "Excellent! All content has been approved.",
    SCHEDULE_APPROVED: "Perfect! Your posting schedule is optimized.",
    BUDGET_APPROVED: "Budget allocation looks great!",
    CAMPAIGN_READY: "Your campaign is ready to launch! 🚀"
  },

  // Platform Specific Content
  PLATFORM_CONTENT: {
    FACEBOOK: {
      TITLE: "Facebook Content",
      DESCRIPTION: "Engaging posts with community focus and conversation starters",
      HASHTAGS: "#Community #Engagement #SocialMedia"
    },
    INSTAGRAM: {
      TITLE: "Instagram Content", 
      DESCRIPTION: "Visual stories with trending hashtags and aesthetic appeal",
      HASHTAGS: "#Visual #Trending #Aesthetic"
    },
    LINKEDIN: {
      TITLE: "LinkedIn Content",
      DESCRIPTION: "Professional insights with industry expertise and thought leadership",
      HASHTAGS: "#Professional #Industry #Leadership"
    },
    TIKTOK: {
      TITLE: "TikTok Content",
      DESCRIPTION: "Viral video content with trending sounds and creative hooks",
      HASHTAGS: "#Viral #Trending #Creative"
    },
    YOUTUBE: {
      TITLE: "YouTube Content",
      DESCRIPTION: "Video content with SEO optimization and engaging thumbnails",
      HASHTAGS: "#Video #SEO #Engaging"
    }
  },

  // Budget Categories
  BUDGET_CATEGORIES: {
    FACEBOOK_ADS: "Facebook Ads",
    INSTAGRAM_ADS: "Instagram Ads", 
    LINKEDIN_ADS: "LinkedIn Ads",
    TIKTOK_ADS: "TikTok Ads",
    YOUTUBE_ADS: "YouTube Ads",
    CONTENT_CREATION: "Content Creation"
  },

  // Loading Messages
  LOADING: {
    PROCESSING: "Processing your request...",
    GENERATING_IDEAS: "Generating campaign ideas...",
    CREATING_CONTENT: "Creating engaging content...",
    OPTIMIZING_SCHEDULE: "Optimizing posting schedule...",
    CALCULATING_BUDGET: "Calculating budget allocation...",
    LAUNCHING: "Launching your campaign..."
  },

  // Error Messages
  ERROR: {
    GENERAL: "Something went wrong. Let me try again.",
    NETWORK: "Connection issue. Please check your internet.",
    TIMEOUT: "Request timed out. Please try again.",
    VALIDATION: "Please provide more details to continue."
  },

  // Call to Action
  CTA: {
    CONTINUE: "Continue",
    APPROVE_ALL: "Approve All",
    LAUNCH_CAMPAIGN: "Launch Campaign",
    START_OVER: "Start Over",
    SAVE_DRAFT: "Save Draft"
  },

  // Status Messages
  STATUS: {
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    PENDING: "Pending",
    APPROVED: "Approved",
    READY: "Ready"
  }
};

// Helper function to get random template
export const getRandomTemplate = (category, subcategory) => {
  const templates = AI_TEMPLATES[category]?.[subcategory];
  if (Array.isArray(templates)) {
    return templates[Math.floor(Math.random() * templates.length)];
  }
  return templates || "Processing...";
};

// Helper function to get thinking process for specific step
export const getThinkingProcess = (step) => {
  const thinkingMap = {
    'idea': AI_TEMPLATES.THINKING.ANALYZING,
    'content': AI_TEMPLATES.THINKING.GENERATING,
    'schedule': AI_TEMPLATES.THINKING.SCHEDULING,
    'budget': AI_TEMPLATES.THINKING.BUDGETING,
    'launch': AI_TEMPLATES.THINKING.FINALIZING
  };
  return thinkingMap[step] || AI_TEMPLATES.THINKING.ANALYZING;
};

// Helper function to get todo list for specific step
export const getTodoList = (step) => {
  const todoMap = {
    'idea': AI_TEMPLATES.TODO.IDEA_GENERATION,
    'content': AI_TEMPLATES.TODO.CONTENT_CREATION,
    'schedule': AI_TEMPLATES.TODO.SCHEDULING,
    'budget': AI_TEMPLATES.TODO.BUDGET_ALLOCATION,
    'launch': AI_TEMPLATES.TODO.LAUNCH_PREPARATION
  };
  return todoMap[step] || AI_TEMPLATES.TODO.IDEA_GENERATION;
};

export default AI_TEMPLATES;
