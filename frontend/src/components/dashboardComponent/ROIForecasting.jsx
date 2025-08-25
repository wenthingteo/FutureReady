import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

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

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold text-gray-800">ROI Forecasting</h2>
        <span className="text-xl">📊</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={roiForecastData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Bar dataKey="current" fill="#3264DF" name="2024" />
          <Bar dataKey="upcoming" fill="#769BF4" name="2025" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ROIForecasting
