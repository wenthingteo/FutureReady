// import React from "react"
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   ResponsiveContainer,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
// } from "recharts"
// import { Download, RefreshCcw, ThumbsUp, MessageSquare, Share2, ArrowUp, ArrowDown } from "lucide-react"
// import { FiTrendingUp, FiTrendingDown } from "react-icons/fi"

// const Dashboard = () => {
//   const roiData = [
//     { month: "Jan", roi: 20 },
//     { month: "Feb", roi: 30 },
//     { month: "Mar", roi: 25 },
//     { month: "Apr", roi: 40 },
//     { month: "May", roi: 50 },
//     { month: "Jun", roi: 45 },
//     { month: "Jul", roi: 60 },
//     { month: "Aug", roi: 55 },
//     { month: "Sep", roi: 70 },
//     { month: "Oct", roi: 65 },
//     { month: "Nov", roi: 80 },
//     { month: "Dec", roi: 75 },
//   ]

//   const roiForecastData = [
//     { month: "Jan", current: 15, upcoming: 12 },
//     { month: "Feb", current: 18, upcoming: 16 },
//     { month: "Mar", current: 22, upcoming: 20 },
//     { month: "Apr", current: 25, upcoming: 28 },
//     { month: "May", current: 20, upcoming: 24 },
//     { month: "Jun", current: 28, upcoming: 32 },
//     { month: "Jul", current: 30, upcoming: 35 },
//     { month: "Aug", current: 26, upcoming: 30 },
//     { month: "Sep", current: 32, upcoming: 38 },
//     { month: "Oct", current: 28, upcoming: 34 },
//     { month: "Nov", current: 35, upcoming: 40 },
//     { month: "Dec", current: 38, upcoming: 42 },
//   ]

//   const aiSummaryData = [
//     {
//       metric: "Engagement",
//       value: "15.5%",
//       trend: "down",
//       reason: "due to fewer comments",
//       suggestion: "Try shorter videos to boost responses",
//       color: "red",
//     },
//     {
//       metric: "Reach",
//       value: "18.4%",
//       trend: "up",
//       reason: "new users joined from shares",
//       suggestion: "Try shorter videos to boost responses",
//       color: "blue",
//     },
//     {
//       metric: "Retention",
//       value: "15.5%",
//       trend: "down",
//       reason: "viewers dropping off earlier",
//       suggestion: "Try shorter videos to boost responses",
//       color: "red",
//     },
//     {
//       metric: "Conversion",
//       value: "16.2%",
//       trend: "up",
//       reason: "slightly better click-through rate",
//       suggestion: "Try shorter videos to boost responses",
//       color: "green",
//     },
//   ]

//   const topKeywords = [
//     { keyword: "AI", engagement: 70 },
//     { keyword: "Data", engagement: 20 },
//     { keyword: "Algorithm", engagement: 10 },
//   ]

//   const contentScoring = [
//     { platform: "instagram", content: "Skinific - moisturiser promotion ads", date: "19 Aug 2025", score: 88 },
//     { platform: "instagram", content: "Skinific - moisturiser promotion ads", date: "19 Aug 2025", score: 78 },
//     { platform: "twitter", content: "Skinific - moisturiser promotion ads", date: "19 Aug 2025", score: 68 },
//     { platform: "instagram", content: "Skinific - moisturiser promotion ads", date: "19 Aug 2025", score: 58 },
//     { platform: "facebook", content: "Skinific - moisturiser promotion ads", date: "19 Aug 2025", score: 48 },
//   ]

//   const radarData = [
//     { attribute: "Attribute 1", value: 80 },
//     { attribute: "Attribute 2", value: 90 },
//     { attribute: "Attribute 3", value: 70 },
//     { attribute: "Attribute 4", value: 85 },
//     { attribute: "Attribute 5", value: 75 },
//   ]

//   const interactionData = [
//     { name: "Likes", value: 70 },
//     { name: "Comments", value: 20 },
//     { name: "Shares", value: 10 },
//   ]

