import { useState, useEffect } from 'react';
import { getPlatformConfig } from '../utils/platformConfig.jsx';

export const useSchedulingData = (platforms) => {
  const [schedulingData, setSchedulingData] = useState(
    platforms.reduce((acc, platform) => {
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

  const [selectedStrategy, setSelectedStrategy] = useState('optimal');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedPlatformForHeatmap, setSelectedPlatformForHeatmap] = useState(platforms[0]);

  // Auto-calculate optimal times when component mounts
  useEffect(() => {
    const updatedScheduling = { ...schedulingData };
    platforms.forEach(platform => {
      const config = getPlatformConfig(platform);
      const bestTime = config.bestTimes[0];
      updatedScheduling[platform] = {
        ...updatedScheduling[platform],
        suggestedTime: bestTime.time,
        confidence: bestTime.score
      };
    });
    setSchedulingData(updatedScheduling);
  }, [platforms]);

  const updateSchedulingData = (updates) => {
    setSchedulingData(prev => ({
      ...prev,
      ...updates
    }));
  };

  return {
    schedulingData,
    selectedStrategy,
    selectedDate,
    selectedTimeSlot,
    selectedPlatformForHeatmap,
    updateSchedulingData,
    setSelectedStrategy,
    setSelectedDate,
    setSelectedTimeSlot,
    setSelectedPlatformForHeatmap
  };
};
