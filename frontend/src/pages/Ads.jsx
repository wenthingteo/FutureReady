"use client"

import React, { useState, useEffect } from "react"
import {
  Play,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Plus,
  Eye,
  Target,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import CampaignSetupStep from "../components/adsComponent/CampaignSetupStep.jsx"
import TargetingStep from "../components/adsComponent/TargetingStep.jsx"
import BudgetStep from "../components/adsComponent/BudgetStep.jsx"
import UploadStep from "../components/adsComponent/UploadStep.jsx"
import ReviewLaunch from "../components/adsComponent/ReviewLaunch.jsx"

// Mock data for demonstration
const mockData = {
  liveMetrics: {
    activeCampaigns: 12,
    liveSpendToday: 2847.5,
    liveSpendWeek: 18932.75,
    impressions: 1456789,
    clicks: 23456,
    ctr: 1.61,
    conversions: 147,
    cpc: 0.83,
    roas: 4.2,
  },
  alerts: [
    { type: "warning", message: "CPC on TikTok increased by 25% in last 2 hours", time: "2 hrs ago" },
    { type: "success", message: "Meta campaign XYZ is outperforming, consider boosting budget", time: "1 hr ago" },
    { type: "info", message: "Google Ads daily budget 80% consumed", time: "30 min ago" },
  ],
  platformKPIs: [
    { platform: "Meta", spend: 1250, impressions: 456789, clicks: 8934, ctr: 1.96, conversions: 67, roas: 4.8 },
    { platform: "Google", spend: 890, impressions: 234567, clicks: 7821, ctr: 3.33, conversions: 45, roas: 3.9 },
    { platform: "TikTok", spend: 560, impressions: 567890, clicks: 4521, ctr: 0.8, conversions: 23, roas: 2.8 },
    { platform: "LinkedIn", spend: 147, impressions: 89012, clicks: 2180, ctr: 2.45, conversions: 12, roas: 6.2 },
  ],
}

const Ads = () => {
  const [activeTab, setActiveTab] = useState("monitoring")
  const [currentKPIIndex, setCurrentKPIIndex] = useState(0)
  const [campaignStep, setCampaignStep] = useState(1)
  const [campaignData, setCampaignData] = useState({
    objective: "",
    platforms: [],
    adFormat: "",
    targeting: { age: [18, 65], gender: "all", location: "", interests: [] },
    budget: 100,
    schedule: { start: "", end: "" },
    creative: null,
  })

  // Auto-rotate KPI carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKPIIndex((prev) => (prev + 1) % mockData.platformKPIs.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const AlertIcon = ({ type }) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Eye className="w-4 h-4 text-blue-500" />
    }
  }

  const MetricCard = ({ title, value, change, icon, color = "text-gray-600" }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <div className={color}>{icon}</div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      {change && (
        <div className={`flex items-center text-xs ${change > 0 ? "text-green-600" : "text-red-600"}`}>
          {change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {Math.abs(change)}% vs yesterday
        </div>
      )}
    </div>
  )

  const KPICarousel = () => {
    const currentPlatform = mockData.platformKPIs[currentKPIIndex]
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{currentPlatform.platform} Performance</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentKPIIndex((prev) => (prev === 0 ? mockData.platformKPIs.length - 1 : prev - 1))}
              className="p-1 rounded hover:bg-gray-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentKPIIndex((prev) => (prev + 1) % mockData.platformKPIs.length)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#475ECD]">${currentPlatform.spend}</div>
            <div className="text-sm text-gray-600">Spend Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{currentPlatform.clicks.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Clicks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{currentPlatform.roas}x</div>
            <div className="text-sm text-gray-600">ROAS</div>
          </div>
        </div>
        <div className="flex justify-center mt-4 gap-1">
          {mockData.platformKPIs.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentKPIIndex ? "bg-[#475ECD]" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    )
  }

  // 👉 Now using external components
  const renderCampaignStep = () => {
    switch (campaignStep) {
      case 1:
        return <CampaignSetupStep campaignData={campaignData} setCampaignData={setCampaignData} />
      case 2:
        return <TargetingStep campaignData={campaignData} setCampaignData={setCampaignData} />
      case 3:
        return <BudgetStep campaignData={campaignData} setCampaignData={setCampaignData} />
      case 4:
        return <UploadStep campaignData={campaignData} setCampaignData={setCampaignData} />
      case 5:
        return <ReviewLaunch campaignData={campaignData} setCampaignData={setCampaignData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#EFF6FF] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ads Manager</h1>
          <p className="text-gray-600">Manage your campaigns with AI-powered insights</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 bg-white p-1 rounded-lg shadow-sm w-fit">
          <button
            onClick={() => setActiveTab("monitoring")}
            className={`px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === "monitoring" ? "bg-[#475ECD] text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Live Monitoring
            </div>
          </button>
          <button
            onClick={() => setActiveTab("creation")}
            className={`px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === "creation" ? "bg-[#475ECD] text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Ads
            </div>
          </button>
        </div>

        {activeTab === "monitoring" ? (
          <div className="space-y-6">
            {/* Core Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricCard
                title="Active Campaigns"
                value={mockData.liveMetrics.activeCampaigns}
                change={8}
                icon={<Play className="w-5 h-5" />}
                color="text-green-600"
              />
              <MetricCard
                title="Live Spend (Today)"
                value={`$${mockData.liveMetrics.liveSpendToday.toLocaleString()}`}
                change={-3}
                icon={<DollarSign className="w-5 h-5" />}
                color="text-[#475ECD]"
              />
              <MetricCard
                title="Impressions"
                value={mockData.liveMetrics.impressions.toLocaleString()}
                change={12}
                icon={<Eye className="w-5 h-5" />}
              />
              <MetricCard
                title="ROAS"
                value={`${mockData.liveMetrics.roas}x`}
                change={5}
                icon={<TrendingUp className="w-5 h-5" />}
                color="text-green-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricCard
                title="CTR"
                value={`${mockData.liveMetrics.ctr}%`}
                change={-2}
                icon={<Target className="w-5 h-5" />}
              />
              <MetricCard
                title="Conversions"
                value={mockData.liveMetrics.conversions}
                change={15}
                icon={<CheckCircle className="w-5 h-5" />}
                color="text-green-600"
              />
              <MetricCard
                title="CPC"
                value={`$${mockData.liveMetrics.cpc}`}
                change={-8}
                icon={<DollarSign className="w-5 h-5" />}
                color="text-red-600"
              />
              <MetricCard
                title="Clicks"
                value={mockData.liveMetrics.clicks.toLocaleString()}
                change={7}
                icon={<Eye className="w-5 h-5" />}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Alerts Panel */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Alerts</h3>
                <div className="space-y-3">
                  {mockData.alerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <AlertIcon type={alert.type} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <span className="text-xs text-gray-500">{alert.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* KPI Carousel */}
              <KPICarousel />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center w-full max-w-md">
                {[1, 2, 3, 4, 5].map((step, index) => (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                          step <= campaignStep ? "bg-[#475ECD] text-white shadow-md" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step}
                      </div>
                    </div>
                    {index < 4 && (
                      <div
                        className={`flex-1 h-0.5 mx-3 transition-all duration-200 ${
                          step < campaignStep ? "bg-[#475ECD]" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {renderCampaignStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setCampaignStep(Math.max(1, campaignStep - 1))}
                disabled={campaignStep === 1}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (campaignStep === 5) {
                    alert("Campaign launched successfully!")
                    setCampaignStep(1)
                    setCampaignData({
                      objective: "",
                      platforms: [],
                      adFormat: "",
                      targeting: { age: [18, 65], gender: "all", location: "", interests: [] },
                      budget: 100,
                      schedule: { start: "", end: "" },
                      creative: null,
                    })
                  } else {
                    setCampaignStep(Math.min(5, campaignStep + 1))
                  }
                }}
                className="px-6 py-3 bg-[#475ECD] text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {campaignStep === 5 ? "Launch Campaign" : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Ads

