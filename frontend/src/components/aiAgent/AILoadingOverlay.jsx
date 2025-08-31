import React from 'react';
import { Sparkles, CheckCircle, Calendar, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

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
    default: return Sparkles;
  }
};

const AILoadingOverlay = ({ 
  isLoading, 
  isCompleted, 
  loadingProgress, 
  currentStep, 
  platforms = ['facebook', 'instagram', 'linkedin', 'tiktok', 'youtube'], 
  onClose 
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
        {!isCompleted ? (
          <div className="text-center space-y-6">
            {/* Loading Animation */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div 
                className="absolute inset-0 border-4 border-transparent border-t-[#475ECD] rounded-full animate-spin"
                style={{
                  background: `conic-gradient(from 0deg, #475ECD ${loadingProgress * 3.6}deg, transparent ${loadingProgress * 3.6}deg)`
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#475ECD] animate-pulse" />
              </div>
            </div>

            {/* Progress Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                AI Campaign Processing
              </h3>
              <p className="text-gray-600 text-sm">{currentStep}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#475ECD] to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>

            {/* Progress Percentage */}
            <div className="text-2xl font-bold text-[#475ECD]">
              {loadingProgress}%
            </div>

            {/* Platform Icons */}
            <div className="flex justify-center gap-2">
              {platforms.map((platform, index) => {
                const platformThreshold = ((index + 1) / platforms.length) * 100;
                const isProcessed = loadingProgress >= platformThreshold;
                const Icon = getPlatformIcon(platform);
                
                // Platform-specific colors
                const getPlatformColors = (platform) => {
                  switch (platform) {
                    case 'instagram': return 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400';
                    case 'facebook': return 'bg-gradient-to-br from-blue-600 to-blue-700';
                    case 'linkedin': return 'bg-gradient-to-br from-blue-700 to-blue-800';
                    case 'youtube': return 'bg-gradient-to-br from-red-500 to-red-600';
                    case 'tiktok': return 'bg-gradient-to-br from-black via-red-500 to-white';
                    default: return 'bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600';
                  }
                };
                
                return (
                  <div 
                    key={platform}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${
                      isProcessed 
                        ? `${getPlatformColors(platform)} shadow-lg scale-110` 
                        : 'bg-gray-200 scale-100'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isProcessed ? 'text-white' : 'text-gray-400'}`} />
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
                🎉 Campaign Ready!
              </h3>
              <p className="text-gray-600 text-sm">
                Your social media campaign has been successfully created and is ready to launch
              </p>
            </div>

            {/* Campaign Platforms */}
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Campaign Platforms</span>
              </div>
              <div className="flex justify-center gap-2">
                {platforms.map(platform => {
                  const Icon = getPlatformIcon(platform);
                  
                  // Platform-specific colors
                  const getPlatformColors = (platform) => {
                    switch (platform) {
                      case 'instagram': return 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400';
                      case 'facebook': return 'bg-gradient-to-br from-blue-600 to-blue-700';
                      case 'linkedin': return 'bg-gradient-to-br from-blue-700 to-blue-800';
                      case 'youtube': return 'bg-gradient-to-br from-red-500 to-red-600';
                      case 'tiktok': return 'bg-gradient-to-br from-black via-red-500 to-white';
                      default: return 'bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600';
                    }
                  };
                  
                  return (
                    <div 
                      key={platform}
                      className={`w-8 h-8 rounded-lg ${getPlatformColors(platform)} flex items-center justify-center shadow-sm`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  );
                })}
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

export default AILoadingOverlay;
