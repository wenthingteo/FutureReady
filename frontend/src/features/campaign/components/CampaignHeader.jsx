import React from 'react';
import { Plus, Filter, Search } from 'lucide-react';

const CampaignHeader = ({ onCreateCampaign }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-[#3264DF] mb-2">Campaign Hub</h1>
        <p className="text-gray-600">Manage and track your marketing campaigns</p>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF] transition-all duration-200"
          />
        </div>

        {/* Filter Button */}
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>

        {/* Create Campaign Button */}
        <button
          onClick={onCreateCampaign}
          className="flex items-center gap-2 px-6 py-2 bg-[#3264DF] text-white rounded-lg hover:bg-[#2952cc] transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </button>
      </div>
    </div>
  );
};

export default CampaignHeader;
