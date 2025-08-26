import React, { useState, useEffect } from 'react';
import { SchedulingModeSelector } from './scheduling/SchedulingModeSelector';
import { AISchedulingDashboard } from './scheduling/AISchedulingDashboard';
import { ManualSchedulingInterface } from './scheduling/ManualSchedulingInterface';
import { SchedulingOverlay } from './scheduling/SchedulingOverlay';
import { SchedulingHeader } from './scheduling/SchedulingHeader';
import { useSchedulingData } from './scheduling/hooks/useSchedulingData';
import { useSchedulingActions } from './scheduling/hooks/useSchedulingActions';

const SchedulingStep = ({ formData, onSchedule, errors }) => {
  const [schedulingMode, setSchedulingMode] = useState('ai');
  const [isScheduling, setIsScheduling] = useState(false);
  const [schedulingProgress, setSchedulingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const {
    schedulingData,
    selectedStrategy,
    selectedDate,
    selectedTimeSlot,
    selectedPlatformForHeatmap,
    updateSchedulingData,
    setSelectedStrategy,
    setSelectedDate,
    setSelectedTimeSlot,
    setSelectedPlatformForHeatmap
  } = useSchedulingData(formData.platforms);

  const {
    handleScheduleAll,
    handleStrategyChange,
    handleManualTimeChange,
    handleTimeSlotClick,
    handleAlternativeTimeClick
  } = useSchedulingActions({
    formData,
    schedulingData,
    updateSchedulingData,
    selectedStrategy,
    setSelectedStrategy,
    schedulingMode,
    selectedDate,
    setSelectedDate,
    selectedTimeSlot,
    setSelectedTimeSlot,
    selectedPlatformForHeatmap,
    onSchedule,
    setIsScheduling,
    setSchedulingProgress,
    setCurrentStep,
    setIsCompleted
  });

  return (
    <div className="space-y-8">
      {/* Scheduling Overlay */}
      <SchedulingOverlay
        isScheduling={isScheduling}
        isCompleted={isCompleted}
        schedulingMode={schedulingMode}
        schedulingProgress={schedulingProgress}
        currentStep={currentStep}
        formData={formData}
        onClose={() => {
          setIsScheduling(false);
          setIsCompleted(false);
          setSchedulingProgress(0);
        }}
      />

      {/* Header */}
      <SchedulingHeader />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Mode Selector */}
        <SchedulingModeSelector
          schedulingMode={schedulingMode}
          onModeChange={setSchedulingMode}
        />

        {/* AI Scheduling Dashboard */}
        {schedulingMode === 'ai' && (
          <AISchedulingDashboard
            formData={formData}
            schedulingData={schedulingData}
            selectedStrategy={selectedStrategy}
            onStrategyChange={handleStrategyChange}
            onAlternativeTimeClick={handleAlternativeTimeClick}
          />
        )}

        {/* Manual Scheduling Interface */}
        {schedulingMode === 'manual' && (
          <ManualSchedulingInterface
            formData={formData}
            schedulingData={schedulingData}
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            selectedPlatformForHeatmap={selectedPlatformForHeatmap}
            onDateChange={setSelectedDate}
            onTimeSlotClick={handleTimeSlotClick}
            onPlatformChange={setSelectedPlatformForHeatmap}
            onManualTimeChange={handleManualTimeChange}
          />
        )}

        {/* Main Schedule Action */}
        <div className="flex justify-center">
          <button
            onClick={handleScheduleAll}
            disabled={isScheduling || (schedulingMode === 'manual' && 
              formData.platforms.filter(p => schedulingData[p]?.customDate && schedulingData[p]?.customTime).length === 0)}
            className={`px-12 py-4 text-white font-medium rounded-2xl transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${
              schedulingMode === 'ai'
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-700 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:translate-y-[-2px] hover:scale-105'
                : 'bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 shadow-lg shadow-slate-500/25 hover:shadow-xl hover:shadow-slate-500/30 hover:translate-y-[-2px]'
            }`}
          >
            {isScheduling ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {schedulingMode === 'ai' ? '✨ AI Scheduling...' : 'Scheduling...'}
              </>
            ) : (
              <>
                {schedulingMode === 'ai' ? (
                  <>
                    <span className="text-xl">✨</span>
                    Schedule with AI
                  </>
                ) : (
                  <>
                    <span className="text-xl">⚙️</span>
                    Schedule Selected ({formData.platforms.filter(p => schedulingData[p]?.customDate && schedulingData[p]?.customTime).length})
                  </>
                )}
              </>
            )}
          </button>
        </div>

        {/* Error Display */}
        {errors.scheduling && (
          <div className="bg-red-50/70 border border-red-200/50 text-red-600 px-6 py-4 rounded-xl text-center flex items-center justify-center gap-2">
            <span className="text-xl">⚠️</span>
            {errors.scheduling}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulingStep;