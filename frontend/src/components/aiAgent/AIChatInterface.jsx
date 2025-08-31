import React from 'react';
import { FiSend, FiZap, FiUser } from 'react-icons/fi';

const AIChatInterface = ({
  messages,
  inputValue,
  setInputValue,
  isTyping,
  currentStep,
  onSendMessage,
  onKeyPress,
  onQuickAction
}) => {
  return (
    <div className={`${currentStep === 'welcome' ? 'w-full' : 'w-1/2'} flex flex-col h-full`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#475ECD]/5 to-purple-500/5 border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#475ECD] to-purple-600 rounded-full flex items-center justify-center">
            <FiZap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Social Media Campaign Assistant</h1>
            <p className="text-sm text-gray-500">AI-powered campaign creation</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-start gap-3 max-w-[80%] ${message.isAgent ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.isAgent ? 'bg-[#475ECD] text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {message.isAgent ? <FiZap size={16} /> : <FiUser size={16} />}
            </div>
            <div className="flex-1">
              <div className={`rounded-lg px-4 py-3 ${
                message.isAgent
                  ? 'bg-white border border-gray-200 shadow-sm'
                  : 'bg-gradient-to-r from-[#475ECD] to-[#3d4fb8] text-white'
              }`}>
                {typeof message.content === 'string' ? (
                  <p className="text-sm">{message.content}</p>
                ) : (
                  message.content
                )}
              </div>
              <span className="text-xs text-gray-500 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-3 max-w-[80%]">
            <div className="w-8 h-8 bg-[#475ECD] text-white rounded-full flex items-center justify-center">
              <FiZap size={16} />
            </div>
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#475ECD] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#475ECD] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#475ECD] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {currentStep === 'welcome' && (
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => onQuickAction('I want to promote my new product')}
              className="px-4 py-2 bg-gradient-to-r from-[#475ECD]/10 to-purple-500/10 text-[#475ECD] rounded-lg hover:from-[#475ECD]/20 hover:to-purple-500/20 transition-all text-sm"
            >
              Promote Product
            </button>
            <button
              onClick={() => onQuickAction('Create a brand awareness campaign')}
              className="px-4 py-2 bg-gradient-to-r from-[#475ECD]/10 to-purple-500/10 text-[#475ECD] rounded-lg hover:from-[#475ECD]/20 hover:to-purple-500/20 transition-all text-sm"
            >
              Create Campaign
            </button>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-gradient-to-r from-white to-purple-50/30 border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="What would you like to promote today?"
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#475ECD] focus:border-transparent transition-all"
              disabled={isTyping || currentStep !== 'welcome'}
            />
          </div>
          <button
            onClick={onSendMessage}
            disabled={!inputValue.trim() || isTyping || currentStep !== 'welcome'}
            className="px-6 py-3 bg-gradient-to-r from-[#475ECD] to-purple-600 text-white rounded-lg hover:from-[#3d4fb8] hover:to-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <FiSend size={16} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;
