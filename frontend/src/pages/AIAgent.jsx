import React from 'react';
import AIChatInterface from '../components/aiAgent/AIChatInterface';
import AILoadingOverlay from '../components/aiAgent/AILoadingOverlay';
import { useAIAgent } from '../components/aiAgent/hooks/useAIAgent';
import IdeaSelection from '../components/aiAgent/IdeaSelection';
import ContentApproval from '../components/aiAgent/ContentApproval';
import SchedulingApproval from '../components/aiAgent/SchedulingApproval';
import BudgetApproval from '../components/aiAgent/BudgetApproval';
import CampaignSummary from '../components/aiAgent/CampaignSummary';
import { 
  SAMPLE_CAMPAIGN_IDEAS, 
  SAMPLE_CONTENT, 
  SAMPLE_SCHEDULE, 
  SAMPLE_BUDGET 
} from '../components/aiAgent/data/sampleData';

const AIAgent = () => {
  const {
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
  } = useAIAgent();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'idea-selection':
        return <IdeaSelection sampleIdeas={SAMPLE_CAMPAIGN_IDEAS} onSelect={handleIdeaSelection} />;
      case 'content-approval':
        return <ContentApproval content={SAMPLE_CONTENT} onApprove={handleContentApproval} onModify={() => {}} />;
      case 'schedule-approval':
        return <SchedulingApproval schedule={SAMPLE_SCHEDULE} onApprove={handleScheduleApproval} onModify={() => {}} />;
      case 'budget-approval':
        return <BudgetApproval budget={SAMPLE_BUDGET} onApprove={handleBudgetApproval} onModify={() => {}} />;
      case 'campaign-summary':
        return <CampaignSummary campaignData={campaignData} onLaunch={handleCampaignLaunch} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#EFF6FF]">
      {/* Page Header */}
      <div className="flex-shrink-0 p-6 pb-4">
        <h1 className="text-3xl font-bold text-[#3264DF] mb-2">AI Campaign Assistant</h1>
        <p className="text-gray-600">Create engaging social media campaigns with AI-powered guidance</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex bg-white rounded-2xl shadow-lg overflow-hidden mx-6 mb-6">
        {/* Step Content Panel - Now on Left */}
        {currentStep !== 'welcome' ? (
          <div className="w-1/2 bg-gray-50 overflow-y-auto border-r border-gray-200">
            <div className="p-6">
              {renderCurrentStep()}
            </div>
          </div>
        ) : null}

        {/* Chat Interface - Now on Right */}
        <div className={`${currentStep === 'welcome' ? 'w-full' : 'w-1/2'} flex flex-col`}>
          <AIChatInterface
            messages={messages}
            inputValue={inputValue}
            setInputValue={setInputValue}
            isTyping={isTyping}
            currentStep={currentStep}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
            onQuickAction={handleQuickAction}
          />
        </div>
      </div>

      {/* AI Loading Overlay */}
      <AILoadingOverlay
        isLoading={isLoading}
        isCompleted={isCompleted}
        loadingProgress={loadingProgress}
        currentStep={loadingStep}
        platforms={['facebook', 'instagram', 'linkedin', 'tiktok', 'youtube']}
        onClose={() => {
          setIsLoading(false);
          setIsCompleted(false);
          setLoadingProgress(0);
        }}
      />
    </div>
  );
};

export default AIAgent;
