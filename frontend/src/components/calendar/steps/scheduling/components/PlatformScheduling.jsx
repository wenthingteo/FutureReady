import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { getPlatformConfig } from '../utils/platformConfig.jsx';

export const PlatformScheduling = ({
  platforms,
  schedulingData,
  selectedTimeSlot,
  selectedPlatformForHeatmap,
  selectedDate,
  onManualTimeChange
}) => {
  return (
    <div className="p-8 border-t border-gray-200">
      <h4 className="text-lg font-semibold text-gray-800 mb-6">Schedule Each Platform</h4>
      
      {selectedTimeSlot && (
        <div className="mb-6 p-4 bg-[#3264DF]/5 border border-[#3264DF]/20 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#3264DF] rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-800">
                  Applied to {selectedPlatformForHeatmap.charAt(0).toUpperCase() + selectedPlatformForHeatmap.slice(1)}
                </div>
                <div className="text-sm text-gray-600">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][selectedTimeSlot.day]} at {selectedTimeSlot.time} - {new Date(selectedDate.getTime() + (selectedTimeSlot.day - selectedDate.getDay()) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                const targetDate = new Date(selectedDate);
                targetDate.setDate(selectedDate.getDate() + ((selectedTimeSlot.day - selectedDate.getDay() + 7) % 7));
                const dateString = targetDate.toISOString().split('T')[0];
                
                platforms.forEach(platform => {
                  onManualTimeChange(platform, 'customTime', selectedTimeSlot.time);
                  onManualTimeChange(platform, 'customDate', dateString);
                });
              }}
              className="px-4 py-2 bg-[#3264DF] text-white rounded-lg hover:bg-[#2952cc] transition-colors text-sm font-medium"
            >
              Apply to All
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {platforms.map(platform => {
          const config = getPlatformConfig(platform);
          const Icon = config.icon;
          const platformScheduling = schedulingData[platform];
          
          return (
            <div key={platform} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${config.bgClass} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 capitalize">{platform}</h5>
                  <p className="text-sm text-gray-600">Set custom schedule for this platform</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={platformScheduling?.customDate || ''}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF] transition-all duration-200"
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => onManualTimeChange(platform, 'customDate', e.target.value)}
                  />
                  {platformScheduling?.customDate && (
                    <div className="mt-1 text-xs text-gray-500">
                      {new Date(platformScheduling.customDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={platformScheduling?.customTime || ''}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF] transition-all duration-200"
                    onChange={(e) => onManualTimeChange(platform, 'customTime', e.target.value)}
                  />
                </div>
              </div>
              
              {platformScheduling?.customDate && platformScheduling?.customTime && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Scheduled for {new Date(platformScheduling.customDate + 'T' + platformScheduling.customTime).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
