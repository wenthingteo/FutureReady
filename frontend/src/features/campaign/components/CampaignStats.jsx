import React from 'react';
import { TrendingUp, Users, Target, Calendar, Eye, Share2, Heart, MessageCircle } from 'lucide-react';

const CampaignStats = ({ campaigns }) => {
  // Calculate stats from campaigns
  const stats = React.useMemo(() => {
    const totalCampaigns = campaigns.length;
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    const totalReach = campaigns.reduce((sum, c) => sum + (c.reach || 0), 0);
    const totalEngagement = campaigns.reduce((sum, c) => sum + (c.engagement || 0), 0);
    const avgEngagement = totalCampaigns > 0 ? (totalEngagement / totalCampaigns).toFixed(1) : 0;

    return {
      totalCampaigns,
      activeCampaigns,
      totalReach,
      avgEngagement
    };
  }, [campaigns]);

  const statCards = [
    {
      title: 'Total Campaigns',
      value: stats.totalCampaigns,
      icon: Target,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Campaigns',
      value: stats.activeCampaigns,
      icon: Calendar,
      color: 'bg-green-500',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Total Reach',
      value: stats.totalReach.toLocaleString(),
      icon: Users,
      color: 'bg-purple-500',
      change: '+18%',
      changeType: 'positive'
    },
    {
      title: 'Avg Engagement',
      value: `${stats.avgEngagement}%`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+8%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </div>
            </div>
            
            <div className="mb-2">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CampaignStats;
