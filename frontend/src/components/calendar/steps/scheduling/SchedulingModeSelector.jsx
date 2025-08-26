import React from 'react';
import { Sparkles, Settings } from 'lucide-react';

export const SchedulingModeSelector = ({ schedulingMode, onModeChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-8">
      <div className="text-center mb-8">
        <h3 className="text-xl font-normal text-gray-800 mb-2">Choose Scheduling Method</h3>
        <p className="text-gray-600 text-base">AI optimization or manual control with time suggestions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <button
          onClick={() => onModeChange('ai')}
          className={`p-8 border rounded-2xl text-center transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg ${
            schedulingMode === 'ai'
              ? 'border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 shadow-lg ring-1 ring-purple-200/50'
              : 'border-gray-200/60 hover:border-purple-200/40 bg-white hover:shadow-md hover:bg-gradient-to-br hover:from-purple-50/30 hover:to-pink-50/30'
          }`}
        >
          <div className="mb-6">
            <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 flex items-center justify-center shadow-lg transition-all duration-300 ${
              schedulingMode === 'ai' 
                ? 'scale-110 shadow-xl shadow-purple-500/25' 
                : 'hover:scale-105 hover:shadow-purple-500/20'
            }`}>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className={`font-medium text-base mb-2 ${
            schedulingMode === 'ai' 
              ? 'text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text' 
              : 'text-gray-700'
          }`}>AI Optimize</div>
          <div className="text-sm text-gray-600 leading-relaxed">Let AI find the best posting times automatically</div>
        </button>

        <button
          onClick={() => onModeChange('manual')}
          className={`p-8 border rounded-2xl text-center transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg ${
            schedulingMode === 'manual'
              ? 'border-slate-200 bg-slate-50/80 shadow-md ring-1 ring-slate-200/50'
              : 'border-gray-200/60 hover:border-slate-200/60 bg-white hover:shadow-md hover:bg-slate-50/30'
          }`}
        >
          <div className="mb-6">
            <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center shadow-lg transition-all duration-300 ${
              schedulingMode === 'manual' 
                ? 'scale-110 shadow-xl shadow-slate-400/25' 
                : 'hover:scale-105 hover:shadow-slate-400/20'
            }`}>
              <Settings className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className={`font-medium text-base mb-2 ${
            schedulingMode === 'manual' 
              ? 'text-slate-700' 
              : 'text-gray-700'
          }`}>Manual Schedule</div>
          <div className="text-sm text-gray-600 leading-relaxed">Choose your own times with optimization suggestions</div>
        </button>
      </div>
    </div>
  );
};
