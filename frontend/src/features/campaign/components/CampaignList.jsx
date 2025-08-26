import React from 'react';
import CampaignCard from './CampaignCard';

const CampaignList = ({ campaigns, filters, onEdit, onDuplicate, onDelete }) => {
  // Filter campaigns based on filters
  const filteredCampaigns = React.useMemo(() => {
    return campaigns.filter(campaign => {
      // Status filter
      if (filters.status !== 'all' && campaign.status !== filters.status) {
        return false;
      }

      // Platform filter
      if (filters.platform !== 'all' && !campaign.platforms?.includes(filters.platform)) {
        return false;
      }

      // Search filter
      if (filters.search && !campaign.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Date range filter (simplified implementation)
      if (filters.dateRange !== 'all') {
        const campaignDate = new Date(campaign.createdAt);
        const now = new Date();
        
        switch (filters.dateRange) {
          case 'today':
            return campaignDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return campaignDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return campaignDate >= monthAgo;
          default:
            return true;
        }
      }

      return true;
    });
  }, [campaigns, filters]);

  if (filteredCampaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
        <p className="text-gray-600">
          {campaigns.length === 0 
            ? "You haven't created any campaigns yet." 
            : "Try adjusting your filters to see more results."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredCampaigns.length} of {campaigns.length} campaigns
        </p>
        
        {/* Sort options */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select className="text-sm border border-gray-300 rounded px-2 py-1">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="name">Name A-Z</option>
            <option value="status">Status</option>
            <option value="performance">Performance</option>
          </select>
        </div>
      </div>

      {/* Campaigns grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map(campaign => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onEdit={() => onEdit(campaign)}
            onDuplicate={() => onDuplicate(campaign)}
            onDelete={() => onDelete(campaign.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
