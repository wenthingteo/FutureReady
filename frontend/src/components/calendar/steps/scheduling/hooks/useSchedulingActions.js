import { getPlatformConfig } from '../utils/platformConfig.jsx';

// Helper function to convert 12-hour time to 24-hour format
const convertTo24HourFormat = (time12h) => {
  if (!time12h) return '12:00';
  
  // If already in 24-hour format, return as is
  if (time12h.includes(':')) {
    const [hours, minutes] = time12h.split(':');
    if (hours.length === 2 && parseInt(hours) <= 23) {
      return time12h;
    }
  }
  
  // Convert 12-hour format to 24-hour
  const [time, period] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  
  hours = parseInt(hours);
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes || '00'}`;
};

export const useSchedulingActions = ({
  formData,
  schedulingData,
  updateSchedulingData,
  selectedStrategy,
  setSelectedStrategy,
  schedulingMode,
  selectedDate,
  setSelectedDate,
  selectedTimeSlot,
  setSelectedTimeSlot,
  selectedPlatformForHeatmap,
  onSchedule,
  setIsScheduling,
  setSchedulingProgress,
  setCurrentStep,
  setIsCompleted
}) => {
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
    updateSchedulingData(updatedScheduling);
  };

  // Convert scheduling data to post objects for the calendar
  const convertSchedulingToPosts = () => {
    const posts = [];
    const currentTime = Date.now();
    
    formData.platforms.forEach((platform, index) => {
      const platformScheduling = schedulingData[platform];
      if (!platformScheduling) return;
      
      // Determine the date and time for this post
      let postDate, postTime;
      
      if (schedulingMode === 'manual' && platformScheduling.customDate && platformScheduling.customTime) {
        // Manual scheduling - use custom date and time
        postDate = platformScheduling.customDate;
        postTime = convertTo24HourFormat(platformScheduling.customTime);
      } else {
        // AI scheduling - calculate optimal date and time
        const config = getPlatformConfig(platform);
        const today = new Date();
        
        // For AI scheduling, schedule posts for the next few days based on strategy
        let daysOffset = 0;
        if (selectedStrategy === 'consistent') {
          daysOffset = index; // Spread posts across consecutive days
        } else if (selectedStrategy === 'experimental') {
          daysOffset = index * 2; // Spread posts with gaps
        } else {
          // Optimal strategy - schedule within next 3 days
          daysOffset = Math.floor(index / 2);
        }
        
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + daysOffset);
        postDate = targetDate.toISOString().split('T')[0];
        
        // Use the suggested time or fall back to platform's best time, convert to 24-hour format
        const suggestedTime = platformScheduling.suggestedTime || config.bestTimes[0]?.time || '12:00 PM';
        postTime = convertTo24HourFormat(suggestedTime);
      }
      
      // Create a unique post object for the calendar
      const post = {
        id: `scheduled_${platform}_${currentTime}_${index}`,
        title: formData.editedContent?.title || formData.selectedContent?.title || `Scheduled ${platform} post`,
        content: formData.editedContent?.content || formData.selectedContent?.content || 'Content to be scheduled',
        date: postDate,
        time: postTime,
        platforms: [platform],
        status: 'scheduled',
        optimalTiming: true,
        engagement: platformScheduling.confidence || 85,
        scheduledAt: new Date().toISOString(),
        strategy: selectedStrategy,
        platform: platform,
        // Add scheduling-specific data
        schedulingData: {
          confidence: platformScheduling.confidence,
          suggestedTime: platformScheduling.suggestedTime,
          customTime: platformScheduling.customTime,
          customDate: platformScheduling.customDate,
          scheduleType: platformScheduling.scheduleType || 'ai'
        }
      };
      
      posts.push(post);
    });
    
    return posts;
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
          
          // Convert scheduling data to post objects and call onSchedule
          const posts = convertSchedulingToPosts();
          
          const scheduleData = {
            posts: posts, // Pass the actual post objects
            platforms: formData.platforms,
            content: formData.editedContent || formData.selectedContent,
            scheduling: schedulingData,
            strategy: selectedStrategy,
            schedulingMode: schedulingMode
          };
          
          console.log('Scheduling completed, calling onSchedule with:', scheduleData);
          onSchedule(scheduleData);
        }, 1000);
      }
    };

    runStep();
  };

  const handleManualTimeChange = (platform, field, value) => {
    console.log('handleManualTimeChange called:', { platform, field, value });
    
    // Use functional update to ensure we have the latest state
    updateSchedulingData(prevData => {
      const updatedData = {
        ...prevData,
        [platform]: {
          ...prevData[platform],
          [field]: value,
          scheduleType: 'manual'
        }
      };
      
      console.log('Updated scheduling data:', updatedData);
      return updatedData;
    });
  };

  const handleTimeSlotClick = (day, hour) => {
    const timeSlot = { day, hour, time: `${hour.toString().padStart(2, '0')}:00` };
    setSelectedTimeSlot(timeSlot);
    
    console.log('Time slot clicked:', { day, hour, timeSlot, schedulingMode });
    
    // In manual mode, apply to the selected platform
    if (schedulingMode === 'manual') {
      const targetDate = new Date(selectedDate);
      targetDate.setDate(selectedDate.getDate() + ((day - selectedDate.getDay() + 7) % 7));
      const dateString = targetDate.toISOString().split('T')[0];
      
      console.log('Applying to platform:', {
        platform: selectedPlatformForHeatmap,
        time: timeSlot.time,
        date: dateString
      });
      
      // Apply to the currently selected platform for heatmap using direct state update
      const updatedData = { ...schedulingData };
      updatedData[selectedPlatformForHeatmap] = {
        ...updatedData[selectedPlatformForHeatmap],
        customTime: timeSlot.time,
        customDate: dateString,
        scheduleType: 'manual'
      };
      
      console.log('Updated data for time slot click:', updatedData);
      updateSchedulingData(updatedData);
      
      // Store the suggested date for display purposes
      setSelectedDate(targetDate);
    }
  };

  const handleAlternativeTimeClick = (platform, time) => {
    updateSchedulingData({
      [platform]: {
        ...schedulingData[platform],
        suggestedTime: time.time,
        confidence: time.score
      }
    });
  };

  return {
    handleScheduleAll,
    handleStrategyChange,
    handleManualTimeChange,
    handleTimeSlotClick,
    handleAlternativeTimeClick
  };
};
