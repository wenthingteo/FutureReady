"use client"

import { useState } from "react"
import { Search, Sparkles, FileText, Clock, Users, Target, Video, ImageIcon, Globe, RotateCcw } from "lucide-react"

const EXAMPLE_TOPICS = [
  "Digital Marketing",
  "Health & Wellness",
  "Technology Trends",
  "Sustainable Living",
  "Personal Finance",
  "Remote Work",
]

const SAMPLE_KEYWORDS = {
  medical: ["diagnosis", "treatment", "prevention", "symptoms", "healthcare", "wellness", "nutrition", "fitness"],
  "digital marketing": [
    "SEO",
    "social media",
    "content strategy",
    "email marketing",
    "analytics",
    "conversion",
    "branding",
    "advertising",
  ],
  technology: [
    "AI",
    "blockchain",
    "cloud computing",
    "cybersecurity",
    "mobile apps",
    "IoT",
    "automation",
    "innovation",
  ],
}

const GENERATED_CONTENT = [
  {
    id: 1,
    title: "Ultimate Guide to Medical Diagnosis",
    type: "Guide",
    method: "website",
    estimatedTime: "3-4 hours",
    description: "Comprehensive overview of modern diagnostic techniques and their applications in healthcare.",
    targetAudience: "Healthcare professionals, medical students, and healthcare administrators",
    keywords: ["diagnosis", "healthcare", "medical technology", "patient care"],
    stepByStep: [
      "Research current diagnostic methodologies and technologies",
      "Interview healthcare professionals for expert insights",
      "Create detailed outline covering key diagnostic areas",
      "Write comprehensive sections on each diagnostic method",
      "Include case studies and real-world examples",
      "Review and fact-check all medical information",
      "Format content for web publication with proper headings",
      "Add relevant images and diagrams for clarity",
    ],
    guidelines: [
      "Ensure all medical information is evidence-based and current",
      "Use clear, professional language accessible to target audience",
      "Include proper medical disclaimers and citations",
      "Structure content with logical flow from basic to advanced concepts",
      "Incorporate interactive elements like checklists or flowcharts",
    ],
    content: `# Ultimate Guide to Medical Diagnosis

## Introduction
Medical diagnosis is the cornerstone of effective healthcare delivery. This comprehensive guide explores the latest diagnostic techniques, technologies, and methodologies that are revolutionizing patient care.

## Key Diagnostic Methods
- Clinical examination and patient history
- Laboratory testing and biomarkers
- Medical imaging technologies
- Genetic testing and personalized medicine

## Emerging Technologies
The field of medical diagnosis continues to evolve with artificial intelligence, machine learning algorithms, and point-of-care testing devices becoming increasingly important in clinical decision-making.

## Best Practices
Healthcare professionals should maintain a systematic approach to diagnosis, considering differential diagnoses and utilizing evidence-based protocols to ensure accurate and timely patient care.`,
  },
  {
    id: 2,
    title: "Common Medical Mistakes to Avoid",
    type: "Article",
    method: "video",
    estimatedTime: "2-3 hours",
    description: "Essential insights into preventing common medical errors and improving patient safety.",
    targetAudience: "Medical practitioners, nursing staff, and healthcare quality assurance teams",
    keywords: ["medical errors", "patient safety", "healthcare quality", "prevention"],
    stepByStep: [
      "Research statistics on common medical errors",
      "Gather expert interviews from healthcare professionals",
      "Create compelling video script with real scenarios",
      "Plan visual elements and graphics for key points",
      "Record professional narration or talking head segments",
      "Edit video with engaging transitions and graphics",
      "Add captions and accessibility features",
      "Create thumbnail and promotional materials",
    ],
    guidelines: [
      "Focus on actionable prevention strategies rather than blame",
      "Use anonymized case studies to illustrate points",
      "Maintain professional tone while being engaging",
      "Include clear calls-to-action for implementation",
      "Ensure content complies with healthcare privacy regulations",
    ],
    content: `# Common Medical Mistakes to Avoid

## Overview
Medical errors can have serious consequences for patient safety and healthcare outcomes. Understanding common pitfalls helps healthcare professionals provide better care.

## Top Medical Mistakes
1. Misdiagnosis or delayed diagnosis
2. Medication errors and adverse drug reactions
3. Communication failures between healthcare teams
4. Inadequate patient monitoring
5. Surgical complications and wrong-site procedures

## Prevention Strategies
- Implement robust verification systems
- Enhance communication protocols
- Utilize technology for error reduction
- Maintain continuous education and training
- Foster a culture of safety reporting`,
  },
  {
    id: 3,
    title: "Medical Case Study Analysis",
    type: "Case Study",
    method: "poster",
    estimatedTime: "1-2 hours",
    description: "In-depth analysis of complex medical cases and their diagnostic challenges.",
    targetAudience: "Medical students, residents, and continuing education participants",
    keywords: ["case study", "clinical analysis", "diagnostic reasoning", "medical education"],
    stepByStep: [
      "Select compelling and educational medical case",
      "Gather all relevant clinical data and imaging",
      "Create structured case presentation format",
      "Design visually appealing poster layout",
      "Include key learning objectives and outcomes",
      "Add diagnostic flowcharts and decision trees",
      "Review content with medical experts",
      "Finalize design with proper medical formatting",
    ],
    guidelines: [
      "Ensure patient confidentiality and anonymization",
      "Present information in logical, educational sequence",
      "Use high-quality medical imagery and charts",
      "Include clear learning objectives and takeaways",
      "Make content suitable for conference or educational display",
    ],
    content: `# Medical Case Study Analysis

## Case Presentation
A 45-year-old patient presents with chest pain, shortness of breath, and fatigue. Initial assessment reveals elevated cardiac enzymes and abnormal ECG findings.

## Diagnostic Approach
The medical team employed a systematic approach including:
- Detailed patient history and physical examination
- Cardiac biomarker analysis
- Echocardiography and stress testing
- Coronary angiography

## Clinical Decision Making
Based on the comprehensive evaluation, the patient was diagnosed with acute coronary syndrome and received appropriate interventions including medication therapy and lifestyle modifications.

## Learning Points
This case highlights the importance of rapid assessment, appropriate diagnostic testing, and multidisciplinary care coordination in managing acute cardiac conditions.`,
  },
]

