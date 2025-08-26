import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Zap, Instagram, Facebook, Linkedin, Youtube, CheckCircle, AlertCircle, TrendingUp, ArrowRight, Sparkles, Target, BarChart3, Users, Globe, Settings, Eye, Grid3X3, List, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

// Custom TikTok Icon Component
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.10z"/>
  </svg>
);

const SchedulingStep = ({ formData, onSchedule, errors }) => {
  const [schedulingMode, setSchedulingMode] = useState('ai'); // 'ai', 'manual'
  const [selectedStrategy, setSelectedStrategy] = useState('optimal'); // 'optimal', 'consistent', 'experimental'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [schedulingProgress, setSchedulingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedPlatformForHeatmap, setSelectedPlatformForHeatmap] = useState(formData.platforms[0]);
  const [schedulingData, setSchedulingData] = useState(
    formData.platforms.reduce((acc, platform) => {
      acc[platform] = {
        scheduleType: 'optimal',
        suggestedTime: '',
        customTime: '',
        customDate: '',
        timezone: 'UTC+8',
        confidence: 0
      };
      return acc;
    }, {})
  );

  // Sample existing events for demonstration
  const [existingEvents] = useState([
    {
      id: 1,
      title: "Product Launch Post",
      platforms: ['instagram', 'facebook'],
      date: new Date(2024, 11, 20, 14, 0),
      status: 'scheduled'
    },
    {
      id: 2,
      title: "Weekly Newsletter",
      platforms: ['linkedin'],
      date: new Date(2024, 11, 21, 9, 0),
      status: 'scheduled'
    },
    {
      id: 3,
      title: "Tutorial Video",
      platforms: ['youtube', 'tiktok'],
      date: new Date(2024, 11, 22, 19, 0),
      status: 'scheduled'
    }
  ]);

  // Platform configurations with enhanced data
  const getPlatformConfig = (platform) => {
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

  // Smart scheduling strategies
  const schedulingStrategies = {
    optimal: {
      title: 'Maximum Engagement',
      description: 'Schedule at peak times for highest engagement',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    consistent: {
      title: 'Consistent Posting',
      description: 'Maintain regular posting schedule',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    experimental: {
      title: 'Test New Times',
      description: 'Try different times to discover new audiences',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  };

  // Auto-calculate optimal times when component mounts
  useEffect(() => {
    const updatedScheduling = { ...schedulingData };
    formData.platforms.forEach(platform => {
      const config = getPlatformConfig(platform);
      const bestTime = config.bestTimes[0];
      updatedScheduling[platform] = {
        ...updatedScheduling[platform],
        suggestedTime: bestTime.time,
        confidence: bestTime.score
      };
    });
    setSchedulingData(updatedScheduling);
  }, [formData.platforms]);

  const handleStrategyChange = (strategy) => {
    setSelectedStrategy(strategy);
    // Recalculate times based on strategy
    const updatedScheduling = { ...schedulingData };
    formData.platforms.forEach(platform => {
      const config = getPlatformConfig(platform);
      let selectedTime;
      
      switch(strategy) {
        case 'optimal':
          selectedTime = config.bestTimes[0];
          break;
        case 'consistent':
          selectedTime = config.bestTimes[1] || config.bestTimes[0];
          break;
        case 'experimental':
          selectedTime = config.bestTimes[2] || config.bestTimes[0];
          break;
        default:
          selectedTime = config.bestTimes[0];
      }
      
      updatedScheduling[platform] = {
        ...updatedScheduling[platform],
        suggestedTime: selectedTime.time,
        confidence: selectedTime.score
      };
    });
    setSchedulingData(updatedScheduling);
  };

  const handleScheduleAll = () => {
    setIsScheduling(true);
    setSchedulingProgress(0);
    setIsCompleted(false);

    // Simulate AI scheduling process
    const steps = [
      { text: 'Analyzing optimal posting times...', duration: 1500 },
      { text: 'Processing content for each platform...', duration: 1200 },
      { text: 'Optimizing engagement algorithms...', duration: 1000 },
      { text: 'Scheduling posts across platforms...', duration: 1300 },
      { text: 'Finalizing schedule and notifications...', duration: 800 }
    ];

    let currentStepIndex = 0;
    let totalProgress = 0;

    const runStep = () => {
      if (currentStepIndex < steps.length) {
        const step = steps[currentStepIndex];
        setCurrentStep(step.text);
        
        const stepProgress = 100 / steps.length;
        const startProgress = totalProgress;
        const endProgress = totalProgress + stepProgress;
        
        // Animate progress for this step
        const animateProgress = (start, end, duration) => {
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentProgress = start + (end - start) * progress;
            setSchedulingProgress(Math.round(currentProgress));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              totalProgress = endProgress;
              currentStepIndex++;
              setTimeout(runStep, 200);
            }
          };
          animate();
        };

        animateProgress(startProgress, endProgress, step.duration);
      } else {
        // Complete the scheduling
        setSchedulingProgress(100);
        setCurrentStep('Scheduling completed successfully!');
        setTimeout(() => {
          setIsCompleted(true);
          
          // Call the original onSchedule function
          const scheduleData = {
            platforms: formData.platforms,
            content: formData.editedContent || formData.selectedContent,
            scheduling: schedulingData,
            strategy: selectedStrategy
          };
          onSchedule(scheduleData);
        }, 1000);
      }
    };

    runStep();
  };

  const getOverallScore = () => {
    const scores = formData.platforms.map(platform => schedulingData[platform]?.confidence || 0);
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };

  const getTotalAudience = () => {
    return formData.platforms.reduce((total, platform) => {
      const config = getPlatformConfig(platform);
      const audienceNum = parseFloat(config.audience.replace(/[KM]/, '')) * (config.audience.includes('M') ? 1000000 : 1000);
      return total + audienceNum;
    }, 0);
  };

  const formatAudience = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  // Manual scheduling handlers
  const handleManualTimeChange = (platform, field, value) => {
    setSchedulingData(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value,
        scheduleType: 'manual'
      }
    }));
  };

  const handleTimeSlotClick = (day, hour) => {
    const timeSlot = { day, hour, time: `${hour.toString().padStart(2, '0')}:00` };
    setSelectedTimeSlot(timeSlot);
    
    // In manual mode, apply to the selected platform
    if (schedulingMode === 'manual') {
      const targetDate = new Date(selectedDate);
      targetDate.setDate(selectedDate.getDate() + ((day - selectedDate.getDay() + 7) % 7));
      const dateString = targetDate.toISOString().split('T')[0];
      
      // Apply to the currently selected platform for heatmap
      handleManualTimeChange(selectedPlatformForHeatmap, 'customTime', timeSlot.time);
      handleManualTimeChange(selectedPlatformForHeatmap, 'customDate', dateString);
      
      // Store the suggested date for display purposes
      setSelectedDate(targetDate);
    }
  };

  const handleAlternativeTimeClick = (platform, time) => {
    setSchedulingData(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        suggestedTime: time.time,
        confidence: time.score
      }
    }));
  };

  // Get engagement intensity for heatmap based on platform
  const getEngagementIntensity = (hour, day, platform = selectedPlatformForHeatmap) => {
    // Platform-specific optimal times
    const platformOptimalTimes = {
      instagram: {
        peak: [11, 12, 13, 17, 18, 19], // 11am-1pm, 5-7pm
        good: [9, 10, 14, 15, 16, 20, 21], // 9-10am, 2-4pm, 8-9pm
      },
      facebook: {
        peak: [9, 10, 15, 16, 17], // 9-10am, 3-5pm
        good: [11, 12, 13, 14, 18, 19, 20], // 11am-2pm, 6-8pm
      },
      linkedin: {
        peak: [8, 9, 10, 12, 13, 17, 18], // 8-10am, 12-1pm, 5-6pm (business hours)
        good: [11, 14, 15, 16], // 11am, 2-4pm
      },
      youtube: {
        peak: [14, 15, 16, 19, 20, 21], // 2-4pm, 7-9pm
        good: [10, 11, 12, 17, 18, 22], // 10am-12pm, 5-6pm, 10pm
      },
      tiktok: {
        peak: [18, 19, 20, 21, 22], // 6-10pm (evening entertainment)
        good: [12, 13, 14, 15, 16, 17], // 12-5pm
      }
    };

    const times = platformOptimalTimes[platform] || platformOptimalTimes.instagram;
    
    if (times.peak.includes(hour)) {
      return day < 5 ? 'high' : 'medium'; // Weekdays vs weekends
    } else if (times.good.includes(hour)) {
      return day < 5 ? 'medium' : 'low';
    } else if (hour >= 1 && hour <= 6) {
      return 'very-low'; // Very early morning
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
    <div className="space-y-8">
      {/* AI Scheduling Loading Overlay */}
      {isScheduling && (
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
                    const config = getPlatformConfig(platform);
                    const Icon = config.icon;
                    // Calculate when this platform should be processed (distribute evenly across progress)
                    const platformThreshold = ((index + 1) / formData.platforms.length) * 100;
                    const isProcessed = schedulingProgress >= platformThreshold;
                    
                    return (
                      <div 
                        key={platform}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${
                          isProcessed 
                            ? `${config.bgClass} shadow-lg scale-110` 
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
                    {formData.platforms.map(platform => {
                      const config = getPlatformConfig(platform);
                      const Icon = config.icon;
                      
                      return (
                        <div 
                          key={platform}
                          className={`w-8 h-8 rounded-lg ${config.bgClass} flex items-center justify-center shadow-sm`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsScheduling(false);
                    setIsCompleted(false);
                    setSchedulingProgress(0);
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 bg-[#3264DF]/80 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-sm">
            4
          </div>
          <h2 className="text-3xl font-normal text-gray-800 tracking-tight">
            Smart Scheduling
          </h2>
        </div>
        <p className="text-gray-600 text-base max-w-2xl mx-auto leading-relaxed">
          AI-powered scheduling optimization for maximum engagement across all platforms
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Mode Switcher */}
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-normal text-gray-800 mb-2">Choose Scheduling Method</h3>
            <p className="text-gray-600 text-base">AI optimization or manual control with time suggestions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <button
              onClick={() => setSchedulingMode('ai')}
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
              onClick={() => setSchedulingMode('manual')}
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

        {/* Smart Overview Dashboard - AI Mode Only */}
        {schedulingMode === 'ai' && (
          <>
            <div className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl border border-purple-100/60 shadow-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-medium text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-2">✨ AI Optimization Overview</h3>
                <p className="text-gray-600 text-base">Your content is optimized for maximum engagement</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Overall Score */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <span className="text-xl font-bold text-white">{getOverallScore()}%</span>
                  </div>
                  <div className="font-medium text-gray-800">Engagement Score</div>
                  <div className="text-sm text-gray-600 mt-1">Predicted performance</div>
                </div>

                {/* Total Audience */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-medium text-gray-800">{formatAudience(getTotalAudience())}</div>
                  <div className="text-sm text-gray-600 mt-1">Total reach</div>
                </div>

                {/* Platforms */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-medium text-gray-800">{formData.platforms.length}</div>
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

            {/* Strategy Selection */}
            <div className="bg-gradient-to-br from-white to-indigo-50/50 rounded-2xl border border-indigo-100/60 shadow-lg p-8 mt-8">
            <div className="text-center mb-8">
              <h4 className="text-lg font-medium text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text mb-2">🎯 Choose Your Strategy</h4>
              <p className="text-gray-600 text-base">Select how you want AI to optimize your posting schedule</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(schedulingStrategies).map(([key, strategy]) => {
                const Icon = strategy.icon;
                const strategyColors = {
                  optimal: { gradient: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/25', border: 'border-emerald-200', bg: 'bg-emerald-50/50', text: 'text-emerald-700' },
                  consistent: { gradient: 'from-blue-500 to-cyan-600', shadow: 'shadow-blue-500/25', border: 'border-blue-200', bg: 'bg-blue-50/50', text: 'text-blue-700' },
                  experimental: { gradient: 'from-purple-500 to-pink-600', shadow: 'shadow-purple-500/25', border: 'border-purple-200', bg: 'bg-purple-50/50', text: 'text-purple-700' }
                };
                const colors = strategyColors[key] || strategyColors.optimal;
                
                return (
                  <button
                    key={key}
                    onClick={() => handleStrategyChange(key)}
                    className={`p-6 border rounded-2xl text-center transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg ${
                      selectedStrategy === key
                        ? `${colors.border} ${colors.bg} shadow-lg ring-1 ring-${colors.border.split('-')[1]}-200/50`
                        : 'border-gray-200/60 hover:border-indigo-200/40 bg-white hover:shadow-md hover:bg-indigo-50/30'
                    }`}
                  >
                    <div className="mb-4">
                      <div className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg ${colors.shadow} transition-all duration-300 ${
                        selectedStrategy === key 
                          ? 'scale-110 shadow-xl' 
                          : 'hover:scale-105'
                      }`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className={`font-medium text-base mb-2 ${
                      selectedStrategy === key 
                        ? colors.text 
                        : 'text-gray-700'
                    }`}>{strategy.title}</div>
                    <div className="text-sm text-gray-600 leading-relaxed">{strategy.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

            {/* AI Optimization Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {formData.platforms.map((platform) => {
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
                      <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">{scheduling?.confidence || 0}%</div>
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
                      <div className="text-lg font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">{scheduling?.suggestedTime}</div>
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
                          onClick={() => handleAlternativeTimeClick(platform, time)}
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
        </>
        )}

        {/* Manual Scheduling with Time Suggestions */}
        {schedulingMode === 'manual' && (
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-200/60">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-normal text-gray-800 mb-2">
                    Manual Scheduling with Time Suggestions
                  </h3>
                  <p className="text-gray-600 text-base">
                    Click on time slots to schedule posts • Platform-specific suggestions
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-50 rounded-xl border border-gray-200/60 shadow-sm p-1 flex items-center gap-1">
                    <button
                      onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 7)))}
                      className="p-2 hover:bg-white rounded-lg transition-all duration-200"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="text-sm font-medium text-gray-800 min-w-[120px] text-center px-3 py-1">
                      {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <button
                      onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 7)))}
                      className="p-2 hover:bg-white rounded-lg transition-all duration-200"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Platform Selector for Heatmap */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-3">View suggestions for:</div>
                <div className="flex gap-3 flex-wrap">
                  {formData.platforms.map(platform => {
                    const config = getPlatformConfig(platform);
                    const Icon = config.icon;
                    const isSelected = selectedPlatformForHeatmap === platform;
                    
                    return (
                      <button
                        key={platform}
                        onClick={() => setSelectedPlatformForHeatmap(platform)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 hover:translate-y-[-1px] hover:shadow-md ${
                          isSelected
                            ? 'border-[#3264DF]/30 bg-[#3264DF]/8 shadow-md ring-1 ring-[#3264DF]/10 text-[#3264DF]'
                            : 'border-gray-200/60 hover:border-[#3264DF]/20 bg-white hover:bg-gray-50/50 text-gray-700'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-lg ${config.bgClass} flex items-center justify-center`}>
                          <Icon className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium capitalize">{platform}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Stats Bar */}
              <div className="mb-8 grid grid-cols-3 gap-4">
                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-xl flex items-center justify-center shadow-sm">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Peak Engagement</div>
                      <div className="font-medium text-gray-800">7-9 PM</div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-xl flex items-center justify-center shadow-sm">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Best Days</div>
                      <div className="font-medium text-gray-800">Tue, Thu</div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-xl flex items-center justify-center shadow-sm">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Scheduled</div>
                      <div className="font-medium text-gray-800">{existingEvents.length} Posts</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white via-slate-50/30 to-slate-100/50 rounded-3xl border border-slate-200/60 shadow-xl overflow-hidden">
                {/* Heatmap Header */}
                <div className="bg-gradient-to-r from-slate-100/80 to-slate-200/80 backdrop-blur-sm px-8 py-6 border-b border-slate-200/60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-transparent bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text">📊 Engagement Heatmap</h4>
                        <p className="text-sm text-slate-600">Best times for {selectedPlatformForHeatmap}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-600">This Week</div>
                      <div className="text-xs text-slate-500">{selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(selectedDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-8 gap-3">
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
                          <div className={`inline-flex flex-col items-center justify-center w-14 h-12 rounded-2xl transition-all duration-300 hover:scale-105 shadow-sm ${
                            index < 5 
                              ? 'bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 border border-blue-200/60' 
                              : 'bg-gradient-to-br from-amber-50 to-orange-50 text-orange-700 border border-orange-200/60'
                          }`}>
                            <div className="text-xs font-bold">{day}</div>
                            <div className="text-lg font-bold">{dateNumber}</div>
                          </div>
                        </div>
                      );
                    })}

                  {/* Time Rows */}
                  {Array.from({ length: 24 }, (_, hour) => {
                    const timeLabel = hour === 0 ? '12 AM' : 
                                    hour === 3 ? '3 AM' :
                                    hour === 6 ? '6 AM' : 
                                    hour === 9 ? '9 AM' :
                                    hour === 12 ? '12 PM' : 
                                    hour === 15 ? '3 PM' :
                                    hour === 18 ? '6 PM' :
                                    hour === 21 ? '9 PM' : '';
                    
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
                          const intensity = getEngagementIntensity(hour, day, selectedPlatformForHeatmap);
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
                              className={`h-8 rounded-2xl cursor-pointer transition-all duration-300 relative border-2 transform hover:scale-110 hover:shadow-xl hover:z-10 group ${
                                isSelected 
                                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 ring-4 ring-indigo-500/30 shadow-2xl scale-110 z-20' 
                                  : hasEvent
                                    ? 'bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 border-emerald-400/60 shadow-lg'
                                    : `${intensityClasses[intensity]} hover:shadow-lg`
                              }`}
                              title={`${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][day]} ${hour === 0 ? '12:00 AM' : hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`} - ${intensity.replace('-', ' ')} engagement${hasEvent ? ' (Existing event)' : ''}`}
                              onClick={() => handleTimeSlotClick(day, hour)}
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
                              
                              {/* Hover Glow Effect */}
                              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl"></div>
                              <div className="absolute -inset-1 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl blur-sm"></div>
                            </div>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
              </div>

                {/* Enhanced Legend */}
                <div className="bg-gradient-to-r from-slate-50/80 to-slate-100/80 rounded-2xl p-6 mt-8 border border-slate-200/60 backdrop-blur-sm">
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
                      
                      {/* Status Legend */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full"></div>
                          <span className="text-sm font-medium text-slate-700">Status:</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl border-2 border-emerald-400/60 shadow-sm flex items-center justify-center">
                              <CheckCircle className="w-2.5 h-2.5 text-white" />
                            </div>
                            <span className="text-xs text-slate-600 font-medium">✅ Scheduled</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl border-2 border-indigo-400/60 shadow-sm flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-xs text-slate-600 font-medium">🎯 Selected</span>
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

            {/* Individual Platform Scheduling */}
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
                        <div className="font-medium text-gray-800">Applied to {selectedPlatformForHeatmap.charAt(0).toUpperCase() + selectedPlatformForHeatmap.slice(1)}</div>
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
                        
                        formData.platforms.forEach(platform => {
                          handleManualTimeChange(platform, 'customTime', selectedTimeSlot.time);
                          handleManualTimeChange(platform, 'customDate', dateString);
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
                {formData.platforms.map(platform => {
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
                            onChange={(e) => handleManualTimeChange(platform, 'customDate', e.target.value)}
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
                            onChange={(e) => handleManualTimeChange(platform, 'customTime', e.target.value)}
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
          </div>
        )}
      </div>
      </div>

      {/* Main Schedule Action */}
      <div className="flex justify-center">
        {schedulingMode === 'ai' ? (
          <button
            onClick={handleScheduleAll}
            disabled={isScheduling}
            className="px-12 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 text-white font-medium rounded-2xl hover:from-purple-600 hover:via-pink-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:translate-y-[-2px] hover:scale-105 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isScheduling ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ✨ AI Scheduling...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                ✨ Schedule with AI
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleScheduleAll}
            disabled={isScheduling || formData.platforms.filter(p => schedulingData[p]?.customDate && schedulingData[p]?.customTime).length === 0}
            className="px-10 py-4 bg-gradient-to-r from-slate-500 to-slate-600 text-white font-medium rounded-2xl hover:from-slate-600 hover:to-slate-700 transition-all duration-300 shadow-lg shadow-slate-500/25 hover:shadow-xl hover:shadow-slate-500/30 hover:translate-y-[-2px] flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isScheduling ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Scheduling...
              </>
            ) : (
              <>
                <Settings className="w-5 h-5" />
                Schedule Selected ({formData.platforms.filter(p => schedulingData[p]?.customDate && schedulingData[p]?.customTime).length})
              </>
            )}
          </button>
        )}
        </div>

        {/* Error Display */}
        {errors.scheduling && (
          <div className="bg-red-50/70 border border-red-200/50 text-red-600 px-6 py-4 rounded-xl text-center flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {errors.scheduling}
          </div>
        )}
      </div> {/* Closes main container div className="space-y-8" from line 392 */}
  );
};

export default SchedulingStep;