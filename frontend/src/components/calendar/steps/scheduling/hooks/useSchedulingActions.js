import { getPlatformConfig } from '../utils/platformConfig.jsx';

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
