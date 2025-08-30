import React from 'react';
import { ManualSchedulingHeader } from './components/ManualSchedulingHeader';
import { EngagementHeatmap } from './components/EngagementHeatmap';
import { PlatformScheduling } from './components/PlatformScheduling';

export const ManualSchedulingInterface = ({
  formData,
  schedulingData,
  selectedDate,
  selectedTimeSlot,
  selectedPlatformForHeatmap,
  onDateChange,
  onTimeSlotClick,
  onPlatformChange,
  onManualTimeChange,
  updateSchedulingData
}) => {
  // Sample existing events for demonstration (August 24-30, 2024)
  const existingEvents = [
    {
      id: 1,
      title: "Product Launch Post",
      platforms: ['instagram', 'facebook'],
      date: new Date(2024, 7, 24, 14, 0), // August 24, 2:00 PM
      status: 'scheduled'
    },
    {
      id: 2,
      title: "Weekly Newsletter",
      platforms: ['linkedin'],
      date: new Date(2024, 7, 26, 9, 0), // August 26, 9:00 AM
      status: 'scheduled'
    },
    {
      id: 3,
      title: "Tutorial Video",
      platforms: ['youtube', 'tiktok'],
      date: new Date(2024, 7, 28, 19, 0), // August 28, 7:00 PM
      status: 'scheduled'
    },
    {
      id: 4,
      title: "Behind the Scenes",
      platforms: ['instagram'],
      date: new Date(2024, 7, 25, 11, 0), // August 25, 11:00 AM
      status: 'scheduled'
    },
    {
      id: 5,
      title: "Industry Insights",
      platforms: ['linkedin', 'facebook'],
      date: new Date(2024, 7, 27, 15, 0), // August 27, 3:00 PM
      status: 'scheduled'
    },
    {
      id: 6,
      title: "Customer Spotlight",
      platforms: ['instagram', 'tiktok'],
      date: new Date(2024, 7, 29, 16, 0), // August 29, 4:00 PM
      status: 'scheduled'
    },
    {
      id: 7,
      title: "Weekend Special",
      platforms: ['facebook', 'youtube'],
      date: new Date(2024, 7, 30, 20, 0), // August 30, 8:00 PM
      status: 'scheduled'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
      {/* Header */}
      <ManualSchedulingHeader
        selectedDate={selectedDate}
        onDateChange={onDateChange}
        platforms={formData.platforms}
        selectedPlatformForHeatmap={selectedPlatformForHeatmap}
        onPlatformChange={onPlatformChange}
        existingEvents={existingEvents}
      />

      {/* Heatmap */}
      <EngagementHeatmap
        selectedDate={selectedDate}
        selectedPlatformForHeatmap={selectedPlatformForHeatmap}
        selectedTimeSlot={selectedTimeSlot}
        onTimeSlotClick={onTimeSlotClick}
        existingEvents={existingEvents}
      />

      {/* Platform Scheduling */}
      <PlatformScheduling
        platforms={formData.platforms}
        schedulingData={schedulingData}
        selectedTimeSlot={selectedTimeSlot}
        selectedPlatformForHeatmap={selectedPlatformForHeatmap}
        selectedDate={selectedDate}
        onManualTimeChange={onManualTimeChange}
        updateSchedulingData={updateSchedulingData}
      />
    </div>
  );
};
