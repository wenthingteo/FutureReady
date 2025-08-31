import React, { useState, useEffect } from 'react';
import { FiZap, FiCheck, FiClock, FiTarget, FiTrendingUp, FiActivity, FiSun } from 'react-icons/fi';

const AIThinkingCursor = ({ 
  isThinking = false, 
  currentStep = '', 
  thinkingProcess = [], 
  todoList = [],
  progress = 0 
}) => {
  const [currentThinkingIndex, setCurrentThinkingIndex] = useState(0);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [thinkingMessages, setThinkingMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);

  // Dynamic thinking messages for different steps
  const getThinkingMessages = (step) => {
    const messages = {
      'idea': [
        "🤔 Analyzing your request...",
        "📊 Researching market trends...",
        "🎯 Identifying target audience...",
        "💡 Generating campaign ideas...",
        "✨ Selecting best strategies...",
        "✅ Ready to present options!"
      ],
      'content': [
        "🎨 Creating engaging content...",
        "📝 Writing platform-specific copy...",
        "🖼️ Designing visual elements...",
        "🏷️ Adding trending hashtags...",
        "📱 Optimizing for each platform...",
        "✨ Content ready for review!"
      ],
      'schedule': [
        "📅 Analyzing optimal posting times...",
        "⏰ Checking audience activity patterns...",
        "📊 Planning content calendar...",
        "🔄 Setting up automation...",
        "🎯 Optimizing for engagement...",
        "✅ Schedule optimized!"
      ],
      'budget': [
        "💰 Calculating total budget...",
        "📊 Analyzing platform costs...",
        "🎯 Allocating for maximum ROI...",
        "📈 Setting bid strategies...",
        "📊 Planning performance tracking...",
        "✅ Budget allocation complete!"
      ],
      'launch': [
        "🚀 Preparing campaign assets...",
        "🔧 Setting up tracking pixels...",
        "⚙️ Configuring platform settings...",
        "📅 Scheduling posts...",
        "🎯 Finalizing launch sequence...",
        "✅ Campaign ready to launch!"
      ]
    };
    return messages[step] || messages['idea'];
  };

  // Dynamic todo lists for different steps
  const getDynamicTodoList = (step) => {
    const todos = {
      'idea': [
        "Analyze user requirements",
        "Research market trends",
        "Identify target audience",
        "Generate campaign ideas",
        "Select best strategies",
        "Prepare presentation"
      ],
      'content': [
        "Create engaging headlines",
        "Write platform-specific content",
        "Design visual elements",
        "Add trending hashtags",
        "Optimize for each platform",
        "Prepare for review"
      ],
      'schedule': [
        "Analyze posting times",
        "Check audience patterns",
        "Plan content calendar",
        "Set up automation",
        "Optimize for engagement",
        "Finalize schedule"
      ],
      'budget': [
        "Calculate total budget",
        "Analyze platform costs",
        "Allocate for ROI",
        "Set bid strategies",
        "Plan tracking",
        "Finalize allocation"
      ],
      'launch': [
        "Prepare assets",
        "Set up tracking",
        "Configure platforms",
        "Schedule posts",
        "Finalize sequence",
        "Launch campaign"
      ]
    };
    return todos[step] || todos['idea'];
  };

  useEffect(() => {
    if (!isThinking) return;

    // Get dynamic messages and todos based on current step
    const messages = getThinkingMessages(currentStep);
    const todos = getDynamicTodoList(currentStep);
    
    setThinkingMessages(messages);
    setCurrentMessage(messages[0]);
    setMessageIndex(0);

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Dynamic thinking message animation
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => {
        const nextIndex = (prev + 1) % messages.length;
        setCurrentMessage(messages[nextIndex]);
        return nextIndex;
      });
    }, 3000);

    // Todo list animation
    const todoInterval = setInterval(() => {
      setCurrentTodoIndex(prev => 
        prev < todos.length - 1 ? prev + 1 : 0
      );
    }, 4000);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(messageInterval);
      clearInterval(todoInterval);
    };
  }, [isThinking, currentStep]);

  if (!isThinking) return null;

  const currentTodos = getDynamicTodoList(currentStep);

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 max-w-sm w-full z-50">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gradient-to-r from-[#475ECD] to-purple-600 rounded-full flex items-center justify-center">
          <FiZap className="w-4 h-4 text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 text-sm">AI Assistant</h4>
          <p className="text-xs text-gray-500">Processing your request...</p>
        </div>
      </div>

      {/* Current Step */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <FiTarget className="w-4 h-4 text-[#475ECD]" />
          <span className="text-sm font-medium text-gray-700">Current Step:</span>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-sm text-gray-600">{currentStep}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-medium text-[#475ECD]">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#475ECD] to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Dynamic Thinking Process */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <FiActivity className="w-4 h-4 text-[#475ECD]" />
          <span className="text-sm font-medium text-gray-700">Thinking:</span>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 min-h-[50px]">
          <div className="flex items-start gap-2">
            <FiSun className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-gray-700 leading-relaxed">
                {currentMessage}
                <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
                  |
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Todo List */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FiClock className="w-4 h-4 text-[#475ECD]" />
          <span className="text-sm font-medium text-gray-700">Current Tasks:</span>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <div className="space-y-2">
            {currentTodos.map((todo, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full flex items-center justify-center ${
                  index <= currentTodoIndex 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
                }`}>
                  {index <= currentTodoIndex && (
                    <FiCheck className="w-2 h-2 text-white" />
                  )}
                </div>
                <span className={`text-xs ${
                  index <= currentTodoIndex 
                    ? 'text-gray-700 line-through' 
                    : 'text-gray-500'
                }`}>
                  {todo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thinking Status */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Processing...</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-[#475ECD] rounded-full animate-pulse"></div>
            <span className="text-[#475ECD] font-medium">AI Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIThinkingCursor;
