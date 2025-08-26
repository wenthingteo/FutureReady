"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Sparkles } from "lucide-react"

export function KeywordSelection({ data, onNext, onBack, onDataUpdate }) {
  const [selectedKeywords, setSelectedKeywords] = useState(data.selectedKeywords)
  const [keywords, setKeywords] = useState([])
  const [loading, setLoading] = useState(true)

  // Generate keywords based on topic
  useEffect(() => {
    const generateKeywords = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500)) // simulate API

      const topicKeywords = generateKeywordsForTopic(data.topic)
      setKeywords(topicKeywords)
      setLoading(false)
    }

    if (data.topic) {
      generateKeywords()
    }
  }, [data.topic])

  const generateKeywordsForTopic = (topic) => {
    const baseKeywords = [
      `${topic} tips`,
      `${topic} guide`,
      `${topic} trends`,
      `${topic} best practices`,
      `${topic} strategies`,
      `${topic} benefits`,
      `${topic} challenges`,
      `${topic} solutions`,
      `${topic} tools`,
      `${topic} techniques`,
      `${topic} examples`,
      `${topic} case studies`,
    ]

    return baseKeywords.slice(0, 8)
  }

  const toggleKeyword = (keyword) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]
    )
  }

  const handleNext = () => {
    onDataUpdate({ selectedKeywords })
    onNext()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500">Generating keywords for "{data.topic}"...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-xl border border-gray-200">
        {/* Header */}
        <div className="text-center p-8 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Keywords related to "{data.topic}"
          </h2>
          <p className="text-gray-500 text-lg">
            Select the keywords that best match your content goals
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Keywords */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {keywords.map((keyword) => (
              <div
                key={keyword}
                onClick={() => toggleKeyword(keyword)}
                className={`p-3 text-center rounded-lg cursor-pointer transition-all text-sm font-medium border
                  ${
                    selectedKeywords.includes(keyword)
                      ? "bg-[#8598f7] text-white border-[#8598f7]"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {keyword}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-6">
            <button
              onClick={onBack}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={selectedKeywords.length === 0}
              className="flex items-center justify-center min-w-[200px] px-4 py-2 rounded-lg bg-[#475ECD] text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Content Ideas ({selectedKeywords.length} selected)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
