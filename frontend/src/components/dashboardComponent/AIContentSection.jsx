
import { useState } from "react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts"
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const AIContentSection = () => {
  const contentScoring = [
    {
      platform: "instagram",
      content: "Case study: Migrating enterprise workloads to AWS",
      date: "19 Aug 2025",
      score: 88,
    },
    {
      platform: "instagram",
      content: "Top 5 benefits of hybrid cloud for startups",
      date: "18 Aug 2025",
      score: 78,
    },
    {
      platform: "twitter",
      content: "Step-by-step guide to Kubernetes deployment",
      date: "17 Aug 2025",
      score: 68,
    },
    {
      platform: "instagram",
      content: "Explainer video: Cloud cost optimization strategies",
      date: "16 Aug 2025",
      score: 58,
    },
    {
      platform: "facebook",
      content: "Customer testimonial: Faster scaling with Azure",
      date: "15 Aug 2025",
      score: 48,
    },
  ]

  const radarDataSets = [
    [
      { attribute: "Creativity", value: 85 },
      { attribute: "Grammar & Language", value: 92 },
      { attribute: "Visual Quality", value: 70 },
      { attribute: "Engagement Potential", value: 87 },
      { attribute: "Brand Alignment", value: 83 },
    ],
    [
      { attribute: "Creativity", value: 78 },
      { attribute: "Grammar & Language", value: 85 },
      { attribute: "Visual Quality", value: 75 },
      { attribute: "Engagement Potential", value: 70 },
      { attribute: "Brand Alignment", value: 80 },
    ],
    [
      { attribute: "Creativity", value: 55 },
      { attribute: "Grammar & Language", value: 88 },
      { attribute: "Visual Quality", value: 70 },
      { attribute: "Engagement Potential", value: 75 },
      { attribute: "Brand Alignment", value: 50 },
    ],
    [
      { attribute: "Creativity", value: 60 },
      { attribute: "Grammar & Language", value: 65 },
      { attribute: "Visual Quality", value: 50 },
      { attribute: "Engagement Potential", value: 68 },
      { attribute: "Brand Alignment", value: 55 },
    ],
    [
      { attribute: "Creativity", value: 58 },
      { attribute: "Grammar & Language", value: 45 },
      { attribute: "Visual Quality", value: 40 },
      { attribute: "Engagement Potential", value: 35 },
      { attribute: "Brand Alignment", value: 60 },
    ],
  ]

  const [selectedPost, setSelectedPost] = useState(0)

  const currentRadarData = radarDataSets[selectedPost]
  const currentPost = contentScoring[selectedPost]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* AI Content Scoring */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold text-gray-800">AI Content Scoring</h2>
          <span className="text-xl">🎯</span>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Top 5 posts by Engagement last month (click to view score)
        </p>
        <div className="space-y-3">
          {contentScoring.map((post, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                selectedPost === index
                  ? "bg-blue-50 border-[#3264DF] border-2" 
                  : "hover:bg-gray-50 border-gray-200"    
              }`}
              onClick={() => setSelectedPost(index)}
            >
              {/* Number without grey background */}
              <div className="w-8 h-8 flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <div className="w-7 h-7 flex items-center justify-center">
                {post.platform === "instagram" && <FaInstagram className="text-pink-500 w-6 h-6" />}
                {post.platform === "twitter" && <FaTwitter className="text-sky-500 w-6 h-6" />}
                {post.platform === "facebook" && <FaFacebook className="text-blue-600 w-6 h-6" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{post.content}</p>
                <p className="text-xs text-gray-500">{post.date}</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-600">
                  {post.score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Analysis */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold text-gray-800">AI Content Analysis</h2>
          <span className="text-xl">📊</span>
          <div className="ml-auto text-sm text-gray-500">
            Post #{selectedPost + 1} - Score: {currentPost.score}%
          </div>
        </div>

        {/* Radar Chart */}
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart data={currentRadarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="attribute" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
            />
            <Radar
              name="AI Analysis"
              dataKey="value"
              stroke="#3264DF"
              fill="#3264DF"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>

        {/* Analysis Metrics */}
        <div className="mt-4 space-y-3">
          {currentRadarData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b last:border-b-0"
            >
              <span className="text-sm text-gray-600 min-w-0 flex-1">
                {item.attribute}
              </span>
              <div className="flex items-center gap-3 ml-4">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-right">
                  {item.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AIContentSection

