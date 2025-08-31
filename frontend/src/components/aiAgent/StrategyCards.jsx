import React, { useState, useEffect } from 'react';
import { FiCheck, FiArrowRight, FiTarget, FiUsers, FiDollarSign, FiClock, FiGlobe, FiTrendingUp, FiStar, FiEdit3, FiArrowLeft } from 'react-icons/fi';

const StrategyCards = ({ strategies, onStrategySelect, aiRecommendation, onBack, onTriggerAIResponse }) => {
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [showModification, setShowModification] = useState(false);
  const [clickedButtons, setClickedButtons] = useState(new Set());

  // Reset clicked buttons when component mounts (new step)
  useEffect(() => {
    setClickedButtons(new Set());
  }, []);

  // Auto-select the recommended strategy
  useEffect(() => {
    if (aiRecommendation && strategies.length > 0) {
      const recommendedStrategy = strategies.find(s => s.title === aiRecommendation.strategy);
      if (recommendedStrategy) {
        setSelectedStrategy(recommendedStrategy.id);
      }
    }
  }, [aiRecommendation, strategies]);

  const handleStrategySelect = (strategy) => {
    setSelectedStrategy(strategy.id);
  };

  const handleContinue = () => {
    if (selectedStrategy !== null) {
      const strategy = strategies.find(s => s.id === selectedStrategy);
      setClickedButtons(prev => new Set([...prev, 'continue']));
      // Small delay to show the grey state before action
      setTimeout(() => {
        onStrategySelect(strategy);
        
        // Trigger user dialog for strategy selection
        if (onTriggerAIResponse) {
          setTimeout(() => {
            onTriggerAIResponse(`I have selected the ${strategy.title} strategy. Please create my content creation workflow.`);
          }, 200);
        }
      }, 100);
    }
  };

  const handleModifyClick = () => {
    setClickedButtons(prev => new Set([...prev, 'modify']));
    
    // Trigger user dialog for modify action
    if (onTriggerAIResponse) {
      setTimeout(() => {
        onTriggerAIResponse(`I would like to modify the strategy options. Can you help me adjust the approach or create new alternatives?`);
      }, 100);
    }
    
    setShowModification(true);
  };

  const getRecommendedStrategy = () => {
    if (!aiRecommendation) return null;
    return strategies.find(s => s.title === aiRecommendation.strategy);
  };

  const recommendedStrategy = getRecommendedStrategy();

  return (
    <div className="space-y-6">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Brief
        </button>
      )}

      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
          <FiTarget className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Campaign Strategies</h3>
          <p className="text-gray-600">I've analyzed your brief and selected the best strategy for you</p>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      {recommendedStrategy && (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <FiStar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">AI Recommended Strategy</h4>
                <p className="text-sm text-gray-600">
                  Based on your brief, this strategy has the highest success probability
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">{aiRecommendation.confidence}%</div>
              <div className="text-xs text-gray-500">Confidence</div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {strategies.map((strategy) => {
          const isRecommended = recommendedStrategy && strategy.id === recommendedStrategy.id;
          const isSelected = selectedStrategy === strategy.id;
          
          return (
            <div
              key={strategy.id}
              className={`border-2 rounded-xl p-6 transition-all cursor-pointer hover:shadow-lg relative ${
                isSelected 
                  ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md' 
                  : isRecommended
                    ? 'border-green-300 bg-gradient-to-r from-green-50 to-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
              onClick={() => handleStrategySelect(strategy)}
            >
              {/* Recommended Badge */}
              {isRecommended && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <FiStar className="w-3 h-3" />
                  Recommended
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-500' 
                      : isRecommended
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                  }`}>
                    {isSelected && <FiCheck className="text-white text-sm" />}
                    {isRecommended && !isSelected && <FiStar className="text-white text-sm" />}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">{strategy.title}</h4>
                </div>
                <div className="text-sm text-gray-500">
                  Strategy {strategy.id}
                </div>
              </div>

              <p className="text-gray-600 mb-4">{strategy.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <FiGlobe className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Platforms:</span>
                  <span className="text-gray-600">{strategy.platforms.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiDollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Budget:</span>
                  <span className="text-gray-600">{strategy.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiClock className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">Duration:</span>
                  <span className="text-gray-600">{strategy.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiUsers className="w-4 h-4 text-orange-600" />
                  <span className="font-medium">Audience:</span>
                  <span className="text-gray-600">{strategy.targetAudience}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-blue-600">{strategy.expectedReach}</div>
                  <div className="text-xs text-gray-600">Expected Reach</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-600">{strategy.expectedEngagement}</div>
                  <div className="text-xs text-gray-600">Expected Engagement</div>
                </div>
              </div>

              {/* AI Reasoning for Recommended Strategy */}
              {isRecommended && aiRecommendation && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <FiTrendingUp className="w-4 h-4 text-blue-600" />
                    Why this strategy?
                  </h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {aiRecommendation.reasoning.map((reason, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          {selectedStrategy !== null 
            ? `Selected: ${strategies.find(s => s.id === selectedStrategy)?.title}`
            : recommendedStrategy 
              ? `Recommended: ${recommendedStrategy.title}`
              : 'Choose a strategy to continue'
          }
        </div>
        <div className="flex gap-3">
                        <button
                onClick={handleModifyClick}
                disabled={clickedButtons.has('modify')}
                className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center gap-2 cursor-pointer ${
                  clickedButtons.has('modify')
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                <FiEdit3 className="w-4 h-4" />
                Modify
              </button>
              <button
                onClick={handleContinue}
                disabled={selectedStrategy === null || clickedButtons.has('continue')}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  selectedStrategy === null || clickedButtons.has('continue')
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg'
                }`}
              >
                Continue
                <FiArrowRight className="w-4 h-4" />
              </button>
        </div>
      </div>

      {/* Modification Modal */}
      {showModification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Modify Strategy</h3>
            <p className="text-gray-600 mb-4">
              What would you like to change about the strategy? You can ask me in the chat to:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 mb-6">
              <li>• Adjust the budget allocation</li>
              <li>• Change target platforms</li>
              <li>• Modify the campaign duration</li>
              <li>• Refine the target audience</li>
              <li>• Add specific campaign goals</li>
            </ul>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModification(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowModification(false);
                  // This would trigger a chat message asking for modifications
                  console.log('User wants to modify strategy via chat');
                }}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
              >
                Ask in Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategyCards;
