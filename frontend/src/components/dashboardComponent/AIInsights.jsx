import { ArrowUp, ArrowDown } from "lucide-react"
import WordCloud from "./WordCloud"

const AIInsights = () => {
  const aiSummaryData = [
    {
      metric: "Engagement",
      value: "15.5%",
      trend: "down",
      reason: "due to fewer comments",
      suggestion: "Try shorter videos to boost responses",
      color: "red",
    },
    {
      metric: "Reach",
      value: "18.4%",
      trend: "up",
      reason: "new users joined from shares",
      suggestion: "Try shorter videos to boost responses",
      color: "green",
    },
    {
      metric: "Retention",
      value: "15.5%",
      trend: "down",
      reason: "viewers dropping off earlier",
      suggestion: "Try shorter videos to boost responses",
      color: "red",
    },
    {
      metric: "Conversion",
      value: "16.2%",
      trend: "up",
      reason: "slightly better click-through rate",
      suggestion: "Try shorter videos to boost responses",
      color: "green",
    },
  ]

  const topKeywords = [
    { keyword: "skincare routine", engagement: 85 },
    { keyword: "natural beauty", engagement: 72 },
    { keyword: "glowing skin", engagement: 68 },
    { keyword: "anti-aging", engagement: 54 },
    { keyword: "moisturizer", engagement: 49 },
  ]

  return (
    <div className="space-y-8 pt-8">
      <h1 className="text-3xl font-bold" style={{ color: '#3264DF' }}>AI Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-gray-800">AI Summary</h2>
            <span className="text-xl">🤖</span>
          </div>
          <div className="space-y-3">
            {aiSummaryData.map((item, index) => (
              <div key={index} className="space-y-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3 flex-wrap">
                  {item.trend === "up" ? (
                    <ArrowUp className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <ArrowDown className="w-5 h-5 text-red-500 flex-shrink-0" />
                  )}
                  <span className="font-semibold text-lg text-gray-800">{item.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      {item.trend === "up" ? "Rise" : "Drop"}
                    </span>
                    <span
                      className={`font-bold text-2xl ${
                        item.color === "red"
                          ? "text-red-500"
                          : item.color === "blue"
                            ? "text-blue-500"
                            : item.color === "green"
                              ? "text-green-500"
                              : "text-gray-500"
                      }`}
                    >
                      {item.value}
                    </span>
                  </div>
                  <span className="text-gray-600 text-base font-medium">{item.reason}</span>
                </div>
                <div className="flex items-start gap-2 text-base text-gray-700 bg-white p-3 rounded-lg border-l-4" style={{ borderLeftColor: '#3264DF' }}>
                  <span className="text-lg flex-shrink-0">💡</span>
                  <span className="font-medium">{item.suggestion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Keywords */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-gray-800">Top Performing Keywords</h2>
            <span className="text-xl">🔥</span>
          </div>

          {/* Word Cloud */}
          <WordCloud />

          {/* Post Engagement Rate */}
          <div className="mt-8">
            <h3 className="text-base font-semibold text-gray-700 mb-4">Post Engagement Rate</h3>
            <div className="space-y-4">
              {topKeywords.map((keyword, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="text-base font-semibold text-gray-800">{keyword.keyword}</span>
                  <div className="flex items-center gap-3 flex-1 mx-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-300"
                        style={{ width: `${keyword.engagement}%`, backgroundColor: '#3264DF' }}
                      ></div>
                    </div>
                    <span className="text-base font-bold text-gray-700 min-w-[40px]">{keyword.engagement}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIInsights
