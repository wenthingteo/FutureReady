import { useState } from 'react';
import { FiCheck, FiEdit3, FiArrowRight, FiTarget, FiUsers, FiClock, FiDollarSign, FiGlobe } from 'react-icons/fi';
import { Search, Sparkles, FileText, Clock, Users, Target, Video, ImageIcon, Globe } from 'lucide-react';

const IdeaSelection = ({ sampleIdeas, onSelect, onModify }) => {
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStep, setCurrentStep] = useState('selection'); // 'selection', 'keywords', 'generating'
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);
  
  // Enhanced campaign ideas with more details
  const defaultIdeas = [
    {
      id: 1,
      title: "Product Launch Campaign",
      description: "A comprehensive multi-platform campaign to introduce your new product to the market with engaging content and targeted advertising.",
      platforms: ["Facebook", "Instagram", "LinkedIn"],
      budget: "RM 2,500",
      duration: "4 weeks",
      targetAudience: "Professionals aged 25-45, tech-savvy consumers",
      keywords: ["product launch", "new product", "innovation", "market introduction"],
      contentTypes: ["video", "article", "social posts"],
      estimatedReach: "50K-100K",
      expectedEngagement: "8-12%"
    },
    {
      id: 2,
      title: "Brand Awareness Boost",
      description: "Increase your brand visibility and recognition across social media platforms with creative content and strategic posting.",
      platforms: ["Instagram", "TikTok", "YouTube"],
      budget: "RM 1,800",
      duration: "3 weeks",
      targetAudience: "Gen Z and Millennials, social media active users",
      keywords: ["brand awareness", "visibility", "recognition", "social media"],
      contentTypes: ["video", "visual content", "stories"],
      estimatedReach: "100K-200K",
      expectedEngagement: "12-18%"
    },
    {
      id: 3,
      title: "Engagement-Focused Campaign",
      description: "Build stronger connections with your audience through interactive content, polls, and community-driven posts.",
      platforms: ["Facebook", "Instagram", "TikTok"],
      budget: "RM 1,200",
      duration: "2 weeks",
      targetAudience: "Existing followers and community members",
      keywords: ["engagement", "community", "interaction", "polls"],
      contentTypes: ["interactive posts", "polls", "user-generated content"],
      estimatedReach: "25K-50K",
      expectedEngagement: "15-25%"
    },
    {
      id: 4,
      title: "Lead Generation Drive",
      description: "Convert social media followers into qualified leads with targeted content and strategic call-to-actions.",
      platforms: ["LinkedIn", "Facebook", "YouTube"],
      budget: "RM 3,000",
      duration: "5 weeks",
      targetAudience: "B2B professionals, decision makers",
      keywords: ["lead generation", "conversion", "B2B", "qualified leads"],
      contentTypes: ["webinar", "whitepaper", "case studies"],
      estimatedReach: "30K-60K",
      expectedEngagement: "5-8%"
    }
  ];

  // Dynamic keyword suggestions based on campaign type
  const getKeywordsForCampaign = (campaignType) => {
    const keywordMap = {
      "Product Launch Campaign": [
        "product launch", "new product", "innovation", "market introduction", 
        "exclusive offer", "limited time", "early access", "product features"
      ],
      "Brand Awareness Boost": [
        "brand awareness", "visibility", "recognition", "social media", 
        "trending", "viral content", "influencer collaboration", "brand story"
      ],
      "Engagement-Focused Campaign": [
        "engagement", "community", "interaction", "polls", "user-generated content",
        "conversation", "feedback", "participation", "social proof"
      ],
      "Lead Generation Drive": [
        "lead generation", "conversion", "B2B", "qualified leads", "sales funnel",
        "lead magnets", "free trial", "demo", "consultation"
      ]
    };
    return keywordMap[campaignType] || [];
  };

  // Use provided ideas or fallback to defaults
  const [ideas, setIdeas] = useState(sampleIdeas || defaultIdeas);

  const handleIdeaSelect = (ideaIndex) => {
    setSelectedIdea(ideaIndex);
  };

  const handleModifyIdea = (ideaIndex) => {
    setIsEditing(true);
  };

  const handleSaveModification = (ideaIndex, field, value) => {
    const updatedIdeas = [...ideas];
    updatedIdeas[ideaIndex] = { ...updatedIdeas[ideaIndex], [field]: value };
    setIdeas(updatedIdeas);
  };

  const handleConfirmSelection = () => {
    if (selectedIdea !== null) {
      setCurrentStep('keywords');
      setSelectedKeywords(getKeywordsForCampaign(ideas[selectedIdea].title));
    }
  };

  const handleKeywordToggle = (keyword) => {
    setSelectedKeywords((prev) => 
      prev.includes(keyword) 
        ? prev.filter((k) => k !== keyword) 
        : [...prev, keyword]
    );
  };

  const getCampaignSpecificMessages = (campaignType) => {
    const messageMap = {
      "Product Launch Campaign": [
        'Analyzing your product launch requirements...',
        'Researching competitor product launches...',
        'Generating launch-specific content ideas...',
        'Creating platform-specific launch strategies...',
        'Optimizing content for product awareness...',
        'Finalizing your product launch campaign...'
      ],
      "Brand Awareness Boost": [
        'Analyzing your brand awareness goals...',
        'Researching brand visibility strategies...',
        'Generating brand-focused content ideas...',
        'Creating viral content strategies...',
        'Optimizing content for maximum reach...',
        'Finalizing your brand awareness campaign...'
      ],
      "Engagement-Focused Campaign": [
        'Analyzing your engagement objectives...',
        'Researching interactive content trends...',
        'Generating community-focused content ideas...',
        'Creating engagement-driven strategies...',
        'Optimizing content for user interaction...',
        'Finalizing your engagement campaign...'
      ],
      "Lead Generation Drive": [
        'Analyzing your lead generation targets...',
        'Researching B2B conversion strategies...',
        'Generating lead magnet content ideas...',
        'Creating conversion-focused strategies...',
        'Optimizing content for lead capture...',
        'Finalizing your lead generation campaign...'
      ]
    };
    return messageMap[campaignType] || [
      'Analyzing your campaign preferences...',
      'Researching market trends and competitor strategies...',
      'Generating content ideas based on your keywords...',
      'Creating platform-specific content strategies...',
      'Optimizing content for maximum engagement...',
      'Finalizing your personalized campaign content...'
    ];
  };

  const handleGenerateContent = () => {
    setIsGenerating(true);
    setGeneratingProgress(0);
    setLoadingStep(0);
    
    const campaignType = ideas[selectedIdea]?.title;
    const loadingSteps = getCampaignSpecificMessages(campaignType);
    setLoadingMessage(loadingSteps[0]);

    // Simulate content generation progress with dynamic messages
    const progressInterval = setInterval(() => {
      setGeneratingProgress((prev) => {
        const newProgress = prev + 2;
        
        // Update loading message based on progress
        if (newProgress <= 20) {
          setLoadingStep(0);
          setLoadingMessage(loadingSteps[0]);
        } else if (newProgress <= 40) {
          setLoadingStep(1);
          setLoadingMessage(loadingSteps[1]);
        } else if (newProgress <= 60) {
          setLoadingStep(2);
          setLoadingMessage(loadingSteps[2]);
        } else if (newProgress <= 80) {
          setLoadingStep(3);
          setLoadingMessage(loadingSteps[3]);
        } else if (newProgress <= 95) {
          setLoadingStep(4);
          setLoadingMessage(loadingSteps[4]);
        } else {
          setLoadingStep(5);
          setLoadingMessage(loadingSteps[5]);
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsGenerating(false);
            setCurrentStep('selection');
            // Pass the enhanced campaign data to the parent
            onSelect(selectedIdea, {
              ...ideas[selectedIdea],
              selectedKeywords,
              generatedContent: true
            });
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 60);
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case "video": return <Video className="w-4 h-4" />;
      case "article": return <FileText className="w-4 h-4" />;
      case "social posts": return <Globe className="w-4 h-4" />;
      case "visual content": return <ImageIcon className="w-4 h-4" />;
      case "stories": return <ImageIcon className="w-4 h-4" />;
      case "interactive posts": return <Target className="w-4 h-4" />;
      case "polls": return <Target className="w-4 h-4" />;
      case "user-generated content": return <Users className="w-4 h-4" />;
      case "webinar": return <Video className="w-4 h-4" />;
      case "whitepaper": return <FileText className="w-4 h-4" />;
      case "case studies": return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  // Loading/Generating State
  if (isGenerating) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
            <div
              className="absolute inset-0 border-4 border-transparent border-t-[#3264DF] rounded-full animate-spin"
              style={{
                background: `conic-gradient(from 0deg, #3264DF ${generatingProgress * 3.6}deg, transparent ${generatingProgress * 3.6}deg)`,
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#3264DF] animate-pulse" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">AI Generating Campaign Content</h3>
            <p className="text-gray-600 text-sm mb-2">
              Creating personalized content strategy for "{ideas[selectedIdea]?.title}"
            </p>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="flex items-center gap-2 text-sm text-blue-800">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-medium">{loadingMessage}</span>
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#3264DF] to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${generatingProgress}%` }}
            ></div>
          </div>

          <div className="text-2xl font-bold text-[#3264DF]">{generatingProgress}%</div>

          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Processing Keywords</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedKeywords.slice(0, 6).map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white text-blue-700 rounded-lg text-xs font-medium shadow-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Progress Steps Indicator */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-800">Processing Steps</span>
            </div>
            <div className="space-y-2">
              {getCampaignSpecificMessages(ideas[selectedIdea]?.title).map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    index < loadingStep 
                      ? 'bg-green-500 text-white' 
                      : index === loadingStep 
                        ? 'bg-blue-500 text-white animate-pulse' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < loadingStep ? '✓' : index + 1}
                  </div>
                  <span className={`text-sm ${
                    index <= loadingStep ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Keywords Selection Step
  if (currentStep === 'keywords') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">🎯 Customize Your Campaign</h3>
            <p className="text-sm text-gray-500">Selected: {ideas[selectedIdea]?.title}</p>
          </div>
          <button
            onClick={() => setCurrentStep('selection')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to selection
          </button>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <h4 className="font-medium text-gray-900 mb-3">Campaign Overview</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <FiDollarSign className="text-green-600" />
              <span>Budget: {ideas[selectedIdea]?.budget}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-blue-600" />
              <span>Duration: {ideas[selectedIdea]?.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiUsers className="text-purple-600" />
              <span>Target: {ideas[selectedIdea]?.targetAudience}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiGlobe className="text-orange-600" />
              <span>Platforms: {ideas[selectedIdea]?.platforms.join(', ')}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">Select Keywords for Content Generation</h4>
          <div className="grid grid-cols-3 gap-2">
            {getKeywordsForCampaign(ideas[selectedIdea]?.title).map((keyword, index) => (
              <button
                key={index}
                className={`h-auto py-2 px-3 text-sm rounded-lg transition-colors ${
                  selectedKeywords.includes(keyword)
                    ? "bg-[#3264DF] text-white"
                    : "border border-gray-300 hover:bg-blue-50"
                }`}
                onClick={() => handleKeywordToggle(keyword)}
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            {selectedKeywords.length} keywords selected
          </div>
          <button
            onClick={handleGenerateContent}
            disabled={selectedKeywords.length === 0}
            className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${
              selectedKeywords.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-[#3264DF] to-purple-600 text-white hover:from-[#2854CC] hover:to-purple-700 shadow-md hover:shadow-lg"
            }`}
          >
            <Sparkles size={16} />
            Generate Content
          </button>
        </div>
      </div>
    );
  }

  // Main Selection Step
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">🎯 Choose Your Campaign Strategy</h3>
        <div className="text-sm text-gray-500">Select the best approach for your goals</div>
      </div>

      <div className="space-y-3">
        {ideas.map((idea, index) => (
          <div 
            key={index} 
            className={`border-2 rounded-xl p-4 transition-all cursor-pointer hover:shadow-md ${
              selectedIdea === index 
                ? 'border-[#3264DF] bg-gradient-to-r from-[#3264DF]/5 to-purple-500/5 shadow-md' 
                : 'border-gray-200 bg-white hover:border-[#3264DF]/30'
            }`}
            onClick={() => handleIdeaSelect(index)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedIdea === index 
                    ? 'border-[#3264DF] bg-[#3264DF]' 
                    : 'border-gray-300'
                }`}>
                  {selectedIdea === index && <FiCheck className="text-white text-xs" />}
                </div>
                <h4 className="font-semibold text-gray-900">{idea.title}</h4>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleModifyIdea(index);
                }}
                className="p-1 text-gray-400 hover:text-[#3264DF] transition-colors"
              >
                <FiEdit3 size={16} />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-3">{idea.description}</p>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-[#3264DF]/10 text-[#3264DF] px-2 py-1 rounded text-xs font-medium">
                <strong>Platforms:</strong> {idea.platforms.join(', ')}
              </div>
              <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                <strong>Budget:</strong> {idea.budget}
              </div>
              <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                <strong>Duration:</strong> {idea.duration}
              </div>
              <div className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                <strong>Reach:</strong> {idea.estimatedReach}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FiUsers className="w-3 h-3" />
              <span>{idea.targetAudience}</span>
            </div>

            {isEditing && selectedIdea === index && (
              <div className="space-y-3 p-4 bg-gray-50 rounded border border-gray-200 mt-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={idea.title}
                    onChange={(e) => handleSaveModification(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3264DF] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={idea.description}
                    onChange={(e) => handleSaveModification(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3264DF] focus:border-transparent"
                    rows="2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Budget</label>
                    <input
                      type="text"
                      value={idea.budget}
                      onChange={(e) => handleSaveModification(index, 'budget', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3264DF] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={idea.duration}
                      onChange={(e) => handleSaveModification(index, 'duration', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3264DF] focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Done Editing
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          {selectedIdea !== null ? `Selected: ${ideas[selectedIdea]?.title}` : 'Choose a strategy to continue'}
        </div>
        <button
          onClick={handleConfirmSelection}
          disabled={selectedIdea === null}
          className="px-6 py-2 bg-gradient-to-r from-[#3264DF] to-purple-600 text-white rounded-lg hover:from-[#2854CC] hover:to-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          Continue
          <FiArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default IdeaSelection;
