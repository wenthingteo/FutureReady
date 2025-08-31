import React from 'react';
import { Target, Clock, BarChart3 } from 'lucide-react';

export const StrategySelection = ({ selectedStrategy, onStrategyChange, strategies }) => {
  const strategyIcons = {
    optimal: Target,
    consistent: Clock,
    experimental: BarChart3
  };

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50/50 rounded-xl border border-indigo-100/60 shadow-md p-6">
      <div className="text-center mb-6">
        <h4 className="text-lg font-medium text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text mb-2">
          🎯 Strategy
        </h4>
        <p className="text-gray-600 text-sm">Choose optimization approach</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              className={`p-4 border rounded-lg transition-all duration-300 hover:shadow-md flex flex-col items-center gap-3 text-center ${
                selectedStrategy === key
                  ? `${colors.border} ${colors.bg} shadow-md ring-1 ring-${colors.border.split('-')[1]}-200/50`
                  : 'border-gray-200/60 hover:border-indigo-200/40 bg-white hover:bg-indigo-50/30'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-md ${colors.shadow} transition-all duration-300 ${
                selectedStrategy === key 
                  ? 'scale-110 shadow-lg' 
                  : 'hover:scale-105'
              }`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col items-center">
                <div className={`font-medium text-base ${
                  selectedStrategy === key 
                    ? colors.text 
                    : 'text-gray-700'
                }`}>{strategy.title}</div>
                <div className="text-sm text-gray-600 text-center">{strategy.description}</div>
              </div>
            </button>
          );
        })}
      </div>
     </div>
   );
 };
