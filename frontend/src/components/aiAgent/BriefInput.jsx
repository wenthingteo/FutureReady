import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiTarget, FiUsers, FiDollarSign, FiCalendar, FiGlobe, FiCheck, FiEdit3, FiArrowLeft } from 'react-icons/fi';

const BriefInput = ({ onBriefComplete, onBack, onTriggerAIResponse, workspaceRef }) => {
  const [briefText, setBriefText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [clickedButtons, setClickedButtons] = useState(new Set());
  const recommendationRef = useRef(null);

  // Reset clicked buttons when component mounts (new step)
  useEffect(() => {
    setClickedButtons(new Set());
  }, []);

  // Auto-scroll to recommendation when it appears
  useEffect(() => {
    if (aiRecommendation && recommendationRef.current) {
      setTimeout(() => {
        recommendationRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 500);
    }
  }, [aiRecommendation]);

  // Scroll to top when component mounts
  useEffect(() => {
    if (workspaceRef && workspaceRef.current) {
      // Add a small delay to ensure the component is fully rendered
      setTimeout(() => {
        workspaceRef.current.scrollTop = 0;
      }, 100);
    }
  }, [workspaceRef]);

  const handleSubmit = async () => {
    if (!briefText.trim()) return;
    
    setIsProcessing(true);
    
         // Trigger user dialog for manual brief submission
     if (onTriggerAIResponse) {
       setTimeout(() => {
         onTriggerAIResponse(`I have submitted my campaign brief. Please analyze this for me: "${briefText.substring(0, 50)}${briefText.length > 50 ? '...' : ''}"`);
       }, 100);
     }
    
    // Simulate AI analysis and recommendation
    setTimeout(() => {
      const recommendation = analyzeBriefAndRecommend(briefText);
      setAiRecommendation(recommendation);
      setIsProcessing(false);
      
             // Trigger user dialog after recommendation is generated
       if (onTriggerAIResponse) {
         setTimeout(() => {
           onTriggerAIResponse(`I have received the AI recommendation. I like the ${recommendation.strategy} strategy with $${recommendation.budget.toLocaleString()} budget. Can you explain the reasoning behind this choice?`);
         }, 500);
       }
    }, 2000);
  };

  const analyzeBriefAndRecommend = (text) => {
    const lowerText = text.toLowerCase();
    
    // AI analysis logic
    let recommendedStrategy = 'Multi-Platform Awareness';
    let recommendedBudget = 2000;
    let recommendedDuration = '4 weeks';
    let recommendedPlatforms = ['Facebook', 'Instagram'];
    let confidence = 85;

    if (lowerText.includes('b2b') || lowerText.includes('linkedin')) {
      recommendedStrategy = 'Conversion-Driven';
      recommendedPlatforms = ['LinkedIn', 'Facebook'];
      recommendedBudget = 3000;
      confidence = 92;
    } else if (lowerText.includes('engagement') || lowerText.includes('community')) {
      recommendedStrategy = 'Engagement-Focused';
      recommendedPlatforms = ['Instagram', 'TikTok'];
      recommendedBudget = 1500;
      confidence = 88;
    } else if (lowerText.includes('launch') || lowerText.includes('product')) {
      recommendedStrategy = 'Multi-Platform Awareness';
      recommendedPlatforms = ['Facebook', 'Instagram', 'LinkedIn'];
      recommendedBudget = 2500;
      confidence = 90;
    }

    // Extract budget if mentioned
    const budgetMatch = text.match(/\$?(\d+(?:,\d+)*(?:\.\d+)?)/);
    if (budgetMatch) {
      recommendedBudget = parseFloat(budgetMatch[1].replace(/,/g, ''));
    }

    return {
      strategy: recommendedStrategy,
      budget: recommendedBudget,
      duration: recommendedDuration,
      platforms: recommendedPlatforms,
      confidence,
      reasoning: generateReasoning(text, recommendedStrategy, recommendedBudget, recommendedPlatforms)
    };
  };

  const generateReasoning = (text, strategy, budget, platforms) => {
    const lowerText = text.toLowerCase();
    let reasoning = [];

    if (lowerText.includes('b2b')) {
      reasoning.push('B2B focus detected - LinkedIn is optimal for professional audience');
    }
    if (lowerText.includes('engagement')) {
      reasoning.push('Engagement goals identified - Instagram and TikTok provide highest interaction rates');
    }
    if (lowerText.includes('launch')) {
      reasoning.push('Product launch detected - Multi-platform approach maximizes reach and awareness');
    }
    if (budget > 2000) {
      reasoning.push('Higher budget allows for comprehensive multi-platform campaign');
    }

    return reasoning;
  };

  const handleAcceptRecommendation = () => {
    setClickedButtons(prev => new Set([...prev, 'accept']));
    
         // Trigger user dialog for accepting recommendation
     if (onTriggerAIResponse) {
       setTimeout(() => {
         onTriggerAIResponse(`I have approved the ${aiRecommendation.strategy} strategy. Please proceed to create my comprehensive campaign plan with content strategy and scheduling.`);
       }, 100);
     }
    
    setTimeout(() => {
      onBriefComplete({
        brief: briefText,
        recommendation: aiRecommendation
      });
    }, 100);
  };

  const handleModifyRecommendation = () => {
         // Trigger user dialog for modifying recommendation
     if (onTriggerAIResponse) {
       setTimeout(() => {
         onTriggerAIResponse(`I have decided to modify this recommendation. Please help me adjust the strategy, budget, platforms, or duration.`);
       }, 100);
     }
    
    // This would open a modification interface or trigger chat
    console.log('User wants to modify recommendation');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

    const quickPrompts = [
    "I have no idea",
    "I want to launch a new product and need a comprehensive social media campaign",
    "Help me increase brand awareness across Facebook and Instagram",
    "I need to generate leads for my B2B service through LinkedIn",
    "Create an engagement campaign for my existing audience on TikTok",
    "I have a $5000 budget for a 4-week campaign across multiple platforms"
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back
        </button>
      )}

      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <FiTarget className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Campaign Brief</h3>
          <p className="text-gray-600">Tell me about your campaign goals, and I'll recommend the best strategy</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <FiTarget className="w-4 h-4 text-blue-600" />
            What to include in your brief:
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <FiUsers className="w-4 h-4 text-purple-600" />
              <span>Target audience</span>
            </div>
            <div className="flex items-center gap-2">
              <FiGlobe className="w-4 h-4 text-green-600" />
              <span>Platforms</span>
            </div>
            <div className="flex items-center gap-2">
              <FiDollarSign className="w-4 h-4 text-orange-600" />
              <span>Budget</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="w-4 h-4 text-red-600" />
              <span>Timeline</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your campaign
          </label>
                     <textarea
             value={briefText}
             onChange={(e) => {
               setBriefText(e.target.value);
                                // Trigger user dialog when user starts typing (only once)
                 if (e.target.value.length === 1 && onTriggerAIResponse) {
                   setTimeout(() => {
                     onTriggerAIResponse(`I have started writing my campaign brief. Please help me create the perfect strategy once I'm finished.`);
                   }, 500);
                 }
             }}
             onKeyPress={handleKeyPress}
             placeholder="e.g., I want to launch a new fitness app targeting millennials on Instagram and TikTok. My budget is $3000 for a 3-week campaign focused on brand awareness and app downloads..."
             className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
             disabled={isProcessing}
           />
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600">Or try one of these quick prompts:</p>
          <div className="grid grid-cols-1 gap-2">
                          {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setClickedButtons(prev => new Set([...prev, index]));
                    setBriefText(prompt);
                    handleSubmit();
                    
                                         // Trigger user dialog for quick prompt selection
                     if (onTriggerAIResponse) {
                       setTimeout(() => {
                         onTriggerAIResponse(`I have selected this scenario: "${prompt.substring(0, 40)}${prompt.length > 40 ? '...' : ''}". Please analyze this for me.`);
                       }, 100);
                     }
                  }}
                               className={`text-left p-3 rounded-lg text-sm text-gray-700 transition-colors cursor-pointer ${
               clickedButtons.has(index) || clickedButtons.has('accept') ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-50 hover:bg-gray-100'
             }`}
                                     disabled={clickedButtons.has(index) || isProcessing || clickedButtons.has('accept')}
                >
                  {prompt}
                </button>
              ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!briefText.trim() || isProcessing || clickedButtons.has('accept')}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
            !briefText.trim() || isProcessing || clickedButtons.has('accept')
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:scale-105'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              AI Analyzing...
            </>
          ) : (
            <>
              <FiSend className="w-4 h-4" />
              Get AI Recommendation
            </>
          )}
        </button>
      </div>

      {/* AI Recommendation Display */}
      {aiRecommendation && (
        <div ref={recommendationRef} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiCheck className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">AI Recommendation</h4>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-600">{aiRecommendation.confidence}% confidence</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="text-sm font-medium text-gray-700">Recommended Strategy</div>
              <div className="text-lg font-bold text-gray-900">{aiRecommendation.strategy}</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="text-sm font-medium text-gray-700">Budget</div>
              <div className="text-lg font-bold text-gray-900">RM {aiRecommendation.budget.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="text-sm font-medium text-gray-700">Duration</div>
              <div className="text-lg font-bold text-gray-900">{aiRecommendation.duration}</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="text-sm font-medium text-gray-700">Platforms</div>
              <div className="text-lg font-bold text-gray-900">{aiRecommendation.platforms.join(', ')}</div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <h5 className="font-medium text-gray-900 mb-2">Why this recommendation?</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              {aiRecommendation.reasoning.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAcceptRecommendation}
              disabled={clickedButtons.has('accept')}
              className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:scale-105 ${
                clickedButtons.has('accept')
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700'
              }`}
            >
              <FiCheck className="w-4 h-4" />
              Accept & Continue
            </button>
            <button
              onClick={handleModifyRecommendation}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center gap-2 cursor-pointer transform hover:scale-105"
            >
              <FiEdit3 className="w-4 h-4" />
              Modify
            </button>
          </div>

          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              💡 You can also ask me to enhance this recommendation in the chat!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BriefInput;