//   const COLORS = ["#3264DF", "#769BF4", "#ADC7F7"]

//   const WordCloud = () => {
//     const words = [
//       { text: "AI", size: 48, color: "#3264DF" },
//       { text: "procedure", size: 36, color: "#22c55e" },
//       { text: "data", size: 32, color: "#ef4444" },
//       { text: "algorithm", size: 28, color: "#f59e0b" },
//       { text: "intelligence", size: 24, color: "#8b5cf6" },
//       { text: "system", size: 20, color: "#06b6d4" },
//       { text: "machine", size: 18, color: "#ec4899" },
//       { text: "learning", size: 16, color: "#84cc16" },
//       { text: "neural", size: 14, color: "#f97316" },
//       { text: "network", size: 12, color: "#6366f1" },
//     ]

//     return (
//       <div className="flex flex-wrap justify-center items-center gap-2 p-4 min-h-[200px]">
//         {words.map((word, index) => (
//           <span
//             key={index}
//             style={{
//               fontSize: `${word.size}px`,
//               color: word.color,
//               fontWeight: word.size > 30 ? "bold" : "normal",
//             }}
//             className="cursor-pointer hover:opacity-80 transition-opacity"
//           >
//             {word.text}
//           </span>
//         ))}
//       </div>
//     )
//   }

//   return (
//     <div className="p-6">
//       {/* Title + Controls */}
//       <div className="flex flex-wrap items-center justify-between mb-6">
//         <h1 className="text-3xl font-bold text-[#3264DF]">Dashboard</h1>

//         <div className="flex items-center gap-3">
//           {/* Dropdown with logo */}
//           <select className="border rounded-lg px-3 py-2">
//             <option>Facebook</option>
//             <option>Instagram</option>
//             <option>Twitter</option>
//           </select>

//           <select className="border rounded-lg px-3 py-2">
//             <option>January</option>
//             <option>February</option>
//             <option>March</option>
//             <option>April</option>
//             <option>May</option>
//             <option>June</option>
//             <option>July</option>
//             <option>August</option>
//             <option>September</option>
//             <option>October</option>
//             <option>November</option>
//             <option>December</option>
//           </select>

//           {/* Buttons with primary color */}
//           <button className="p-2 bg-[#3264DF] text-white rounded-lg hover:bg-blue-700">
//             <Download className="w-5 h-5" />
//           </button>

//           <button className="p-2 bg-[#3264DF] text-white rounded-lg hover:bg-blue-700">
//             <RefreshCcw className="w-5 h-5" />
//           </button>

//           <span className="text-sm text-gray-500">Updated 5 minutes ago</span>
//         </div>
//       </div>

//       {/* Metric Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//         {/* Likes Card */}
//         <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-md">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-indigo-100 rounded-lg">
//               <ThumbsUp className="w-6 h-6 text-indigo-600" />
//             </div>
//             <div>
//               <h2 className="text-gray-500 text-sm">Page Total Likes</h2>
//               <p className="text-2xl font-semibold mt-1">12,345</p>
//             </div>
//           </div>
//           <div className="flex items-center bg-green-100 text-green-600 text-sm px-2 py-1 rounded-full font-medium">
//             <FiTrendingUp className="mr-1" /> +12%
//           </div>
//         </div>

//         {/* Engagement Card */}
//         <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-md">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-green-100 rounded-lg">
//               <MessageSquare className="w-6 h-6 text-green-600" />
//             </div>
//             <div>
//               <h2 className="text-gray-500 text-sm">Engagement Rate</h2>
//               <p className="text-2xl font-semibold mt-1">5.4%</p>
//             </div>
//           </div>
//           <div className="flex items-center bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full font-medium">
//             <FiTrendingDown className="mr-1" /> -8%
//           </div>
//         </div>

