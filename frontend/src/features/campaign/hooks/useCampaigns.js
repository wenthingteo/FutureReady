import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockCampaigns = [
  {
    id: '1',
    name: 'Summer Product Launch',
    description: 'Launch campaign for our new summer collection',
    status: 'active',
    platforms: ['instagram', 'facebook'],
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    budget: 5000,
    targetAudience: 'Young professionals, 25-35',
    goals: 'Increase brand awareness and drive sales',
    reach: 25000,
    engagement: 4.2,
    conversions: 150,
    createdAt: '2024-05-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Holiday Special',
    description: 'Holiday season promotional campaign',
    status: 'draft',
    platforms: ['instagram', 'facebook', 'linkedin'],
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    budget: 8000,
    targetAudience: 'Families and gift shoppers',
    goals: 'Boost holiday sales and customer acquisition',
    reach: 0,
    engagement: 0,
    conversions: 0,
    createdAt: '2024-10-01T14:30:00Z'
  },
  {
    id: '3',
    name: 'Brand Awareness',
    description: 'General brand awareness campaign',
    status: 'completed',
    platforms: ['youtube', 'tiktok'],
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    budget: 3000,
    targetAudience: 'Gen Z and Millennials',
    goals: 'Increase brand recognition and social media following',
    reach: 45000,
    engagement: 6.8,
    conversions: 89,
    createdAt: '2024-02-15T09:15:00Z'
  }
];

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    platform: 'all',
    dateRange: 'all',
    search: ''
  });
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Load campaigns on mount
  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCampaigns(mockCampaigns);
        setError(null);
      } catch (err) {
        setError('Failed to load campaigns');
        console.error('Error loading campaigns:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  // Add new campaign
  const addCampaign = (campaignData) => {
    const newCampaign = {
      ...campaignData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      reach: 0,
      engagement: 0,
      conversions: 0
    };
    setCampaigns(prev => [newCampaign, ...prev]);
  };

  // Update existing campaign
  const updateCampaign = (id, campaignData) => {
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === id 
          ? { ...campaign, ...campaignData }
          : campaign
      )
    );
  };

  // Delete campaign
  const deleteCampaign = (id) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  };

  // Duplicate campaign
  const duplicateCampaign = (campaign) => {
    const duplicatedCampaign = {
      ...campaign,
      id: Date.now().toString(),
      name: `${campaign.name} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      reach: 0,
      engagement: 0,
      conversions: 0
    };
    setCampaigns(prev => [duplicatedCampaign, ...prev]);
  };

  // Get campaign by ID
  const getCampaignById = (id) => {
    return campaigns.find(campaign => campaign.id === id);
  };

  // Filter campaigns based on current filters
  const getFilteredCampaigns = () => {
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

      // Date range filter
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
  };

  return {
    campaigns,
    loading,
    error,
    filters,
    setFilters,
    selectedCampaign,
    setSelectedCampaign,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    duplicateCampaign,
    getCampaignById,
    getFilteredCampaigns
  };
};
