// components/adsComponent/LiveMonitoring.jsx
import React, { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, Eye, TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from "lucide-react";

const LiveMonitoring = ({ mockData }) => {
  const [currentKPIIndex, setCurrentKPIIndex] = useState(0);

  // Auto-rotate KPI carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKPIIndex((prev) => (prev + 1) % mockData.platformKPIs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [mockData.platformKPIs.length]);

  const AlertIcon = ({ type }) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Eye className="w-4 h-4 text-blue-500" />;
    }
  };

  const MetricCard = ({ title, value, change, icon, color = "text-gray-600" }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <div className={color}>{icon}</div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      {change && (
        <div className={`flex items-center text-xs ${change > 0 ? "text-green-600" : "text-red-600"}`}>
          {change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {Math.abs(change)}% vs yesterday
        </div>
      )}
    </div>
  );

  const KPICarousel = () => {
    const currentPlatform = mockData.platformKPIs[currentKPIIndex];
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{currentPlatform.platform} Performance</h3>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setCurrentKPIIndex((prev) => (prev === 0 ? mockData.platformKPIs.length - 1 : prev - 1))
              }
              className="p-1 rounded hover:bg-gray-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentKPIIndex((prev) => (prev + 1) % mockData.platformKPIs.length)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#475ECD]">${currentPlatform.spend}</div>
            <div className="text-sm text-gray-600">Spend Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{currentPlatform.clicks.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Clicks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{currentPlatform.roas}x</div>
            <div className="text-sm text-gray-600">ROAS</div>
          </div>
        </div>
        <div className="flex justify-center mt-4 gap-1">
          {mockData.platformKPIs.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentKPIIndex ? "bg-[#475ECD]" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">📊 Live Monitoring</h3>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Active Campaigns" value={mockData.liveMetrics.activeCampaigns} icon="📢" />
        <MetricCard title="Spend Today" value={`$${mockData.liveMetrics.liveSpendToday}`} icon="💰" />
        <MetricCard title="Weekly Spend" value={`$${mockData.liveMetrics.liveSpendWeek}`} icon="📆" />
        <MetricCard title="Conversions" value={mockData.liveMetrics.conversions} icon="🎯" />
      </div>

      {/* Alerts */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
        {mockData.alerts.map((alert, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <AlertIcon type={alert.type} />
            <span className="text-gray-700">{alert.message}</span>
            <span className="ml-auto text-xs text-gray-500">{alert.time}</span>
          </div>
        ))}
      </div>

      {/* KPI Carousel */}
      <KPICarousel />
    </div>
  );
};

export default LiveMonitoring;
