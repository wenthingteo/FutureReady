import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import { TrendingUp, Sparkles, Target } from "lucide-react"

const ROIForecasting = () => {
  const roiForecastData = [
    { month: "Jan", current: 25, upcoming: 12 },
    { month: "Feb", current: 18, upcoming: 10 },
    { month: "Mar", current: 22, upcoming: 30 },
    { month: "Apr", current: 25, upcoming: 35 },
    { month: "May", current: 20, upcoming: 25 },
    { month: "Jun", current: 28, upcoming: 35 },
    { month: "Jul", current: 30, upcoming: 38 },
    { month: "Aug", current: 26, upcoming: 50 },
    { month: "Sep", current: 32, upcoming: 45 },
    { month: "Oct", current: 28, upcoming: 60 },
    { month: "Nov", current: 35, upcoming: 66 },
    { month: "Dec", current: 38, upcoming: 70 },
  ]

  const averageGrowth = 28.5;
  const predictedGrowth = 42.3;

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/30 p-8 rounded-3xl shadow-sm border border-gray-100/50 mt-6 overflow-hidden relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-violet-400 to-indigo-400 rounded-full blur-3xl"></div>
      </div>

      {/* Header with improved styling */}
      <div className="relative mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Future Growth</h2>
              </div>
              <div className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                Predictive Analytics
              </div>
            </div>
          </div>        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-white/50">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600 font-medium">Current Average</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{averageGrowth}%</p>
            <p className="text-xs text-gray-500 mt-1">ROI this year</p>
          </div>
          
          <div className="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 backdrop-blur-sm p-4 rounded-2xl border border-violet-200/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-sm text-violet-700 font-medium">Predicted Growth</span>
            </div>
            <p className="text-2xl font-bold text-violet-700">{predictedGrowth}%</p>
            <p className="text-xs text-violet-600 mt-1">Expected next year</p>
          </div>

          <div className="bg-amber-50/70 backdrop-blur-sm p-4 rounded-2xl border border-amber-200/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-700 font-medium">Growth Rate</span>
            </div>
            <p className="text-2xl font-bold text-amber-700">+{(predictedGrowth - averageGrowth).toFixed(1)}%</p>
            <p className="text-xs text-amber-600 mt-1">Year over year</p>
          </div>
        </div>
      </div>

      {/* Enhanced chart */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={roiForecastData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="currentBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="upcomingBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#e6a607ff" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 4" stroke="#e2e8f0" strokeOpacity={0.3} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              tickFormatter={(value) => `${value}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip 
              formatter={(value, name) => [`${value}%`, name === 'current' ? '2024' : '2025']}
              labelStyle={{ color: '#374151', fontWeight: 600 }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="rect"
              formatter={(value) => <span style={{ color: '#64748b', fontWeight: 500 }}>{value === 'current' ? '2024' : '2025'}</span>}
            />
            <Bar 
              dataKey="current" 
              fill="url(#currentBar)" 
              name="current"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar 
              dataKey="upcoming" 
              fill="url(#upcomingBar)" 
              name="upcoming"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom insight */}
      <div className="mt-6 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1">AI Insight</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Based on current trends, your ROI is projected to increase significantly in Q4 2025. 
              <span className="font-medium text-orange-600"> Consider scaling content production</span> during high-performing months.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ROIForecasting
