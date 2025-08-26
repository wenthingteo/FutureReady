import React from 'react';
import { Sparkles, CheckCircle, Calendar } from 'lucide-react';

export const SchedulingOverlay = ({ 
  isScheduling, 
  isCompleted, 
  schedulingMode, 
  schedulingProgress, 
  currentStep, 
  formData, 
  onClose 
}) => {
  if (!isScheduling) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
        {!isCompleted ? (
          <div className="text-center space-y-6">
            {/* Loading Animation */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div 
                className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"
                style={{
                  background: `conic-gradient(from 0deg, #3264DF ${schedulingProgress * 3.6}deg, transparent ${schedulingProgress * 3.6}deg)`
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
            </div>

            {/* Progress Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {schedulingMode === 'ai' ? 'AI Scheduling in Progress' : 'Processing Your Schedule'}
              </h3>
              <p className="text-gray-600 text-sm">{currentStep}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${schedulingProgress}%` }}
              ></div>
            </div>

            {/* Progress Percentage */}
            <div className="text-2xl font-bold text-blue-600">
              {schedulingProgress}%
            </div>

            {/* Platform Icons */}
            <div className="flex justify-center gap-2">
              {formData.platforms.map((platform, index) => {
                const platformThreshold = ((index + 1) / formData.platforms.length) * 100;
                const isProcessed = schedulingProgress >= platformThreshold;
                
                return (
                  <div 
                    key={platform}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${
                      isProcessed 
                        ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 shadow-lg scale-110' 
                        : 'bg-gray-200 scale-100'
                    }`}
                  >
                    <span className={`text-lg ${isProcessed ? 'text-white' : 'text-gray-400'}`}>
                      {platform === 'instagram' ? '📸' : 
                       platform === 'facebook' ? '📘' : 
                       platform === 'linkedin' ? '💼' : 
                       platform === 'youtube' ? '📺' : 
                       platform === 'tiktok' ? '🎵' : '🌐'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Success State */
          <div className="text-center space-y-6">
            {/* Success Animation */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -inset-2 border-4 border-green-200 rounded-full animate-ping"></div>
            </div>

            {/* Success Message */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                🎉 Scheduling Complete!
              </h3>
              <p className="text-gray-600 text-sm">
                Your content has been successfully scheduled across {formData.platforms.length} platform{formData.platforms.length > 1 ? 's' : ''}
              </p>
            </div>

            {/* Scheduled Platforms */}
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Scheduled Platforms</span>
              </div>
              <div className="flex justify-center gap-2">
                {formData.platforms.map(platform => (
                  <div 
                    key={platform}
                    className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 flex items-center justify-center shadow-sm"
                  >
                    <span className="text-white text-sm">
                      {platform === 'instagram' ? '📸' : 
                       platform === 'facebook' ? '📘' : 
                       platform === 'linkedin' ? '💼' : 
                       platform === 'youtube' ? '📺' : 
                       platform === 'tiktok' ? '🎵' : '🌐'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