//         {/* CTR Card */}
//         <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-md">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-yellow-100 rounded-lg">
//               <Share2 className="w-6 h-6 text-yellow-600" />
//             </div>
//             <div>
//               <h2 className="text-gray-500 text-sm">Click Through Rate</h2>
//               <p className="text-2xl font-semibold mt-1">2.8%</p>
//             </div>
//           </div>
//           <div className="flex items-center bg-green-100 text-green-600 text-sm px-2 py-1 rounded-full font-medium">
//             <FiTrendingUp className="mr-1" /> +5%
//           </div>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* ROI Line Chart */}
//         <div className="bg-white p-6 rounded-2xl shadow-md">
//           <h2 className="text-lg font-semibold mb-4">ROI Over Time</h2>
//           <LineChart width={500} height={300} data={roiData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" label={{ value: "Months", position: "insideBottom", offset: -5 }} />
//             <YAxis
//               tickFormatter={(value) => `${value}%`}
//               label={{
//                 value: "ROI (%)",
//                 angle: -90,
//                 position: "insideLeft",
//                 offset: 10,
//               }}
//             />
//             <Tooltip formatter={(value) => `${value}%`} />
//             <Legend />
//             <Line type="monotone" dataKey="roi" stroke="#3264DF" />
//           </LineChart>
//         </div>

//         {/* Donut Chart */}
//         <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center">
//           <h2 className="text-lg font-semibold mb-4">Content Interactions Breakdown</h2>
//           <PieChart width={300} height={300}>
//             <Pie
//               data={interactionData}
//               cx="50%"
//               cy="50%"
//               innerRadius={60}
//               outerRadius={100}
//               dataKey="value"
//               labelLine={false}
//               label={({ name, value }) => `${value}%`}
//             >
//               {interactionData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip formatter={(value) => `${value}%`} />
//             <Legend />
//           </PieChart>
//         </div>
//       </div>

//       {/* AI Insights Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
//         {/* AI Summary */}
//         <div className="bg-white p-6 rounded-2xl shadow-md">
//           <div className="flex items-center gap-2 mb-4">
//             <h2 className="text-lg font-semibold">AI Summary</h2>
//             <span className="text-blue-500">🤖</span>
//           </div>
//           <div className="space-y-4">
//             {aiSummaryData.map((item, index) => (
//               <div key={index} className="space-y-2">
//                 <div className="flex items-center gap-2">
//                   {item.trend === "up" ? (
//                     <ArrowUp className="w-4 h-4 text-green-500" />
//                   ) : (
//                     <ArrowDown className="w-4 h-4 text-red-500" />
//                   )}
//                   <span className="font-medium">{item.metric}</span>
//                   <span
//                     className={`font-bold ${
//                       item.color === "red"
//                         ? "text-red-500"
//                         : item.color === "blue"
//                           ? "text-blue-500"
//                           : item.color === "green"
//                             ? "text-green-500"
//                             : "text-gray-500"
//                     }`}
//                   >
//                     {item.value}
//                   </span>
//                   <span className="text-gray-500 text-sm">{item.reason}</span>
//                 </div>
//                 <div className="flex items-center gap-1 text-xs text-gray-400">
//                   <span>💡</span>
//                   <span>{item.suggestion}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Top Performing Keywords */}
//         <div className="bg-white p-6 rounded-2xl shadow-md">
//           <div className="flex items-center gap-2 mb-4">
//             <h2 className="text-lg font-semibold">Top Performing Keywords</h2>
//             <span className="text-blue-500">🔥</span>
//           </div>

//           {/* Word Cloud */}
//           <WordCloud />