export default function ContentPlanningTool({ onCreateTask }) {
  const [step, setStep] = useState(1)
  const [topic, setTopic] = useState("")
  const [selectedKeywords, setSelectedKeywords] = useState([])
  const [selectedContent, setSelectedContent] = useState(GENERATED_CONTENT[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatingProgress, setGeneratingProgress] = useState(0)
  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(false)

  const handleTopicSubmit = () => {
    if (topic.trim()) {
      setStep(2)
    }
  }

  const handleTopicReset = () => {
    setStep(1)
    setSelectedKeywords([])
  }

  const handleKeywordToggle = (keyword) => {
    setSelectedKeywords((prev) => (prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]))
  }

  const handleGenerate = () => {
    if (selectedKeywords.length > 0) {
      setIsGenerating(true)
      setGeneratingProgress(0)

      // Simulate progress over 3 seconds
      const progressInterval = setInterval(() => {
        setGeneratingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            setTimeout(() => {
              setIsGenerating(false)
              setStep(3)
            }, 500) // Small delay after reaching 100%
            return 100
          }
          return prev + 2 // Increase by 2% every 60ms (3 seconds total)
        })
      }, 60)
    }
  }

  const getKeywordsForTopic = (topicText) => {
    const lowerTopic = topicText.toLowerCase()
    if (lowerTopic.includes("medical") || lowerTopic.includes("health")) {
      return SAMPLE_KEYWORDS.medical
    } else if (lowerTopic.includes("marketing") || lowerTopic.includes("digital")) {
      return SAMPLE_KEYWORDS["digital marketing"]
    } else if (lowerTopic.includes("tech") || lowerTopic.includes("technology")) {
      return SAMPLE_KEYWORDS.technology
    }
    return SAMPLE_KEYWORDS.medical // Default fallback
  }

  const getMethodIcon = (method) => {
    switch (method) {
      case "video":
        return <Video className="w-4 h-4" />
      case "poster":
        return <ImageIcon className="w-4 h-4" />
      case "website":
        return <Globe className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 flex">
            {/* Content List */}
            <div className="w-1/2 p-6 border-r">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">AI-Generated Content Ideas</h2>
                <div className="flex gap-2 mb-4">
                  {selectedKeywords.slice(0, 3).map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {GENERATED_CONTENT.map((content) => (
                  <div
                    key={content.id}
                    className={`cursor-pointer transition-all hover:shadow-md p-4 rounded-lg border ${
                      selectedContent.id === content.id ? "ring-2 ring-blue-500 bg-white" : "bg-white"
                    }`}
                    onClick={() => setSelectedContent(content)}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{content.title}</h3>
                    <div className="flex gap-2 mb-2">
                      <span className="px-2 py-1 border border-gray-300 rounded text-xs flex items-center gap-1">
                        {getMethodIcon(content.method)}
                        {content.method}
                      </span>
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {content.estimatedTime}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{content.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Detail */}
            <div className="w-1/2 p-6 overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{selectedContent.title}</h2>
                <div className="flex gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded flex items-center gap-1">
                    {getMethodIcon(selectedContent.method)}
                    {selectedContent.method}
                  </span>
                  <span className="px-2 py-1 border border-gray-300 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedContent.estimatedTime}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{selectedContent.description}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Target Audience
                  </h3>
                  <p className="text-sm text-gray-600">{selectedContent.targetAudience}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Keywords
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedContent.keywords.map((keyword, index) => (
                      <span key={index} className="px-2 py-1 border border-gray-300 rounded text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Step-by-Step Creation Guide</h3>
                  <ol className="space-y-2">
                    {selectedContent.stepByStep.map((step, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <span className="flex-shrink-0 w-6 h-6 bg-[#475ECD] text-white rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </span>
                        <span className="text-gray-600">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Content Guidelines</h3>
                  <ul className="space-y-2">
                    {selectedContent.guidelines.map((guideline, index) => (
                      <li key={index} className="flex gap-2 text-sm">
                        <span className="text-blue-600">•</span>
                        <span className="text-gray-600">{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Content Preview</h3>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-gray-900 text-sm leading-relaxed">
                        {selectedContent.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={() => {
                    if (onCreateTask) {
                      onCreateTask({
                        title: selectedContent.title,
                        description: selectedContent.description,
                        targetAudience: selectedContent.targetAudience,
                        topic: topic,
                        selectedKeywords: selectedKeywords,
                        selectedContent: selectedContent,
                      })
                    }
                  }}
                  className="w-full bg-[#475ECD] hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Chat with AI
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <TaskFormPanel
          isOpen={isTaskPanelOpen}
          onClose={() => setIsTaskPanelOpen(false)}
          onSubmit={(formData) => {
            
            if (onCreateTask) {
              onCreateTask(formData)
            }
            
            setIsTaskPanelOpen(false)
          }}
          prefilledData={{
            title: selectedContent.title,
            description: selectedContent.description,
            targetAudience: selectedContent.targetAudience,
            topic: topic,
          }}
        /> */}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#475ECD]">Ideation</h1>
        </div>
        <div className="min-h-screen bg-white">
          <div className="flex">
            {/* Main Content */}
            <div className="flex-1 p-8">
              {isGenerating ? (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                  <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
                    <div className="text-center space-y-6">
                      {/* Loading Animation */}
                      <div className="relative w-20 h-20 mx-auto">
                        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                        <div
                          className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"
                          style={{
                            background: `conic-gradient(from 0deg, #3264DF ${generatingProgress * 3.6}deg, transparent ${generatingProgress * 3.6}deg)`,
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />
                        </div>
                      </div>

                      {/* Progress Info */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">AI Generating Content Ideas</h3>
                        <p className="text-gray-600 text-sm">
                          Analyzing your keywords and creating personalized content suggestions
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${generatingProgress}%` }}
                        ></div>
                      </div>

                      {/* Progress Percentage */}
                      <div className="text-2xl font-bold text-blue-600">{generatingProgress}%</div>

                      {/* Selected Keywords Display */}
                      <div className="bg-blue-50 rounded-xl p-4">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">Processing Keywords</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                          {selectedKeywords.slice(0, 6).map((keyword, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-white text-blue-700 rounded-lg text-xs font-medium shadow-sm"
                            >
                              {keyword}
                            </span>
                          ))}
                          {selectedKeywords.length > 6 && (
                            <span className="px-2 py-1 bg-white text-blue-700 rounded-lg text-xs font-medium shadow-sm">
                              +{selectedKeywords.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Type Icons */}
                      <div className="flex justify-center gap-3">
                        {[
                          {
                            icon: <FileText className="w-5 h-5" />,
                            label: "Articles",
                          },
                          {
                            icon: <Video className="w-5 h-5" />,
                            label: "Videos",
                          },
                          {
                            icon: <ImageIcon className="w-5 h-5" />,
                            label: "Visuals",
                          },
                        ].map((type, index) => (
                          <div
                            key={type.label}
                            className="flex flex-col items-center gap-1 animate-bounce"
                            style={{ animationDelay: `${index * 0.2}s` }}
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 flex items-center justify-center shadow-lg">
                              <span className="text-white">{type.icon}</span>
                            </div>
                            <span className="text-xs text-gray-500">{type.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto">
                  <div className={`transition-all duration-500 ${step === 2 ? "pt-8" : "pt-24"}`}>
                    <div className="mb-8">
                      <h2 className="text-lg font-medium text-center text-gray-900 mb-4">
                        {step === 1 ? "What's your main topic or theme?" : `Topic: "${topic}"`}
                      </h2>
                      <div className="flex gap-2 max-w-2xl mx-auto">
                        <input
                          type="text"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          placeholder="e.g., Sustainable fashion, Digital marketing trends, Health cooking..."
                          className={`flex-1 px-3 py-2 border rounded-lg transition-colors ${
                            step === 2
                              ? "border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                              : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          }`}
                          disabled={step === 2}
                          onKeyPress={(e) => e.key === "Enter" && step === 1 && handleTopicSubmit()}
                        />
                        {step === 1 ? (
                          <button
                            onClick={handleTopicSubmit}
                            className="px-6 bg-[#475ECD] hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
                          >
                            <Search className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={handleTopicReset}
                            className="px-4 bg-red-500 hover:bg-red-300 text-white rounded-lg transition-colors flex items-center justify-center"
                            title="Reset topic"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {step === 1 && (
                      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                        {EXAMPLE_TOPICS.map((exampleTopic, index) => (
                          <button
                            key={index}
                            className={`h-auto py-3 px-4 text-sm border rounded-lg transition-colors
                              ${
                                topic === exampleTopic
                                  ? "bg-blue-100 border border-[#475ECD] hover:bg-blue-50"
                                  : "border border-gray-300 hover:bg-blue-50"
                              }`}
                            onClick={() => setTopic(exampleTopic)}
                          >
                            {exampleTopic}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {step === 2 && (
                    <div className="animate-in slide-in-from-bottom-4 duration-500">
                      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">
                        Keyword related to "{topic}"
                      </h2>
                      <p className="text-center text-gray-600 mb-8">
                        Select the keywords that best match your content goals
                      </p>

                      <div className="grid grid-cols-4 gap-3 max-w-4xl mx-auto mb-8">
                        {getKeywordsForTopic(topic).map((keyword, index) => (
                          <button
                            key={index}
                            className={`h-auto py-3 px-4 text-sm rounded-lg transition-colors ${
                              selectedKeywords.includes(keyword)
                                ? "bg-blue-100 border border-[#475ECD] hover:bg-blue-50"
                                : "border border-gray-300 hover:bg-blue-50"
                            }`}
                            onClick={() => handleKeywordToggle(keyword)}
                          >
                            {keyword}
                          </button>
                        ))}
                      </div>

                      <div className="text-center">
                        <button
                          onClick={handleGenerate}
                          disabled={selectedKeywords.length === 0}
                          className={`px-8 py-3 rounded-lg transition-colors flex items-center gap-2 mx-auto ${
                            selectedKeywords.length === 0
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-[#475ECD] hover:bg-blue-700 text-white"
                          }`}
                        >
                          <Sparkles className="w-4 h-4" />
                          Generate Content Ideas ({selectedKeywords.length} selected)
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
