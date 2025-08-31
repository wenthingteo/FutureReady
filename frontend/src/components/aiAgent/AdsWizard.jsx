import React, { useState, useEffect } from 'react';
import { FiCheck, FiStar, FiDollarSign } from 'react-icons/fi';

const AdsWizard = ({ adsConfig, onAdsComplete, aiRecommendation, onTriggerAIResponse }) => {
  const [config, setConfig] = useState(adsConfig || {
    budget: {
      total: 5000,
      distribution: {
        facebook: 0.35,
        instagram: 0.30,
        linkedin: 0.20,
        tiktok: 0.15
      }
    },
    targeting: {
      ageRange: '25-45',
      interests: ['Technology', 'Business', 'Innovation'],
      location: 'United States'
    }
  });
  const [aiOptimized, setAiOptimized] = useState(false);
  const [clickedButtons, setClickedButtons] = useState(new Set());

  // Reset clicked buttons when component mounts (new step)
  useEffect(() => {
    setClickedButtons(new Set());
  }, []);

  // Update config when adsConfig prop changes
  useEffect(() => {
    if (adsConfig) {
      setConfig(adsConfig);
    }
  }, [adsConfig]);

  useEffect(() => {
    if (aiRecommendation && !aiOptimized) {
      setTimeout(() => {
        setAiOptimized(true);
        const optimizedConfig = {
          ...config,
          budget: {
            total: aiRecommendation.budget || 5000,
            distribution: {
              facebook: 0.35,
              instagram: 0.30,
              linkedin: 0.20,
              tiktok: 0.15
            }
          },
          targeting: {
            ageRange: aiRecommendation.targetAge || '25-45',
            interests: aiRecommendation.interests || ['Technology', 'Business', 'Innovation'],
            location: aiRecommendation.location || 'United States'
          }
        };
        setConfig(optimizedConfig);
      }, 1000);
    }
  }, [aiRecommendation, aiOptimized, config]);

  const handleLaunch = () => {
    setClickedButtons(prev => new Set([...prev, 'launch']));
    
    // Trigger user dialog for launch action
    if (onTriggerAIResponse) {
      setTimeout(() => {
        onTriggerAIResponse(`I have approved the advertising configuration. Please proceed to review the performance forecast.`);
      }, 100);
    }
    
    // Small delay to show the grey state before action
    setTimeout(() => {
      onAdsComplete(config);
    }, 100);
  };

  // Ensure config has the proper structure
  const safeConfig = {
    budget: {
      total: config?.budget?.total || 5000,
      distribution: config?.budget?.distribution || {
        facebook: 0.35,
        instagram: 0.30,
        linkedin: 0.20,
        tiktok: 0.15
      }
    },
    targeting: {
      ageRange: config?.targeting?.ageRange || '25-45',
      interests: config?.targeting?.interests || ['Technology', 'Business', 'Innovation'],
      location: config?.targeting?.location || 'United States'
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Ad Campaign</h2>
        <p className="text-gray-600">Review and adjust your campaign settings</p>
      </div>

      {/* AI Optimization Banner */}
      {aiOptimized && (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <FiStar className="w-5 h-5 text-green-600" />
            <h4 className="font-medium text-green-800">AI Campaign Optimization Complete</h4>
          </div>
          <p className="text-sm text-green-700">
            I've analyzed your campaign goals and optimized budget allocation and targeting for maximum ROI.
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        {/* Budget Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiDollarSign className="w-5 h-5 text-blue-600" />
            Campaign Budget
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Budget</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={safeConfig.budget.total}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  budget: { ...prev.budget, total: parseInt(e.target.value) || 0 }
                }))}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="5000"
              />
            </div>
          </div>

          {/* Platform Distribution */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(safeConfig.budget.distribution).map(([platform, percentage]) => (
              <div key={platform} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 capitalize">{platform}</span>
                  <span className="text-sm font-bold text-blue-600">{Math.round(percentage * 100)}%</span>
                </div>
                <div className="text-sm text-gray-600">
                  ${Math.round(safeConfig.budget.total * percentage).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Targeting Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Target Audience</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
              <select
                value={safeConfig.targeting.ageRange}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  targeting: { ...prev.targeting, ageRange: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="25-45">25-45</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={safeConfig.targeting.location}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  targeting: { ...prev.targeting, location: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="United States"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
            <div className="flex flex-wrap gap-2">
              {safeConfig.targeting.interests.map((interest, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AI Strategy */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-3">🤖 AI Strategy Summary:</h4>
          <ul className="text-sm text-blue-700 space-y-2">
            <li className="flex items-start gap-2">
              <FiCheck className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
              Facebook & Instagram: 65% allocation for broad reach and engagement
            </li>
            <li className="flex items-start gap-2">
              <FiCheck className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
              LinkedIn: 20% for professional audience targeting
            </li>
            <li className="flex items-start gap-2">
              <FiCheck className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
              TikTok: 15% for younger demographic and viral potential
            </li>
            <li className="flex items-start gap-2">
              <FiCheck className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
              Age 25-45: Primary decision-makers with purchasing power
            </li>
          </ul>
        </div>
      </div>

      {/* Launch Button */}
      <div className="text-center">
                      <button
                onClick={handleLaunch}
                disabled={clickedButtons.has('launch')}
                className={`px-8 py-3 rounded-lg font-medium text-lg transition-all cursor-pointer ${
                  clickedButtons.has('launch')
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                Launch Campaign
              </button>
      </div>
    </div>
  );
};

export default AdsWizard;
