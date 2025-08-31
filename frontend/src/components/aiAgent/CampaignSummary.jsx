import { useState } from 'react';
import { FiCheck, FiPlay, FiDownload, FiShare2, FiEye } from 'react-icons/fi';

const CampaignSummary = ({ campaignData, onLaunch, onExport }) => {
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunch = async () => {
    setIsLaunching(true);
    // Simulate launch process
    setTimeout(() => {
      setIsLaunching(false);
      onLaunch(campaignData);
    }, 2000);
  };

  const handleExport = () => {
    onExport(campaignData);
  };

  const getCampaignStatus = () => {
    const totalSteps = 4; // Ideas, Content, Schedule, Budget
    const completedSteps = campaignData.idea && campaignData.content && campaignData.schedule && campaignData.budget ? 4 : 0;
    return { completed: completedSteps, total: totalSteps, percentage: (completedSteps / totalSteps) * 100 };
  };

  const status = getCampaignStatus();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">🚀 Campaign Summary</h3>
        <div className="text-sm text-gray-500">Review your complete campaign before launch</div>
      </div>

      {/* Campaign Status */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Campaign Status</h4>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{status.completed}/{status.total}</div>
            <div className="text-sm text-gray-600">Steps Completed</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${status.percentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Setup Progress</span>
          <span>{status.percentage}% Complete</span>
        </div>
      </div>

      {/* Campaign Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campaign Details */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Campaign Details</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">🎯</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Campaign Idea</div>
                  <div className="text-sm text-gray-600">{campaignData.idea?.title || 'Not selected'}</div>
                </div>
              </div>
              {campaignData.idea && <FiCheck className="text-green-500" size={20} />}
            </div>

            <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">📝</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Content</div>
                  <div className="text-sm text-gray-600">{campaignData.content ? 'Approved' : 'Pending approval'}</div>
                </div>
              </div>
              {campaignData.content && <FiCheck className="text-green-500" size={20} />}
            </div>

            <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm">📅</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Schedule</div>
                  <div className="text-sm text-gray-600">{campaignData.schedule ? `${campaignData.schedule.length} posts scheduled` : 'Not scheduled'}</div>
                </div>
              </div>
              {campaignData.schedule && <FiCheck className="text-green-500" size={20} />}
            </div>

            <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-sm">💰</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Budget</div>
                  <div className="text-sm text-gray-600">{campaignData.budget ? `$${Object.values(campaignData.budget).reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toLocaleString()}` : 'Not allocated'}</div>
                </div>
              </div>
              {campaignData.budget && <FiCheck className="text-green-500" size={20} />}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Expected Performance</h4>
          
          <div className="space-y-3">
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Expected Reach</span>
                <span className="text-lg font-bold text-blue-600">50,000+</span>
              </div>
              <div className="text-xs text-gray-500">Based on your budget and platform mix</div>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Expected Leads</span>
                <span className="text-lg font-bold text-green-600">500+</span>
              </div>
              <div className="text-xs text-gray-500">Qualified leads from campaign</div>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Campaign Duration</span>
                <span className="text-lg font-bold text-purple-600">6 weeks</span>
              </div>
              <div className="text-xs text-gray-500">From launch to completion</div>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">ROI Estimate</span>
                <span className="text-lg font-bold text-yellow-600">3.2x</span>
              </div>
              <div className="text-xs text-gray-500">Expected return on investment</div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      {campaignData.schedule && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">📱 Platform Distribution</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['LinkedIn', 'Instagram', 'TikTok', 'Facebook'].map(platform => {
              const count = campaignData.schedule.filter(item => item.platform === platform).length;
              const percentage = campaignData.schedule.length > 0 ? (count / campaignData.schedule.length * 100).toFixed(0) : 0;
              
              return (
                <div key={platform} className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{count}</div>
                  <div className="text-sm text-gray-600">{platform}</div>
                  <div className="text-xs text-gray-500">{percentage}% of posts</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
        <button
          onClick={handleExport}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <FiDownload size={16} />
          Export Campaign Plan
        </button>
        
        <button
          onClick={handleLaunch}
          disabled={status.percentage < 100 || isLaunching}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLaunching ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Launching Campaign...
            </>
          ) : (
            <>
              <FiPlay size={16} />
              Launch Campaign
            </>
          )}
        </button>
      </div>

      {/* Launch Confirmation */}
      {isLaunching && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <FiCheck className="text-green-600" size={16} />
            </div>
            <div>
              <div className="font-medium text-green-900">Campaign Launching!</div>
              <div className="text-sm text-green-700">Your campaign is being deployed across all platforms. You'll receive notifications as each component goes live.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignSummary;

