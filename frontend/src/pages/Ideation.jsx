"use client"

import { useState } from "react"
import { TopicInput } from "@/components/Ideation/topic-input"
import { KeywordSelection  } from "@/components/Ideation/keyword-selection"
import { ChatInterface  } from "@/components/Ideation/chat-interface"

export default function ContentPlanningAgent() {
  const [currentStep, setCurrentStep] = useState("topic")
  const [data, setData] = useState({
    topic: "",
    selectedKeywords: [],
  })

  const handleStepChange = (step) => {
    setCurrentStep(step)
  }

  const handleDataUpdate = (updates) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 overflow-hidden">
        {currentStep === "topic" && (
          <TopicInput
            data={data}
            onNext={() => handleStepChange("keywords")}
            onDataUpdate={handleDataUpdate}
          />
        )}

        {currentStep === "keywords" && (
          <KeywordSelection
            data={data}
            onNext={() => handleStepChange("chat")}
            onBack={() => handleStepChange("topic")}
            onDataUpdate={handleDataUpdate}
          />
        )}

        {currentStep === "chat" && (
          <ChatInterface
            data={data}
            onBack={() => handleStepChange("keywords")}
            onDataUpdate={handleDataUpdate}
          />
        )}
      </main>
    </div>
  )
}
