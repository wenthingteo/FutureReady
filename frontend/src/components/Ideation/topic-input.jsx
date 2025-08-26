"use client"

import React, { useState } from "react"
import { Search } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

export function TopicInput({ data, onNext, onDataUpdate }) {
  const [topic, setTopic] = useState(data.topic)
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (topic.trim()) {
      onDataUpdate({ topic: topic.trim() })
      onNext()
    }
  }

  return (
    <div className="flex items-center justify-center h-screen px-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl border border-gray-200">
        {/* Header */}
        <div className="text-center p-8 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Content Planning Assistant
          </h2>
          <p className="text-gray-500 text-lg">
            Let's start by understanding what topic you'd like to create content about
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 text-left">
              <label htmlFor="topic" className="text-base font-medium text-gray-700">
                What's your main topic or theme?
              </label>
              <input
                id="topic"
                type="text"
                placeholder="e.g. Sustainable fashion, Digital marketing trends, Healthy cooking..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!topic.trim()}
              className="w-full h-12 flex items-center justify-center rounded-lg bg-[#475ECD] text-white font-medium text-base hover:bg-blue-700 disabled:opacity-50 transition"
            >
              <Search className="mr-2 h-5 w-5" />
              Find Related Keywords
            </button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/content/competitor")}
              className={`underline ${
                location.pathname === "/content/Competitor"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              I don't have any idea
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
