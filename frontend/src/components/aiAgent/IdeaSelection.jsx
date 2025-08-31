import { useState } from 'react';
import { FiCheck, FiEdit3, FiX, FiArrowRight } from 'react-icons/fi';

const IdeaSelection = ({ sampleIdeas, onSelect, onModify }) => {
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Default ideas if none provided
  const defaultIdeas = [
    {
      title: "Product Launch Campaign",
      description: "A comprehensive multi-platform campaign to introduce your new product to the market.",
      platforms: ["Facebook", "Instagram", "LinkedIn"],
      budget: "$2,500",
      duration: "4 weeks"
    },
    {
      title: "Brand Awareness Boost",
      description: "Increase your brand visibility and recognition across social media platforms.",
      platforms: ["Instagram", "TikTok", "YouTube"],
      budget: "$1,800",
      duration: "3 weeks"
    },
    {
      title: "Engagement-Focused Campaign",
      description: "Build stronger connections with your audience through interactive content and community-driven posts.",
      platforms: ["Facebook", "Instagram", "TikTok"],
      budget: "$1,200",
      duration: "2 weeks"
    },
    {
      title: "Lead Generation Drive",
      description: "Convert social media followers into qualified leads with targeted content and strategic call-to-actions.",
      platforms: ["LinkedIn", "Facebook", "YouTube"],
      budget: "$3,000",
      duration: "5 weeks"
    }
  ];

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
      onSelect(selectedIdea, ideas[selectedIdea]);
    }
  };

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
            className={`border-2 rounded-lg p-4 transition-all cursor-pointer hover:shadow-md ${
              selectedIdea === index 
                ? 'border-[#475ECD] bg-gradient-to-r from-[#475ECD]/5 to-purple-500/5 shadow-md' 
                : 'border-gray-200 bg-white hover:border-[#475ECD]/30'
            }`}
            onClick={() => handleIdeaSelect(index)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedIdea === index 
                    ? 'border-[#475ECD] bg-[#475ECD]' 
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
                className="p-1 text-gray-400 hover:text-[#475ECD] transition-colors"
              >
                <FiEdit3 size={16} />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-3">{idea.description}</p>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-[#475ECD]/10 text-[#475ECD] px-2 py-1 rounded text-xs font-medium">
                <strong>Platforms:</strong> {idea.platforms.join(', ')}
              </div>
              <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                <strong>Budget:</strong> {idea.budget}
              </div>
              <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                <strong>Duration:</strong> {idea.duration}
              </div>
            </div>

            {isEditing && selectedIdea === index && (
              <div className="space-y-3 p-4 bg-gray-50 rounded border border-gray-200">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={idea.title}
                    onChange={(e) => handleSaveModification(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#475ECD] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={idea.description}
                    onChange={(e) => handleSaveModification(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#475ECD] focus:border-transparent"
                    rows="2"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Budget</label>
                    <input
                      type="text"
                      value={idea.budget}
                      onChange={(e) => handleSaveModification(index, 'budget', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#475ECD] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={idea.duration}
                      onChange={(e) => handleSaveModification(index, 'duration', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#475ECD] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Platforms</label>
                    <select
                      value={idea.platforms.join(', ')}
                      onChange={(e) => handleSaveModification(index, 'platforms', e.target.value.split(', '))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#475ECD] focus:border-transparent"
                    >
                      <option value="Facebook, Instagram, LinkedIn, TikTok, YouTube">All Platforms</option>
                      <option value="Facebook, Instagram">Facebook & Instagram</option>
                      <option value="LinkedIn, YouTube">LinkedIn & YouTube</option>
                      <option value="TikTok, Instagram">TikTok & Instagram</option>
                      <option value="Facebook, LinkedIn">Facebook & LinkedIn</option>
                    </select>
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
          className="px-6 py-2 bg-gradient-to-r from-[#475ECD] to-purple-600 text-white rounded-lg hover:from-[#3d4fb8] hover:to-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          Continue
          <FiArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default IdeaSelection;
