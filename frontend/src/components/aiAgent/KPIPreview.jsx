import React, { useState, useEffect } from 'react';
import { FiCheck, FiStar, FiTrendingUp, FiTarget, FiDollarSign, FiUsers, FiEye, FiMousePointer } from 'react-icons/fi';

const KPIPreview = ({ kpiData, onKPIConfirm, aiRecommendation, onTriggerAIResponse }) => {
  // Ensure kpiData has the proper structure with fallback values
  const defaultKpis = {
    reach: 75000,
    impressions: 150000,
    clicks: 5000,
    conversions: 750,
    revenue: 15000,
    roas: 3.5,
    ctr: 3.33,
    cpa: 20,
    conversionRate: 15,
    budget: 5000
  };

  const [kpis, setKpis] = useState(kpiData || defaultKpis);
  const [aiOptimized, setAiOptimized] = useState(false);
  const [showModification, setShowModification] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30');
  const [clickedButtons, setClickedButtons] = useState(new Set());

  // Reset clicked buttons when component mounts (new step)
  useEffect(() => {
    setClickedButtons(new Set());
  }, []);

  const timeframes = [
    { value: '7', label: '7 Days' },
    { value: '30', label: '30 Days' },
    { value: '90', label: '90 Days' }
  ];

  // Update kpis when kpiData prop changes
  useEffect(() => {
    if (kpiData) {
      setKpis(kpiData);
    }
  }, [kpiData]);

  useEffect(() => {
    if (aiRecommendation && !aiOptimized) {
      setTimeout(() => {
        setAiOptimized(true);
        // Enhance KPIs based on AI recommendation
        const enhancedKpis = {
          ...kpis,
          reach: Math.round((kpis.reach || 75000) * (aiRecommendation.budget / 5000)),
          impressions: Math.round((kpis.impressions || 150000) * (aiRecommendation.budget / 5000)),
          clicks: Math.round((kpis.clicks || 5000) * (aiRecommendation.budget / 5000)),
          conversions: Math.round((kpis.conversions || 750) * (aiRecommendation.budget / 5000)),
          revenue: Math.round((kpis.revenue || 15000) * (aiRecommendation.budget / 5000)),
          roas: (kpis.roas || 3.5) * 1.15 // 15% improvement from AI optimization
        };
        setKpis(enhancedKpis);
      }, 1000);
    }
  }, [aiRecommendation, aiOptimized, kpis]);

  const handleContinue = () => {
    setClickedButtons(prev => new Set([...prev, 'continue']));
    
    // Trigger user dialog for continue action
    if (onTriggerAIResponse) {
      setTimeout(() => {
        onTriggerAIResponse(`I have approved the performance forecast. Please proceed to launch the campaign.`);
      }, 100);
    }
    
    // Small delay to show the grey state before action
    setTimeout(() => {
      onKPIConfirm(kpis);
    }, 100);
  };

  const handleModifyClick = () => {
    setClickedButtons(prev => new Set([...prev, 'modify']));
    
    // Trigger user dialog for modify action
    if (onTriggerAIResponse) {
      setTimeout(() => {
        onTriggerAIResponse(`I would like to modify the performance forecast. Can you help me adjust the projections or timeframe?`);
      }, 100);
    }
    
    setShowModification(true);
  };

  const getAIKPIAnalysis = () => {
    if (!aiRecommendation) {
      // Return default analysis if no AI recommendation is available
      return {
        confidence: 87,
        keyInsights: [
          'Expected 15% higher ROAS due to optimized targeting',
          'Strong conversion potential in 25-45 age group',
          'LinkedIn will drive highest quality leads',
          'TikTok expected to generate viral engagement'
        ],
        recommendations: [
          'Monitor Facebook performance closely in first week',
          'Increase budget allocation to top-performing platforms',
          'A/B test creative variations for better CTR',
          'Retarget engaged users for higher conversions'
        ],
        riskFactors: [
          'Seasonal fluctuations may affect performance',
          'Competition in tech sector is high',
          'Ad fatigue possible after 2 weeks'
        ]
      };
    }

    return {
      confidence: 87,
      keyInsights: [
        'Expected 15% higher ROAS due to optimized targeting',
        'Strong conversion potential in 25-45 age group',
        'LinkedIn will drive highest quality leads',
        'TikTok expected to generate viral engagement'
      ],
      recommendations: [
        'Monitor Facebook performance closely in first week',
        'Increase budget allocation to top-performing platforms',
        'A/B test creative variations for better CTR',
        'Retarget engaged users for higher conversions'
      ],
      riskFactors: [
        'Seasonal fluctuations may affect performance',
        'Competition in tech sector is high',
        'Ad fatigue possible after 2 weeks'
      ]
    };
  };

  const getKPICategory = (value, thresholds) => {
    if (value >= thresholds.excellent) return 'excellent';
    if (value >= thresholds.good) return 'good';
    if (value >= thresholds.average) return 'average';
    return 'poor';
  };

  const getKPIColor = (category) => {
    switch (category) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'average': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const aiAnalysis = getAIKPIAnalysis();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Campaign Performance Preview</h2>
        <p className="text-gray-600">Final review before launching your AI-optimized campaign</p>
      </div>

      {/* AI Optimization Banner */}
      {aiOptimized && (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <FiStar className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-bold text-green-800">AI Performance Forecast Complete</h3>
              <p className="text-sm text-green-700">Based on your campaign configuration and market analysis</p>
            </div>
            <div className="ml-auto bg-white rounded-lg px-3 py-1 border border-green-200">
              <span className="text-sm font-bold text-green-600">{aiAnalysis.confidence}% Confidence</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-3 border border-green-200">
              <div className="text-2xl font-bold text-green-600">15%</div>
              <div className="text-sm text-gray-600">ROAS Improvement</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-green-200">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <div className="text-sm text-gray-600">Key Insights</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-green-200">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600">Risk Factors</div>
            </div>
          </div>
        </div>
      )}

      {/* Timeframe Selector */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Forecast Timeframe</h3>
        <div className="flex gap-2">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.value}
              onClick={() => setSelectedTimeframe(timeframe.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTimeframe === timeframe.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {timeframe.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <FiEye className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Reach</h3>
            {aiOptimized && (
              <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                AI Optimized
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {(kpis.reach || 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Unique users reached</div>
          <div className="mt-3 p-2 bg-blue-50 rounded-lg">
            <div className="text-xs text-blue-700">
              <strong>AI Insight:</strong> Strong potential for viral reach on TikTok
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <FiMousePointer className="w-5 h-5 text-green-600" />
            <h3 className="font-medium text-gray-900">CTR</h3>
            {aiOptimized && (
              <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                AI Optimized
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {kpis.ctr || 0}%
          </div>
          <div className="text-sm text-gray-600">Click-through rate</div>
          <div className="mt-3 p-2 bg-green-50 rounded-lg">
            <div className="text-xs text-green-700">
              <strong>AI Insight:</strong> Above industry average for tech sector
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <FiUsers className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium text-gray-900">Conversions</h3>
            {aiOptimized && (
              <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                AI Optimized
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {(kpis.conversions || 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Expected conversions</div>
          <div className="mt-3 p-2 bg-purple-50 rounded-lg">
            <div className="text-xs text-purple-700">
              <strong>AI Insight:</strong> LinkedIn will drive highest quality leads
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <FiDollarSign className="w-5 h-5 text-yellow-600" />
            <h3 className="font-medium text-gray-900">ROAS</h3>
            {aiOptimized && (
              <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                AI Optimized
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {kpis.roas || 0}x
          </div>
          <div className="text-sm text-gray-600">Return on ad spend</div>
          <div className="mt-3 p-2 bg-yellow-50 rounded-lg">
            <div className="text-xs text-yellow-700">
              <strong>AI Insight:</strong> 15% improvement from optimization
            </div>
          </div>
        </div>
      </div>

      {/* AI Analysis Section */}
      {aiAnalysis && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
              <FiTrendingUp className="w-4 h-4" />
              Key Insights
            </h4>
            <ul className="text-sm text-blue-700 space-y-2">
              {aiAnalysis.keyInsights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <FiCheck className="w-3 h-3 mt-0.5 text-blue-600 flex-shrink-0" />
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <h4 className="font-medium text-green-900 mb-3 flex items-center gap-2">
              <FiTarget className="w-4 h-4" />
              Recommendations
            </h4>
            <ul className="text-sm text-green-700 space-y-2">
              {aiAnalysis.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <FiCheck className="w-3 h-3 mt-0.5 text-green-600 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <h4 className="font-medium text-red-900 mb-3 flex items-center gap-2">
              <FiStar className="w-4 h-4" />
              Risk Factors
            </h4>
            <ul className="text-sm text-red-700 space-y-2">
              {aiAnalysis.riskFactors.map((risk, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-3 h-3 mt-0.5 text-red-600 flex-shrink-0">⚠</div>
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Performance Summary */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-4">Campaign Summary</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">${(kpis.budget || 0).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Budget</div>
          </div>
          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">${(kpis.revenue || 0).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Expected Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{kpis.cpa}</div>
            <div className="text-sm text-gray-600">Cost per Acquisition</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{kpis.conversionRate}%</div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </div>
        </div>
      </div>

             {/* Action Buttons */}
       <div className="flex justify-between items-center pt-4 border-t border-gray-200">
         <div className="text-sm text-gray-600">
           {aiOptimized ? (
             <span className="flex items-center gap-2">
               <FiStar className="w-4 h-4 text-green-600" />
               Ready to launch your AI-optimized campaign
             </span>
           ) : (
             'Reviewing campaign performance...'
           )}
         </div>
         <div className="flex gap-3">
                         <button
                onClick={handleModifyClick}
                className={`px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer ${clickedButtons.has('modify') ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={clickedButtons.has('modify')}
              >
                Modify Forecast
              </button>
              <button
                onClick={handleContinue}
                className={`px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium cursor-pointer ${clickedButtons.has('continue') ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={clickedButtons.has('continue')}
              >
                🚀 Launch Campaign Now
              </button>
         </div>
       </div>

      {/* Modification Modal */}
      {showModification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Modify Forecast</h3>
            <p className="text-gray-600 mb-6">
              You can ask me to adjust the performance forecast or optimize the campaign strategy further in the chat.
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Example:</strong> "Increase the budget to $10,000 and recalculate KPIs"
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Example:</strong> "Focus more on LinkedIn and reduce TikTok budget"
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModification(false)}
                className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowModification(false);
                  // This would trigger a chat message asking for forecast modifications
                  console.log('User wants to modify KPI forecast via chat');
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Ask AI to Adjust
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KPIPreview;
