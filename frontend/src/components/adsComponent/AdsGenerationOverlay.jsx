"use client"
import { Sparkles, CheckCircle, Zap, Brain, Target } from "lucide-react"

export const AdsGenerationOverlay = ({
  isGenerating,
  isCompleted,
  generationProgress,
  currentStep,
  onReview,
  onClose,
}) => {
  if (!isGenerating) return null

  const steps = [
    "Suggesting Platforms & Ad Format...",
    "Researching target audience...",
    "Generating creative concepts...",
    "Suggesting budget...",
    "Optimizing for engagement...",
    "Finalizing ad variations...",
  ]

  const getCurrentStep = () => {
    const stepIndex = Math.round((generationProgress / 100) * steps.length)
    return steps[Math.min(stepIndex, steps.length - 1)]
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-2 sm:px-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl">
        {!isCompleted ? (
          <div className="text-center space-y-6">
            {/* Loading Animation */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
              <div
                className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"
                style={{
                  background: `conic-gradient(from 0deg, #9333ea ${generationProgress * 3.6}deg, transparent ${generationProgress * 3.6}deg)`,
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-8 h-8 text-purple-600 animate-pulse" />
              </div>
            </div>

            {/* Progress Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">🤖 AI Creating Your Ads</h3>
              <p className="text-gray-600 text-sm">{getCurrentStep()}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${generationProgress}%` }}
              ></div>
            </div>

            {/* Progress Percentage */}
            <div className="text-2xl font-bold text-purple-600">{Math.round(generationProgress)}%</div>

            {/* AI Process Icons */}
            <div className="flex justify-center gap-2">
              {[
                { icon: Target, threshold: 20, label: "Targeting" },
                { icon: Brain, threshold: 40, label: "Thinking" },
                { icon: Sparkles, threshold: 60, label: "Creating" },
                { icon: Zap, threshold: 80, label: "Optimizing" },
              ].map(({ icon: Icon, threshold, label }, index) => {
                const isProcessed = generationProgress >= threshold

                return (
                  <div
                    key={label}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${
                      isProcessed
                        ? "bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 shadow-lg scale-110"
                        : "bg-gray-200 scale-100"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isProcessed ? "text-white" : "text-gray-400"}`} />
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          /* Success State */
          <div className="text-center space-y-6">
            {/* Success Animation */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -inset-2 border-4 border-green-200 rounded-full animate-ping"></div>
            </div>

            {/* Success Message */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">🎉 Your Ads Are Ready!</h3>
              <p className="text-gray-600 text-sm">
                AI has generated ad optimized for your Ads
              </p>
            </div>

            {/* Generated Content Preview */}
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Generated Content</span>
              </div>
              <div className="text-sm text-green-700">
                ✓ Ad created
                <br />✓ Headlines optimized
                <br />✓ Ads performance predicted
              </div>
            </div>

            {/* Review Button */}
            <button
              onClick={onReview}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
            >
              Review & Customize
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
