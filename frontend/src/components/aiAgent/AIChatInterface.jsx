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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3264DF]/5 to-purple-500/5 border-b border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-[#3264DF] to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <FiZap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI Campaign Assistant</h2>
            <p className="text-sm text-gray-500">Powered by advanced AI technology</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
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
                  <p className="text-sm leading-relaxed">{message.content}</p>
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

        {/* Quick Actions */}
        {currentStep === 'welcome' && (
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => onQuickAction('I want to promote my new product')}
              className="px-6 py-3 bg-gradient-to-r from-[#3264DF]/10 to-purple-500/10 text-[#3264DF] rounded-xl hover:from-[#3264DF]/20 hover:to-purple-500/20 transition-all text-sm font-medium border border-[#3264DF]/20 hover:border-[#3264DF]/40"
            >
              🚀 Promote Product
            </button>
            <button
              onClick={() => onQuickAction('Create a brand awareness campaign')}
              className="px-6 py-3 bg-gradient-to-r from-[#3264DF]/10 to-purple-500/10 text-[#3264DF] rounded-xl hover:from-[#3264DF]/20 hover:to-purple-500/20 transition-all text-sm font-medium border border-[#3264DF]/20 hover:border-[#3264DF]/40"
            >
              📢 Create Campaign
            </button>
            <button
              onClick={() => onQuickAction('Generate content for social media')}
              className="px-6 py-3 bg-gradient-to-r from-[#3264DF]/10 to-purple-500/10 text-[#3264DF] rounded-xl hover:from-[#3264DF]/20 hover:to-purple-500/20 transition-all text-sm font-medium border border-[#3264DF]/20 hover:border-[#3264DF]/40"
            >
              ✨ Generate Content
            </button>
          </div>
        )}

        {/* Summary Phase Quick Actions */}
        {currentStep === 'campaign-summary' && (
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => onQuickAction('Can you explain the campaign strategy?')}
              className="px-6 py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 rounded-xl hover:from-green-500/20 hover:to-emerald-500/20 transition-all text-sm font-medium border border-green-500/20 hover:border-green-500/40"
            >
              📋 Explain Strategy
            </button>
            <button
              onClick={() => onQuickAction('What modifications can I make?')}
              className="px-6 py-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 rounded-xl hover:from-blue-500/20 hover:to-indigo-500/20 transition-all text-sm font-medium border border-blue-500/20 hover:border-blue-500/40"
            >
              🔧 Modify Campaign
            </button>
            <button
              onClick={() => onQuickAction('What are the expected results?')}
              className="px-6 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 rounded-xl hover:from-purple-500/20 hover:to-pink-500/20 transition-all text-sm font-medium border border-purple-500/20 hover:border-purple-500/40"
            >
              📊 Expected Results
            </button>
          </div>
        )}
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
              placeholder={currentStep === 'campaign-summary' ? "Ask me about your campaign or request modifications..." : "What would you like to promote today?"}
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