//           {/* Post Engagement Rate */}
//           <div className="mt-6">
//             <h3 className="text-sm font-medium text-gray-600 mb-3">Post Engagement Rate</h3>
//             <div className="space-y-3">
//               {topKeywords.map((keyword, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <span className="text-sm font-medium">{keyword.keyword}</span>
//                   <div className="flex items-center gap-2 flex-1 mx-4">
//                     <div className="flex-1 bg-gray-200 rounded-full h-2">
//                       <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${keyword.engagement}%` }}></div>
//                     </div>
//                     <span className="text-sm text-gray-600 min-w-[35px]">{keyword.engagement}%</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ROI Forecasting */}
//       <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
//         <div className="flex items-center gap-2 mb-4">
//           <h2 className="text-lg font-semibold">ROI Forecasting</h2>
//           <span className="text-blue-500">📊</span>
//         </div>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={roiForecastData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis tickFormatter={(value) => `${value}%`} />
//             <Tooltip formatter={(value) => `${value}%`} />
//             <Legend />
//             <Bar dataKey="current" fill="#3264DF" name="2024" />
//             <Bar dataKey="upcoming" fill="#769BF4" name="2025" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* AI Content Scoring and AI Analysis */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
//         {/* AI Content Scoring */}
//         <div className="bg-white p-6 rounded-2xl shadow-md">
//           <div className="flex items-center gap-2 mb-4">
//             <h2 className="text-lg font-semibold">AI Content Scoring</h2>
//             <span className="text-blue-500">🎯</span>
//           </div>
//           <p className="text-sm text-gray-500 mb-4">Top 5 posts by Engagement last month (click to view score)</p>
//           <div className="space-y-3">
//             {contentScoring.map((post, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
//               >
//                 <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-sm font-medium">
//                   {index + 1}
//                 </div>
//                 <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium">{post.content}</p>
//                   <p className="text-xs text-gray-500">{post.date}</p>
//                 </div>
//                 <div className="text-right">
//                   <span className="text-lg font-bold text-blue-600">{post.score}%</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* AI Analysis */}
//         <div className="bg-white p-6 rounded-2xl shadow-md">
//           <div className="flex items-center gap-2 mb-4">
//             <h2 className="text-lg font-semibold">AI Content Scoring</h2>
//           </div>

//           {/* Radar Chart */}
//           <ResponsiveContainer width="100%" height={200}>
//             <RadarChart data={radarData}>
//               <PolarGrid />
//               <PolarAngleAxis dataKey="attribute" />
//               <PolarRadiusAxis angle={90} domain={[0, 100]} />
//               <Radar name="AI Analysis" dataKey="value" stroke="#3264DF" fill="#3264DF" fillOpacity={0.3} />
//             </RadarChart>
//           </ResponsiveContainer>

//           {/* Analysis Metrics */}
//           <div className="mt-4 space-y-2">
//             <div className="flex justify-between items-center py-2 border-b">
//               <span className="text-sm text-gray-600">Creativity</span>
//               <div className="w-32 bg-gray-200 rounded-full h-2">
//                 <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
//               </div>
//             </div>
//             <div className="flex justify-between items-center py-2 border-b">
//               <span className="text-sm text-gray-600">Grammar & Language</span>
//               <div className="w-32 bg-gray-200 rounded-full h-2">
//                 <div className="bg-blue-500 h-2 rounded-full" style={{ width: "90%" }}></div>
//               </div>
//             </div>
//             <div className="flex justify-between items-center py-2 border-b">
//               <span className="text-sm text-gray-600">Visual Potential</span>
//               <div className="w-32 bg-gray-200 rounded-full h-2">
//                 <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }}></div>
//               </div>
//             </div>
//             <div className="flex justify-between items-center py-2">
//               <span className="text-sm text-gray-600">Visual Quality</span>
//               <div className="w-32 bg-gray-200 rounded-full h-2">
//                 <div className="bg-blue-500 h-2 rounded-full" style={{ width: "80%" }}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard
import DashboardHeader from "../components/dashboardComponent/DashboardHeader";
import MetricCards from "../components/dashboardComponent/MetricCards";
import ChartsSection from "../components/dashboardComponent/ChartsSection";
import AIInsights from "../components/dashboardComponent/AIInsights";
import ROIForecasting from "../components/dashboardComponent/ROIForecasting";
import AIContentSection from "../components/dashboardComponent/AIContentSection";

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader />

      {/* Only the main content is wrapped for screenshot */}
      <div id="dashboard">
        <MetricCards />
        <ChartsSection />
        <AIInsights />
        <ROIForecasting />
        <AIContentSection />
      </div>
    </div>
  );
};

export default Dashboard;


