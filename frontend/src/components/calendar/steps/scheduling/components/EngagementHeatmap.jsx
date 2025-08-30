import React from 'react';
import { BarChart3, CheckCircle, Sparkles } from 'lucide-react';

export const EngagementHeatmap = ({
  selectedDate,
  selectedPlatformForHeatmap,
  selectedTimeSlot,
  onTimeSlotClick,
  existingEvents
}) => {
  // Get engagement intensity for heatmap based on platform
  const getEngagementIntensity = (hour, day) => {
    // Platform-specific optimal times
    const platformOptimalTimes = {
      instagram: {
        peak: [11, 12, 13, 17, 18, 19],
        good: [9, 10, 14, 15, 16, 20, 21],
      },
      facebook: {
        peak: [9, 10, 15, 16, 17],
        good: [11, 12, 13, 14, 18, 19, 20],
      },
      linkedin: {
        peak: [8, 9, 10, 12, 13, 17, 18],
        good: [11, 14, 15, 16],
      },
      youtube: {
        peak: [14, 15, 16, 19, 20, 21],
        good: [10, 11, 12, 17, 18, 22],
      },
      tiktok: {
        peak: [18, 19, 20, 21, 22],
        good: [12, 13, 14, 15, 16, 17],
      }
    };

    const times = platformOptimalTimes[selectedPlatformForHeatmap] || platformOptimalTimes.instagram;
    
    if (times.peak.includes(hour)) {
      return day < 5 ? 'high' : 'medium';
    } else if (times.good.includes(hour)) {
      return day < 5 ? 'medium' : 'low';
    } else if (hour >= 1 && hour <= 6) {
      return 'very-low';
    }
    return 'low';
  };

  // Check if there are existing events at a specific time
  const hasExistingEvent = (day, hour) => {
    const targetDate = new Date(selectedDate);
    targetDate.setDate(selectedDate.getDate() + ((day - selectedDate.getDay() + 7) % 7));
    targetDate.setHours(hour, 0, 0, 0);
    
    return existingEvents.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getTime() === targetDate.getTime();
    });
  };

  return (
    <div className="bg-gradient-to-br from-white via-slate-50/30 to-slate-100/50 rounded-3xl border border-slate-200/60 shadow-xl overflow-hidden">
      {/* Heatmap Header */}
      <div className="bg-gradient-to-r from-slate-100/80 to-slate-200/80 backdrop-blur-sm px-8 py-6 border-b border-slate-200/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-transparent bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text">
                📊 Engagement Heatmap
              </h4>
              <p className="text-sm text-slate-600">Best times for {selectedPlatformForHeatmap}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600">This Week</div>
            <div className="text-xs text-slate-500">
              {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(selectedDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-8 gap-2">
          {/* Header Row */}
          <div className="text-xs text-slate-500 text-right pr-2 font-medium flex items-center justify-end">
            <div className="bg-slate-100 px-2 py-1 rounded-lg text-slate-600 font-medium text-xs">Time</div>
          </div>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const dayDate = new Date(selectedDate);
            dayDate.setDate(selectedDate.getDate() + ((index - selectedDate.getDay() + 7) % 7));
            const dateNumber = dayDate.getDate();
            
            return (
              <div key={day} className="text-center py-2">
                <div className={`inline-flex flex-col items-center justify-center w-12 h-10 rounded-xl transition-all duration-300 hover:scale-105 shadow-sm ${
                  index < 5 
                    ? 'bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 border border-blue-200/60' 
                    : 'bg-gradient-to-br from-amber-50 to-orange-50 text-orange-700 border border-orange-200/60'
                }`}>
                  <div className="text-xs font-bold">{day}</div>
                  <div className="text-sm font-bold">{dateNumber}</div>
                </div>
              </div>
            );
          })}

          {/* Time Rows - Simplified */}
          {Array.from({ length: 24 }, (_, hour) => {
            const timeLabel = hour === 0 ? '12 AM' : 
                            hour === 6 ? '6 AM' : 
                            hour === 12 ? '12 PM' : 
                            hour === 18 ? '6 PM' : '';
            
            return (
              <React.Fragment key={hour}>
                {/* Time Label */}
                <div className="text-xs text-slate-600 text-right pr-3 py-2 font-medium flex items-center justify-end">
                  {timeLabel && (
                    <div className="bg-gradient-to-r from-slate-100 to-slate-200 px-3 py-1.5 rounded-xl text-slate-700 font-medium shadow-sm border border-slate-200/60">
                      {timeLabel}
                    </div>
                  )}
                </div>
                
                {/* Day Cells */}
                {[0, 1, 2, 3, 4, 5, 6].map(day => {
                  const intensity = getEngagementIntensity(hour, day);
                  const hasEvent = hasExistingEvent(day, hour);
                  const isSelected = selectedTimeSlot && selectedTimeSlot.day === day && selectedTimeSlot.hour === hour;
                  
                  const intensityClasses = {
                    'very-low': 'bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border-slate-200/60',
                    'low': 'bg-gradient-to-br from-blue-100 to-cyan-200 hover:from-blue-200 hover:to-cyan-300 border-blue-300/60',
                    'medium': 'bg-gradient-to-br from-violet-200 to-purple-400 hover:from-violet-300 hover:to-purple-500 border-purple-400/60',
                    'high': 'bg-gradient-to-br from-pink-400 to-rose-600 hover:from-pink-500 hover:to-rose-700 border-rose-500/60'
                  };

                  return (
                    <div
                      key={`${day}-${hour}`}
                      className={`h-6 rounded-xl cursor-pointer transition-all duration-300 relative border-2 transform hover:scale-110 hover:shadow-lg hover:z-10 group ${
                        isSelected 
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 ring-4 ring-indigo-500/30 shadow-xl scale-110 z-20' 
                          : hasEvent
                            ? 'bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 border-emerald-400/60 shadow-md'
                            : `${intensityClasses[intensity]} hover:shadow-md`
                      }`}
                      onClick={() => onTimeSlotClick(day, hour)}
                    >
                      {/* Engagement Level Indicator */}
                      {intensity === 'high' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full border-2 border-white shadow-lg animate-pulse">
                          <div className="absolute inset-1 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full flex items-center justify-center">
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                          </div>
                        </div>
                      )}
                      
                      {/* Existing Event Indicator */}
                      {hasEvent && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center border border-white/60">
                            <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
                          </div>
                        </div>
                      )}
                      
                      {/* Selected Indicator */}
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center animate-pulse border border-white/60">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>

        {/* Legend */}
        <div className="bg-gradient-to-r from-slate-50/80 to-slate-100/80 rounded-xl p-4 mt-6 border border-slate-200/60 backdrop-blur-sm">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-8 flex-wrap">
              {/* Engagement Legend */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Engagement:</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-slate-200/60 shadow-sm"></div>
                    <span className="text-xs text-slate-600 font-medium">Quiet</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 bg-gradient-to-br from-blue-100 to-cyan-200 rounded-xl border-2 border-blue-300/60 shadow-sm"></div>
                    <span className="text-xs text-slate-600 font-medium">Low</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 bg-gradient-to-br from-violet-200 to-purple-400 rounded-xl border-2 border-purple-400/60 shadow-sm"></div>
                    <span className="text-xs text-slate-600 font-medium">Good</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 bg-gradient-to-br from-pink-400 to-rose-600 rounded-xl border-2 border-rose-500/60 shadow-sm relative">
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full border-2 border-white shadow-lg">
                        <div className="absolute inset-0.5 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full"></div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-600 font-bold">🔥 Peak</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pro Tips Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200/60 max-w-sm shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-900">💡 Pro Tips</span>
              </div>
              <div className="text-xs text-blue-800 leading-relaxed space-y-1.5">
                <div>🔥 Peak times = highest engagement</div>
                <div>🎯 Click cells to schedule posts</div>
                <div>📊 Switch platforms for insights</div>
                <div>📅 Weekdays often outperform weekends</div>
              </div>
            </div>
          </div>
          
          {/* Selected Time Display */}
          {selectedTimeSlot && (
            <div className="mt-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/60 px-6 py-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-indigo-900">
                  🎯 Selected: {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][selectedTimeSlot.day]} at {selectedTimeSlot.time}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
