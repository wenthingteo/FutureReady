"use client"

import { useState } from "react"
import { Target, DollarSign, TrendingUp, Calendar, Users, Eye, MousePointer, ArrowRight, Sparkles } from "lucide-react"
import { FaFacebook, FaTiktok, FaLinkedin, FaYoutube, FaImage, FaVideo, FaSearch, FaInstagram } from "react-icons/fa"
import { MdViewCarousel } from "react-icons/md"

export default function ReviewLaunch({ campaignData, onLaunch, onBack }) {
  const [isLaunching, setIsLaunching] = useState(false)

  // Mock AI-generated data based on campaign setup
  const aiGeneratedData = {
    targetAudience: {
      demographics: "Ages 25-45, College-educated professionals",
      interests: ["Technology", "Business", "Marketing", "Innovation"],
      locations: ["Malaysia", "Singapore", "Thailand"],
      size: "10,000 people",
    },
    budgeting: {
      recommended: "$800",
      dailyBudget: "$26.67",
      costPerClick: "$0.65",
      estimatedReach: "12,000 – 15,000",
    },
    forecast: {
      impressions: "125,000 - 180,000",
      clicks: "1,200 – 1,500",
      conversions: "60 – 90",
      roi: "125%",
    },
  }

  const getPlatformIcon = (platform) => {
    const icons = {
      Facebook: <FaFacebook className="w-4 h-4 text-blue-600" />,
      TikTok: <FaTiktok className="w-4 h-4 text-black" />,
      LinkedIn: <FaLinkedin className="w-4 h-4 text-blue-700" />,
      YouTube: <FaYoutube className="w-4 h-4 text-red-600" />,
      Instagram: <FaInstagram className="w-4 h-4 text-red-600" />,
    }
    return icons[platform] || null
  }

  const getFormatIcon = (format) => {
    const icons = {
      Image: <FaImage className="w-4 h-4 text-blue-500" />,
      Video: <FaVideo className="w-4 h-4 text-purple-600" />,
      Carousel: <MdViewCarousel className="w-4 h-4 text-green-600" />,
      "Search Ad": <FaSearch className="w-4 h-4 text-yellow-600" />,
    }
    return icons[format] || null
  }

  const handleLaunch = async () => {
    setIsLaunching(true)
    // Simulate launch process
    setTimeout(() => {
      setIsLaunching(false)
      onLaunch()
    }, 3000)
  }

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-8 bg-white rounded-2xl shadow-lg">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Review & Launch Ads</h1>
        <p className="text-gray-600">Review your Ads settings and AI-generated recommendations before launching</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Campaign Settings */}
        <div className="space-y-6">
          {/* Campaign Objective */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-[#475ECD]" />
              <h3 className="text-lg font-semibold text-gray-900">Campaign Objective</h3>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-[#475ECD]">
              <div className="font-semibold text-gray-900">{campaignData.objective}</div>
              <div className="text-sm text-gray-600 mt-1">
                {campaignData.objective === "Awareness" && "Increase brand visibility and reach"}
                {campaignData.objective === "Engagement" && "Drive likes, comments, and shares"}
                {campaignData.objective === "Conversions" && "Generate leads and sign-ups"}
                {campaignData.objective === "Sales" && "Drive direct purchases and revenue"}
              </div>
            </div>
          </div>

          {/* Platforms */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-[#475ECD]" />
              <h3 className="text-lg font-semibold text-gray-900">Selected Platforms</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {campaignData.platforms.map((platform) => (
                <div
                  key={platform}
                  className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200"
                >
                  {getPlatformIcon(platform)}
                  <span className="text-sm font-medium text-gray-900">{platform}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ad Format & Schedule */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <MousePointer className="w-5 h-5 text-[#475ECD]" />
                  <h4 className="font-semibold text-gray-900">Ad Format</h4>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg w-fit">
                  {getFormatIcon(campaignData.adFormat)}
                  <span className="text-sm font-medium text-gray-900">{campaignData.adFormat}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-[#475ECD]" />
                  <h4 className="font-semibold text-gray-900">Schedule</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 px-3 py-2 rounded-lg">
                    <div className="text-xs text-gray-500">Start Date</div>
                    <div className="text-sm font-medium">{campaignData.schedule?.start || "Not set"}</div>
                  </div>
                  <div className="bg-gray-50 px-3 py-2 rounded-lg">
                    <div className="text-xs text-gray-500">End Date</div>
                    <div className="text-sm font-medium">{campaignData.schedule?.end || "Not set"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - AI Generated Recommendations */}
        <div className="space-y-6">
          {/* Target Audience */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">AI-Generated Target Audience</h3>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-700">Demographics</div>
                <div className="text-sm text-gray-600">{aiGeneratedData.targetAudience.demographics}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Interests</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {aiGeneratedData.targetAudience.interests.map((interest) => (
                    <span key={interest} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Estimated Audience Size</div>
                <div className="text-lg font-bold text-purple-600">{aiGeneratedData.targetAudience.size}</div>
              </div>
            </div>
          </div>

          {/* Budget Recommendations */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">AI Budget Optimization</h3>
              <Sparkles className="w-4 h-4 text-green-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-3">
                <div className="text-xs text-gray-500">Recommended Budget</div>
                <div className="text-xl font-bold text-green-600">{aiGeneratedData.budgeting.recommended}</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-xs text-gray-500">Daily Budget</div>
                <div className="text-xl font-bold text-green-600">{aiGeneratedData.budgeting.dailyBudget}</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-xs text-gray-500">Est. Cost Per Click</div>
                <div className="text-sm font-medium text-gray-900">{aiGeneratedData.budgeting.costPerClick}</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-xs text-gray-500">Estimated Reach</div>
                <div className="text-sm font-medium text-gray-900">{aiGeneratedData.budgeting.estimatedReach}</div>
              </div>
            </div>
          </div>

          {/* Performance Forecast */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Performance Forecast</h3>
              <Sparkles className="w-4 h-4 text-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-3">
                <div className="text-xs text-gray-500">Impressions</div>
                <div className="text-lg font-bold text-blue-600">{aiGeneratedData.forecast.impressions}</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-xs text-gray-500">Clicks</div>
                <div className="text-lg font-bold text-blue-600">{aiGeneratedData.forecast.clicks}</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-xs text-gray-500">Conversions</div>
                <div className="text-lg font-bold text-blue-600">{aiGeneratedData.forecast.conversions}</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-xs text-gray-500">Projected ROI</div>
                <div className="text-lg font-bold text-green-600">{aiGeneratedData.forecast.roi}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button onClick={onBack} className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          Previous
        </button>

        <button
          onClick={handleLaunch}
          disabled={isLaunching}
          className="bg-gradient-to-r from-[#475ECD] to-[#6366f1] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLaunching ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Launching Ads...
            </>
          ) : (
            <>
              Launch Ads
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
