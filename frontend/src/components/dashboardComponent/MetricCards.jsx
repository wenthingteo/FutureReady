import { ThumbsUp, MessageSquare, Share2 } from "lucide-react"
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi"

const MetricCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {/* Likes Card */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <ThumbsUp className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-gray-500 text-sm">Page Total Likes</h2>
            <p className="text-2xl font-semibold mt-1">12,345</p>
          </div>
        </div>
        <div className="flex items-center bg-green-100 text-green-600 text-sm px-2 py-1 rounded-full font-medium">
          <FiTrendingUp className="mr-1" /> +12%
        </div>
      </div>

      {/* Engagement Card */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <MessageSquare className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-gray-500 text-sm">Engagement Rate</h2>
            <p className="text-2xl font-semibold mt-1">5.4%</p>
          </div>
        </div>
        <div className="flex items-center bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full font-medium">
          <FiTrendingDown className="mr-1" /> -8%
        </div>
      </div>

      {/* CTR Card */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Share2 className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-gray-500 text-sm">Click Through Rate</h2>
            <p className="text-2xl font-semibold mt-1">2.8%</p>
          </div>
        </div>
        <div className="flex items-center bg-green-100 text-green-600 text-sm px-2 py-1 rounded-full font-medium">
          <FiTrendingUp className="mr-1" /> +5%
        </div>
      </div>
    </div>
  )
}

export default MetricCards
