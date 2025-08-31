import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const SchedulingHeader = ({ onBack }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back</span>
        </button>
        
        {/* Center Header */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#3264DF]/80 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-sm">
            2
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Smart Scheduling
          </h2>
        </div>
        
        {/* Empty div for spacing */}
        <div className="w-24"></div>
      </div>
      <p className="text-gray-600 text-sm max-w-2xl mx-auto text-center">
        AI-powered scheduling optimization for maximum engagement across all platforms
      </p>
    </div>
  );
};
