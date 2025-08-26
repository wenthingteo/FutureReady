import React, { useState } from 'react';
import { Hash, Music, Image, Video, X, Plus, Edit3, Instagram, Facebook, Linkedin, Youtube, Zap, Settings } from 'lucide-react';

// Custom TikTok Icon Component
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const ContentEditingStep = ({ formData, onContentUpdate, errors }) => {
  const [activeTab, setActiveTab] = useState(formData.platforms[0] || 'instagram');
  const [editedContent, setEditedContent] = useState({
    // Global content that can be customized per platform
    platformContent: formData.platforms.reduce((acc, platform) => {
      acc[platform] = {
        title: formData.selectedContent?.title || '',
        description: formData.selectedContent?.description || '',
        hashtags: formData.selectedContent?.hashtags || formData.selectedContent?.tags || [],
        media: formData.selectedContent?.image ? [formData.selectedContent.image] : [],
        settings: {}
      };
      return acc;
    }, {})
  });

  // Platform-specific options
  const platformOptions = {
    instagram: {
      postTypes: ['Post', 'Reels', 'Story'],
      features: ['hashtags', 'music', 'location']
    },
    facebook: {
      postTypes: ['Post', 'Video', 'Event'],
      features: ['hashtags', 'location', 'feeling']
    },
    linkedin: {
      postTypes: ['Post', 'Article', 'Poll'],
      features: ['hashtags', 'mentions']
    },
    youtube: {
      postTypes: ['Video', 'Short', 'Live'],
      features: ['hashtags', 'music', 'thumbnail']
    },
    tiktok: {
      postTypes: ['Video', 'Live'],
      features: ['hashtags', 'music', 'effects']
    }
  };

  // Sample music tracks for selection
  const musicTracks = [
    { id: 1, name: "Upbeat Corporate", artist: "Audio Library", duration: "2:30" },
    { id: 2, name: "Chill Vibes", artist: "Background Music", duration: "3:15" },
    { id: 3, name: "Motivational", artist: "Inspiring Sounds", duration: "2:45" },
    { id: 4, name: "Tech Beat", artist: "Modern Music", duration: "3:00" },
  ];

  const handleContentChange = (field, value) => {
    const updated = {
      ...editedContent,
      platformContent: {
        ...editedContent.platformContent,
        [activeTab]: {
          ...editedContent.platformContent[activeTab],
          [field]: value
        }
      }
    };
    setEditedContent(updated);
    onContentUpdate(updated);
  };

  const handlePlatformSettingChange = (setting, value) => {
    const updated = {
      ...editedContent,
      platformContent: {
        ...editedContent.platformContent,
        [activeTab]: {
          ...editedContent.platformContent[activeTab],
          settings: {
            ...editedContent.platformContent[activeTab].settings,
            [setting]: value
          }
        }
      }
    };
    setEditedContent(updated);
    onContentUpdate(updated);
  };

  const addHashtag = (newHashtag) => {
    const currentHashtags = editedContent.platformContent[activeTab]?.hashtags || [];
    if (newHashtag && !currentHashtags.includes(newHashtag)) {
      handleContentChange('hashtags', [...currentHashtags, newHashtag]);
    }
  };

  const removeHashtag = (hashtag) => {
    const currentHashtags = editedContent.platformContent[activeTab]?.hashtags || [];
    handleContentChange('hashtags', currentHashtags.filter(h => h !== hashtag));
  };

  const addMedia = () => {
    // In a real app, this would open a file picker
    const newMedia = `/src/assets/random_photos/random_photo_${Math.floor(Math.random() * 4) + 1}.jpg`;
    const currentMedia = editedContent.platformContent[activeTab]?.media || [];
    handleContentChange('media', [...currentMedia, newMedia]);
  };

  const removeMedia = (index) => {
    const currentMedia = editedContent.platformContent[activeTab]?.media || [];
    handleContentChange('media', currentMedia.filter((_, i) => i !== index));
  };

  const getPlatformIcon = (platform) => {
    const platformConfigs = {
      instagram: {
        icon: Instagram,
        gradient: 'from-purple-500 via-pink-500 to-orange-400',
        bgClass: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400'
      },
      facebook: {
        icon: Facebook,
        gradient: 'from-blue-600 to-blue-700',
        bgClass: 'bg-gradient-to-br from-blue-600 to-blue-700'
      },
      linkedin: {
        icon: Linkedin,
        gradient: 'from-blue-700 to-blue-800',
        bgClass: 'bg-gradient-to-br from-blue-700 to-blue-800'
      },
      youtube: {
        icon: Youtube,
        gradient: 'from-red-500 to-red-600',
        bgClass: 'bg-gradient-to-br from-red-500 to-red-600'
      },
      tiktok: {
        icon: TikTokIcon,
        gradient: 'from-black via-red-500 to-white',
        bgClass: 'bg-gradient-to-br from-black via-red-500 to-white'
      }
    };
    return platformConfigs[platform] || { icon: Image, gradient: 'from-gray-500 to-gray-600', bgClass: 'bg-gradient-to-br from-gray-500 to-gray-600' };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 bg-[#3264DF]/80 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-sm">
            3
          </div>
          <h2 className="text-3xl font-normal text-gray-800 tracking-tight">
            Customize Your Content
          </h2>
        </div>
        <p className="text-gray-600 text-base max-w-2xl mx-auto leading-relaxed">
          Edit your content and customize it for each platform with specific settings and features
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Platform Tabs */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            {formData.platforms.map((platform) => {
              const platformConfig = getPlatformIcon(platform.toLowerCase());
              const Icon = platformConfig.icon;
              
              return (
                <button
                  key={platform}
                  onClick={() => setActiveTab(platform)}
                  className={`flex-1 px-6 py-4 flex items-center justify-center gap-3 transition-all duration-200 ${
                    activeTab === platform
                      ? `${platformConfig.bgClass} text-white shadow-lg`
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <div className={`w-6 h-6 rounded ${activeTab === platform ? 'bg-white/20' : platformConfig.bgClass} flex items-center justify-center`}>
                    <Icon className={`w-3 h-3 ${activeTab === platform ? 'text-white' : 'text-white'}`} />
                  </div>
                  <span className="font-medium">{platform}</span>
                </button>
              );
            })}
          </div>

          {/* Active Platform Content */}
          <div className="p-8">
            {editedContent.platformContent[activeTab] && (
              <div className="space-y-8">
                {/* Platform Header */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                  </div>
                  <p className="text-gray-600 text-sm">
                    {activeTab.toLowerCase() === 'instagram' && "Perfect for visual storytelling with hashtags and music"}
                    {activeTab.toLowerCase() === 'facebook' && "Great for community engagement and sharing experiences"}
                    {activeTab.toLowerCase() === 'linkedin' && "Professional networking and thought leadership content"}
                    {activeTab.toLowerCase() === 'youtube' && "Video-first platform for tutorials and entertainment"}
                    {activeTab.toLowerCase() === 'tiktok' && "Short-form viral content with trending sounds"}
                  </p>
                </div>

                {/* Content Editing */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Content */}
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={editedContent.platformContent[activeTab]?.title || ''}
                        onChange={(e) => handleContentChange('title', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF] transition-all duration-200"
                        placeholder={`Enter your ${activeTab} title...`}
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={editedContent.platformContent[activeTab]?.description || ''}
                        onChange={(e) => handleContentChange('description', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF] transition-all duration-200 resize-none"
                        placeholder={
                          activeTab.toLowerCase() === 'instagram' ? "Share your story with engaging visuals and hashtags..." :
                          activeTab.toLowerCase() === 'linkedin' ? "Share professional insights and engage your network..." :
                          activeTab.toLowerCase() === 'facebook' ? "Connect with your community and share experiences..." :
                          activeTab.toLowerCase() === 'youtube' ? "Describe your video content and engage viewers..." :
                          activeTab.toLowerCase() === 'tiktok' ? "Create viral content with trending sounds..." :
                          `Write your ${activeTab} content...`
                        }
                      />
                      
                      {/* Character Count */}
                      <div className="mt-2 flex justify-between items-center text-xs">
                        <div className="text-gray-500">
                          {(editedContent.platformContent[activeTab]?.description || '').length} characters
                        </div>
                        <div className="text-gray-500">
                          {activeTab.toLowerCase() === 'instagram' && 'Max: 2,200'}
                          {activeTab.toLowerCase() === 'facebook' && 'Max: 63,206'}
                          {activeTab.toLowerCase() === 'linkedin' && 'Max: 3,000'}
                          {activeTab.toLowerCase() === 'youtube' && 'Max: 5,000'}
                          {activeTab.toLowerCase() === 'tiktok' && 'Max: 2,200'}
                        </div>
                      </div>
                    </div>

                    {/* Hashtags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hashtags</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {(editedContent.platformContent[activeTab]?.hashtags || []).map((hashtag, index) => (
                          <span
                            key={index}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${
                              getPlatformIcon(activeTab.toLowerCase()).bgClass.includes('instagram') 
                                ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200'
                                : getPlatformIcon(activeTab.toLowerCase()).bgClass.includes('blue')
                                  ? 'bg-blue-100 text-blue-700 border-blue-200'
                                  : getPlatformIcon(activeTab.toLowerCase()).bgClass.includes('red')
                                    ? 'bg-red-100 text-red-700 border-red-200'
                                    : 'bg-[#3264DF]/10 text-[#3264DF] border-[#3264DF]/20'
                            }`}
                          >
                            #{hashtag}
                            <button
                              onClick={() => removeHashtag(hashtag)}
                              className="hover:scale-110 transition-transform"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Add hashtag and press Enter..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF] transition-all duration-200"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addHashtag(e.target.value.replace('#', ''));
                            e.target.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Right Column - Media & Settings */}
                  <div className="space-y-6">
                    {/* Media */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Media</label>
                      <div className="grid grid-cols-2 gap-4">
                        {(editedContent.platformContent[activeTab]?.media || []).map((mediaUrl, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={mediaUrl}
                              alt={`Media ${index + 1}`}
                              className="w-full h-32 object-cover rounded-xl border border-gray-200"
                            />
                            <button
                              onClick={() => removeMedia(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        
                        {/* Add Media Button */}
                        <button
                          onClick={addMedia}
                          className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:border-[#3264DF] hover:text-[#3264DF] transition-all duration-200"
                        >
                          <Plus className="w-6 h-6 mb-2" />
                          <span className="text-sm">Add Media</span>
                        </button>
                      </div>
                    </div>

                    {/* Platform-Specific Settings */}
                    <div className={`p-4 rounded-xl border-2 ${
                      activeTab.toLowerCase() === 'instagram' ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50' :
                      activeTab.toLowerCase() === 'facebook' ? 'border-blue-200 bg-blue-50' :
                      activeTab.toLowerCase() === 'linkedin' ? 'border-blue-300 bg-blue-50' :
                      activeTab.toLowerCase() === 'youtube' ? 'border-red-200 bg-red-50' :
                      activeTab.toLowerCase() === 'tiktok' ? 'border-pink-200 bg-gradient-to-br from-black/5 to-pink-50' :
                      'border-gray-200 bg-gray-50'
                    }`}>
                      <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        {activeTab} Settings
                      </h4>
                      
                      {/* Content Type */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                        <div className="flex flex-wrap gap-2">
                          {platformOptions[activeTab.toLowerCase()]?.postTypes.map((type) => (
                            <button
                              key={type}
                              onClick={() => handlePlatformSettingChange('postType', type)}
                              className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                                editedContent.platformContent[activeTab]?.settings?.postType === type
                                  ? `${getPlatformIcon(activeTab.toLowerCase()).bgClass} text-white border-transparent`
                                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Additional Settings */}
                      {platformOptions[activeTab.toLowerCase()]?.features.includes('music') && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Music</label>
                          <select
                            value={editedContent.platformContent[activeTab]?.settings?.music || ''}
                            onChange={(e) => handlePlatformSettingChange('music', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF]"
                          >
                            <option value="">No music</option>
                            {musicTracks.map((track) => (
                              <option key={track.id} value={track.id}>
                                {track.name} - {track.artist}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {platformOptions[activeTab.toLowerCase()]?.features.includes('location') && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                          <input
                            type="text"
                            value={editedContent.platformContent[activeTab]?.settings?.location || ''}
                            onChange={(e) => handlePlatformSettingChange('location', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF]"
                            placeholder="Add location..."
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>



        {/* Error Display */}
        {errors.content && (
          <div className="bg-red-50/70 border border-red-200/50 text-red-600 px-6 py-4 rounded-xl text-center">
            {errors.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentEditingStep;
