import React, { useState, useEffect } from 'react';
import { FiCheck, FiClock, FiCalendar, FiGlobe, FiStar, FiTrendingUp, FiArrowLeft } from 'react-icons/fi';

const CalendarScheduling = ({ scheduleData, onScheduleComplete, aiRecommendation, onBack, onTriggerAIResponse }) => {
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const [clickedButtons, setClickedButtons] = useState(new Set());
  const [aiOptimized, setAiOptimized] = useState(false);

  // Reset clicked buttons when component mounts (new step)
  useEffect(() => {
    setClickedButtons(new Set());
  }, []);

  useEffect(() => {
    if (aiRecommendation && !aiOptimized) {
      setTimeout(() => {
        setAiOptimized(true);
      }, 1000);
    }
  }, [aiRecommendation, aiOptimized]);

  const handleSlotClick = (slotId) => {
    const newSelectedSlots = new Set(selectedSlots);
    if (newSelectedSlots.has(slotId)) {
      newSelectedSlots.delete(slotId);
    } else {
      newSelectedSlots.add(slotId);
    }
    setSelectedSlots(newSelectedSlots);
  };

  const handleContinue = () => {
    setClickedButtons(prev => new Set([...prev, 'continue']));
    
    // Trigger user dialog for continue action
    if (onTriggerAIResponse) {
      setTimeout(() => {
        onTriggerAIResponse(`I have approved the content schedule. Please proceed to configure the advertising campaigns.`);
      }, 100);
    }
    
    // Small delay to show the grey state before action
    setTimeout(() => {
      onScheduleComplete(scheduleData.filter(slot => selectedSlots.has(slot.id)));
    }, 100);
  };

  const handleModifyClick = () => {
    setClickedButtons(prev => new Set([...prev, 'modify']));
    
    // Trigger user dialog for modify action
    if (onTriggerAIResponse) {
      setTimeout(() => {
        onTriggerAIResponse(`I would like to modify the content schedule. Can you help me adjust the timing or add more slots?`);
      }, 100);
    }
    
    console.log('User wants to modify schedule via chat');
  };

  const getSelectedCount = () => {
    return selectedSlots.size;
  };

  const getOptimalTimingReason = (item) => {
    const reasons = {
      'Brand Video Launch': 'Peak engagement time when audience is most active',
      'Social Post Series': 'Optimal time for Instagram user engagement',
      'LinkedIn Content': 'Professional audience most active during business hours',
      'TikTok Campaign': 'Younger audience peak activity time',
      'Facebook Ads': 'Highest conversion rate during evening hours'
    };
    return reasons[item.title] || 'AI-optimized timing for maximum engagement';
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Workflow
        </button>
      )}

      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
          <FiCalendar className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Content Scheduling</h3>
          <p className="text-gray-600">Schedule your content for optimal engagement times</p>
        </div>
      </div>

      {/* AI Optimization Banner */}
      {aiOptimized && (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <FiStar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">AI Schedule Optimization Complete</h4>
                <p className="text-sm text-gray-600">
                  All time slots optimized for maximum engagement based on audience behavior
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">100%</div>
              <div className="text-xs text-gray-500">Optimized</div>
            </div>
          </div>
        </div>
      )}

      {/* Scheduling Strategy */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
          <FiClock className="w-4 h-4 text-blue-600" />
          AI-Optimized Scheduling Strategy
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FiGlobe className="w-4 h-4 text-green-600" />
            <span>Multi-platform coordination</span>
          </div>
          <div className="flex items-center gap-2">
            <FiTrendingUp className="w-4 h-4 text-purple-600" />
            <span>Peak engagement times</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="w-4 h-4 text-orange-600" />
            <span>Audience behavior analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <FiStar className="w-4 h-4 text-blue-600" />
            <span>AI-powered optimization</span>
          </div>
        </div>
      </div>

      {/* Schedule Items */}
      <div className="space-y-4">
        {scheduleData.map((item) => (
          <div
            key={item.id}
            className={`border-2 rounded-xl p-4 transition-all cursor-pointer hover:shadow-md relative ${
              selectedSlots.has(item.id) 
                ? 'border-green-500 bg-gradient-to-r from-green-50 to-blue-50' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => handleSlotClick(item.id)}
          >
            {/* AI Optimized Badge */}
            {selectedSlots.has(item.id) && aiOptimized && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <FiStar className="w-3 h-3" />
                AI Optimized
              </div>
            )}

            <div className="flex items-start justify-between mb-3">
              <div>
                <h5 className="font-medium text-gray-900">{item.title}</h5>
                <p className="text-sm text-gray-600">{item.platform}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{item.date}</div>
                <div className="text-sm text-gray-600">{item.time}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <FiGlobe className="w-4 h-4 text-blue-600" />
                <span className="text-gray-600">{item.platform}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiClock className="w-4 h-4 text-green-600" />
                <span className="text-gray-600">{item.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiCalendar className="w-4 h-4 text-purple-600" />
                <span className="text-gray-600">{item.date}</span>
              </div>
            </div>

            {/* AI Reasoning for Optimal Timing */}
            {selectedSlots.has(item.id) && (
              <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <FiCheck className="w-4 h-4" />
                  <span>{getOptimalTimingReason(item)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Scheduling Insights */}
      {aiRecommendation && (
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <h4 className="font-medium text-purple-900 mb-3 flex items-center gap-2">
            <FiTrendingUp className="w-4 h-4" />
            AI Scheduling Insights
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-purple-800">Engagement Optimization</div>
              <div className="text-purple-600">Timing aligned with audience peak activity</div>
            </div>
            <div>
              <div className="font-medium text-purple-800">Cross-Platform Sync</div>
              <div className="text-purple-600">Coordinated posting across all platforms</div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {getSelectedCount() > 0 
            ? `${getSelectedCount()} of ${scheduleData.length} slots scheduled`
            : 'Select time slots to continue'
          }
        </div>
        <div className="flex gap-3">
                        <button
                onClick={handleModifyClick}
                disabled={clickedButtons.has('modify')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  clickedButtons.has('modify')
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiClock className="w-4 h-4" />
                Modify
              </button>
              <button
                onClick={handleContinue}
                disabled={clickedButtons.has('continue')}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  clickedButtons.has('continue')
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg'
                }`}
              >
                Continue to Ads Setup
                <FiTrendingUp className="w-4 h-4" />
              </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarScheduling;
