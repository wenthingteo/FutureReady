"use client"

import { useState } from "react"
import ContentPlanningTool from "@/components/Ideation/content-planning-tool"
import { ChatInterface } from "@/components/Ideation/chat-interface"

export default function HomePage() {
  const [currentView, setCurrentView] = useState("planning") // "planning" or "chat"
  const [projectData, setProjectData] = useState(null)

  const handleCreateProject = (formData) => {
    // Store the project data including topic, keywords, and selected content
    setProjectData({
      ...formData,
      topic: formData.topic,
      selectedKeywords: formData.selectedKeywords || [],
      selectedContent: formData.selectedContent,
      contentPlan: null, // Will be generated in chat interface
    })
    setCurrentView("chat")
  }

  const handleBackToPlanning = () => {
    setCurrentView("planning")
    setProjectData(null)
  }

  const handleDataUpdate = (updates) => {
    setProjectData((prev) => ({
      ...prev,
      ...updates,
    }))
  }

  if (currentView === "chat" && projectData) {
    return <ChatInterface data={projectData} onBack={handleBackToPlanning} onDataUpdate={handleDataUpdate} />
  }

  return <ContentPlanningTool onCreateTask={handleCreateProject} />
}
