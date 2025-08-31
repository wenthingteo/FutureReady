import { useState } from 'react';
import { FiEdit3, FiCheck, FiX, FiCopy, FiArrowRight } from 'react-icons/fi';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

// Custom TikTok Icon Component
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.10z"/>
  </svg>
);

const getPlatformIcon = (platform) => {
  switch (platform) {
    case 'Facebook': return Facebook;
    case 'Instagram': return Instagram;
    case 'LinkedIn': return Linkedin;
    case 'TikTok': return TikTokIcon;
    case 'YouTube': return Youtube;
    default: return Facebook;
  }
};

const ContentApproval = ({ content, onApprove, onModify }) => {
  const [editingContent, setEditingContent] = useState({});
  const [approvedContent, setApprovedContent] = useState({});

  const handleEditContent = (type, index) => {
    setEditingContent({ ...editingContent, [`${type}-${index}`]: true });
  };

  const handleSaveContent = (type, index, newContent) => {
    const updatedContent = { ...content };
    if (type === 'socialPosts') {
      updatedContent.socialPosts[index] = newContent;
    } else if (type === 'blogPost') {
      updatedContent.blogPost = newContent;
    } else if (type === 'emailSequence') {
      updatedContent.emailSequence = newContent;
    }
    onModify(updatedContent);
    setEditingContent({ ...editingContent, [`${type}-${index}`]: false });
  };

  const handleApproveContent = (type, index) => {
    setApprovedContent({ ...approvedContent, [`${type}-${index}`]: true });
  };

  const handleCopyContent = (text) => {
    navigator.clipboard.writeText(text);
  };

  const isAllContentApproved = () => {
    const socialPostsApproved = content.socialPosts.every((_, index) => 
      approvedContent[`socialPosts-${index}`]
    );
    const blogApproved = approvedContent['blogPost'];
    const emailApproved = approvedContent['emailSequence'];
    
    return socialPostsApproved && blogApproved && emailApproved;
  };

  const handleApproveAll = () => {
    onApprove(content);
  };

  const handleQuickApprove = () => {
    // Auto-approve all content
    const allApproved = {};
    content.socialPosts.forEach((_, index) => {
      allApproved[`socialPosts-${index}`] = true;
    });
    allApproved['blogPost'] = true;
    allApproved['emailSequence'] = true;
    allApproved['facebookContent'] = true;
    allApproved['instagramContent'] = true;
    allApproved['linkedinContent'] = true;
    allApproved['tiktokContent'] = true;
    allApproved['youtubeContent'] = true;
    
    setApprovedContent(allApproved);
    onApprove(content);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">📱 Content Review</h3>
        <div className="text-sm text-gray-500">Review your campaign content</div>
      </div>

      {/* Social Media Posts */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          📝 Social Media Posts
          <span className="text-xs bg-[#475ECD]/10 text-[#475ECD] px-2 py-1 rounded-full">
            {content.socialPosts.filter((_, index) => approvedContent[`socialPosts-${index}`]).length}/{content.socialPosts.length} Approved
          </span>
        </h4>
        {content.socialPosts.map((post, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">Post {index + 1}</span>
              <div className="flex items-center gap-2">
                {approvedContent[`socialPosts-${index}`] && (
                  <span className="text-green-600 text-xs flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                    <FiCheck size={12} /> Approved
                  </span>
                )}
                <button
                  onClick={() => handleCopyContent(post)}
                  className="p-1 text-gray-400 hover:text-[#475ECD] transition-colors"
                  title="Copy content"
                >
                  <FiCopy size={14} />
                </button>
                <button
                  onClick={() => handleEditContent('socialPosts', index)}
                  className="p-1 text-gray-400 hover:text-[#475ECD] transition-colors"
                  title="Edit content"
                >
                  <FiEdit3 size={14} />
                </button>
                {!approvedContent[`socialPosts-${index}`] && (
                  <button
                    onClick={() => handleApproveContent('socialPosts', index)}
                    className="px-3 py-1 bg-[#475ECD] text-white text-xs rounded-lg hover:bg-[#3d4fb8] transition-colors"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>

            {editingContent[`socialPosts-${index}`] ? (
              <div className="space-y-3">
                <textarea
                  value={post}
                  onChange={(e) => handleSaveContent('socialPosts', index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#475ECD] focus:border-transparent"
                  rows="3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveContent('socialPosts', index, post)}
                    className="px-3 py-1 bg-[#475ECD] text-white text-xs rounded-lg hover:bg-[#3d4fb8] transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingContent({ ...editingContent, [`socialPosts-${index}`]: false })}
                    className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed">{post}</p>
            )}
          </div>
        ))}
      </div>

      {/* Platform-Specific Content */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">🎯 Platform-Specific Content</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <Facebook className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-sm">Facebook</span>
            </div>
            <p className="text-xs text-gray-600">{content.facebookContent}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <Instagram className="w-5 h-5 text-pink-600" />
              <span className="font-medium text-sm">Instagram</span>
            </div>
            <p className="text-xs text-gray-600">{content.instagramContent}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <Linkedin className="w-5 h-5 text-blue-700" />
              <span className="font-medium text-sm">LinkedIn</span>
            </div>
            <p className="text-xs text-gray-600">{content.linkedinContent}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex items-center gap-2 mb-2">
              <TikTokIcon className="w-5 h-5 text-black" />
              <span className="font-medium text-sm">TikTok</span>
            </div>
            <p className="text-xs text-gray-600">{content.tiktokContent}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-white md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <Youtube className="w-5 h-5 text-red-600" />
              <span className="font-medium text-sm">YouTube</span>
            </div>
            <p className="text-xs text-gray-600">{content.youtubeContent}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          {isAllContentApproved() ? 'All content approved!' : 'Review and approve your content'}
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleQuickApprove}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <FiCheck size={16} />
            Approve All
          </button>
          <button
            onClick={handleApproveAll}
            disabled={!isAllContentApproved()}
            className="px-6 py-2 bg-gradient-to-r from-[#475ECD] to-purple-600 text-white rounded-lg hover:from-[#3d4fb8] hover:to-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            Continue
            <FiArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentApproval;
