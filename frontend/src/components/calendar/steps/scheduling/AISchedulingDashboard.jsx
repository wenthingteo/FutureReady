import React, { useState } from 'react';
import { Users, Globe, Target, TrendingUp, Clock, BarChart3, Star, Check, Zap } from 'lucide-react';
import { getPlatformConfig, schedulingStrategies } from './utils/platformConfig.jsx';
import { AIOptimizationOverview } from './components/AIOptimizationOverview';
import { StrategySelection } from './components/StrategySelection';
import { AIOptimizationResults } from './components/AIOptimizationResults';

export const AISchedulingDashboard = ({ 
  formData, 
  schedulingData, 
  selectedStrategy, 
  onStrategyChange, 
  onAlternativeTimeClick
}) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancementApplied, setEnhancementApplied] = useState(false);

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

  const handleAIEnhancement = () => {
    setIsEnhancing(true);
    // Simulate AI enhancement process
    setTimeout(() => {
      setIsEnhancing(false);
      setEnhancementApplied(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Smart Overview Dashboard */}
      <AIOptimizationOverview
        overallScore={getOverallScore()}
        totalAudience={formatAudience(getTotalAudience())}
        platformCount={formData.platforms.length}
        selectedStrategy={selectedStrategy}
      />

      {/* Strategy Selection */}
      <StrategySelection
        selectedStrategy={selectedStrategy}
        onStrategyChange={onStrategyChange}
        strategies={schedulingStrategies}
      />

      {/* AI Optimization Results */}
      <AIOptimizationResults
        platforms={formData.platforms}
        schedulingData={schedulingData}
        selectedStrategy={selectedStrategy}
        onAlternativeTimeClick={onAlternativeTimeClick}
        formData={formData}
      />
    </div>
  );
};
