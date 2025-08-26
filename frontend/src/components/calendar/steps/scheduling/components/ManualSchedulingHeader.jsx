import React from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Target, CheckCircle } from 'lucide-react';
import { getPlatformConfig } from '../utils/platformConfig.jsx';

export const ManualSchedulingHeader = ({
  selectedDate,
  onDateChange,
  platforms,
  selectedPlatformForHeatmap,
  onPlatformChange,
  existingEvents
}) => {
  return (
    <div className="p-8 border-b border-gray-200/60">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-normal text-gray-800 mb-2">
            Manual Scheduling with Time Suggestions
          </h3>
          <p className="text-gray-600 text-base">
            Click on time slots to schedule posts • Platform-specific suggestions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-gray-50 rounded-xl border border-gray-200/60 shadow-sm p-1 flex items-center gap-1">
            <button
              onClick={() => onDateChange(new Date(selectedDate.setDate(selectedDate.getDate() - 7)))}
              className="p-2 hover:bg-white rounded-lg transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-sm font-medium text-gray-800 min-w-[120px] text-center px-3 py-1">
              {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <button
              onClick={() => onDateChange(new Date(selectedDate.setDate(selectedDate.getDate() + 7)))}
              className="p-2 hover:bg-white rounded-lg transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Platform Selector for Heatmap */}
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-3">View suggestions for:</div>
        <div className="flex gap-3 flex-wrap">
          {platforms.map(platform => {
            const config = getPlatformConfig(platform);
            const Icon = config.icon;
            const isSelected = selectedPlatformForHeatmap === platform;
            
            return (
              <button
                key={platform}
                onClick={() => onPlatformChange(platform)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 hover:translate-y-[-1px] hover:shadow-md ${
                  isSelected
                    ? 'border-[#3264DF]/30 bg-[#3264DF]/8 shadow-md ring-1 ring-[#3264DF]/10 text-[#3264DF]'
                    : 'border-gray-200/60 hover:border-[#3264DF]/20 bg-white hover:bg-gray-50/50 text-gray-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-lg ${config.bgClass} flex items-center justify-center`}>
                  <Icon className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium capitalize">{platform}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-xl flex items-center justify-center shadow-sm">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Peak Engagement</div>
              <div className="font-medium text-gray-800">7-9 PM</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-xl flex items-center justify-center shadow-sm">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Best Days</div>
              <div className="font-medium text-gray-800">Tue, Thu</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-xl flex items-center justify-center shadow-sm">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Scheduled</div>
              <div className="font-medium text-gray-800">{existingEvents.length} Posts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
