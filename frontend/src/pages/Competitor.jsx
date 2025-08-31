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
  ExternalLink,
} from "lucide-react"

// Mock data for trending posts with URLs
const trendingPosts = [
  {
    id: 1,
    title: "COVID-19 Health Products",
    platform: "instagram",
    topic: "health",
    timeRange: "7d",
    engagement: "12.5K",
    image: "/covid-health-products-blue-medical.png",
    url: "https://www.instagram.com/p/example-covid-health-products/",
  },
  {
    id: 2,
    title: "5 Steps to Maintain Your Health",
    platform: "tiktok",
    topic: "health",
    timeRange: "30d",
    engagement: "8.2K",
    image: "/health-steps-infographic-green.png",
    url: "https://www.tiktok.com/@example/video/health-steps-maintain",
  },
  {
    id: 3,
    title: "International Company Presentation",
    platform: "linkedin",
    topic: "business",
    timeRange: "90d",
    engagement: "15.7K",
    image: "/business-presentation-corporate-blue.png",
    url: "https://www.linkedin.com/posts/example-company-presentation",
  },
  {
    id: 4,
    title: "Medical Equipment Guide",
    platform: "youtube",
    topic: "health",
    timeRange: "7d",
    engagement: "22.1K",
    image: "/medical-equipment-stethoscope.png",
    url: "https://www.youtube.com/watch?v=JddoeK5JcRw",
  },
  {
    id: 5,
    title: "Medical Check-up Process",
    platform: "instagram",
    topic: "health",
    timeRange: "7d",
    engagement: "9.8K",
    image: "/medical-checkup-doctor-patient.png",
    url: "https://www.instagram.com/p/example-medical-checkup-process/",
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
    timeRange: "all",
    topic: "all",
    platform: "all",
  })
  const [filteredPosts, setFilteredPosts] = useState(trendingPosts)

  const applyFilters = () => {
    const result = trendingPosts.filter((post) => {
      const matchTime = filters.timeRange === "all" || post.timeRange === filters.timeRange
      const matchTopic = filters.topic === "all" || post.topic === filters.topic
      const matchPlatform = filters.platform === "all" || post.platform === filters.platform
      return matchTime && matchTopic && matchPlatform
    })
    setFilteredPosts(result.length > 0 ? result : [])
    setCurrentPostIndex(0)
  }

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
    setCurrentPostIndex((prev) => (prev + 1) % filteredPosts.length)
  }

  const prevPost = () => {
    setCurrentPostIndex((prev) => (prev - 1 + filteredPosts.length) % filteredPosts.length)
  }

  const handlePostClick = (post) => {
    window.open(post.url, '_blank')
  }

  const visiblePosts = filteredPosts.slice(currentPostIndex, currentPostIndex + 3)
  if (visiblePosts.length < 3 && filteredPosts.length > 0) {
    visiblePosts.push(...filteredPosts.slice(0, 3 - visiblePosts.length))
  }

  return (
    <div>
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#3264DF]">Competitor Analysis</h1>
          </div>
          <div className="flex items-center gap-4">
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg mb-2 p-4">
          <div className="flex items-center gap-2 mb-4 text-gray-700 font-medium">
            <Filter className="w-5 h-5" /> Filters
          </div>
          <div className="flex gap-4 items-center">
            <select
              value={filters.timeRange}
              onChange={(e) => setFilters((prev) => ({ ...prev, timeRange: e.target.value }))}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Time</option>
              <option value="1d">Last 24h</option>
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

            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-[#475ECD] text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Search className="w-4 h-4" /> Search
            </button>
          </div>
        </div>

        {/* Trending Posts Section */}
        <div className="bg-white border border-gray-200 rounded-lg mb-2 p-4">
          <h2 className="text-lg font-semibold mb-2">Analyzing Competitor's Current Trends</h2>
          <p className="text-sm text-gray-500 mb-4">
            Trending posts from your competitors across platforms (click to visit)
          </p>

          {filteredPosts.length === 0 ? (
            <p className="text-center text-gray-500">No posts found for the selected filters.</p>
          ) : (
            <div className="relative">
              <div className="flex justify-center gap-4 overflow-hidden">
                {visiblePosts.map((post, index) => (
                  <div key={`${post.id}-${index}`} className="flex-shrink-0 w-80">
                    <div 
                      className="bg-white border-2 border-dashed border-gray-300 rounded-lg shadow-sm hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group"
                      onClick={() => handlePostClick(post)}
                    >
                      <div className="p-4">
                        <div className="relative">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-48 object-cover rounded-lg mb-3 group-hover:opacity-90 transition-opacity"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white rounded-full p-1 shadow-md">
                              <ExternalLink className="w-4 h-4 text-gray-600" />
                            </div>
                          </div>
                        </div>
                        <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                        <div className="flex items-center justify-between text-sm">
                          <span className="px-2 py-1 bg-gray-100 rounded capitalize">{post.platform}</span>
                          <span className="text-gray-500">{post.engagement} engagements</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPosts.length > 3 && (
                <>
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
                </>
              )}
            </div>
          )}

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
              {(() => {
                const state = aiStates[aiState]
                const Icon = state.icon
                return (
                  <div className="flex items-center justify-center gap-3">
                    <Icon
                      className={`w-5 h-5 ${
                        isAnalyzing && aiState < aiStates.length - 1 ? "animate-spin text-blue-500" : ""
                      } ${aiState === aiStates.length - 1 ? "text-green-500" : ""}`}
                    />
                    <span
                      className={
                        aiState === aiStates.length - 1 ? "text-green-500" : "text-gray-700"
                      }
                    >
                      {state.text}
                    </span>
                  </div>
                )
              })()}
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
                  <p className="text-gray-600">
                    step, up, special for, health, medical, check-up, professional
                  </p>
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