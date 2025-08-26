import React from 'react';
import { Facebook, Instagram, Linkedin, Zap, Youtube } from 'lucide-react';

// Custom TikTok Icon Component
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const ChannelSelectionStep = ({ formData, onPlatformToggle, errors }) => {
  const platforms = [
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: Facebook, 
      gradient: 'from-blue-600 to-blue-700',
      bgClass: 'bg-gradient-to-br from-blue-600 to-blue-700'
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: Instagram, 
      gradient: 'from-purple-500 via-pink-500 to-orange-400',
      bgClass: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400'
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: Linkedin, 
      gradient: 'from-blue-700 to-blue-800',
      bgClass: 'bg-gradient-to-br from-blue-700 to-blue-800'
    },
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      icon: TikTokIcon, 
      gradient: 'from-black via-red-500 to-white',
      bgClass: 'bg-gradient-to-br from-black via-red-500 to-white'
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: Youtube, 
      gradient: 'from-red-500 to-red-600',
      bgClass: 'bg-gradient-to-br from-red-500 to-red-600'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <div className="inline-flex items-center gap-4 mb-8">
          <div className="w-8 h-8 bg-[#3264DF]/80 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-sm">
            1
          </div>
          <h3 className="text-3xl font-normal text-gray-800 tracking-tight">Choose Your Channels</h3>
        </div>
        <p className="text-gray-600 text-base max-w-lg mx-auto leading-relaxed">Select the platforms where you want to publish your content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            type="button"
            onClick={() => onPlatformToggle(platform.id)}
            className={`p-8 border rounded-2xl text-center transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg ${
              formData.platforms.includes(platform.id)
                ? 'border-[#3264DF]/30 bg-[#3264DF]/8 shadow-md ring-1 ring-[#3264DF]/10'
                : 'border-gray-200/60 hover:border-[#3264DF]/20 bg-white hover:shadow-md hover:bg-gray-50/50'
            }`}
          >
            <div className="mb-6">
              <div className={`w-16 h-16 mx-auto rounded-2xl ${platform.bgClass} flex items-center justify-center shadow-lg transition-all duration-300 ${
                formData.platforms.includes(platform.id) 
                  ? 'scale-110 shadow-xl' 
                  : 'hover:scale-105'
              }`}>
                <platform.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className={`font-medium text-base ${
              formData.platforms.includes(platform.id) 
                ? 'text-[#3264DF]' 
                : 'text-gray-700'
            }`}>{platform.name}</div>
          </button>
        ))}
      </div>

      {errors.platforms && (
        <div className="mt-8 p-4 bg-red-50/70 border border-red-200/50 rounded-xl text-center">
          <p className="text-red-600 text-sm font-medium">{errors.platforms}</p>
        </div>
      )}
    </div>
  );
};

export default ChannelSelectionStep;
