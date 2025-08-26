import React from 'react';
import { Target, Clock, BarChart3 } from 'lucide-react';

export const StrategySelection = ({ selectedStrategy, onStrategyChange, strategies }) => {
  const strategyIcons = {
    optimal: Target,
    consistent: Clock,
    experimental: BarChart3
  };

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50/50 rounded-2xl border border-indigo-100/60 shadow-lg p-8 mt-8">
      <div className="text-center mb-8">
        <h4 className="text-lg font-medium text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text mb-2">
          🎯 Choose Your Strategy
        </h4>
        <p className="text-gray-600 text-base">Select how you want AI to optimize your posting schedule</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(strategies).map(([key, strategy]) => {
          const Icon = strategyIcons[key];
          const strategyColors = {
            optimal: { gradient: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/25', border: 'border-emerald-200', bg: 'bg-emerald-50/50', text: 'text-emerald-700' },
            consistent: { gradient: 'from-blue-500 to-cyan-600', shadow: 'shadow-blue-500/25', border: 'border-blue-200', bg: 'bg-blue-50/50', text: 'text-blue-700' },
            experimental: { gradient: 'from-purple-500 to-pink-600', shadow: 'shadow-purple-500/25', border: 'border-purple-200', bg: 'bg-purple-50/50', text: 'text-purple-700' }
          };
          const colors = strategyColors[key] || strategyColors.optimal;
          
          return (
            <button
              key={key}
              onClick={() => onStrategyChange(key)}
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
  );
};
