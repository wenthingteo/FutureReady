"use client"

import React, { useState, useEffect, useRef } from "react"
import { ArrowLeft, Send, Bot, User } from "lucide-react"

export function ChatInterface({ data, onBack, onDataUpdate }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollAreaRef = useRef(null)

  useEffect(() => {
    const generateInitialPlan = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const contentPlan = generateContentPlan(data.topic, data.selectedKeywords)

      const initialMessage = {
        id: "1",
        role: "assistant",
        content: contentPlan,
        timestamp: new Date(),
      }

      setMessages([initialMessage])
      onDataUpdate({ contentPlan })
      setLoading(false)
    }

    if (!data.contentPlan) {
      generateInitialPlan()
    }
  }, [data, onDataUpdate])

  const generateContentPlan = (topic, keywords) => {
    return `# AI-Generated Content Ideas for "${topic}"

Based on your selected keywords: ${keywords.join(", ")}, here's a comprehensive content strategy:

## Content Pillars

### 1. Educational Content
- How-to guides covering ${keywords[0]} and ${keywords[1] || "related topics"}
- Tutorial series breaking down complex concepts
- Best practices and industry standards

### 2. Trend Analysis
- Current trends in ${topic}
- Future predictions and emerging patterns
- Market insights and data-driven content

### 3. Case Studies & Examples
- Success stories from industry leaders
- Real-world applications of ${topic}
- Before/after comparisons and results

## Content Calendar Suggestions

Week 1-2: Foundation content covering ${keywords[0]}
Week 3-4: Deep dive into ${keywords[1] || "advanced topics"}
Week 5-6: Community engagement and user-generated content
Week 7-8: Trend analysis and future outlook

## Recommended Formats
- Blog posts (2,000-3,000 words)
- Infographics and visual content
- Video tutorials and webinars
- Social media series
- Email newsletter content

Would you like me to elaborate on any of these suggestions or help you develop specific content pieces?`
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const aiResponse = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: generateAIResponse(input.trim(), data.topic),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiResponse])
    setLoading(false)
  }

  const generateAIResponse = (userInput, topic) => {
    if (userInput.toLowerCase().includes("more ideas")) {
      return `Here are additional content ideas for ${topic}:\n\n• Interactive content like polls and quizzes\n• Behind-the-scenes content\n• Expert interviews and collaborations\n• User testimonials and reviews\n• Seasonal or timely content\n\nWhich of these interests you most?`
    }

    if (userInput.toLowerCase().includes("schedule") || userInput.toLowerCase().includes("calendar")) {
      return `For your ${topic} content calendar, I recommend:\n\nPosting Frequency: 3-4 times per week\nBest Times: Tuesday-Thursday, 10 AM - 2 PM\nContent Mix: 40% educational, 30% engaging, 20% promotional, 10% behind-the-scenes\n\nWould you like me to create a detailed monthly calendar?`
    }

    return `That's a great question about ${topic}! Based on your selected keywords and content goals, I'd suggest focusing on creating valuable, actionable content that addresses your audience's pain points.\n\nWould you like me to help you develop specific content pieces or dive deeper into any particular aspect of your content strategy?`
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-96 border-r border-gray-200 bg-white">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={onBack}
              className="p-1 rounded hover:bg-gray-100 transition"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h3 className="font-semibold text-gray-800">AI-Generated Content Ideas</h3>
          </div>
          <p className="text-sm text-gray-500">
            Here are some personalized content ideas based on your topic and keywords.
          </p>
        </div>

        <div
          ref={scrollAreaRef}
          className="h-[calc(100vh-120px)] overflow-y-auto p-6"
        >
          {loading && messages.length === 0 ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-sm text-gray-800">
                {messages[0]?.content}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#475ECD] text-white">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold">AI Content Assistant</h3>
              <p className="text-sm text-gray-500">
                Ask me anything about your content strategy
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.slice(1).map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#475ECD] text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-[#475ECD] text-white ml-auto"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  <div className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</div>
                </div>

                {message.role === "user" && (
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-400 text-white">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#475ECD] text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={loading}
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2 bg-[#475ECD] text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
