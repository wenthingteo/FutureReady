"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Send, Bot, User } from "lucide-react"
import cloudImage from './cloud.jpg';

export function ChatInterface({ data: propData, onBack, onDataUpdate, onNavigateToPlanning }) {
  const [data, setData] = useState(propData || {
    topic: "Remote Work",
    selectedKeywords: ["prevention", "productivity", "collaboration"],
    contentPlan: null
  })
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentContent, setCurrentContent] = useState("")
  const [showGeneratingOverlay, setShowGeneratingOverlay] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
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
      setCurrentContent(contentPlan)
      if (onDataUpdate) onDataUpdate({ contentPlan })
      setData(prev => ({ ...prev, contentPlan }))
      setLoading(false)
    }

    if (!data.contentPlan) {
      generateInitialPlan()
    }
  }, [data.topic, data.selectedKeywords, onDataUpdate])

  // Handle Generate Content button click
  const handleGenerateContent = async () => {
    setShowGeneratingOverlay(true)
    setGenerationProgress(0)
    
    // Step 1: Analyzing content plan
    await new Promise(resolve => setTimeout(resolve, 1000))
    setGenerationProgress(1)
    
    // Step 2: Generating content ideas
    await new Promise(resolve => setTimeout(resolve, 1000))
    setGenerationProgress(2)
    
    // Step 3: Finalizing recommendations
    await new Promise(resolve => setTimeout(resolve, 1000))
    setGenerationProgress(3)
    
    // Show done state for a moment
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setShowGeneratingOverlay(false)
    setGenerationProgress(0)
    
    // Navigate back to content planning tool
    if (onNavigateToPlanning) {
      onNavigateToPlanning()
    }
  }

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

  // Function to detect and process refinement requests
  const processRefinementRequest = (userInput, currentContent) => {
    const input = userInput.toLowerCase()
    
    // Pattern 1: "change X to Y"
    const changeMatch = input.match(/change\s+(.+?)\s+to\s+(.+)/)
    if (changeMatch) {
      const [, oldText, newText] = changeMatch
      const regex = new RegExp(oldText.trim(), 'gi')
      const updatedContent = currentContent.replace(regex, newText.trim())
      return {
        updated: true,
        content: updatedContent,
        action: `Changed "${oldText.trim()}" to "${newText.trim()}"`
      }
    }
    
    // Pattern 2: "replace X with Y"
    const replaceMatch = input.match(/replace\s+(.+?)\s+with\s+(.+)/)
    if (replaceMatch) {
      const [, oldText, newText] = replaceMatch
      const regex = new RegExp(oldText.trim(), 'gi')
      const updatedContent = currentContent.replace(regex, newText.trim())
      return {
        updated: true,
        content: updatedContent,
        action: `Replaced "${oldText.trim()}" with "${newText.trim()}"`
      }
    }
    
    // Pattern 3: "add X to [section]" or "add X"
    const addMatch = input.match(/add\s+(.+?)(?:\s+to\s+(.+))?$/)
    if (addMatch) {
      const [, textToAdd, section] = addMatch
      let updatedContent = currentContent
      
      if (section) {
        // Try to add to specific section
        const sectionRegex = new RegExp(`(## ${section.trim()}.*?)(\n## |$)`, 'gis')
        if (sectionRegex.test(currentContent)) {
          updatedContent = currentContent.replace(sectionRegex, (match, sectionContent, ending) => {
            return sectionContent + `\n- ${textToAdd.trim()}` + ending
          })
        } else {
          // If section not found, add at the end
          updatedContent = currentContent + `\n\n## Additional Content\n- ${textToAdd.trim()}`
        }
      } else {
        // Add at the end
        updatedContent = currentContent + `\n- ${textToAdd.trim()}`
      }
      
      return {
        updated: true,
        content: updatedContent,
        action: `Added "${textToAdd.trim()}"${section ? ` to ${section}` : ''}`
      }
    }
    
    // Pattern 4: "remove X" or "delete X"
    const removeMatch = input.match(/(?:remove|delete)\s+(.+)/)
    if (removeMatch) {
      const [, textToRemove] = removeMatch
      const regex = new RegExp(`.*${textToRemove.trim()}.*\n?`, 'gi')
      const updatedContent = currentContent.replace(regex, '')
      return {
        updated: true,
        content: updatedContent,
        action: `Removed content containing "${textToRemove.trim()}"`
      }
    }
    
    // Pattern 5: "update [section] to [content]"
    const updateSectionMatch = input.match(/update\s+(.+?)\s+to\s+(.+)/)
    if (updateSectionMatch) {
      const [, section, newContent] = updateSectionMatch
      const sectionRegex = new RegExp(`(## ${section.trim()})(.*?)(\n## |$)`, 'gis')
      if (sectionRegex.test(currentContent)) {
        const updatedContent = currentContent.replace(sectionRegex, (match, header, oldContent, ending) => {
          return header + `\n${newContent.trim()}` + ending
        })
        return {
          updated: true,
          content: updatedContent,
          action: `Updated ${section.trim()} section`
        }
      }
    }
    
    return { updated: false }
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
    const currentInput = input.trim()
    setInput("")
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if this is a refinement request
    const refinementResult = processRefinementRequest(currentInput, currentContent)
    
    let aiResponse
    if (refinementResult.updated) {
      // Update the content in the sidebar
      setCurrentContent(refinementResult.content)
      
      aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `✅ Content updated! ${refinementResult.action}\n\nThe changes have been applied to your content plan on the left. Is there anything else you'd like me to modify?`,
        timestamp: new Date(),
      }
    } else {
      // Generate regular AI response
      const response = generateAIResponse(currentInput, data.topic)
      
      aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        type: response.type || 'text',
        imageUrl: response.imageUrl || null,
        timestamp: new Date(),
      }
    }

    setMessages((prev) => [...prev, aiResponse])
    setLoading(false)
  }

  // Function to detect if user wants to generate an image
  const detectImageRequest = (userInput) => {
    const input = userInput.toLowerCase()
    const imageKeywords = [
      'generate image', 'create image', 'make image', 'generate picture',
      'create picture', 'make picture', 'show image', 'image generation',
      'create visual', 'generate visual', 'make visual'
    ]
    
    return imageKeywords.some(keyword => input.includes(keyword))
  }

  const generateAIResponse = (userInput, topic) => {
    // Check if user wants to generate an image
    if (detectImageRequest(userInput)) {
      return {
        type: 'image',
        content: `I've generated an image for your ${topic} content! Here's a visual representation that you can use for your content strategy:`,
        imageUrl: cloudImage
      }
    }

    if (userInput.toLowerCase().includes("more ideas")) {
      return {
        type: 'text',
        content: `Here are additional content ideas for ${topic}:\n\n• Interactive content like polls and quizzes\n• Behind-the-scenes content\n• Expert interviews and collaborations\n• User testimonials and reviews\n• Seasonal or timely content\n\nWhich of these interests you most?`
      }
    }

    if (userInput.toLowerCase().includes("schedule") || userInput.toLowerCase().includes("calendar")) {
      return {
        type: 'text',
        content: `For your ${topic} content calendar, I recommend:\n\nPosting Frequency: 3-4 times per week\nBest Times: Tuesday-Tuesday, 10 AM - 2 PM\nContent Mix: 40% educational, 30% engaging, 20% promotional, 10% behind-the-scenes\n\nWould you like me to create a detailed monthly calendar?`
      }
    }

    return {
      type: 'text',
      content: `That's a great question about ${topic}! Based on your selected keywords and content goals, I'd suggest focusing on creating valuable, actionable content that addresses your audience's pain points.\n\nWould you like me to help you develop specific content pieces or dive deeper into any particular aspect of your content strategy?\n\n💡 **Tip**: You can ask me to refine the content on the left by saying things like:\n- "Change productivity to efficiency"\n- "Add social media marketing to Content Pillars"\n- "Remove week 7-8 from calendar"\n- "Replace video tutorials with podcast episodes"\n- "Generate image for my content"`
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      console.log("Going back...")
    }
  }

  return (
    <>
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-96 border-r border-gray-200 bg-white">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <button onClick={handleBack} className="p-1 rounded hover:bg-gray-100 transition">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h3 className="font-semibold text-gray-800">AI-Generated Content Ideas</h3>
          </div>
          <p className="text-sm text-gray-500">
            Here are some personalized content ideas based on your topic and keywords.
          </p>
        </div>

        <div className="h-[calc(100vh-120px)] overflow-y-auto p-6">
          {loading && messages.length === 0 ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-sm text-gray-800">{currentContent}</div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#475ECD] text-white">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold">AI Content Assistant</h3>
              <p className="text-sm text-gray-500">Ask me anything about your content strategy</p>
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
                    message.role === "user" ? "bg-[#475ECD] text-white ml-auto" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  
                  {/* Display image if it's an image response */}
                  {message.type === 'image' && message.imageUrl && (
                    <div className="mt-3">
                      <img 
                        src={message.imageUrl} 
                        alt="Generated content image" 
                        className="max-w-full h-auto rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                  
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
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(e)
                }
              }}
              placeholder="Try: 'Change productivity to efficiency' or 'Add email marketing to Content Pillars'"
              disabled={loading}
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || loading}
              className="px-4 py-2 bg-[#475ECD] text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          
          {/* Generate Content Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleGenerateContent}
              disabled={loading}
              className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
            >
              Generate Content
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Generating Overlay */}
    {showGeneratingOverlay && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
          <div className="space-y-6">
            {/* Animated Icon */}
            <div className="relative w-16 h-16 mx-auto">
              {generationProgress < 3 ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <div className="absolute -inset-2 border-2 border-blue-200 rounded-full animate-ping"></div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="absolute -inset-2 border-2 border-green-200 rounded-full animate-ping"></div>
                </>
              )}
            </div>

            {/* Loading Message */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {generationProgress < 3 ? "Generating Content" : "Content Generated!"}
              </h3>
              <p className="text-gray-600 text-sm">
                {generationProgress < 3 
                  ? "Creating personalized content based on your strategy..."
                  : "Your content is ready! Redirecting..."
                }
              </p>
            </div>

            {/* Progress Steps */}
            <div className="space-y-2 text-left">
              <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                generationProgress >= 1 ? 'text-green-600' : 'text-gray-400'
              }`}>
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  generationProgress >= 1 ? 'bg-green-500' : 'bg-gray-300'
                } ${generationProgress === 0 ? 'animate-pulse' : ''}`}></div>
                <span>Analyzing your content plan</span>
              </div>
              <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                generationProgress >= 2 ? 'text-green-600' : generationProgress === 1 ? 'text-blue-600' : 'text-gray-400'
              }`}>
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  generationProgress >= 2 ? 'bg-green-500' : generationProgress === 1 ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                }`}></div>
                <span>Generating content ideas</span>
              </div>
              <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                generationProgress >= 3 ? 'text-green-600' : generationProgress === 2 ? 'text-blue-600' : 'text-gray-400'
              }`}>
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  generationProgress >= 3 ? 'bg-green-500' : generationProgress === 2 ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                }`}></div>
                <span>Finalizing recommendations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}