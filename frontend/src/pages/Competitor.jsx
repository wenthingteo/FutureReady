"use client"

import { useState } from "react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Play,
  Loader2,
  CheckCircle,
  User,
  LayoutDashboard,
  Briefcase,
  BarChart3,
  Megaphone,
} from "lucide-react"

// Mock data for trending posts
const trendingPosts = [
  {
    id: 1,
    title: "COVID-19 Health Products",
    platform: "Instagram",
    engagement: "12.5K",
    image: "/covid-health-products-blue-medical.png",
  },
  {
    id: 2,
    title: "5 Steps to Maintain Your Health",
    platform: "TikTok",
    engagement: "8.2K",
    image: "/health-steps-infographic-green.png",
  },
  {
    id: 3,
    title: "International Company Presentation",
    platform: "LinkedIn",
    engagement: "15.7K",
    image: "/business-presentation-corporate-blue.png",
  },
  {
    id: 4,
    title: "Medical Equipment Guide",
    platform: "YouTube",
    engagement: "22.1K",
    image: "/medical-equipment-stethoscope.png",
  },
  {
    id: 5,
    title: "Medical Check-up Process",
    platform: "Instagram",
    engagement: "9.8K",
    image: "/medical-checkup-doctor-patient.png",
  },
]

// Mock chart data
const pieChartData = [
  { name: "health", value: 35, color: "#3b82f6" },
  { name: "business", value: 25, color: "#10b981" },
  { name: "technology", value: 20, color: "#f59e0b" },
  { name: "lifestyle", value: 20, color: "#ef4444" },
]

const barChartData = [
  { platform: "Instagram", posts: 45, engagement: 12500 },
  { platform: "TikTok", posts: 32, engagement: 8200 },
  { platform: "LinkedIn", posts: 28, engagement: 15700 },
  { platform: "YouTube", posts: 18, engagement: 22100 },
]

const aiStates = [
  { text: "AI is analyzing...", icon: Loader2 },
  { text: "AI is generating insights...", icon: Loader2 },
  { text: "AI is running results...", icon: Loader2 },
  { text: "Analysis complete!", icon: CheckCircle },
]

export default function CompetitorAnalysis() {
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const [aiState, setAiState] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [filters, setFilters] = useState({
    timeRange: "7d",
    topic: "all",
    platform: "all",
  })

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setShowResults(false)
    setAiState(0)

    const interval = setInterval(() => {
      setAiState((prev) => {
        if (prev >= aiStates.length - 1) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setShowResults(true)
          return prev
        }
        return prev + 1
      })
    }, 2000)
  }

  const nextPost = () => {
    setCurrentPostIndex((prev) => (prev + 1) % trendingPosts.length)
  }

  const prevPost = () => {
    setCurrentPostIndex((prev) => (prev - 1 + trendingPosts.length) % trendingPosts.length)
  }

  const visiblePosts = trendingPosts.slice(currentPostIndex, currentPostIndex + 3)
  if (visiblePosts.length < 3) {
    visiblePosts.push(...trendingPosts.slice(0, 3 - visiblePosts.length))
  }

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#3264DF]">Workplace</h1>
            <p className="text-gray-500">Analyze trending content and competitor strategies</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 w-64 h-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add</button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg mb-6 p-4">
          <div className="flex items-center gap-2 mb-4 text-gray-700 font-medium">
            <Filter className="w-5 h-5" /> Filters
          </div>
          <div className="flex gap-4">
            <select
              value={filters.timeRange}
              onChange={(e) => setFilters((prev) => ({ ...prev, timeRange: e.target.value }))}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="1Ad">Last 24h</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>

            <select
              value={filters.topic}
              onChange={(e) => setFilters((prev) => ({ ...prev, topic: e.target.value }))}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Topics</option>
              <option value="health">Health</option>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
            </select>

            <select
              value={filters.platform}
              onChange={(e) => setFilters((prev) => ({ ...prev, platform: e.target.value }))}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>
        </div>

        {/* Trending Posts Section */}
        <div className="bg-white border border-gray-200 rounded-lg mb-6 p-4">
          <h2 className="text-lg font-semibold mb-2">Analyzing Competitor's Current Trends</h2>
          <p className="text-sm text-gray-500 mb-4">Trending posts from your competitors across platforms</p>

          <div className="relative">
            <div className="flex justify-center gap-4 overflow-hidden">
              {visiblePosts.map((post, index) => (
                <div key={`${post.id}-${index}`} className="flex-shrink-0 w-80">
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold mb-2">{post.title}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="px-2 py-1 bg-gray-100 rounded">{post.platform}</span>
                        <span className="text-gray-500">{post.engagement} engagements</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevPost}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={nextPost}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={startAnalysis}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-[#475ECD] text-white rounded-md flex items-center gap-2 mx-auto hover:bg-blue-700 disabled:opacity-50"
            >
              <Play className="w-4 h-4" /> Start AI Analysis
            </button>
          </div>
        </div>

        {/* AI Analysis Process */}
        {(isAnalyzing || showResults) && (
          <div className="bg-white border border-gray-200 rounded-lg mb-6 p-6">
            <div className="text-center space-y-4">
              {aiStates.slice(0, aiState + 1).map((state, index) => {
                const Icon = state.icon
                return (
                  <div key={index} className="flex items-center justify-center gap-3">
                    <Icon
                      className={`w-5 h-5 ${
                        index === aiState && isAnalyzing ? "animate-spin" : ""
                      } ${index < aiState ? "text-green-500" : "text-blue-500"}`}
                    />
                    <span className={index < aiState ? "text-green-500" : "text-gray-700"}>
                      {state.text}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Content Category Distribution</h3>
              <p className="text-sm text-gray-500 mb-4">Analysis of trending content by category</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Platform Performance</h3>
              <p className="text-sm text-gray-500 mb-4">Engagement metrics by platform</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="engagement" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4 lg:col-span-2">
              <h3 className="font-semibold mb-2">Key Insights</h3>
              <p className="text-sm text-gray-500 mb-4">AI-generated analysis summary</p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Keywords:</h4>
                  <p className="text-gray-600">step, up, special for, health, medical, check-up, professional</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Template Patterns:</h4>
                  <p className="text-gray-600">
                    Blue color schemes, clean layouts, professional imagery, infographic style
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Content Arrangement:</h4>
                  <p className="text-gray-600">
                    Health-focused content dominates with 35% share. Post 1 shows highest engagement with medical
                    product focus. Visual consistency across health-related posts suggests strong brand alignment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
