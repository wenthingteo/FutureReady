import React from "react";

const BudgetStep = ({ campaignData, setCampaignData }) => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">💰 Budget & Scheduling</h3>
        <p className="text-gray-600">Define your daily budget and set campaign duration</p>
      </div>

      {/* Budget Slider */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <label className="text-lg font-semibold text-gray-900">Daily Budget</label>
          <div className="text-3xl font-extrabold text-[#475ECD]">
            ${campaignData.budget}
          </div>
        </div>
        <input
          type="range"
          step="0.1"
          min="0.1"
          max="10"
          value={campaignData.budget}
          onChange={(e) =>
            setCampaignData({
              ...campaignData,
              budget: parseFloat(e.target.value),
            })
          }
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-4"
          style={{
            background: `linear-gradient(to right, #475ECD 0%, #475ECD ${
              ((campaignData.budget - 0.1) / 9.9) * 100
            }%, #e5e7eb ${
              ((campaignData.budget - 0.1) / 9.9) * 100
            }%, #e5e7eb 100%)`,
          }}
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>$0.1/day</span>
          <span>$10/day</span>
        </div>
      </div>

      

      {/* AI Forecast */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-indigo-100 shadow-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">
              AI-Powered Forecast
            </span>
          </div>
          <h4 className="text-xl font-bold text-gray-900">
            Campaign Performance Prediction
          </h4>
        </div>

        {/* Forecast Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ForecastCard
            value="45K - 62K"
            label="Estimated Reach"
            note="👥 People"
            color="text-indigo-600"
          />
          <ForecastCard
            value="$0.75 - $1.20"
            label="Estimated CPC"
            note="💰 Cost per Click"
            color="text-purple-600"
          />
          <ForecastCard
            value="85 - 120"
            label="Expected Conversions"
            note="🎯 Actions"
            color="text-green-600"
          />
          <ForecastCard
            value="4.2x"
            label="Predicted ROAS"
            note="📈 Return on Spend"
            color="text-pink-600"
          />
        </div>

        {/* Recommendation */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Recommended Strategy:
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
              ✨ Auto-bidding
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Based on your campaign objective and budget, our AI recommends
            automated bidding for optimal performance and cost efficiency.
          </p>
        </div>
      </div>
    </div>
  );
};

const ForecastCard = ({ value, label, note, color }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 text-center shadow-sm">
    <div className={`text-2xl font-bold mb-1 ${color}`}>{value}</div>
    <div className="text-sm text-gray-600 font-medium">{label}</div>
    <div className="text-xs text-gray-500 mt-1">{note}</div>
  </div>
);

export default BudgetStep;
