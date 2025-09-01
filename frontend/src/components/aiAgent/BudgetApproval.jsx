import { useState } from 'react';
import { FiEdit3, FiCheck, FiDollarSign, FiPieChart, FiArrowRight } from 'react-icons/fi';

const BudgetApproval = ({ budget, onApprove, onModify }) => {
  const [editingBudget, setEditingBudget] = useState({});
  const [approvedBudget, setApprovedBudget] = useState({});
  const [modifiedBudget, setModifiedBudget] = useState(budget);

  const budgetCategories = [
    { key: 'facebook', label: 'Facebook Ads', icon: FiPieChart },
    { key: 'instagram', label: 'Instagram Ads', icon: FiPieChart },
    { key: 'linkedin', label: 'LinkedIn Ads', icon: FiPieChart },
    { key: 'tiktok', label: 'TikTok Ads', icon: FiPieChart },
    { key: 'youtube', label: 'YouTube Ads', icon: FiPieChart },
    { key: 'contentCreation', label: 'Content Creation', icon: FiPieChart }
  ];

  const handleEditBudget = (category) => {
    setEditingBudget({ ...editingBudget, [category]: true });
  };

  const handleSaveBudget = (category, value) => {
    const updatedBudget = { ...modifiedBudget };
    updatedBudget[category] = parseFloat(value) || 0;
    setModifiedBudget(updatedBudget);
    onModify(updatedBudget);
    setEditingBudget({ ...editingBudget, [category]: false });
  };

  const handleApproveBudget = (category) => {
    setApprovedBudget({ ...approvedBudget, [category]: true });
  };

  const handleApproveAll = () => {
    onApprove(modifiedBudget);
  };

  const handleQuickApprove = () => {
    const allApproved = {};
    budgetCategories.forEach(cat => {
      allApproved[cat.key] = true;
    });
    setApprovedBudget(allApproved);
    onApprove(modifiedBudget);
  };

  const isAllBudgetApproved = () => {
    return budgetCategories.every(cat => approvedBudget[cat.key]);
  };

  const getTotalBudget = () => {
    return Object.values(modifiedBudget).reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
  };

  const getBudgetPercentage = (amount) => {
    const total = getTotalBudget();
    return total > 0 ? ((amount / total) * 100).toFixed(1) : 0;
  };

  const getBudgetColor = (percentage) => {
    if (percentage > 40) return 'bg-red-100 text-red-700';
    if (percentage > 25) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">💰 Social Media Budget Allocation</h3>
        <div className="text-sm text-gray-500">Review and approve your social media advertising budget</div>
      </div>

      {/* Total Budget Overview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-blue-900">Total Social Media Budget</h4>
          <div className="flex items-center gap-2">
            <FiDollarSign className="text-blue-600" size={20} />
            <span className="text-2xl font-bold text-blue-900">RM {getTotalBudget().toLocaleString()}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-blue-600">Allocated:</span>
            <span className="ml-2 font-medium">RM {getTotalBudget().toLocaleString()}</span>
          </div>
          <div>
            <span className="text-blue-600">Remaining:</span>
            <span className="ml-2 font-medium">RM 0</span>
          </div>
          <div>
            <span className="text-blue-600">Platforms:</span>
            <span className="ml-2 font-medium">{budgetCategories.length - 1}</span>
          </div>
        </div>
      </div>

      {/* Social Media Platform Budgets */}
      <div className="space-y-3">
        {budgetCategories.map((category) => {
          const amount = modifiedBudget[category.key] || 0;
          const percentage = getBudgetPercentage(amount);
          const IconComponent = category.icon;
          
          return (
            <div key={category.key} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <IconComponent className="w-6 h-6 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">{category.label}</h4>
                    <p className="text-xs text-gray-500">Budget allocation for {category.label.toLowerCase()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {approvedBudget[category.key] && (
                    <span className="text-green-600 text-xs flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                      <FiCheck size={12} /> Approved
                    </span>
                  )}
                  <button
                    onClick={() => handleEditBudget(category.key)}
                    className="p-1 text-gray-400 hover:text-[#475ECD] transition-colors"
                    title="Edit budget"
                  >
                    <FiEdit3 size={14} />
                  </button>
                  {!approvedBudget[category.key] && (
                    <button
                      onClick={() => handleApproveBudget(category.key)}
                      className="px-3 py-1 bg-[#475ECD] text-white text-xs rounded-lg hover:bg-[#3d4fb8] transition-colors"
                    >
                      Approve
                    </button>
                  )}
                </div>
              </div>

              {editingBudget[category.key] ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Budget Amount (RM)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => handleSaveBudget(category.key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#475ECD] focus:border-transparent"
                      min="0"
                      step="100"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveBudget(category.key, amount)}
                      className="px-3 py-1 bg-[#475ECD] text-white text-xs rounded-lg hover:bg-[#3d4fb8] transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingBudget({ ...editingBudget, [category.key]: false })}
                      className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiDollarSign className="text-gray-400" size={16} />
                      <span className="text-lg font-semibold text-gray-900">RM {amount.toLocaleString()}</span>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getBudgetColor(percentage)}`}>
                      {percentage}% of total
                    </div>
                  </div>
                  
                  {/* Budget Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#475ECD] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          {isAllBudgetApproved() ? 'All budget items approved!' : 'Review and approve your budget allocation'}
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleQuickApprove}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <FiCheck size={16} />
            Approve All
          </button>
          <button
            onClick={handleApproveAll}
            disabled={!isAllBudgetApproved()}
            className="px-6 py-2 bg-gradient-to-r from-[#475ECD] to-purple-600 text-white rounded-lg hover:from-[#3d4fb8] hover:to-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            Continue
            <FiArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Budget Distribution Chart */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">📊 Social Media Budget Distribution</h4>
        <div className="space-y-2">
          {budgetCategories.map((category) => {
            const amount = modifiedBudget[category.key] || 0;
            const percentage = getBudgetPercentage(amount);
            
            return (
              <div key={category.key} className="flex items-center gap-3">
                <span className="text-sm">{category.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{category.label}</span>
                    <span className="font-medium">${amount.toLocaleString()} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Social Media Budget Recommendations */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">💡 Social Media Budget Recommendations</h4>
        <div className="space-y-2 text-sm text-yellow-800">
          <p>• Facebook & Instagram: 40-50% of total budget for maximum reach and engagement</p>
          <p>• LinkedIn: 20-30% for B2B targeting and professional audience</p>
          <p>• TikTok: 15-25% for younger demographics and viral potential</p>
          <p>• YouTube: 10-20% for video content and long-form engagement</p>
          <p>• Content Creation: 10-15% for high-quality visuals and videos</p>
        </div>
      </div>

      {/* Platform Performance Insights */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">📈 Expected Performance by Platform</h4>
        <div className="grid grid-cols-2 gap-4 text-sm text-green-800">
          <div>
            <p><strong>Facebook:</strong> 2-5% CTR, $0.50-2.00 CPC</p>
            <p><strong>Instagram:</strong> 1-3% CTR, $0.70-3.00 CPC</p>
            <p><strong>LinkedIn:</strong> 0.5-2% CTR, $5.00-15.00 CPC</p>
          </div>
          <div>
            <p><strong>TikTok:</strong> 1-4% CTR, $1.00-3.00 CPC</p>
            <p><strong>YouTube:</strong> 0.5-2% CTR, $0.10-0.30 CPC</p>
            <p><strong>Content:</strong> 3-8x engagement boost</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetApproval;
