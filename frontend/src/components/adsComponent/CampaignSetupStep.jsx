import React from "react";
import { CheckCircle } from "lucide-react";
import { FaFacebook, FaTiktok, FaLinkedin, FaYoutube, FaImage, FaVideo, FaSearch, FaInstagram } from "react-icons/fa";
import { MdViewCarousel } from "react-icons/md";

export default function CampaignSetupStep({ campaignData, setCampaignData }) {
  return (
    <div className="space-y-8">
      {/* Campaign Objective */}
      <div>
        <div className="inline-flex items-center gap-4 mb-8 text-center w-full justify-center">
          <h3 className="text-3xl font-normal text-gray-800 tracking-tight">Set Your Ads Goal & Schedule</h3>
        </div>
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
      </div>

      {/* Platform, Scheduling & Ad Format */}
      <div className="space-y-8">
        {/* Platform Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Platforms</label>
          <div className="grid grid-cols-5 gap-3">
            {[
              { name: "Facebook", icon: <FaFacebook className="w-5 h-5 text-blue-600" /> },
              { name: "TikTok", icon: <FaTiktok className="w-5 h-5 text-black" /> },
              { name: "LinkedIn", icon: <FaLinkedin className="w-5 h-5 text-blue-700" /> },
              { name: "YouTube", icon: <FaYoutube className="w-5 h-5 text-red-600" /> },
              { name: "Instagram", icon: <FaInstagram className="w-5 h-5 text-red-600" /> },
            ].map((platform) => (
              <button
                key={platform.name}
                onClick={() => {
                  const newPlatforms = campaignData.platforms.includes(platform.name)
                    ? campaignData.platforms.filter((p) => p !== platform.name)
                    : [...campaignData.platforms, platform.name];
                  setCampaignData({ ...campaignData, platforms: newPlatforms });
                }}
                className={`flex items-center gap-2 justify-center p-3 rounded-lg border-2 transition-all ${
                  campaignData.platforms.includes(platform.name)
                    ? "border-[#475ECD] bg-blue-50"
                    : "border-gray-200 hover:border-[#475ECD]"
                }`}
              >
                {platform.icon}
                <span className="text-sm font-medium">{platform.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Ad Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Ad Format</label>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: "Image", icon: <FaImage className="w-5 h-5 text-blue-500" /> },
              { name: "Video", icon: <FaVideo className="w-5 h-5 text-purple-600" /> },
              { name: "Carousel", icon: <MdViewCarousel className="w-5 h-5 text-green-600" /> },
              { name: "Search Ad", icon: <FaSearch className="w-5 h-5 text-yellow-600" /> },
            ].map((format) => (
              <button
                key={format.name}
                onClick={() => setCampaignData({ ...campaignData, adFormat: format.name })}
                className={`flex items-center gap-2 justify-center p-3 rounded-lg border-2 transition-all ${
                  campaignData.adFormat === format.name
                    ? "border-[#475ECD] bg-blue-50"
                    : "border-gray-200 hover:border-[#475ECD]"
                }`}
              >
                {format.icon}
                <span className="text-sm font-medium">{format.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scheduling */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Schedule</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={campaignData.schedule?.start || ''}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#475ECD] focus:border-transparent transition-all"
                onChange={(e) =>
                  setCampaignData({
                    ...campaignData,
                    schedule: { ...campaignData.schedule, start: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={campaignData.schedule?.end || ''}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#475ECD] focus:border-transparent transition-all"
                onChange={(e) =>
                  setCampaignData({
                    ...campaignData,
                    schedule: { ...campaignData.schedule, end: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}