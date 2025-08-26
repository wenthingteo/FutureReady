import React, { useState, useEffect } from 'react';
import { X, Facebook, Instagram, Linkedin, Music, Youtube } from 'lucide-react';

const ScheduleModal = ({ isOpen, onClose, onSchedule, editingPost = null }) => {
  const [formData, setFormData] = useState({
    platforms: editingPost?.platforms || []
  });

  const [errors, setErrors] = useState({});

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-500' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
    { id: 'tiktok', name: 'TikTok', icon: Music, color: 'bg-black' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'bg-red-500' }
  ];

  const handlePlatformToggle = (platformId) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const validateForm = () => {
    if (formData.platforms.length === 0) {
      setErrors({ platforms: 'Please select at least one channel' });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // For now, just close the modal since we only have channel selection
    // In the future, this would proceed to the next step
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      platforms: []
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-end p-6">
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-gray-100/50 rounded-lg transition-all duration-200 group"
          >
            <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 h-full flex flex-col justify-center">
            {/* Channel Selection */}
            <div className="space-y-12">
              <div className="text-center">
                <div className="inline-flex items-center gap-4 mb-8">
                  <div className="w-8 h-8 bg-[#3264DF]/80 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-sm">
                    1
                  </div>
                  <h3 className="text-3xl font-normal text-gray-800 tracking-tight">Choose Your Channels</h3>
                </div>
                <p className="text-gray-600 text-base max-w-lg mx-auto leading-relaxed">Select the platforms where you want to publish your content</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`p-8 border rounded-2xl text-center transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg ${
                      formData.platforms.includes(platform.id)
                        ? 'border-[#3264DF]/30 bg-[#3264DF]/8 shadow-md ring-1 ring-[#3264DF]/10'
                        : 'border-gray-200/60 hover:border-[#3264DF]/20 bg-white hover:shadow-md hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="mb-4">
                      <platform.icon className={`w-10 h-10 mx-auto ${
                        formData.platforms.includes(platform.id) 
                          ? 'text-[#3264DF]' 
                          : 'text-gray-500'
                      }`} />
                    </div>
                    <div className={`font-medium text-base ${
                      formData.platforms.includes(platform.id) 
                        ? 'text-[#3264DF]' 
                        : 'text-gray-700'
                    }`}>{platform.name}</div>
                  </button>
                ))}
              </div>

              {errors.platforms && (
                <div className="mt-8 p-4 bg-red-50/70 border border-red-200/50 rounded-xl text-center">
                  <p className="text-red-600 text-sm font-medium">{errors.platforms}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100/40 p-8 bg-gray-50/40">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={formData.platforms.length === 0}
              className="px-10 py-3 bg-[#3264DF] text-white text-sm rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;