import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts"

const ChartsSection = () => {
  const roiData = [
    { month: "Jan", roi: 20 },
    { month: "Feb", roi: 30 },
    { month: "Mar", roi: 25 },
    { month: "Apr", roi: 40 },
    { month: "May", roi: 50 },
    { month: "Jun", roi: 45 },
    { month: "Jul", roi: 60 },
    { month: "Aug", roi: 55 },
    { month: "Sep", roi: 70 },
    { month: "Oct", roi: 65 },
    { month: "Nov", roi: 80 },
    { month: "Dec", roi: 75 },
  ]

  const interactionData = [
    { name: "Likes", value: 70 },
    { name: "Comments", value: 20 },
    { name: "Shares", value: 10 },
  ]

  const COLORS = ["#3264DF", "#769BF4", "#ADC7F7"]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ROI Line Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold text-gray-800">ROI Over Time</h2>
          <span className="text-blue-500">💹</span>
        </div>
        <LineChart width={500} height={300} data={roiData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" label={{ value: "Months", position: "insideBottom", offset: -5 }} />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            label={{
              value: "ROI (%)",
              angle: -90,
              position: "insideLeft",
              offset: 10,
            }}
          />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Line type="monotone" dataKey="roi" stroke="#3264DF" />
        </LineChart>
      </div>

      {/* Donut Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Content Interactions Breakdown</h2>
          <span className="text-xl">🤖</span>
        </div>
        <div className="flex justify-center">
          <PieChart width={300} height={300}>
            <Pie
              data={interactionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
              labelLine={false}
              label={({ name, value }) => `${value}%`}
            >
              {interactionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  )
}

export default ChartsSection
