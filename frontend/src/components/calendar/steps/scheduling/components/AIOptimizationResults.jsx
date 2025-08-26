import React from 'react';
import { TrendingUp } from 'lucide-react';
import { getPlatformConfig } from '../utils/platformConfig.jsx';

export const AIOptimizationResults = ({ platforms, schedulingData, selectedStrategy, onAlternativeTimeClick }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {platforms.map((platform) => {
        const config = getPlatformConfig(platform);
        const Icon = config.icon;
        const scheduling = schedulingData[platform];
        
        return (
          <div key={platform} className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl border border-slate-200/60 shadow-lg overflow-hidden hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300">
            {/* Platform Header */}
            <div className="p-6 border-b border-slate-200/60">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${config.bgClass} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 capitalize">{platform}</h3>
                    <p className="text-gray-600 text-sm">{config.audience} followers</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">
                    {scheduling?.confidence || 0}%
                  </div>
                  <div className="text-gray-600 text-sm">confidence</div>
                </div>
              </div>
            </div>

            {/* Scheduling Details */}
            <div className="p-6 space-y-4">
              {/* Suggested Time */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 rounded-2xl border border-emerald-200/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">✨ Optimal Time</div>
                    <div className="text-sm text-gray-600">Based on {selectedStrategy} strategy</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">
                    {scheduling?.suggestedTime}
                  </div>
                  <div className="text-xs text-emerald-600">Best for {config.peakDays.join(', ')}</div>
                </div>
              </div>

              {/* Performance Prediction */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-200/60">
                  <div className="text-lg font-medium text-gray-800">{config.engagement}</div>
                  <div className="text-xs text-gray-600">Engagement</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-200/60">
                  <div className="text-lg font-medium text-gray-800">{config.audience}</div>
                  <div className="text-xs text-gray-600">Reach</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-200/60">
                  <div className="text-lg font-medium text-gray-800">{config.bestTimes.length}</div>
                  <div className="text-xs text-gray-600">Time slots</div>
                </div>
              </div>

              {/* Alternative Times */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-3">⏰ Alternative times</div>
                <div className="flex gap-2">
                  {config.bestTimes.slice(1, 3).map((time, index) => (
                    <button
                      key={index}
                      onClick={() => onAlternativeTimeClick(platform, time)}
                      className="px-3 py-2 text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl hover:from-blue-100 hover:to-indigo-100 hover:text-blue-800 transition-all duration-200 border border-blue-200/60 hover:border-blue-300/60 hover:shadow-md"
                    >
                      {time.time} ({time.score}%)
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
