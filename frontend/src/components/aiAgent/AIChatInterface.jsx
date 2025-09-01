import React, { useEffect, useRef, useState } from 'react';
import { FiSend, FiZap, FiUser } from 'react-icons/fi';

// Utility function to render formatted text
const renderFormattedText = (text) => {
  if (!text) return '';
  
  // Split by line breaks first
  const lines = text.split('\n');
  
  return lines.map((line, lineIndex) => {
    if (!line.trim()) {
      return <br key={lineIndex} />;
    }
    
    // Process bold text (**text**)
    const parts = line.split(/(\*\*.*?\*\*)/g);
    
    return (
      <div key={lineIndex} className="mb-2">
        {parts.map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            // Bold text
            const boldText = part.slice(2, -2);
            return <strong key={partIndex} className="font-bold">{boldText}</strong>;
          } else if (part.trim()) {
            // Regular text
            return <span key={partIndex}>{part}</span>;
          }
          return null;
        })}
      </div>
    );
  });
};

const AIChatInterface = ({
  messages,
  inputValue,
  setInputValue,
  isTyping,
  currentStep,
  onSendMessage,
  onKeyPress,
  onQuickAction,
  isActionMode
}) => {
  const [clickedButtons, setClickedButtons] = useState(new Set());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Additional scroll when typing starts
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  // Handle button click and grey out
  const handleButtonClick = (action, buttonId) => {
    setClickedButtons(prev => new Set([...prev, buttonId]));
    // Small delay to show the grey state before action
    setTimeout(() => {
      onQuickAction(action);
    }, 100);
  };

  // Reset clicked buttons only when starting a completely new conversation
  useEffect(() => {
    if (messages.length === 0 && currentStep === 'welcome') {
      setClickedButtons(new Set());
    }
  }, [messages.length, currentStep]);

  // Scroll to top when step changes (new view)
  useEffect(() => {
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = 0;
    }
  }, [currentStep]);

  // Reset clicked buttons when step changes
  useEffect(() => {
    setClickedButtons(new Set());
  }, [currentStep]);
  return (
    <div className="flex flex-col h-full">

             {/* Messages Area */}
       <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0 messages-container">
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-[#3264DF]/10 to-purple-500/10 rounded-full flex items-center justify-center mb-6">
              <FiZap className="w-10 h-10 text-[#3264DF]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome to AI Campaign Assistant</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              I'm here to help you create amazing social media campaigns. 
              Tell me what you'd like to promote and I'll guide you through the entire process.
            </p>
            
            {/* Quick Action Buttons for Chat Mode */}
            {!isActionMode && (
              <div className="space-y-3 mb-6">
                <div className="text-sm font-medium text-gray-700 mb-3">Quick Questions:</div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleButtonClick("How can I improve my campaign performance?", "performance")}
                    disabled={clickedButtons.has('performance')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      clickedButtons.has('performance')
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                    }`}
                  >
                    📊 Performance Tips
                  </button>
                  <button
                    onClick={() => handleButtonClick("What's the best budget allocation strategy?", "budget")}
                    disabled={clickedButtons.has('budget')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      clickedButtons.has('budget')
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                    }`}
                  >
                    💰 Budget Strategy
                  </button>
                  <button
                    onClick={() => handleButtonClick("Which platforms should I focus on?", "platforms")}
                    disabled={clickedButtons.has('platforms')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      clickedButtons.has('platforms')
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                    }`}
                  >
                    📱 Platform Guide
                  </button>
                  <button
                    onClick={() => handleButtonClick("Plan a new campaign", "plan")}
                    disabled={clickedButtons.has('plan')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      clickedButtons.has('plan')
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                    }`}
                  >
                    🚀 Plan Campaign
                  </button>
                </div>
              </div>
            )}
            
            <div className="text-sm text-gray-500">
              💡 <strong>Pro Tip:</strong> Be specific about your goals for better results
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <div key={message.id} className={`flex items-start gap-3 ${message.isAgent ? 'flex-row' : 'flex-row-reverse ml-auto'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
              message.isAgent ? 'bg-gradient-to-r from-[#3264DF] to-purple-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              {message.isAgent ? <FiZap size={18} /> : <FiUser size={18} />}
            </div>
            <div className={`${message.isAgent ? 'max-w-[70%]' : 'max-w-[70%]'}`}>
              <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                message.isAgent
                  ? 'bg-white border border-gray-200'
                  : 'bg-gradient-to-r from-[#3264DF] to-purple-600 text-white'
              }`}>
                {typeof message.content === 'string' ? (
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {renderFormattedText(message.content)}
                  </div>
                ) : (
                  message.content
                )}
              </div>
              <span className="text-xs text-gray-500 mt-2 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#3264DF] to-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <FiZap size={18} />
            </div>
            <div className="max-w-[70%]">
              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#3264DF] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#3264DF] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-[#3264DF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

                 

                 {/* Summary Phase Quick Actions */}
         {currentStep === 'campaign-summary' && isActionMode && (
           <div className="flex flex-wrap gap-3 mt-6">
                           <button
                onClick={() => handleButtonClick('Can you explain the campaign strategy?', 'explain-strategy')}
                disabled={clickedButtons.has('explain-strategy') || isTyping}
                className={`px-6 py-3 rounded-xl transition-all duration-300 text-sm font-medium border transform hover:scale-105 active:scale-95 ${
                  clickedButtons.has('explain-strategy') || isTyping
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 hover:from-green-500/20 hover:to-emerald-500/20 border-green-500/20 hover:border-green-500/40 hover:shadow-lg cursor-pointer'
                }`}
              >
                📋 Explain Strategy
              </button>
                           <button
                onClick={() => handleButtonClick('What modifications can I make?', 'modify-campaign')}
                disabled={clickedButtons.has('modify-campaign') || isTyping}
                className={`px-6 py-3 rounded-xl transition-all duration-300 text-sm font-medium border transform hover:scale-105 active:scale-95 ${
                  clickedButtons.has('modify-campaign') || isTyping
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 hover:from-blue-500/20 hover:to-indigo-500/20 border-blue-500/20 hover:border-blue-500/40 hover:shadow-lg cursor-pointer'
                }`}
              >
                🔧 Modify Campaign
              </button>
                           <button
                onClick={() => handleButtonClick('What are the expected results?', 'expected-results')}
                disabled={clickedButtons.has('expected-results') || isTyping}
                className={`px-6 py-3 rounded-xl transition-all duration-300 text-sm font-medium border transform hover:scale-105 active:scale-95 ${
                  clickedButtons.has('expected-results') || isTyping
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 hover:from-purple-500/20 hover:to-pink-500/20 border-purple-500/20 hover:border-purple-500/40 hover:shadow-lg cursor-pointer'
                }`}
              >
                📊 Expected Results
              </button>
           </div>
         )}
         
         {/* Scroll target for auto-scroll */}
         <div ref={messagesEndRef} />
       </div>

      {/* Input Area */}
      <div className="bg-gradient-to-r from-white to-gray-50/50 border-t border-gray-200 p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder={currentStep === 'campaign-summary' ? "Ask me about your campaign or request modifications..." : "Tell me about your campaign goals, product, or what you'd like to promote..."}
              className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3264DF] focus:border-transparent transition-all shadow-sm"
              disabled={isTyping || (currentStep !== 'welcome' && currentStep !== 'campaign-summary')}
            />
          </div>
          <button
            onClick={onSendMessage}
            disabled={!inputValue.trim() || isTyping || (currentStep !== 'welcome' && currentStep !== 'campaign-summary')}
            className="px-8 py-4 bg-gradient-to-r from-[#3264DF] to-purple-600 text-white rounded-xl hover:from-[#2854CC] hover:to-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
          >
            <FiSend size={18} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;
