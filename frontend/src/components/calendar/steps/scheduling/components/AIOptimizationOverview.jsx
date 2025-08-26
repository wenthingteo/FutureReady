import React from 'react';
import { Users, Globe, Target } from 'lucide-react';

export const AIOptimizationOverview = ({ overallScore, totalAudience, platformCount, selectedStrategy }) => {
  return (
    <div className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl border border-purple-100/60 shadow-lg p-8">
      <div className="text-center mb-8">
        <h3 className="text-xl font-medium text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-2">
          ✨ AI Optimization Overview
        </h3>
        <p className="text-gray-600 text-base">Your content is optimized for maximum engagement</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Overall Score */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <span className="text-xl font-bold text-white">{overallScore}%</span>
          </div>
          <div className="font-medium text-gray-800">Engagement Score</div>
          <div className="text-sm text-gray-600 mt-1">Predicted performance</div>
        </div>

        {/* Total Audience */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Users className="w-7 h-7 text-white" />
          </div>
          <div className="font-medium text-gray-800">{totalAudience}</div>
          <div className="text-sm text-gray-600 mt-1">Total reach</div>
        </div>

        {/* Platforms */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Globe className="w-7 h-7 text-white" />
          </div>
          <div className="font-medium text-gray-800">{platformCount}</div>
          <div className="text-sm text-gray-600 mt-1">Platforms selected</div>
        </div>

        {/* Strategy */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
            <Target className="w-7 h-7 text-white" />
          </div>
          <div className="font-medium text-gray-800 capitalize">{selectedStrategy}</div>
          <div className="text-sm text-gray-600 mt-1">Strategy</div>
        </div>
      </div>
    </div>
  );
};
