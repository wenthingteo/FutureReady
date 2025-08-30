import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Play, Hash, FileText, Image, Sparkles, ArrowRight } from 'lucide-react';
import { AdsGenerationOverlay } from './AdsGenerationOverlay';

const CampaignSelectionStep = ({
  campaignData,
  setCampaignData,
  isScheduling,
  schedulingMode,
  schedulingData,
  handleScheduleAll,
  onNext // Add this prop to handle navigation to next step
}) => {
  const [contentSearch, setContentSearch] = useState('');
  const [contentFilter, setContentFilter] = useState('All');
  const [contentSort, setContentSort] = useState('Recent');
  
  // States for ads generation overlay
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Sample content ideas from ideation
  const sampleContentIdeas = [
    {
      id: 1,
      title: "🚀 5 AI Tools That Will Revolutionize Your Workflow",
      description: "Discover cutting-edge AI tools that are transforming how modern businesses operate and scale in 2024",
      type: "Video",
      contentType: "video",
      tags: ["AI", "Productivity", "Innovation"],
      image: "/src/assets/random_photos/random_photo_1.jpg",
      duration: "5:42",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "✨ The Magic Behind Our Creative Process",
      description: "An intimate look at how we transform wild ideas into stunning visual experiences that captivate audiences",
      type: "Behind-the-scenes",
      contentType: "image",
      tags: ["Design", "Creativity", "Process"],
      image: "/src/assets/random_photos/random_photo_2.jpg",
      createdAt: "2024-01-14"
    },
    {
      id: 3,
      title: "Monday Motivation: You've Got This! 💪 #MondayMotivation #Hustle #Success #Entrepreneur #Mindset #Goals #Inspiration #WorkHard #DreamBig #NeverGiveUp",
      description: "Quick motivational post to kickstart the week with positive energy and determination",
      type: "Social Post",
      contentType: "hashtag",
      tags: ["Motivation", "Monday", "Inspiration"],
      hashtags: ["MondayMotivation", "Hustle", "Success", "Entrepreneur", "Mindset", "Goals", "Inspiration", "WorkHard", "DreamBig", "NeverGiveUp"],
      createdAt: "2024-01-13"
    },
    {
      id: 4,
      title: "💡 10 Engagement Hacks That Actually Work",
      description: "Proven tactics that top influencers use to create viral content and build loyal communities. This comprehensive guide covers everything from timing your posts to creating interactive content that sparks conversations.",
      type: "Text Post",
      contentType: "text",
      tags: ["Engagement", "Tips", "Social Media"],
      createdAt: "2024-01-12"
    },
    {
      id: 5,
      title: "🌍 Remote Work Setup Tour",
      description: "Take a virtual tour of our team's amazing home office setups from around the world",
      type: "Video",
      contentType: "video",
      tags: ["Remote", "Setup", "Tour"],
      image: "/src/assets/random_photos/random_photo_3.jpg",
      duration: "3:28",
      createdAt: "2024-01-11"
    },
    {
      id: 6,
      title: "🎨 Brand Transformation That Broke the Internet",
      description: "The complete visual makeover that turned a struggling brand into a social media sensation overnight",
      type: "Case Study",
      contentType: "image",
      tags: ["Branding", "Viral", "Transformation"],
      image: "/src/assets/random_photos/random_photo_4.jpg",
      createdAt: "2024-01-10"
    },
    {
      id: 7,
      title: "Friday feels! 🎉 What's everyone up to this weekend? Drop your plans below! 👇 #FridayFeels #WeekendVibes #Community #Fun #Relax #Adventure #Friends #Family #Plans #Excited",
      description: "Casual Friday engagement post to connect with our community about weekend plans",
      type: "Social Post",
      contentType: "hashtag",
      tags: ["Friday", "Weekend", "Community"],
      hashtags: ["FridayFeels", "WeekendVibes", "Community", "Fun", "Relax", "Adventure", "Friends", "Family", "Plans", "Excited"],
      createdAt: "2024-01-09"
    },
    {
      id: 8,
      title: "The Psychology of Color in Marketing",
      description: "Understanding how different colors influence consumer behavior and purchasing decisions. Learn which colors work best for different industries and how to create emotional connections through your brand palette.",
      type: "Educational",
      contentType: "text",
      tags: ["Psychology", "Marketing", "Color Theory"],
      createdAt: "2024-01-08"
    }
  ];

  // Filter and sort content ideas
  const getFilteredAndSortedContent = () => {
    let filtered = sampleContentIdeas;

    // Apply search filter
    if (contentSearch.trim()) {
      filtered = filtered.filter(content =>
        content.title.toLowerCase().includes(contentSearch.toLowerCase()) ||
        content.description.toLowerCase().includes(contentSearch.toLowerCase()) ||
        content.tags.some(tag => tag.toLowerCase().includes(contentSearch.toLowerCase()))
      );
    }

    // Apply type filter
    if (contentFilter !== 'All') {
      filtered = filtered.filter(content => content.type === contentFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (contentSort) {
        case 'Recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'Oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'A-Z':
          return a.title.localeCompare(b.title);
        case 'Z-A':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  };

  // Handle generate ads button click
  const handleGenerateAds = () => {
    if (!campaignData.selectedContent) {
      alert('Please select content before generating ads');
      return;
    }

    setIsGenerating(true);
    setIsCompleted(false);
    setGenerationProgress(0);

    // Simulate AI generation progress
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompleted(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  // Handle review button click
  const handleReview = () => {
    setIsGenerating(false);
    setIsCompleted(false);
    setGenerationProgress(0);
    
    // Navigate to next step (ads review/customization page)
    if (onNext) {
      onNext();
    }
  };

  // Handle close overlay
  const handleCloseOverlay = () => {
    setIsGenerating(false);
    setIsCompleted(false);
    setGenerationProgress(0);
  };

  const contentTypes = ['All', ...new Set(sampleContentIdeas.map(content => content.type))];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-4 mb-8">
          <h3 className="text-3xl font-normal text-gray-800 tracking-tight">Choose Your Content</h3>
        </div>
        <p className="text-gray-600 text-base max-w-lg mx-auto leading-relaxed">Select from your drafted ideas or skip to create new content</p>
      </div>

      {/* Search, Filter, Sort Controls */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search content ideas..."
              value={contentSearch}
              onChange={(e) => setContentSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF]/30 text-sm"
            />
          </div>

          <div className="flex gap-3">
            {/* Filter */}
            <div className="relative">
              <select
                value={contentFilter}
                onChange={(e) => setContentFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF]/30"
              >
                {contentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={contentSort}
                onChange={(e) => setContentSort(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF]/30"
              >
                <option value="Recent">Recent</option>
                <option value="Oldest">Oldest</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {getFilteredAndSortedContent().length === 0 ? (
          <div className="col-span-full text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-gray-400 text-xl mb-2">No content found</div>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          getFilteredAndSortedContent().map((content) => (
            <button
              key={content.id}
              type="button"
              onClick={() => setCampaignData({ ...campaignData, selectedContent: content })}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:rotate-1 ${
                campaignData.selectedContent?.id === content.id
                  ? 'ring-4 ring-[#3264DF]/20 shadow-2xl'
                  : 'hover:shadow-xl'
              }`}
            >
              {/* Header Section - varies by content type */}
              {content.contentType === 'text' ? (
                // Text-only content - no image, more text space
                <div className={`relative h-48 flex items-center justify-center transition-all duration-300 ${
                  campaignData.selectedContent?.id === content.id
                    ? 'bg-gradient-to-br from-[#3264DF]/10 to-blue-100'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-gray-100 group-hover:to-gray-200'
                }`}>
                  <div className="text-center p-8">
                    <FileText className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${
                      campaignData.selectedContent?.id === content.id ? 'text-[#3264DF]' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    <div className="text-sm text-gray-500 font-medium">Text Content</div>
                  </div>
                </div>
              ) : content.contentType === 'hashtag' ? (
                // Hashtag content - colorful background with hashtag pattern
                <div className={`relative h-48 overflow-hidden transition-all duration-300 ${
                  campaignData.selectedContent?.id === content.id
                    ? 'bg-gradient-to-br from-[#3264DF]/20 to-purple-100'
                    : 'bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 group-hover:from-pink-200 group-hover:to-blue-200'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Hash className={`w-20 h-20 transition-all duration-300 ${
                      campaignData.selectedContent?.id === content.id ? 'text-[#3264DF]/60' : 'text-purple-300 group-hover:text-purple-400'
                    }`} />
                  </div>
                  {/* Floating hashtags */}
                  <div className="absolute inset-0 overflow-hidden">
                    {content.hashtags?.slice(0, 6).map((hashtag, index) => (
                      <span
                        key={index}
                        className={`absolute text-xs font-medium opacity-30 transition-all duration-500 ${
                          index === 0 ? 'top-4 left-4' :
                          index === 1 ? 'top-8 right-8' :
                          index === 2 ? 'bottom-16 left-8' :
                          index === 3 ? 'bottom-8 right-4' :
                          index === 4 ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' :
                          'top-1/3 right-1/3'
                        } ${campaignData.selectedContent?.id === content.id ? 'text-[#3264DF]' : 'text-purple-600'}`}
                        style={{
                          transform: `rotate(${(index - 2) * 15}deg)`,
                        }}
                      >
                        #{hashtag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                // Image/Video content - traditional image with overlay
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={content.image}
                    alt={content.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Video play overlay */}
                  {content.contentType === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                        campaignData.selectedContent?.id === content.id
                          ? 'bg-[#3264DF]/80'
                          : 'bg-black/50 group-hover:bg-black/70'
                      }`}>
                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                    campaignData.selectedContent?.id === content.id ? 'from-[#3264DF]/90 via-[#3264DF]/30' : ''
                  }`} />
                  
                  {/* Duration for videos */}
                  {content.duration && (
                    <div className="absolute bottom-4 right-4">
                      <span className="px-2 py-1 text-xs font-medium bg-black/70 text-white rounded backdrop-blur-sm">
                        {content.duration}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Content Type Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1.5 text-xs font-semibold rounded-full backdrop-blur-sm border transition-all duration-300 flex items-center gap-1 ${
                  campaignData.selectedContent?.id === content.id
                    ? 'bg-white/90 text-[#3264DF] border-white/50'
                    : content.contentType === 'hashtag' 
                      ? 'bg-purple-500/80 text-white border-purple-300/50'
                      : content.contentType === 'text'
                        ? 'bg-gray-600/80 text-white border-gray-300/50'
                        : 'bg-black/30 text-white border-white/20 group-hover:bg-white/20'
                }`}>
                  {content.contentType === 'video' && <Play className="w-3 h-3" />}
                  {content.contentType === 'hashtag' && <Hash className="w-3 h-3" />}
                  {content.contentType === 'text' && <FileText className="w-3 h-3" />}
                  {content.contentType === 'image' && <Image className="w-3 h-3" />}
                  {content.type}
                </span>
              </div>

              {/* Selection Indicator */}
              {campaignData.selectedContent?.id === content.id && (
                <div className="absolute top-4 left-4">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-4 h-4 bg-[#3264DF] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Section */}
              <div className={`relative p-6 text-left transition-all duration-300 ${
                campaignData.selectedContent?.id === content.id
                  ? 'bg-gradient-to-br from-[#3264DF]/5 to-blue-50'
                  : 'bg-white group-hover:bg-gray-50/50'
              }`}>
                {/* Title */}
                <h4 className={`font-bold text-xl mb-3 transition-colors duration-300 ${
                  content.contentType === 'hashtag' ? 'line-clamp-1' : 'line-clamp-2'
                } ${
                  campaignData.selectedContent?.id === content.id ? 'text-[#3264DF]' : 'text-gray-900 group-hover:text-gray-800'
                }`}>
                  {content.title}
                </h4>

                {/* Description */}
                <p className={`text-gray-600 text-sm mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 ${
                  content.contentType === 'text' ? 'line-clamp-3' : 'line-clamp-2'
                }`}>
                  {content.description}
                </p>

                {/* Tags or Hashtags */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {content.contentType === 'hashtag' ? (
                    // Show actual hashtags for hashtag content
                    content.hashtags?.slice(0, 4).map((hashtag, index) => (
                      <span 
                        key={index} 
                        className={`text-xs px-2 py-1 rounded-full font-medium transition-all duration-300 ${
                          campaignData.selectedContent?.id === content.id
                            ? 'bg-[#3264DF]/10 text-[#3264DF] border border-[#3264DF]/20'
                            : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                        }`}
                      >
                        #{hashtag}
                      </span>
                    ))
                  ) : (
                    // Show regular tags for other content
                    content.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index} 
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
                          campaignData.selectedContent?.id === content.id
                            ? 'bg-[#3264DF]/10 text-[#3264DF] border border-[#3264DF]/20'
                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))
                  )}
                  {(content.contentType === 'hashtag' ? content.hashtags?.length > 4 : content.tags.length > 3) && (
                    <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-500">
                      +{content.contentType === 'hashtag' ? content.hashtags.length - 4 : content.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Created Date */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    {new Date(content.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  
                  {/* Hover Indicator */}
                  <div className={`w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
                    campaignData.selectedContent?.id === content.id
                      ? 'bg-[#3264DF] scale-100'
                      : 'bg-gray-200 group-hover:bg-[#3264DF] group-hover:scale-100 scale-0'
                    }`}>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Generate Ads Button */}
      <div className="flex justify-center pt-8">
        <button
          onClick={handleGenerateAds}
          disabled={!campaignData.selectedContent}
          className={`group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 ${
            campaignData.selectedContent
              ? 'bg-gradient-to-r from-[#3264DF] to-purple-600 text-white hover:from-[#2854CC] hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-2xl'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Sparkles className={`w-6 h-6 transition-transform duration-300 ${
            campaignData.selectedContent ? 'group-hover:rotate-12' : ''
          }`} />
          Generate AI Ads
          <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
            campaignData.selectedContent ? 'group-hover:translate-x-1' : ''
          }`} />
          
          {/* Animated background effect */}
          {campaignData.selectedContent && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3264DF]/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          )}
        </button>
      </div>

      {/* Selection Status */}
      {campaignData.selectedContent && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Selected: {campaignData.selectedContent.title.slice(0, 50)}
            {campaignData.selectedContent.title.length > 50 && '...'}
          </div>
        </div>
      )}

      {/* Ads Generation Overlay */}
      <AdsGenerationOverlay
        isGenerating={isGenerating}
        isCompleted={isCompleted}
        generationProgress={generationProgress}
        onReview={handleReview}
        onClose={handleCloseOverlay}
      />
    </div>
  );
};

export default CampaignSelectionStep;