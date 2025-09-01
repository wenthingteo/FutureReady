import React, { useEffect, useRef } from 'react';
import AIChatInterface from '../components/aiAgent/AIChatInterface';
import AILoadingOverlay from '../components/aiAgent/AILoadingOverlay';
import { useAIAgent } from '../components/aiAgent/hooks/useAIAgent';
import BriefInput from '../components/aiAgent/BriefInput';
import StrategyCards from '../components/aiAgent/StrategyCards';
import KanbanBoard from '../components/aiAgent/KanbanBoard';
import CalendarScheduling from '../components/aiAgent/CalendarScheduling';
import AdsWizard from '../components/aiAgent/AdsWizard';
import KPIPreview from '../components/aiAgent/KPIPreview';
import RealTimeOptimization from '../components/aiAgent/RealTimeOptimization';

const AIAgent = () => {
  const workspaceRef = useRef(null);

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
    simulateTyping,
    addUserMessage,
    resetToChatMode
  } = useAIAgent();

  // Auto-scroll to top when step changes
  useEffect(() => {
    if (workspaceRef.current) {
      workspaceRef.current.scrollTop = 0;
    }
  }, [currentStep]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <BriefInput 
            onBriefComplete={(data) => {
              // Handle brief completion and move to strategy cards
              console.log('Brief completed:', data);
              // Set the brief data and recommendation
              setBriefData(data);
              // Trigger the AI to generate strategies
              handleWelcomeMessage(data.brief);
            }}
            onTriggerAIResponse={(action) => {
              // Add user message for user actions
              setTimeout(() => {
                addUserMessage(action);
              }, 100);
            }}
          />
        );
      case 'strategy-cards':
        return (
          <StrategyCards 
            strategies={strategyCards}
            aiRecommendation={briefData?.recommendation}
            onStrategySelect={(strategy) => {
              console.log('Strategy selected:', strategy);
              // Move to Kanban board
              handleStrategyMessage(strategy.title);
            }}
            onTriggerAIResponse={(action) => {
              // Add user message for user actions
              setTimeout(() => {
                addUserMessage(action);
              }, 100);
            }}
          />
        );
      case 'kanban-board':
        return (
          <KanbanBoard 
            tasks={kanbanTasks}
            aiRecommendation={briefData?.recommendation}
            onTasksComplete={(tasks) => {
              console.log('Tasks completed:', tasks);
              // Move to calendar scheduling
              handleKanbanMessage('tasks completed');
            }}
            onTriggerAIResponse={(action) => {
              // Add user message for user actions
              setTimeout(() => {
                addUserMessage(action);
              }, 100);
            }}
          />
        );
      case 'calendar-scheduling':
        return (
          <CalendarScheduling 
            scheduleData={scheduleData}
            aiRecommendation={briefData?.recommendation}
            onScheduleComplete={(schedule) => {
              console.log('Schedule completed:', schedule);
              // Move to ads wizard
              handleCalendarMessage('schedule completed');
            }}
            onTriggerAIResponse={(action) => {
              // Add user message for user actions
              setTimeout(() => {
                addUserMessage(action);
              }, 100);
            }}
          />
        );
      case 'ads-wizard':
        return (
          <AdsWizard 
            adsConfig={adsConfig}
            onAdsComplete={(config) => {
              console.log('Ads configuration completed:', config);
              // Move to KPI preview
              handleAdsMessage('ads completed');
            }}
            onTriggerAIResponse={(action) => {
              // Add user message for user actions
              setTimeout(() => {
                addUserMessage(action);
              }, 100);
            }}
          />
        );
      case 'kpi-preview':
        return (
          <KPIPreview 
            kpiData={kpiData}
            onKPIConfirm={(kpis) => {
              console.log('KPIs confirmed:', kpis);
              // Move to launch
              handleKPIMessage('kpis confirmed');
            }}
            onTriggerAIResponse={(action) => {
              // Add user message for user actions
              setTimeout(() => {
                addUserMessage(action);
              }, 100);
            }}
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI Campaign Assistant</h3>
              <p className="text-gray-600">Start by describing your campaign goals in the chat</p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Pro Tip:</strong> I'll analyze your brief and recommend the best strategy, 
                  then help you optimize every step of your campaign creation process.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#EFF6FF]">
      {/* Page Header */}
      <div className="flex-shrink-0 p-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#3264DF] mb-2">Campify AI</h1>
            <p className="text-gray-600">
              {isActionMode 
                ? "Create engaging social media campaigns with AI-powered guidance" 
                : "Ask me anything about marketing, campaigns, or performance optimization"
              }
            </p>
          </div>
          {isActionMode && (
            <button
              onClick={resetToChatMode}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <span>💬</span>
              Back to Chat
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex bg-white rounded-2xl shadow-lg overflow-hidden mx-6 mb-6">
        {/* Workspace Panel - Left (only show in action mode) */}
        {isActionMode && (
          <div className="w-1/2 bg-gray-50 overflow-y-auto border-r border-gray-200" ref={workspaceRef}>
            <div className="p-6">
              {renderCurrentStep()}
            </div>
          </div>
        )}

        {/* Chat Interface - Right (full width in chat mode) */}
        <div className={`flex flex-col ${isActionMode ? 'w-1/2' : 'w-full'}`}>
          <AIChatInterface
            messages={messages}
            inputValue={inputValue}
            setInputValue={setInputValue}
            isTyping={isTyping}
            currentStep={currentStep}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
            onQuickAction={handleQuickAction}
            isActionMode={isActionMode}
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
