import React, { useState, useEffect } from 'react';
import { FiCheck, FiFileText, FiCalendar, FiGlobe, FiStar, FiTrendingUp, FiArrowLeft, FiPlay, FiImage, FiVideo, FiEdit3 } from 'react-icons/fi';

const ContentGeneration = ({ contentData, onContentComplete, aiRecommendation, onBack, onTriggerAIResponse }) => {
  const [clickedButtons, setClickedButtons] = useState(new Set());
  const [selectedContent, setSelectedContent] = useState(new Set());

  // Reset clicked buttons when component mounts (new step)
  useEffect(() => {
    setClickedButtons(new Set());
  }, []);

  const handleContentSelect = (contentId) => {
    const newSelected = new Set(selectedContent);
    if (newSelected.has(contentId)) {
      newSelected.delete(contentId);
    } else {
      newSelected.add(contentId);
    }
    setSelectedContent(newSelected);
  };

  const handleContinue = () => {
    setClickedButtons(prev => new Set([...prev, 'continue']));
    
    // Trigger user dialog for continue action
    if (onTriggerAIResponse) {
      setTimeout(() => {
        onTriggerAIResponse(`I have approved the content strategy and selected the key content pieces. Please proceed to configure the advertising campaigns.`);
      }, 100);
    }
    
    // Small delay to show the grey state before action
    setTimeout(() => {
      onContentComplete(contentData.generatedContent.filter(content => selectedContent.has(content.id)));
    }, 100);
  };

  const handleModifyClick = () => {
    setClickedButtons(prev => new Set([...prev, 'modify']));
    
    // Trigger user dialog for modify action
    if (onTriggerAIResponse) {
      setTimeout(() => {
        onTriggerAIResponse(`I would like to modify the content strategy. Can you help me adjust the content types or generate different content pieces?`);
      }, 100);
    }
    
    console.log('User wants to modify content via chat');
  };

  const getContentIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'video':
        return <FiVideo className="w-4 h-4" />;
      case 'article':
        return <FiFileText className="w-4 h-4" />;
      case 'challenge':
        return <FiPlay className="w-4 h-4" />;
      case 'infographic':
        return <FiImage className="w-4 h-4" />;
      default:
        return <FiEdit3 className="w-4 h-4" />;
    }
  };

  const getSelectedCount = () => {
    return selectedContent.size;
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Scheduling
        </button>
      )}

      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
          <FiFileText className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Content Generation</h3>
          <p className="text-gray-600">AI-generated content strategy and pieces for your campaign</p>
        </div>
      </div>

      {/* Content Strategy Overview */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiStar className="w-5 h-5 text-purple-600" />
          Content Strategy Overview
        </h4>
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-line text-gray-700">
            {contentData.contentStrategy}
          </div>
        </div>
      </div>

      {/* Content Pillars */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiTrendingUp className="w-5 h-5 text-blue-600" />
          Content Pillars
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contentData.contentPillars.map((pillar) => (
            <div key={pillar.id} className="bg-white rounded-lg p-4 border border-blue-100">
              <h5 className="font-semibold text-gray-900 mb-2">{pillar.title}</h5>
              <p className="text-sm text-gray-600 mb-3">{pillar.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FiGlobe className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Types: {pillar.contentTypes.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiStar className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Platforms: {pillar.platforms.join(', ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Content Pieces */}
      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiEdit3 className="w-5 h-5 text-green-600" />
          Generated Content Pieces
        </h4>
        <div className="space-y-4">
          {contentData.generatedContent.map((content) => (
            <div
              key={content.id}
              className={`border-2 rounded-xl p-4 transition-all cursor-pointer hover:shadow-md relative ${
                selectedContent.has(content.id)
                  ? 'border-green-500 bg-gradient-to-r from-green-50 to-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => handleContentSelect(content.id)}
            >
              {/* Selection Badge */}
              {selectedContent.has(content.id) && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <FiCheck className="w-3 h-3" />
                  Selected
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getContentIcon(content.type)}
                  <div>
                    <h5 className="font-medium text-gray-900">{content.title}</h5>
                    <p className="text-sm text-gray-600">{content.platform}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{content.type}</div>
                  <div className="text-sm text-gray-600">{content.estimatedTime}</div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">{content.description}</p>

              {/* Content Preview */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line text-gray-700 text-sm">
                    {content.content}
                  </div>
                </div>
              </div>

              {/* Guidelines */}
              <div className="space-y-2">
                <h6 className="text-sm font-medium text-gray-900">Guidelines:</h6>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {content.guidelines.map((guideline, index) => (
                    <li key={index}>{guideline}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Calendar */}
      <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiCalendar className="w-5 h-5 text-orange-600" />
          Content Calendar
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentData.contentCalendar.map((week) => (
            <div key={week.week} className="bg-white rounded-lg p-4 border border-orange-100">
              <div className="text-center mb-3">
                <div className="w-8 h-8 mx-auto bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {week.week}
                </div>
                <h6 className="font-medium text-gray-900 mt-2">{week.focus}</h6>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Content:</span>
                  <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                    {week.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Platforms:</span>
                  <div className="text-xs text-gray-600 mt-1">{week.platforms.join(', ')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {getSelectedCount() > 0 
            ? `${getSelectedCount()} of ${contentData.generatedContent.length} content pieces selected`
            : 'Select content pieces to continue'
          }
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleModifyClick}
            disabled={clickedButtons.has('modify')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 cursor-pointer ${
              clickedButtons.has('modify')
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiEdit3 className="w-4 h-4" />
            Modify
          </button>
          <button
            onClick={handleContinue}
            disabled={clickedButtons.has('continue')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 cursor-pointer ${
              clickedButtons.has('continue')
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg'
            }`}
          >
            Continue to Ads Setup
            <FiTrendingUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentGeneration;
