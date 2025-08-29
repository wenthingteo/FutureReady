import React from "react";
import { CheckCircle } from "lucide-react";

export default function CampaignSetupStep({ campaignData, setCampaignData }) {
  return (
    <div className="space-y-8">
      {/* Campaign Objective */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900">Choose Campaign Objective</h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {["Awareness", "Engagement", "Conversions", "Sales"].map((obj) => (
            <button
              key={obj}
              onClick={() => setCampaignData({ ...campaignData, objective: obj })}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                campaignData.objective === obj
                  ? "border-[#475ECD] bg-blue-50"
                  : "border-gray-200 hover:border-[#475ECD]"
              }`}
            >
              <div className="font-semibold text-gray-900">{obj}</div>
              <div className="text-sm text-gray-600 mt-1">
                {obj === "Awareness" && "Increase brand visibility and reach"}
                {obj === "Engagement" && "Drive likes, comments, and shares"}
                {obj === "Conversions" && "Generate leads and sign-ups"}
                {obj === "Sales" && "Drive direct purchases and revenue"}
              </div>
            </button>
          ))}
        </div>
        {campaignData.objective && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">AI Recommendation</span>
            </div>
            <p className="text-green-700 mt-1">
              Based on your past performance,{" "}
              {campaignData.objective.toLowerCase()} campaigns show 23% better ROI
              during weekdays.
            </p>
          </div>
        )}
      </div>

      {/* Platform Selection */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900">
          Select Platforms & Ad Format
        </h3>

        {/* Platforms */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Platforms
          </label>
          <div className="grid grid-cols-2 gap-3">
            {["Meta", "Google", "TikTok", "LinkedIn"].map((platform) => (
              <button
                key={platform}
                onClick={() => {
                  const newPlatforms = campaignData.platforms.includes(platform)
                    ? campaignData.platforms.filter((p) => p !== platform)
                    : [...campaignData.platforms, platform];
                  setCampaignData({ ...campaignData, platforms: newPlatforms });
                }}
                className={`p-3 rounded-lg border-2 transition-all ${
                  campaignData.platforms.includes(platform)
                    ? "border-[#475ECD] bg-blue-50"
                    : "border-gray-200 hover:border-[#475ECD]"
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        {/* Ad Format */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Ad Format
          </label>
          <div className="grid grid-cols-2 gap-3">
            {["Image", "Video", "Carousel", "Search Ad"].map((format) => (
              <button
                key={format}
                onClick={() =>
                  setCampaignData({ ...campaignData, adFormat: format })
                }
                className={`p-3 rounded-lg border-2 transition-all ${
                  campaignData.adFormat === format
                    ? "border-[#475ECD] bg-blue-50"
                    : "border-gray-200 hover:border-[#475ECD]"
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
