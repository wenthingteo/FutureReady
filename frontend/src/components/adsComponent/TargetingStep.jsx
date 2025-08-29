import React from "react";
import { Target, CheckCircle } from "lucide-react";

export default function TargetingStep({ campaignData, setCampaignData }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Targeting & Audience
        </h3>
        <p className="text-gray-600">Define your ideal audience with precision</p>
      </div>

      {/* Targeting Method Selection */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Choose Targeting Method</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Smart Targeting */}
          <button
            onClick={() =>
              setCampaignData({ ...campaignData, targetingMethod: "smart" })
            }
            className={`p-6 rounded-xl border-2 text-left transition-all ${
              campaignData.targetingMethod === "smart"
                ? "border-[#475ECD] bg-blue-50"
                : "border-gray-200 hover:border-[#475ECD]"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  campaignData.targetingMethod === "smart"
                    ? "bg-[#475ECD]"
                    : "bg-gray-600"
                }`}
              >
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Smart Targeting</div>
                <div className="text-sm text-green-600 font-medium">
                  ⭐ Recommended
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
               Most likely to deliver optimal campaign results
            </p>
          </button>

          {/* Manual Targeting */}
            <button
            onClick={() =>
                setCampaignData({ ...campaignData, targetingMethod: "manual" })
            }
            className={`p-6 rounded-xl border-2 text-left transition-all ${
                campaignData.targetingMethod === "manual"
                ? "border-[#475ECD] bg-blue-50"
                : "border-gray-200 hover:border-[#475ECD]"
            }`}
            >
            <div className="flex items-center gap-3 mb-3">
                <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    campaignData.targetingMethod === "manual"
                    ? "bg-[#475ECD]"
                    : "bg-gray-600"
                }`}
                >
                <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                <div className="font-semibold text-gray-900">Manual Targeting</div>
                <div className="text-sm text-gray-500">Advanced</div>
                </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
                Manually define the audiences you want to reach
            </p>
            </button>

        </div>
      </div>

      {/* Smart Targeting Mode */}
      {campaignData.targetingMethod === "smart" && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-green-800">
              AI Smart Targeting Enabled
            </span>
          </div>
          <p className="text-green-700 mb-4">
            Our AI will automatically find and target the most relevant audiences
            based on your campaign objective and historical performance data.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">23%</div>
              <div className="text-xs text-green-700">Better CTR</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">31%</div>
              <div className="text-xs text-green-700">Lower CPC</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">2.4x</div>
              <div className="text-xs text-green-700">Better ROAS</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">156%</div>
              <div className="text-xs text-green-700">More Conversions</div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Targeting Mode */}
      {campaignData.targetingMethod === "manual" && (
        <div className="space-y-6">
          {/* Audience Options */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Your Audiences</h4>
            <div className="space-y-3">
              {[
                {
                  title: "Existing customers",
                  desc: "Customers who ordered from you in the past 30 days",
                },
                {
                  title: "Prospective customers",
                  desc: "People similar to your current customers but not purchased yet",
                },
                {
                  title: "Churned customers",
                  desc: "Customers who haven’t ordered in the past 30 days",
                },
              ].map((aud) => (
                <label
                  key={aud.title}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#475ECD] rounded focus:ring-[#475ECD]"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{aud.title}</div>
                    <div className="text-sm text-gray-600">{aud.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Demographics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Age Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Age Range
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">18</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {campaignData.targeting.age[0]} - {campaignData.targeting.age[1]}
                  </span>
                  <span className="text-sm text-gray-600">65+</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="18"
                    max="65"
                    value={campaignData.targeting.age[0]}
                    onChange={(e) =>
                      setCampaignData({
                        ...campaignData,
                        targeting: {
                          ...campaignData.targeting,
                          age: [
                            parseInt(e.target.value),
                            campaignData.targeting.age[1],
                          ],
                        },
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["All", "Male", "Female"].map((gender) => (
                  <button
                    key={gender}
                    onClick={() =>
                      setCampaignData({
                        ...campaignData,
                        targeting: {
                          ...campaignData.targeting,
                          gender: gender.toLowerCase(),
                        },
                      })
                    }
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      campaignData.targeting.gender === gender.toLowerCase()
                        ? "bg-[#475ECD] text-white"
                        : "border border-gray-200 text-gray-700 hover:border-[#475ECD]"
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter locations (countries, states, cities)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#475ECD] focus:border-transparent"
              onChange={(e) =>
                setCampaignData({
                  ...campaignData,
                  targeting: {
                    ...campaignData.targeting,
                    location: e.target.value,
                  },
                })
              }
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Interests & Behaviors
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Technology",
                "Fitness",
                "Travel",
                "Food",
                "Fashion",
                "Business",
                "Health",
                "Sports",
                "Entertainment",
              ].map((interest) => (
                <label
                  key={interest}
                  className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={campaignData.targeting.interests.includes(interest)}
                    className="w-4 h-4 text-[#475ECD] rounded focus:ring-[#475ECD]"
                    onChange={(e) => {
                      const interests = e.target.checked
                        ? [...campaignData.targeting.interests, interest]
                        : campaignData.targeting.interests.filter(
                            (i) => i !== interest
                          );
                      setCampaignData({
                        ...campaignData,
                        targeting: { ...campaignData.targeting, interests },
                      });
                    }}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {interest}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
