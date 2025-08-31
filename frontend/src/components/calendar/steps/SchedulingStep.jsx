import React, { useState, useEffect } from 'react';
import { AISchedulingDashboard } from './scheduling/AISchedulingDashboard';
import { ManualSchedulingInterface } from './scheduling/ManualSchedulingInterface';
import { SchedulingOverlay } from './scheduling/SchedulingOverlay';
import { SchedulingHeader } from './scheduling/SchedulingHeader';
import { useSchedulingData } from './scheduling/hooks/useSchedulingData';
import { useSchedulingActions } from './scheduling/hooks/useSchedulingActions';
import { Instagram, Facebook, Linkedin, Youtube, Sparkles } from 'lucide-react';

// Custom TikTok Icon Component
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.10z"/>
  </svg>
);

const getPlatformIcon = (platform) => {
  switch (platform) {
    case 'instagram': return Instagram;
    case 'facebook': return Facebook;
    case 'linkedin': return Linkedin;
    case 'youtube': return Youtube;
    case 'tiktok': return TikTokIcon;
    default: return null;
  }
};

const SchedulingStep = ({ formData, onSchedule, errors, onBack }) => {
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
    <div className="space-y-6">
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
       <SchedulingHeader onBack={onBack} />

       {/* Mode Selection */}
       <div className="flex justify-center">
         <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-1">
           <div className="flex">
                           <button
                onClick={() => setSchedulingMode('ai')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  schedulingMode === 'ai'
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI Schedule
              </button>
              <button
                onClick={() => setSchedulingMode('manual')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  schedulingMode === 'manual'
                    ? 'bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Manual Schedule
              </button>
           </div>
         </div>
       </div>

       <div className="max-w-6xl mx-auto space-y-6">
         {/* AI Scheduling Dashboard */}
         {schedulingMode === 'ai' && (
           <>
             <AISchedulingDashboard
               formData={formData}
               schedulingData={schedulingData}
               selectedStrategy={selectedStrategy}
               onStrategyChange={handleStrategyChange}
               onAlternativeTimeClick={handleAlternativeTimeClick}
             />

             {/* Main Schedule Action */}
             <div className="flex justify-center pt-2">
               <button
                 onClick={handleScheduleAll}
                 disabled={isScheduling}
                 className="px-16 py-4 text-white font-medium rounded-xl transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-700 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:translate-y-[-2px] hover:scale-105"
               >
                {isScheduling ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <div className="flex items-center gap-1">
                      {formData.platforms.slice(0, 3).map((platform, index) => {
                        const Icon = getPlatformIcon(platform);
                        return Icon ? (
                          <Icon key={platform} className="w-4 h-4 text-white" />
                        ) : null;
                      })}
                      {formData.platforms.length > 3 && (
                        <span className="text-white text-sm">+{formData.platforms.length - 3}</span>
                      )}
                    </div>
                    <span>AI Scheduling...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-white" />
                    <span>Schedule with AI</span>
                  </>
                )}
              </button>
            </div>
           </>
         )}

         {/* Manual Scheduling Interface */}
         {schedulingMode === 'manual' && (
           <>
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
                updateSchedulingData={updateSchedulingData}
              />

             {/* Manual Schedule Action */}
             <div className="flex justify-center pt-2">
               <button
                 onClick={handleScheduleAll}
                 disabled={isScheduling || formData.platforms.filter(p => schedulingData[p]?.customDate && schedulingData[p]?.customTime).length === 0}
                 className="px-16 py-4 text-white font-medium rounded-xl transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 shadow-lg shadow-slate-500/25 hover:shadow-xl hover:shadow-slate-500/30 hover:translate-y-[-2px]"
               >
                {isScheduling ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Scheduling...
                  </>
                ) : (
                  <>
                    <span className="text-xl">⚙️</span>
                    Schedule Selected ({formData.platforms.filter(p => schedulingData[p]?.customDate && schedulingData[p]?.customTime).length})
                  </>
                )}
              </button>
            </div>
           </>
         )}

                 {/* Error Display */}
         {errors.scheduling && (
           <div className="bg-red-50/70 border border-red-200/50 text-red-600 px-4 py-3 rounded-lg text-center flex items-center justify-center gap-2">
             <span className="text-lg">⚠️</span>
             {errors.scheduling}
           </div>
         )}
      </div>
    </div>
  );
};

export default SchedulingStep;