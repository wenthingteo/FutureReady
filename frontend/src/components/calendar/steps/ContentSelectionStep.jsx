import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Play, Hash, FileText, Image } from 'lucide-react';

const ContentSelectionStep = ({ formData, onContentSelect }) => {
  const [contentSearch, setContentSearch] = useState('');
  const [contentFilter, setContentFilter] = useState('All');
  const [contentSort, setContentSort] = useState('Recent');

  // Sample content ideas from ideation
  const sampleContentIdeas = [
    {
      id: 1,
      title: "🚀 5 Cloud Innovations That Will Transform Enterprise IT",
      description: "Explore groundbreaking cloud technologies that are reshaping how businesses scale and operate in 2024",
      type: "Video",
      contentType: "video",
      tags: ["Cloud", "Scalability", "Innovation"],
      image: "/src/assets/random_photos/random_photo_1.png",
      duration: "5:42",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "✨ Behind the Scenes of Cloud Architecture",
      description: "An inside look at how enterprises design secure and scalable cloud-native systems to support global operations",
      type: "Behind-the-scenes",
      contentType: "image",
      tags: ["Cloud", "Architecture", "DevOps"],
      image: "/src/assets/random_photos/random_photo_2.png",
      createdAt: "2024-01-14"
    },
    {
      id: 3,
      title: "Cloud Tip Tuesday ☁️ Optimize Costs with Smart Scaling #CloudComputing #FinOps #MultiCloud #HybridCloud #DevOps #Kubernetes #Serverless #DataSecurity #CloudOptimization #CostManagement",
      description: "Quick weekly tip on reducing cloud expenses through right-sizing, autoscaling, and smarter resource allocation",
      type: "Social Post",
      contentType: "hashtag",
      tags: ["Cloud", "FinOps", "Optimization"],
      hashtags: ["CloudComputing", "FinOps", "MultiCloud", "HybridCloud", "DevOps", "Kubernetes", "Serverless", "DataSecurity", "CloudOptimization", "CostManagement"],
      createdAt: "2024-01-13"
    },
    {
      id: 4,
      title: "💡 10 Cloud Security Best Practices for 2024",
      description: "Proven strategies to safeguard sensitive data, strengthen compliance, and defend against modern cyber threats in cloud environments",
      type: "Text Post",
      contentType: "text",
      tags: ["Cloud", "Security", "BestPractices"],
      createdAt: "2024-01-12"
    },
    {
      id: 5,
      title: "🌍 Virtual Tour of a Modern Cloud Data Center",
      description: "Step inside the infrastructure powering mission-critical apps with state-of-the-art servers and energy-efficient cooling",
      type: "Video",
      contentType: "video",
      tags: ["Cloud", "DataCenter", "Infrastructure"],
      image: "/src/assets/random_photos/random_photo_3.png",
      duration: "3:28",
      createdAt: "2024-01-11"
    },
    {
      id: 6,
      title: "🎨 Cloud Migration That Transformed a Business",
      description: "A real-world case study of how moving to the cloud unlocked scalability, agility, and significant cost savings",
      type: "Case Study",
      contentType: "image",
      tags: ["Cloud", "Migration", "Transformation"],
      image: "/src/assets/random_photos/random_photo_4.png",
      createdAt: "2024-01-10"
    },
    {
      id: 7,
      title: "Friday Cloud Talk ☁️ What’s Trending This Week? 👇 #CloudTrends #Serverless #Kubernetes #MultiCloud #DataSecurity #HybridCloud #Innovation #Scalability #DevOps #CloudCommunity",
      description: "Community engagement post to spark conversations about the latest cloud trends, tools, and innovations",
      type: "Social Post",
      contentType: "hashtag",
      tags: ["Cloud", "Community", "Trends"],
      hashtags: ["CloudTrends", "Serverless", "Kubernetes", "MultiCloud", "DataSecurity", "HybridCloud", "Innovation", "Scalability", "DevOps", "CloudCommunity"],
      createdAt: "2024-01-09"
    },
    {
      id: 8,
      title: "The Business Value of Multi-Cloud Strategies",
      description: "Learn why leading enterprises adopt multi-cloud setups, how they boost resilience, and what it means for the future of IT",
      type: "Educational",
      contentType: "text",
      tags: ["Cloud", "MultiCloud", "Strategy"],
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

  const contentTypes = ['All', ...new Set(sampleContentIdeas.map(content => content.type))];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-4 mb-8">
          <div className="w-8 h-8 bg-[#3264DF]/80 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-sm">
            2
          </div>
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
              onClick={() => onContentSelect(content)}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:rotate-1 ${
                formData.selectedContent?.id === content.id
                  ? 'ring-4 ring-[#3264DF]/20 shadow-2xl'
                  : 'hover:shadow-xl'
              }`}
            >
              {/* Header Section - varies by content type */}
              {content.contentType === 'text' ? (
                // Text-only content - no image, more text space
                <div className={`relative h-48 flex items-center justify-center transition-all duration-300 ${
                  formData.selectedContent?.id === content.id
                    ? 'bg-gradient-to-br from-[#3264DF]/10 to-blue-100'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-gray-100 group-hover:to-gray-200'
                }`}>
                  <div className="text-center p-8">
                    <FileText className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${
                      formData.selectedContent?.id === content.id ? 'text-[#3264DF]' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    <div className="text-sm text-gray-500 font-medium">Text Content</div>
                  </div>
                </div>
              ) : content.contentType === 'hashtag' ? (
                // Hashtag content - colorful background with hashtag pattern
                <div className={`relative h-48 overflow-hidden transition-all duration-300 ${
                  formData.selectedContent?.id === content.id
                    ? 'bg-gradient-to-br from-[#3264DF]/20 to-purple-100'
                    : 'bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 group-hover:from-pink-200 group-hover:to-blue-200'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Hash className={`w-20 h-20 transition-all duration-300 ${
                      formData.selectedContent?.id === content.id ? 'text-[#3264DF]/60' : 'text-purple-300 group-hover:text-purple-400'
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
                        } ${formData.selectedContent?.id === content.id ? 'text-[#3264DF]' : 'text-purple-600'}`}
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
                        formData.selectedContent?.id === content.id
                          ? 'bg-[#3264DF]/80'
                          : 'bg-black/50 group-hover:bg-black/70'
                      }`}>
                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                    formData.selectedContent?.id === content.id ? 'from-[#3264DF]/90 via-[#3264DF]/30' : ''
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
                  formData.selectedContent?.id === content.id
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
              {formData.selectedContent?.id === content.id && (
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
                formData.selectedContent?.id === content.id
                  ? 'bg-gradient-to-br from-[#3264DF]/5 to-blue-50'
                  : 'bg-white group-hover:bg-gray-50/50'
              }`}>
                {/* Title */}
                <h4 className={`font-bold text-xl mb-3 transition-colors duration-300 ${
                  content.contentType === 'hashtag' ? 'line-clamp-1' : 'line-clamp-2'
                } ${
                  formData.selectedContent?.id === content.id ? 'text-[#3264DF]' : 'text-gray-900 group-hover:text-gray-800'
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
                          formData.selectedContent?.id === content.id
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
                          formData.selectedContent?.id === content.id
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
                    formData.selectedContent?.id === content.id
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
    </div>
  );
};

export default ContentSelectionStep;
