import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiStar, FiTrendingUp, FiTrendingDown, FiTarget, FiDollarSign, FiUsers, FiEye, FiClock, FiZap } from 'react-icons/fi';

const RealTimeOptimization = ({ optimizationData, aiRecommendation }) => {
  // Ensure optimizationData is an array with fallback
  const defaultOptimizations = [
    {
      id: 'opt-1',
      type: 'budget',
      title: 'Increase Facebook Budget',
      description: 'Facebook is performing 23% above average. Recommend increasing budget by $500.',
      impact: '+15% conversions',
      confidence: 89,
      status: 'pending',
      platform: 'facebook',
      action: 'increase_budget',
      value: 500
    },
    {
      id: 'opt-2',
      type: 'targeting',
      title: 'Expand Age Range',
      description: 'Users aged 35-44 showing 40% higher engagement. Recommend expanding target age range.',
      impact: '+12% reach',
      confidence: 76,
      status: 'pending',
      platform: 'all',
      action: 'expand_age_range',
      value: '35-44'
    },
    {
      id: 'opt-3',
      type: 'creative',
      title: 'Pause Underperforming Ad',
      description: 'Ad variant "Tech_Product_02" has 60% lower CTR. Recommend pausing this creative.',
      impact: '+8% overall CTR',
      confidence: 92,
      status: 'pending',
      platform: 'instagram',
      action: 'pause_ad',
      value: 'Tech_Product_02'
    },
    {
      id: 'opt-4',
      type: 'timing',
      title: 'Optimize Posting Schedule',
      description: 'Posts at 2 PM EST showing 35% higher engagement. Recommend adjusting schedule.',
      impact: '+20% engagement',
      confidence: 81,
      status: 'pending',
      platform: 'all',
      action: 'adjust_schedule',
      value: '2 PM EST'
    }
  ];

  const [optimizations, setOptimizations] = useState(optimizationData || defaultOptimizations);
  const [aiActive, setAiActive] = useState(false);
  const [showModification, setShowModification] = useState(false);
  const [selectedOptimization, setSelectedOptimization] = useState(null);

  // Update optimizations when optimizationData prop changes
  useEffect(() => {
    if (optimizationData) {
      setOptimizations(optimizationData);
    }
  }, [optimizationData]);

  useEffect(() => {
    if (aiRecommendation && !aiActive) {
      setTimeout(() => {
        setAiActive(true);
        // Simulate AI generating real-time optimizations
        const aiOptimizations = [
          {
            id: 'opt-1',
            type: 'budget',
            title: 'Increase Facebook Budget',
            description: 'Facebook is performing 23% above average. Recommend increasing budget by $500.',
            impact: '+15% conversions',
            confidence: 89,
            status: 'pending',
            platform: 'facebook',
            action: 'increase_budget',
            value: 500
          },
          {
            id: 'opt-2',
            type: 'targeting',
            title: 'Expand Age Range',
            description: 'Users aged 35-44 showing 40% higher engagement. Recommend expanding target age range.',
            impact: '+12% reach',
            confidence: 76,
            status: 'pending',
            platform: 'all',
            action: 'expand_age_range',
            value: '35-44'
          },
          {
            id: 'opt-3',
            type: 'creative',
            title: 'Pause Underperforming Ad',
            description: 'Ad variant "Tech_Product_02" has 60% lower CTR. Recommend pausing this creative.',
            impact: '+8% overall CTR',
            confidence: 92,
            status: 'pending',
            platform: 'instagram',
            action: 'pause_ad',
            value: 'Tech_Product_02'
          },
          {
            id: 'opt-4',
            type: 'timing',
            title: 'Optimize Posting Schedule',
            description: 'Posts at 2 PM EST showing 35% higher engagement. Recommend adjusting schedule.',
            impact: '+20% engagement',
            confidence: 81,
            status: 'pending',
            platform: 'all',
            action: 'adjust_schedule',
            value: '2 PM EST'
          }
        ];
        setOptimizations(aiOptimizations);
      }, 2000);
    }
  }, [aiRecommendation, aiActive]);

  const handleOptimizationAction = (optimizationId, action) => {
    setOptimizations(prev => 
      prev.map(opt => 
        opt.id === optimizationId 
          ? { ...opt, status: action === 'approve' ? 'approved' : 'rejected' }
          : opt
      )
    );
  };

  const getOptimizationIcon = (type) => {
    switch (type) {
      case 'budget': return FiDollarSign;
      case 'targeting': return FiTarget;
      case 'creative': return FiEye;
      case 'timing': return FiClock;
      default: return FiZap;
    }
  };

  const getOptimizationColor = (type) => {
    switch (type) {
      case 'budget': return 'text-green-600 bg-green-100';
      case 'targeting': return 'text-blue-600 bg-blue-100';
      case 'creative': return 'text-purple-600 bg-purple-100';
      case 'timing': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAIAnalysis = () => {
    // Ensure optimizations is always an array
    const safeOptimizations = Array.isArray(optimizations) ? optimizations : [];
    
    if (!aiRecommendation) {
      // Return default analysis if no AI recommendation is available
      return {
        totalOptimizations: safeOptimizations.length,
        approvedCount: safeOptimizations.filter(opt => opt.status === 'approved').length,
        rejectedCount: safeOptimizations.filter(opt => opt.status === 'rejected').length,
        pendingCount: safeOptimizations.filter(opt => opt.status === 'pending').length,
        averageConfidence: safeOptimizations.length > 0 
          ? Math.round(safeOptimizations.reduce((sum, opt) => sum + (opt.confidence || 0), 0) / safeOptimizations.length)
          : 0,
        insights: [
          'Facebook budget increase will drive highest ROI',
          'Age range expansion will improve reach without sacrificing quality',
          'Creative optimization will improve overall campaign performance',
          'Timing adjustments will maximize engagement rates'
        ],
        recommendations: [
          'Approve budget and targeting optimizations first',
          'Monitor creative performance before pausing',
          'Test timing changes on smaller audience first',
          'Review results after 24 hours'
        ]
      };
    }

    return {
      totalOptimizations: safeOptimizations.length,
      approvedCount: safeOptimizations.filter(opt => opt.status === 'approved').length,
      rejectedCount: safeOptimizations.filter(opt => opt.status === 'rejected').length,
      pendingCount: safeOptimizations.filter(opt => opt.status === 'pending').length,
      averageConfidence: safeOptimizations.length > 0 
        ? Math.round(safeOptimizations.reduce((sum, opt) => sum + (opt.confidence || 0), 0) / safeOptimizations.length)
        : 0,
      insights: [
        'Facebook budget increase will drive highest ROI',
        'Age range expansion will improve reach without sacrificing quality',
        'Creative optimization will improve overall campaign performance',
        'Timing adjustments will maximize engagement rates'
      ],
      recommendations: [
        'Approve budget and targeting optimizations first',
        'Monitor creative performance before pausing',
        'Test timing changes on smaller audience first',
        'Review results after 24 hours'
      ]
    };
  };

  const aiAnalysis = getAIAnalysis();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Real-Time Optimization</h2>
        <p className="text-gray-600">AI-powered campaign optimization suggestions</p>
      </div>

      {/* AI Status Banner */}
      {aiActive && (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <FiZap className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-bold text-green-800">AI Optimization Active</h3>
              <p className="text-sm text-green-700">Monitoring campaign performance and generating real-time suggestions</p>
            </div>
            <div className="ml-auto bg-white rounded-lg px-3 py-1 border border-green-200">
              <span className="text-sm font-bold text-green-600">Live</span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="text-2xl font-bold text-green-600">{aiAnalysis.totalOptimizations}</div>
                <div className="text-sm text-gray-600">Total Suggestions</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="text-2xl font-bold text-blue-600">{aiAnalysis.averageConfidence}%</div>
                <div className="text-sm text-gray-600">Avg Confidence</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="text-2xl font-bold text-yellow-600">{aiAnalysis.pendingCount}</div>
                <div className="text-sm text-gray-600">Pending Review</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="text-2xl font-bold text-purple-600">4</div>
                <div className="text-sm text-gray-600">Platforms</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Optimization Suggestions */}
      <div className="space-y-4">
        {(Array.isArray(optimizations) ? optimizations : []).map((optimization) => {
          const IconComponent = getOptimizationIcon(optimization.type);
          
          return (
            <div key={optimization.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${getOptimizationColor(optimization.type)}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{optimization.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(optimization.status)}`}>
                      {optimization.status}
                    </span>
                    {aiActive && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium flex items-center gap-1">
                        <FiStar className="w-3 h-3" /> AI
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3">{optimization.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-green-600">
                      <FiTrendingUp className="w-4 h-4" />
                      <span>{optimization.impact}</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600">
                      <FiTarget className="w-4 h-4" />
                      <span>{optimization.confidence}% confidence</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <FiEye className="w-4 h-4" />
                      <span className="capitalize">{optimization.platform}</span>
                    </div>
                  </div>
                </div>
                
                {optimization.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOptimizationAction(optimization.id, 'approve')}
                      className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                      title="Approve optimization"
                    >
                      <FiCheck className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleOptimizationAction(optimization.id, 'reject')}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Reject optimization"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Analysis Section */}
      {aiAnalysis && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
              <FiTrendingUp className="w-4 h-4" />
              AI Insights
            </h4>
            <ul className="text-sm text-blue-700 space-y-2">
              {aiAnalysis.insights.map((insight, index) => (
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
              AI Recommendations
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
        </div>
      )}

      {/* Performance Summary */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-4">Optimization Summary</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{aiAnalysis?.totalOptimizations || 0}</div>
            <div className="text-sm text-gray-600">Total Suggestions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{aiAnalysis?.approvedCount || 0}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{aiAnalysis?.rejectedCount || 0}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{aiAnalysis?.pendingCount || 0}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {aiActive ? (
            <span className="flex items-center gap-2">
              <FiZap className="w-4 h-4 text-green-600" />
              AI actively monitoring and optimizing
            </span>
          ) : (
            'Initializing AI optimization...'
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModification(true)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Modify AI Settings
          </button>
          <button
            onClick={() => console.log('View detailed analytics')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View Analytics
          </button>
        </div>
      </div>

      {/* Modification Modal */}
      {showModification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Modify AI Optimization</h3>
            <p className="text-gray-600 mb-6">
              You can ask me to adjust the AI optimization settings or change how suggestions are generated.
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Example:</strong> "Make the AI more conservative with budget changes"
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Example:</strong> "Focus optimization on conversion rate instead of reach"
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-800">
                  <strong>Example:</strong> "Only suggest optimizations with 90%+ confidence"
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
                  // This would trigger a chat message asking for AI optimization modifications
                  console.log('User wants to modify AI optimization settings via chat');
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

export default RealTimeOptimization;
