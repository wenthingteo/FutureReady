"use client"
import { CheckCircle, Sparkles, TrendingUp, Eye, DollarSign, Target } from "lucide-react"
import { useEffect, useState } from "react"

export const AdsSuccessOverlay = ({ isVisible, onClose, campaignData }) => {
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const timer1 = setTimeout(() => setAnimationPhase(1), 300)
      const timer2 = setTimeout(() => setAnimationPhase(2), 800)
      const timer3 = setTimeout(() => setAnimationPhase(3), 1300)
      
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    } else {
      setAnimationPhase(0)
    }
  }, [isVisible])

  if (!isVisible) return null

  const campaignStats = {
    platforms: campaignData?.platforms?.length || 3,
    estimatedReach: "250K - 500K",
    estimatedCPC: "$0.65 - $1.20",
    projectedROAS: "3.2x - 4.8x"
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">

        <div className="text-center space-y-4">
          
          {/* Success Animation */}
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -inset-2 border-2 border-green-200 rounded-full animate-ping"></div>
          </div>

          {/* Success Message */}
          <div className={`transition-all duration-500 ${animationPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Ad Launched Successfully!</h3>
            <p className="text-gray-600 text-sm">
              Your AI-powered ad is now live across selected platforms
            </p>
          </div>

          {/* Campaign Summary */}
          <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 transition-all duration-500 delay-200 ${animationPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-800">Ads Overview</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-center p-2 bg-white rounded-lg">
                <Target className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-gray-800">{campaignStats.platforms} Platforms</div>
                <div className="text-gray-500 text-xs">Active Channels</div>
              </div>
              
              <div className="text-center p-2 bg-white rounded-lg">
                <Eye className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-gray-800">{campaignStats.estimatedReach}</div>
                <div className="text-gray-500 text-xs">Est. Reach</div>
              </div>
              
              <div className="text-center p-2 bg-white rounded-lg">
                <DollarSign className="w-4 h-4 text-green-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-gray-800">{campaignStats.estimatedCPC}</div>
                <div className="text-gray-500 text-xs">Est. CPC</div>
              </div>
              
              <div className="text-center p-2 bg-white rounded-lg">
                <TrendingUp className="w-4 h-4 text-orange-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-gray-800">{campaignStats.projectedROAS}</div>
                <div className="text-gray-500 text-xs">Projected ROAS</div>
              </div>
            </div>
          </div>

          {/* Success Checklist */}
          <div className={`bg-green-50 rounded-lg p-3 transition-all duration-500 delay-300 ${animationPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-3 h-3" />
                <span>Ads activated across all platforms</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-3 h-3" />
                <span>Ad creatives uploaded and approved</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-3 h-3" />
                <span>Budget allocated and tracking enabled</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-3 h-3" />
                <span>Performance monitoring started</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`flex gap-3 transition-all duration-500 delay-500 ${animationPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 text-sm"
            >
              View Dashboard
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-lg hover:border-gray-300 hover:text-gray-800 transition-all duration-200 text-sm"
            >
              Close
            </button>
          </div>

          {/* Next Steps Hint */}
          <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
            Monitor your Ads performance in the Live Monitoring tab
          </div>

        </div>
      </div>
    </div>
  )
}