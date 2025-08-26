import React from 'react';
import CampaignHeader from './CampaignHeader';
import CampaignStats from './CampaignStats';
import CampaignFilters from './CampaignFilters';
import CampaignList from './CampaignList';
import CampaignModal from './CampaignModal';
import { useCampaigns } from '../hooks/useCampaigns';
import { useCampaignActions } from '../hooks/useCampaignActions';

const CampaignHub = () => {
  const {
    campaigns,
    loading,
    error,
    filters,
    setFilters,
    selectedCampaign,
    setSelectedCampaign
  } = useCampaigns();

  const {
    createCampaign,
    updateCampaign,
    deleteCampaign,
    duplicateCampaign,
    isModalOpen,
    setIsModalOpen,
    modalMode,
    setModalMode
  } = useCampaignActions();

  const handleCreateCampaign = () => {
    setModalMode('create');
    setSelectedCampaign(null);
    setIsModalOpen(true);
  };

  const handleEditCampaign = (campaign) => {
    setModalMode('edit');
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleDuplicateCampaign = (campaign) => {
    duplicateCampaign(campaign);
  };

  const handleDeleteCampaign = (campaignId) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      deleteCampaign(campaignId);
    }
  };

  const handleSaveCampaign = (campaignData) => {
    if (modalMode === 'create') {
      createCampaign(campaignData);
    } else {
      updateCampaign(selectedCampaign.id, campaignData);
    }
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3264DF]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Campaigns</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <CampaignHeader onCreateCampaign={handleCreateCampaign} />

      {/* Stats Overview */}
      <CampaignStats campaigns={campaigns} />

      {/* Filters */}
      <CampaignFilters 
        filters={filters} 
        onFiltersChange={setFilters} 
      />

      {/* Campaign List */}
      <CampaignList
        campaigns={campaigns}
        filters={filters}
        onEdit={handleEditCampaign}
        onDuplicate={handleDuplicateCampaign}
        onDelete={handleDeleteCampaign}
      />

      {/* Campaign Modal */}
      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCampaign}
        mode={modalMode}
        campaign={selectedCampaign}
      />
    </div>
  );
};

export default CampaignHub;
