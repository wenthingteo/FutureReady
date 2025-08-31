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
    if (!inputValue.trim() || isTyping || currentStep !== 'welcome') return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      content: userMessage,
      isAgent: false,
      timestamp: new Date()
    }]);

    // Simulate AI processing
    await simulateTyping("Analyzing your request and understanding your goals...");
    await simulateTyping("Researching market trends and competitor strategies...");
    await simulateTyping("Generating creative campaign ideas...");
    await simulateTyping("I've analyzed your request and created some campaign ideas. Let's get started!");

    setCurrentStep('idea-selection');
  };

  const handleIdeaSelection = (selectedIdea, ideaData) => {
    setCampaignData(prev => ({ ...prev, idea: selectedIdea }));
    setCurrentStep('content-approval');
  };

  const handleContentApproval = () => {
    setCampaignData(prev => ({ ...prev, content: SAMPLE_CONTENT }));
    setCurrentStep('schedule-approval');
  };

  const handleScheduleApproval = () => {
    setCampaignData(prev => ({ ...prev, schedule: SAMPLE_SCHEDULE }));
    setCurrentStep('budget-approval');
  };

  const handleBudgetApproval = () => {
    setCampaignData(prev => ({ ...prev, budget: SAMPLE_BUDGET }));
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
