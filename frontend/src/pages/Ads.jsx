"use client"

import { useState, useEffect } from "react"
import {
  Play,TrendingUp,TrendingDown,AlertTriangle,CheckCircle,Plus,Eye,Target,MousePointer,ChevronLeft, ChevronRight, DollarSign, Pause
} from "lucide-react"
import { FaFacebook, FaTiktok, FaLinkedin, FaYoutube, FaImage, FaVideo, FaSearch, FaInstagram } from "react-icons/fa";


import CampaignSetupStep from "../components/adsComponent/CampaignSetupStep.jsx"
import ReviewLaunch from "../components/adsComponent/ReviewLaunch.jsx"
import CampaignSelection from "../components/adsComponent/CampaignSelectionStep.jsx"
import { AdsGenerationOverlay } from "../components/adsComponent/AdsGenerationOverlay.jsx"
import { AdsSuccessOverlay } from "../components/adsComponent/AdsSuccessOverlay.jsx" // Import the new component

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
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [campaignStep])
  
  // Add state for success overlay
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false)

  // Define tabs for the toggle bar
  const tabs = [
    {
      id: "monitoring",
      label: "Live Monitoring",
      icon: <Eye className="w-4 h-4" />,
      description: "Real-time insights",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: "creation",
      label: "Create Ads",
      icon: <Plus className="w-4 h-4" />,
      description: "AI-powered campaigns",
      color: "from-purple-500 to-pink-600"
    }
  ]

  // simulate generation progress
  useEffect(() => {
    let interval
    if (isGenerating && !isCompleted) {
      interval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsCompleted(true)
            return 100
          }
          return prev + 10
        })
      }, 500)
    }
    return () => clearInterval(interval)
  }, [isGenerating, isCompleted])

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

  const MetricCard = ({ title, value, change, icon, iconBg = "bg-indigo-100", iconColor = "text-indigo-600" }) => {
    const positive = change > 0
    return (
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-md">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${iconBg}`}>
            <div className={`w-6 h-6 ${iconColor}`}>{icon}</div>
          </div>
          <div>
            <h2 className="text-gray-500 text-sm">{title}</h2>
            <p className="text-xl font-semibold mt-1">{value}</p>
          </div>
        </div>

        {/* Right Section */}
        {change !== undefined && (
          <div
            className={`flex items-center text-sm px-2 py-1 rounded-full font-medium ${
              positive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {positive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {positive ? `+${change}%` : `-${Math.abs(change)}%`}
          </div>
        )}
      </div>
    )
  }

    const KPICarousel = () => {
    const [currentKPIIndex, setCurrentKPIIndex] = useState(0);

    // Platform data with Font Awesome icons
    const platformKPIs = [
      {
        platform: "Facebook",
        icon: <FaFacebook className="w-4 h-4 text-blue-600" />,
        spend: "2,450",
        clicks: 12500,
        roas: 4.2,
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-500"
      },
      {
        platform: "Instagram", 
        icon: "fab fa-instagram",
        spend: "1,890",
        clicks: 8900,
        roas: 3.8,
        color: "from-pink-500 to-purple-600",
        bgColor: "bg-gradient-to-r from-pink-500 to-purple-600"
      },
      {
        platform: "TikTok",
        icon: "fab fa-tiktok",
        spend: "1,200",
        clicks: 15600,
        roas: 5.1,
        color: "from-gray-800 to-black",
        bgColor: "bg-gray-800"
      },
      {
        platform: "LinkedIn",
        icon: "fab fa-linkedin-in",
        spend: "1,000",
        clicks: 10000,
        roas: 5.0,
        color: "from-gray-800 to-black",
        bgColor: "bg-gray-800"
      }
    ];

    const currentPlatform = platformKPIs[currentKPIIndex];

    const nextSlide = () => {
      setCurrentKPIIndex((prev) => (prev + 1) % platformKPIs.length);
    };

    const prevSlide = () => {
      setCurrentKPIIndex((prev) => (prev === 0 ? platformKPIs.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
      setCurrentKPIIndex(index);
    };

    return (
      <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 rounded-2xl p-8 shadow-lg border border-gray-100/50 backdrop-blur-sm overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
        
        {/* Header with Font Awesome logo */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-3">
              <i className={`${currentPlatform.icon} text-lg`}></i>
            <h3 className="text-lg font-semibold mb-4">
              {currentPlatform.platform} Performance
            </h3>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full hover:bg-blue-50 transition-all duration-300 hover:scale-110 group"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full hover:bg-blue-50 transition-all duration-300 hover:scale-110 group"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
          </div>
        </div>

        {/* KPI Metrics */}
          <div className="grid grid-cols-3 gap-6 mb-6 relative z-10">
            <div className="group cursor-pointer">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center shadow-sm border border-white/50 hover:shadow-md hover:scale-105 transition-all duration-300">
                {/* DollarSign with gradient color */}
                <DollarSign className="w-8 h-8 mx-auto mb-3 text-[#475ECD] bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">
                  ${currentPlatform.spend}
                </div>
                <div className="text-sm font-medium text-gray-600">Spend Today</div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center shadow-sm border border-white/50 hover:shadow-md hover:scale-105 transition-all duration-300">
                {/* MousePointer with gradient color */}
                <MousePointer className="w-8 h-8 mx-auto mb-3 text-[#475ECD] bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-1">
                  {currentPlatform.clicks.toLocaleString()}
                </div>
                <div className="text-sm font-medium text-gray-600">Clicks</div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center shadow-sm border border-white/50 hover:shadow-md hover:scale-105 transition-all duration-300">
                {/* TrendingUp with gradient color */}
                <TrendingUp className="w-8 h-8 mx-auto mb-3 text-[#475ECD] bg-clip-text bg-gradient-to-r from-purple-500 to-purple-600 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-1">
                  {currentPlatform.roas}x
                </div>
                <div className="text-sm font-medium text-gray-600">ROAS</div>
              </div>
            </div>
          </div>


        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 relative z-10">
          {platformKPIs.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentKPIIndex
                  ? 'w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderCampaignStep = () => {
    switch (campaignStep) {
      case 1:
        return <CampaignSetupStep campaignData={campaignData} setCampaignData={setCampaignData} />
      case 2:
        return (
          <CampaignSelection
            campaignData={campaignData}
            setCampaignData={setCampaignData}
            onGenerateAds={() => setIsGenerating(true)}
          />
        )
      case 3:
        return (
          <ReviewLaunch
            campaignData={campaignData}
            onLaunch={() => {
              // Show success overlay instead of alert
              setShowSuccessOverlay(true)
            }}
            onBack={() => setCampaignStep(2)}
          />
        )
      default:
        return null
    }
  }

  const handleSuccessOverlayClose = () => {
    setShowSuccessOverlay(false)
    // Reset to monitoring tab and step 1
    setActiveTab("monitoring")
    setCampaignStep(1)
    // Reset campaign data for new campaign
    setCampaignData({
      objective: "",
      platforms: [],
      adFormat: "",
      targeting: { age: [18, 65], gender: "all", location: "", interests: [] },
      budget: 100,
      schedule: { start: "", end: "" },
      creative: null,
    })
  }

  const progressSteps = [
    { id: 1, title: "Campaign Setup", description: "Define your campaign objective" },
    { id: 2, title: "Campaign Selection", description: "Choose platforms and generate ads" },
    { id: 3, title: "Review & Launch", description: "Review and launch your campaign" },
  ]

  const ProgressIndicator = () => {
    return (
      <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          {progressSteps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    campaignStep === step.id
                      ? "bg-[#475ECD] text-white"
                      : campaignStep > step.id
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {campaignStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                </div>

                {/* Step Info */}
                <div className="ml-3">
                  <div
                    className={`text-sm font-medium ${
                      campaignStep === step.id
                        ? "text-[#475ECD]"
                        : campaignStep > step.id
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              </div>

              {/* Connector Line */}
              {index < progressSteps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className={`h-0.5 transition-all ${campaignStep > step.id ? "bg-green-500" : "bg-gray-200"}`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#EFF6FF]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#475ECD] mb-2">Ads Manager</h1>
          <p className="text-gray-600">Manage your campaigns with AI-powered insights</p>
        </div>

        {/* Toggle tab */}
        <div className="mb-10 flex justify-center">
          <div className="backdrop-blur-xl bg-white border border-white/30 rounded-2xl p-1.5 shadow-lg">
            <div className="flex relative">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-7 py-3 rounded-xl font-medium transition-all duration-300 ease-out ${
                    activeTab === tab.id
                      ? "text-white shadow-lg transform scale-[1.02]"
                      : "text-slate-600 hover:text-slate-800 hover:bg-white/10"
                  }`}
                >
                  {activeTab === tab.id && (
                    <div 
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tab.color} shadow-lg transition-all duration-300 ease-out`}
                    />
                  )}
                  <div className="relative flex items-center gap-3">
                    {tab.icon}
                    <div className="text-left">
                      <div className="font-semibold">{tab.label}</div>
                      <div className={`text-xs ${activeTab === tab.id ? 'text-white/80' : 'text-slate-500'}`}>
                        {tab.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {activeTab === "monitoring" ? (
          <>
            {/* Metrics + Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricCard
                title="Active Campaigns"
                value={mockData.liveMetrics.activeCampaigns}
                change={8}
                icon={<Play />}
              />
              <MetricCard
                title="Live Spend (Today)"
                value={`$${mockData.liveMetrics.liveSpendToday}`}
                change={-3}
                icon={<DollarSign />}
              />
              <MetricCard
                title="Impressions"
                value={mockData.liveMetrics.impressions.toLocaleString()}
                change={12}
                icon={<Eye />}
              />
              <MetricCard
                title="ROAS"
                value={`${mockData.liveMetrics.roas}x`}
                change={5}
                icon={<TrendingUp />}
              />
            </div>

            {/* Second row of metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <MetricCard
                title="CTR"
                value={`${mockData.liveMetrics.ctr}%`}
                change={-2}
                icon={<Target />}
              />
              <MetricCard
                title="Conversions"
                value={mockData.liveMetrics.conversions}
                change={15}
                icon={<CheckCircle />}
              />
              <MetricCard
                title="CPC"
                value={`$${mockData.liveMetrics.cpc}`}
                change={-8}
                icon={<DollarSign />}
              />
              <MetricCard
                title="Clicks"
                value={mockData.liveMetrics.clicks.toLocaleString()}
                change={7}
                icon={<MousePointer />}
              />
            </div>


            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 rounded-2xl p-8 shadow-lg border border-gray-100/50 backdrop-blur-sm overflow-hidden">
                <h3 className="text-lg font-semibold mb-4">AI Alerts</h3>
                {mockData.alerts.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 mb-2 shadow-sm border border-gray-100">
                    <AlertIcon type={a.type} />
                    <div>
                      <p className="text-sm">{a.message}</p>
                      <span className="text-xs text-gray-500">{a.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <KPICarousel />
            </div>
          </>
        ) : (
          <div>
            <ProgressIndicator />

            <div className={campaignStep === 3 ? "" : "bg-white rounded-lg p-8 shadow-sm"}>
              {renderCampaignStep()}

              {/* Navigation Buttons */}
              {campaignStep !== 3 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setCampaignStep(Math.max(1, campaignStep - 1))}
                    disabled={campaignStep === 1}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {campaignStep < 3 && (
                    <button
                      onClick={() => {
                        setCampaignStep(Math.min(3, campaignStep + 1))
                      }}
                      className="px-6 py-3 bg-[#475ECD] text-white rounded-lg hover:bg-blue-700"
                    >
                      Next
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Generation Overlay */}
      <AdsGenerationOverlay
        isGenerating={isGenerating}
        isCompleted={isCompleted}
        generationProgress={generationProgress}
        currentStep={campaignStep}
        onReview={() => {
          setIsGenerating(false)
          setIsCompleted(false)
          setGenerationProgress(0)
          setCampaignStep(3)
        }}
        onClose={() => {
          setIsGenerating(false)
          setIsCompleted(false)
          setGenerationProgress(0)
        }}
      />

      {/* Success Overlay - NEW */}
      <AdsSuccessOverlay
        isVisible={showSuccessOverlay}
        onClose={handleSuccessOverlayClose}
        campaignData={campaignData}
      />
    </div>
  )
}

export default Ads