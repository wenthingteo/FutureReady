import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { getPlatformConfig } from '../utils/platformConfig.jsx';

export const AIOptimizationResults = ({ platforms, schedulingData, selectedStrategy, onAlternativeTimeClick, formData }) => {

    return (
    <div className="space-y-6">
      {/* Platform Results Container */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Optimization Results</h3>
          <p className="text-gray-600 text-sm">Platform-specific scheduling recommendations based on your content and audience</p>
        </div>
        
        {/* Platform Results */}
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
         {platforms.map((platform) => {
           const config = getPlatformConfig(platform);
           const Icon = config.icon;
           const scheduling = schedulingData[platform];
           
           return (
             <div key={platform} className="bg-gradient-to-br from-white to-slate-50/50 rounded-xl border border-slate-200/60 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
               {/* Platform Header */}
               <div className="p-5 border-b border-slate-200/60">
                 <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-xl ${config.bgClass} flex items-center justify-center shadow-md`}>
                       <Icon className="w-5 h-5 text-white" />
                     </div>
                                           <div>
                        <h3 className="text-base font-semibold text-gray-800 capitalize">{platform}</h3>
                        <p className="text-gray-600 text-sm">
                          {platform === 'linkedin' ? 'Professional network & B2B audience' :
                           platform === 'instagram' ? 'Visual content & creative community' :
                           platform === 'facebook' ? 'Social community & family connections' :
                           platform === 'youtube' ? 'Video content & educational audience' :
                           platform === 'tiktok' ? 'Short-form video & trending content' :
                           `${config.audience} followers`}
                        </p>
                      </div>
                   </div>
                   <div className="text-right">
                     <div className="text-xl font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">
                       {scheduling?.confidence || 0}%
                     </div>
                     <div className="text-gray-600 text-sm">confidence</div>
                   </div>
                </div>
              </div>

               {/* Scheduling Details */}
               <div className="p-5 space-y-4">
                 {/* Suggested Time */}
                 <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 rounded-xl border border-emerald-200/60">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/25">
                       <TrendingUp className="w-4 h-4 text-white" />
                     </div>
                     <div>
                       <div className="font-semibold text-gray-800 text-sm">Optimal Time</div>
                       <div className="text-sm text-gray-600">{selectedStrategy} strategy</div>
                     </div>
                   </div>
                   <div className="text-right">
                     <div className="text-lg font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">
                       {scheduling?.suggestedTime}
                     </div>
                     <div className="text-sm text-emerald-600">{config.peakDays.join(', ')}</div>
                   </div>
                </div>

                 

                 {/* Alternative Times */}
                 <div>
                   <div className="text-sm font-semibold text-gray-700 mb-3">⏰ Alternative times</div>
                   <div className="flex gap-2">
                     {config.bestTimes.slice(1, 3).map((time, index) => (
                       <button
                         key={index}
                         onClick={() => onAlternativeTimeClick(platform, time)}
                         className="px-3 py-2 text-sm bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg hover:from-blue-100 hover:to-indigo-100 hover:text-blue-800 transition-all duration-200 border border-blue-200/60 hover:border-blue-300/60 hover:shadow-sm font-medium"
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
      </div>
    </div>
  );
};
