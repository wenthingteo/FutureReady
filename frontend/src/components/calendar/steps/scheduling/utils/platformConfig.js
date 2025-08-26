import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

// Custom TikTok Icon Component
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.10z"/>
  </svg>
);

export const getPlatformConfig = (platform) => {
  const configs = {
    instagram: {
      icon: Instagram,
      gradient: 'from-purple-500 via-pink-500 to-orange-400',
      bgClass: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
      primaryTime: '2:00 PM',
      engagement: '94%',
      audience: '2.3M',
      peakDays: ['Tuesday', 'Thursday'],
      bestTimes: [
        { time: '11:00 AM', score: 92, reason: 'Morning coffee scroll' },
        { time: '2:00 PM', score: 94, reason: 'Lunch break peak' },
        { time: '7:00 PM', score: 89, reason: 'Evening wind-down' }
      ]
    },
    facebook: {
      icon: Facebook,
      gradient: 'from-blue-600 to-blue-700',
      bgClass: 'bg-gradient-to-br from-blue-600 to-blue-700',
      primaryTime: '1:00 PM',
      engagement: '87%',
      audience: '1.8M',
      peakDays: ['Wednesday', 'Saturday'],
      bestTimes: [
        { time: '1:00 PM', score: 87, reason: 'Midday social check' },
        { time: '3:00 PM', score: 84, reason: 'Afternoon engagement' },
        { time: '8:00 PM', score: 82, reason: 'Evening family time' }
      ]
    },
    linkedin: {
      icon: Linkedin,
      gradient: 'from-blue-700 to-blue-800',
      bgClass: 'bg-gradient-to-br from-blue-700 to-blue-800',
      primaryTime: '8:00 AM',
      engagement: '91%',
      audience: '856K',
      peakDays: ['Tuesday', 'Wednesday'],
      bestTimes: [
        { time: '8:00 AM', score: 91, reason: 'Morning commute' },
        { time: '12:00 PM', score: 88, reason: 'Lunch networking' },
        { time: '5:00 PM', score: 85, reason: 'End of workday' }
      ]
    },
    youtube: {
      icon: Youtube,
      gradient: 'from-red-500 to-red-600',
      bgClass: 'bg-gradient-to-br from-red-500 to-red-600',
      primaryTime: '8:00 PM',
      engagement: '96%',
      audience: '3.1M',
      peakDays: ['Friday', 'Sunday'],
      bestTimes: [
        { time: '2:00 PM', score: 90, reason: 'Afternoon viewing' },
        { time: '8:00 PM', score: 96, reason: 'Prime time peak' },
        { time: '9:00 PM', score: 93, reason: 'Evening entertainment' }
      ]
    },
    tiktok: {
      icon: TikTokIcon,
      gradient: 'from-black via-red-500 to-white',
      bgClass: 'bg-gradient-to-br from-black via-red-500 to-white',
      primaryTime: '7:00 PM',
      engagement: '98%',
      audience: '4.2M',
      peakDays: ['Thursday', 'Saturday'],
      bestTimes: [
        { time: '6:00 AM', score: 89, reason: 'Early risers' },
        { time: '7:00 PM', score: 98, reason: 'Peak viral time' },
        { time: '9:00 PM', score: 95, reason: 'Night scroll session' }
      ]
    }
  };
  return configs[platform.toLowerCase()] || configs.instagram;
};

export const schedulingStrategies = {
  optimal: {
    title: 'Maximum Engagement',
    description: 'Schedule at peak times for highest engagement',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  consistent: {
    title: 'Consistent Posting',
    description: 'Maintain regular posting schedule',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  experimental: {
    title: 'Test New Times',
    description: 'Try different times to discover new audiences',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  }
};
