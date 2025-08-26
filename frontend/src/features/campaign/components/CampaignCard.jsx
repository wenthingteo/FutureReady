import React from 'react';
import { MoreVertical, Edit, Copy, Trash2, Eye, Calendar, Users, TrendingUp } from 'lucide-react';

const CampaignCard = ({ campaign, onEdit, onDuplicate, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      instagram: '📸',
      facebook: '📘',
      linkedin: '💼',
      youtube: '📺',
      tiktok: '🎵'
    };
    return icons[platform] || '🌐';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-[#3264DF]/20">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {campaign.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {campaign.description}
          </p>
        </div>
        
        {/* Actions Menu */}
        <div className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="py-1">
              <button
                onClick={onEdit}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={onDuplicate}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Copy className="w-4 h-4" />
                Duplicate
              </button>
              <button
                onClick={onDelete}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Status and Platforms */}
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
          {campaign.status}
        </span>
        
        <div className="flex items-center gap-1">
          {campaign.platforms?.slice(0, 3).map(platform => (
            <span key={platform} className="text-lg">
              {getPlatformIcon(platform)}
            </span>
          ))}
          {campaign.platforms?.length > 3 && (
            <span className="text-xs text-gray-500">+{campaign.platforms.length - 3}</span>
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 bg-blue-100 rounded-lg">
            <Eye className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-sm font-semibold text-gray-900">
            {campaign.reach?.toLocaleString() || '0'}
          </div>
          <div className="text-xs text-gray-600">Reach</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 bg-green-100 rounded-lg">
            <Users className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-sm font-semibold text-gray-900">
            {campaign.engagement?.toFixed(1) || '0'}%
          </div>
          <div className="text-xs text-gray-600">Engagement</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 bg-purple-100 rounded-lg">
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-sm font-semibold text-gray-900">
            {campaign.conversions || '0'}
          </div>
          <div className="text-xs text-gray-600">Conversions</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date(campaign.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <button
          onClick={onEdit}
          className="text-sm text-[#3264DF] hover:text-[#2952cc] font-medium transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;
