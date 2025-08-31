import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Zap, Youtube, Search, Filter, ChevronDown, Play, Hash, FileText, Image, X, Plus, Edit3, Settings, Music, Sparkles, CheckCircle, AlertCircle, Wand2, Shield } from 'lucide-react';

// Custom TikTok Icon Component
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const UnifiedContentStep = ({ formData, onPlatformToggle, onContentSelect, onContentUpdate, errors }) => {
  const [contentSearch, setContentSearch] = useState('');
  const [contentFilter, setContentFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('instagram');
  const [editedContent, setEditedContent] = useState({});
  const [showContentIdeas, setShowContentIdeas] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState({});
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [enhancementPrompt, setEnhancementPrompt] = useState('');

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

  const platforms = [
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: Facebook, 
      gradient: 'from-blue-600 to-blue-700',
      bgClass: 'bg-gradient-to-br from-blue-600 to-blue-700'
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: Instagram, 
      gradient: 'from-purple-500 via-pink-500 to-orange-400',
      bgClass: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400'
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: Linkedin, 
      gradient: 'from-blue-700 to-blue-800',
      bgClass: 'bg-gradient-to-br from-blue-700 to-blue-800'
    },
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      icon: TikTokIcon, 
      gradient: 'from-black via-red-500 to-white',
      bgClass: 'bg-gradient-to-br from-black via-red-500 to-white'
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: Youtube, 
      gradient: 'from-red-500 to-red-600',
      bgClass: 'bg-gradient-to-br from-red-500 to-red-600'
    }
  ];

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
      title: "Monday Motivation: You've Got This! 💪",
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
      description: "Proven tactics that top influencers use to create viral content and build loyal communities.",
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
    }
  ];

  // Platform-specific content templates
  const platformTemplates = {
    instagram: {
      title: "✨ {original_title}",
      description: "{original_description}\n\n#Instagram #SocialMedia #Content",
      hashtags: ["Instagram", "SocialMedia", "Content"]
    },
    facebook: {
      title: "{original_title}",
      description: "{original_description}\n\nWhat do you think? Share your thoughts below! 👇",
      hashtags: ["Facebook", "Community", "Discussion"]
    },
    linkedin: {
      title: "{original_title}",
      description: "{original_description}\n\nI'd love to hear your professional insights on this topic. What's your experience?",
      hashtags: ["LinkedIn", "Professional", "Networking"]
    },
    tiktok: {
      title: "{original_title} #fyp #viral",
      description: "{original_description}",
      hashtags: ["TikTok", "FYP", "Viral", "Trending"]
    },
    youtube: {
      title: "{original_title}",
      description: "{original_description}\n\n🔔 Subscribe for more content like this!\n👍 Like if you found this helpful\n💬 Comment your thoughts below",
      hashtags: ["YouTube", "Subscribe", "Content"]
    }
  };

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

    return filtered;
  };

  // Auto-populate content for selected platforms when content is selected
  useEffect(() => {
    console.log('useEffect triggered:', { selectedContent: formData.selectedContent, platforms: formData.platforms });
    if (formData.selectedContent && formData.platforms.length > 0) {
      const newEditedContent = {};
      
      formData.platforms.forEach(platform => {
        const template = platformTemplates[platform];
        if (template) {
          newEditedContent[platform] = {
            title: template.title.replace('{original_title}', formData.selectedContent.title),
            description: template.description.replace('{original_description}', formData.selectedContent.description),
            hashtags: [...(formData.selectedContent.hashtags || formData.selectedContent.tags || []), ...template.hashtags],
            media: formData.selectedContent.image ? [formData.selectedContent.image] : [],
            settings: {}
          };
        }
      });
      
      console.log('Setting new edited content:', newEditedContent);
      setEditedContent(newEditedContent);
      onContentUpdate(newEditedContent);
      
      // Set active tab to first selected platform
      if (formData.platforms.length > 0) {
        setActiveTab(formData.platforms[0]);
      }
    }
  }, [formData.selectedContent, formData.platforms]);

  const handleContentChange = (field, value) => {
    const updated = {
      ...editedContent,
      [activeTab]: {
        ...editedContent[activeTab],
        [field]: value
      }
    };
    setEditedContent(updated);
    onContentUpdate(updated);
  };

  const handlePlatformSettingChange = (setting, value) => {
    const updated = {
      ...editedContent,
      [activeTab]: {
        ...editedContent[activeTab],
        settings: {
          ...editedContent[activeTab]?.settings,
          [setting]: value
        }
      }
    };
    setEditedContent(updated);
    onContentUpdate(updated);
  };

  // Initialize content for a platform if it doesn't exist
  const initializePlatformContent = (platformId) => {
    if (!editedContent[platformId]) {
      const newContent = {
        title: '',
        description: '',
        hashtags: [],
        media: [],
        settings: {}
      };
      setEditedContent(prev => ({
        ...prev,
        [platformId]: newContent
      }));
      onContentUpdate({
        ...editedContent,
        [platformId]: newContent
      });
    }
  };

  const addHashtag = (newHashtag) => {
    const currentHashtags = editedContent[activeTab]?.hashtags || [];
    if (newHashtag && !currentHashtags.includes(newHashtag)) {
      handleContentChange('hashtags', [...currentHashtags, newHashtag]);
    }
  };

  const removeHashtag = (hashtag) => {
    const currentHashtags = editedContent[activeTab]?.hashtags || [];
    handleContentChange('hashtags', currentHashtags.filter(h => h !== hashtag));
  };

  const addMedia = () => {
    // In a real app, this would open a file picker
    const newMedia = `/src/assets/random_photos/random_photo_${Math.floor(Math.random() * 4) + 1}.jpg`;
    const currentMedia = editedContent[activeTab]?.media || [];
    handleContentChange('media', [...currentMedia, newMedia]);
  };

  const removeMedia = (index) => {
    const currentMedia = editedContent[activeTab]?.media || [];
    handleContentChange('media', currentMedia.filter((_, i) => i !== index));
  };

  // AI Enhancement Functions
  const enhanceContent = async () => {
    if (!enhancementPrompt.trim()) return;
    
    setIsAiProcessing(true);
    
    // Simulate AI enhancement based on user prompt
    setTimeout(() => {
      const currentContent = editedContent[activeTab] || {};
      let enhancedDescription = currentContent.description || '';
      let enhancedTitle = currentContent.title || '';
      
      const prompt = enhancementPrompt.toLowerCase();
      
      // Smart enhancement logic based on prompt analysis
      if (prompt.includes('grammar') || prompt.includes('fix')) {
        enhancedDescription = enhancedDescription
          .replace(/However\b/g, 'However, ')
          .replace(/\b([A-Z][a-z]+)\s+([A-Z][a-z]+)\s+([A-Z][a-z]+)/g, '$1 $2 $3')
          .replace(/\s+([.!?])\s*/g, '$1 ');
      }
      
      if (prompt.includes('call to action') || prompt.includes('cta')) {
        const ctaOptions = [
          '\n\nWhat do you think? Share your thoughts below! 👇',
          '\n\nDrop a ❤️ if you found this helpful!',
          '\n\nTag someone who needs to see this!',
          '\n\nSave this for later! 📌',
          '\n\nFollow for more content like this!'
        ];
        enhancedDescription += ctaOptions[Math.floor(Math.random() * ctaOptions.length)];
      }
      
      if (prompt.includes('hashtag') || prompt.includes('tag')) {
        const platformHashtags = {
          instagram: ['Instagram', 'SocialMedia', 'Content', 'Lifestyle', 'Inspiration'],
          facebook: ['Facebook', 'Community', 'Discussion', 'Sharing', 'Connect'],
          linkedin: ['LinkedIn', 'Professional', 'Networking', 'Career', 'Business'],
          youtube: ['YouTube', 'Subscribe', 'Content', 'Video', 'Creator'],
          tiktok: ['TikTok', 'FYP', 'Viral', 'Trending', 'Fun']
        };
        const newHashtags = [...(currentContent.hashtags || []), ...(platformHashtags[activeTab] || [])];
        handleContentChange('hashtags', newHashtags);
      }
      
      if (prompt.includes('engaging') || prompt.includes('exciting')) {
        enhancedDescription = enhancedDescription
          .replace(/\./g, '!')
          .replace(/\b(amazing|great|good|nice)\b/gi, 'incredible')
          .replace(/\b(help|assist|support)\b/gi, 'empower');
      }
      
      if (prompt.includes('professional') || prompt.includes('formal')) {
        enhancedDescription = enhancedDescription
          .replace(/!/g, '.')
          .replace(/\b(incredible|awesome|amazing)\b/gi, 'excellent')
          .replace(/\b(empower|boost)\b/gi, 'enhance');
      }
      
      if (prompt.includes('shorten') || prompt.includes('concise')) {
        enhancedDescription = enhancedDescription.split('.').slice(0, 2).join('.') + '.';
      }
      
      if (prompt.includes('expand') || prompt.includes('detailed')) {
        enhancedDescription += '\n\nThis approach ensures optimal results while maintaining quality standards.';
      }
      
      // New enhancement options
      if (prompt.includes('enhance for all platforms')) {
        // Enhance content for all selected platforms
        const platformEnhancements = {
          instagram: {
            title: enhancedTitle + ' 📸',
            description: enhancedDescription + '\n\n#Instagram #SocialMedia #Content'
          },
          facebook: {
            title: enhancedTitle + ' 👥',
            description: enhancedDescription + '\n\nWhat do you think? Share your thoughts below!'
          },
          linkedin: {
            title: enhancedTitle + ' 💼',
            description: enhancedDescription + '\n\n#Professional #Networking #Career'
          },
          youtube: {
            title: enhancedTitle + ' 🎥',
            description: enhancedDescription + '\n\nSubscribe for more content like this!'
          },
          tiktok: {
            title: enhancedTitle + ' 🎵',
            description: enhancedDescription + '\n\n#FYP #Viral #Trending'
          }
        };
        
        // Apply platform-specific enhancements to all selected platforms
        formData.platforms.forEach(platform => {
          const enhancement = platformEnhancements[platform];
          if (enhancement) {
            const updatedContent = {
              ...editedContent[platform],
              title: enhancement.title,
              description: enhancement.description
            };
            setEditedContent(prev => ({
              ...prev,
              [platform]: updatedContent
            }));
          }
        });
        
        // Update the current active tab
        const currentEnhancement = platformEnhancements[activeTab];
        if (currentEnhancement) {
          handleContentChange('title', currentEnhancement.title);
          handleContentChange('description', currentEnhancement.description);
        }
      }
      
      if (prompt.includes('check content compliance') || prompt.includes('platform policy')) {
        // Simulate compliance check
        const complianceResults = {
          instagram: { compliant: true, issues: [], suggestions: ['Consider adding more hashtags for better reach'] },
          facebook: { compliant: true, issues: [], suggestions: ['Content looks good for Facebook community guidelines'] },
          linkedin: { compliant: true, issues: [], suggestions: ['Professional tone is appropriate for LinkedIn'] },
          youtube: { compliant: true, issues: [], suggestions: ['Content follows YouTube community guidelines'] },
          tiktok: { compliant: true, issues: [], suggestions: ['Content is suitable for TikTok audience'] }
        };
        
        const currentCompliance = complianceResults[activeTab];
        if (currentCompliance) {
          // Add compliance note to description
          const complianceNote = `\n\n✅ Content compliance check passed for ${activeTab}. ${currentCompliance.suggestions.join(' ')}`;
          enhancedDescription += complianceNote;
          handleContentChange('description', enhancedDescription);
        }
      }
      
      // Update the content
      handleContentChange('description', enhancedDescription);
      if (enhancedTitle !== currentContent.title) {
        handleContentChange('title', enhancedTitle);
      }
      setEnhancementPrompt('');
      setIsAiProcessing(false);
    }, 1500);
  };

  // Initialize content when active tab changes or when platforms are selected
  useEffect(() => {
    if (activeTab && formData.platforms.includes(activeTab)) {
      initializePlatformContent(activeTab);
    }
  }, [activeTab, formData.platforms]);

  // Initialize content for all selected platforms when platforms change
  useEffect(() => {
    if (formData.platforms.length > 0) {
      formData.platforms.forEach(platformId => {
        initializePlatformContent(platformId);
      });
      
      // Set active tab to first selected platform if not already set
      if (!activeTab || !formData.platforms.includes(activeTab)) {
        setActiveTab(formData.platforms[0]);
      }
    }
  }, [formData.platforms]);

  const filteredContent = getFilteredAndSortedContent();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 bg-[#475ECD] rounded-full flex items-center justify-center text-white font-medium text-sm shadow-sm">
            1
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Your Post
          </h2>
        </div>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto">
          Select platforms, choose from existing ideas, and customize content for each channel
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Platform Selection & Content Ideas */}
          <div className="col-span-3 space-y-4">
            {/* Platform Selection */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Select Platforms</h4>
              <div className="space-y-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => onPlatformToggle(platform.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 border rounded-lg text-sm transition-all duration-200 hover:shadow-sm ${
                      formData.platforms.includes(platform.id)
                        ? 'border-[#3264DF]/30 bg-[#3264DF]/8 shadow-sm ring-1 ring-[#3264DF]/10'
                        : 'border-gray-200 hover:border-[#3264DF]/20 bg-white hover:bg-gray-50/50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-lg ${platform.bgClass} flex items-center justify-center transition-all duration-200 ${
                      formData.platforms.includes(platform.id) 
                        ? 'scale-110' 
                        : 'hover:scale-105'
                    }`}>
                      <platform.icon className="w-3 h-3 text-white" />
                    </div>
                    <span className={`font-medium ${
                      formData.platforms.includes(platform.id) 
                        ? 'text-[#3264DF]' 
                        : 'text-gray-700'
                    }`}>{platform.name}</span>
                  </button>
                ))}
              </div>
              {errors.platforms && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-xs">{errors.platforms}</p>
                </div>
              )}
            </div>

            {/* Content Ideas Selection */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              {showContentIdeas ? (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-800">Choose from Existing Ideas</h4>
                    <button
                      onClick={() => setShowContentIdeas(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  
                  {/* Search and Filter */}
                  <div className="space-y-2 mb-3">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                      <input
                        type="text"
                        placeholder="Search ideas..."
                        value={contentSearch}
                        onChange={(e) => setContentSearch(e.target.value)}
                        className="w-full pl-7 pr-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3264DF] focus:border-transparent text-xs"
                      />
                    </div>
                    <select
                      value={contentFilter}
                      onChange={(e) => setContentFilter(e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3264DF] focus:border-transparent text-xs"
                    >
                      <option value="All">All Types</option>
                      <option value="Video">Video</option>
                      <option value="Text Post">Text Post</option>
                      <option value="Social Post">Social Post</option>
                      <option value="Behind-the-scenes">Behind-the-scenes</option>
                    </select>
                  </div>

                  {/* Content Ideas List */}
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filteredContent.map((content) => (
                      <button
                        key={content.id}
                        onClick={() => {
                          console.log('Content selected:', content);
                          onContentSelect(content);
                        }}
                        className={`w-full p-2 border rounded-lg text-left transition-all duration-200 hover:shadow-sm ${
                          formData.selectedContent?.id === content.id
                            ? 'border-[#3264DF] bg-[#3264DF]/5 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className="flex-shrink-0">
                            {content.image ? (
                              <img src={content.image} alt="" className="w-5 h-5 rounded object-cover" />
                            ) : (
                              <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                                <FileText className="w-3 h-3 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-gray-900 text-xs mb-1 line-clamp-1">
                              {content.title}
                            </h5>
                            <p className="text-gray-600 text-xs line-clamp-2">
                              {content.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowContentIdeas(true)}
                  className="w-full flex items-center justify-center gap-2 px-2 py-1.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#3264DF] hover:text-[#3264DF] transition-all duration-200"
                >
                  <FileText className="w-3 h-3" />
                  <span className="font-medium text-xs">Choose from Existing Ideas</span>
                </button>
              )}
            </div>
          </div>

          {/* Middle Column - Content Editing */}
          <div className="col-span-6">
            {formData.platforms.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Edit3 className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">Select platforms to start customizing content</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Platform Tabs */}
                <div className="flex border-b border-gray-200">
                  {formData.platforms.map((platformId) => {
                    const platform = platforms.find(p => p.id === platformId);
                    return (
                      <button
                        key={platformId}
                        onClick={() => setActiveTab(platformId)}
                        className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 transition-all duration-200 ${
                          activeTab === platformId
                            ? `${platform.bgClass} text-white shadow-sm`
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded ${activeTab === platformId ? 'bg-white/20' : platform.bgClass} flex items-center justify-center`}>
                          <platform.icon className={`w-2.5 h-2.5 ${activeTab === platformId ? 'text-white' : 'text-white'}`} />
                        </div>
                        <span className="font-medium text-sm">{platform.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Platform Content */}
                <div className="p-6">
                  {editedContent[activeTab] ? (
                    <div className="space-y-6">
                      {/* Title */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={editedContent[activeTab]?.title || ''}
                          onChange={(e) => handleContentChange('title', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF] transition-all duration-200"
                          placeholder={`Enter your ${activeTab} title...`}
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={editedContent[activeTab]?.description || ''}
                          onChange={(e) => handleContentChange('description', e.target.value)}
                          rows={8}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF] transition-all duration-200 resize-none"
                          placeholder={
                            activeTab === 'instagram' ? "Share your story with engaging visuals and hashtags..." :
                            activeTab === 'linkedin' ? "Share professional insights and engage your network..." :
                            activeTab === 'facebook' ? "Connect with your community and share experiences..." :
                            activeTab === 'youtube' ? "Describe your video content and engage viewers..." :
                            activeTab === 'tiktok' ? "Create viral content with trending sounds..." :
                            `Write your ${activeTab} content...`
                          }
                        />
                        
                        {/* Character Count */}
                        <div className="mt-2 flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <div className="text-gray-500">
                              {(editedContent[activeTab]?.description || '').length} characters
                            </div>
                            <div className={`w-2 h-2 rounded-full ${
                              (editedContent[activeTab]?.description || '').length > 2000 ? 'bg-red-500' :
                              (editedContent[activeTab]?.description || '').length > 1500 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}></div>
                          </div>
                          <div className="text-gray-500">
                            {activeTab === 'instagram' && 'Max: 2,200'}
                            {activeTab === 'facebook' && 'Max: 63,206'}
                            {activeTab === 'linkedin' && 'Max: 3,000'}
                            {activeTab === 'youtube' && 'Max: 5,000'}
                            {activeTab === 'tiktok' && 'Max: 2,200'}
                          </div>
                        </div>
                      </div>

                      {/* Hashtags */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hashtags</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(editedContent[activeTab]?.hashtags || []).map((hashtag, index) => (
                            <span
                              key={index}
                              className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${
                                activeTab === 'instagram' 
                                  ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200'
                                  : activeTab === 'facebook' || activeTab === 'linkedin'
                                    ? 'bg-blue-100 text-blue-700 border-blue-200'
                                    : activeTab === 'youtube' || activeTab === 'tiktok'
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
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF] transition-all duration-200"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addHashtag(e.target.value.replace('#', ''));
                              e.target.value = '';
                            }
                          }}
                        />
                      </div>

                      {/* AI Enhancement Section */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-4 h-4 text-blue-600" />
                          <h4 className="font-medium text-blue-800">AI Enhancement</h4>
                        </div>
                        
                        <div className="space-y-3">
                          {/* AI Enhancement Buttons */}
                          <div className="grid grid-cols-1 gap-3">
                            <button
                              onClick={() => {
                                setEnhancementPrompt('enhance for all platforms');
                                setTimeout(() => enhanceContent(), 100);
                              }}
                              disabled={isAiProcessing}
                              className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                            >
                              <Sparkles className="w-4 h-4" />
                              Enhance for All Platforms
                            </button>
                            
                            <button
                              onClick={() => {
                                setEnhancementPrompt('check content compliance to platform policy');
                                setTimeout(() => enhanceContent(), 100);
                              }}
                              disabled={isAiProcessing}
                              className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                            >
                              <Shield className="w-4 h-4" />
                              Check Content Compliance
                            </button>
                          </div>

                          {/* Enhancement Input */}
                          <div className="relative">
                            <input
                              type="text"
                              value={enhancementPrompt}
                              onChange={(e) => setEnhancementPrompt(e.target.value)}
                              placeholder="Or type custom enhancement..."
                              className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  enhanceContent();
                                }
                              }}
                            />
                            <button
                              onClick={enhanceContent}
                              disabled={isAiProcessing || !enhancementPrompt.trim()}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isAiProcessing ? (
                                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Wand2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Edit3 className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-sm">Loading content editor...</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Media & Settings */}
          <div className="col-span-3 space-y-4">
            {/* Media */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">Media</label>
              <div className="grid grid-cols-2 gap-3">
                {(editedContent[activeTab]?.media || []).map((mediaUrl, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={mediaUrl}
                      alt={`Media ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      onClick={() => removeMedia(index)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {/* Add Media Button */}
                <button
                  onClick={addMedia}
                  className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-[#3264DF] hover:text-[#3264DF] transition-all duration-200"
                >
                  <Plus className="w-5 h-5 mb-1" />
                  <span className="text-xs">Add Media</span>
                </button>
              </div>
            </div>

            {/* Platform-Specific Settings */}
            <div className={`p-4 rounded-xl border-2 ${
              activeTab === 'instagram' ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50' :
              activeTab === 'facebook' ? 'border-blue-200 bg-blue-50' :
              activeTab === 'linkedin' ? 'border-blue-300 bg-blue-50' :
              activeTab === 'youtube' ? 'border-red-200 bg-red-50' :
              activeTab === 'tiktok' ? 'border-pink-200 bg-gradient-to-br from-black/5 to-pink-50' :
              'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-800 flex items-center gap-2 text-sm">
                  <Settings className="w-4 h-4" />
                  {activeTab} Settings
                </h4>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Optimized
                </div>
              </div>
             
              {/* Content Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                <div className="flex flex-wrap gap-2">
                  {platformOptions[activeTab]?.postTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handlePlatformSettingChange('postType', type)}
                      className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                        editedContent[activeTab]?.settings?.postType === type
                          ? `${platforms.find(p => p.id === activeTab)?.bgClass} text-white border-transparent`
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Settings */}
              {platformOptions[activeTab]?.features.includes('music') && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Music</label>
                  <select
                    value={editedContent[activeTab]?.settings?.music || ''}
                    onChange={(e) => handlePlatformSettingChange('music', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF] text-sm"
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

              {platformOptions[activeTab]?.features.includes('location') && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={editedContent[activeTab]?.settings?.location || ''}
                    onChange={(e) => handlePlatformSettingChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3264DF]/20 focus:border-[#3264DF] text-sm"
                    placeholder="Add location..."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedContentStep;
