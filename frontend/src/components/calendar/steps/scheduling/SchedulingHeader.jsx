import React from 'react';

export const SchedulingHeader = () => {
  return (
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
  );
};
