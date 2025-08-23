import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Example Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-gray-500 text-sm">Total Campaigns</h2>
          <p className="text-2xl font-semibold mt-2">32</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-gray-500 text-sm">Active Ads</h2>
          <p className="text-2xl font-semibold mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-gray-500 text-sm">New Ideas</h2>
          <p className="text-2xl font-semibold mt-2">8</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-gray-500 text-sm">Pending Tasks</h2>
          <p className="text-2xl font-semibold mt-2">5</p>
        </div>
      </div>

      {/* Example Chart / Recent Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <ul className="space-y-3 text-gray-600">
            <li>✅ New campaign launched</li>
            <li>📊 Ads performance updated</li>
            <li>💡 New idea submitted by John</li>
            <li>📝 Competitor analysis updated</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Create Campaign
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              Add Idea
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
