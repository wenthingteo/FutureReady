import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ChannelSelectionStep from './steps/ChannelSelectionStep';
import ContentSelectionStep from './steps/ContentSelectionStep';
import ContentEditingStep from './steps/ContentEditingStep';

const ScheduleModal = ({ isOpen, onClose, onSchedule, editingPost = null }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    platforms: editingPost?.platforms || [],
    selectedContent: null,
    editedContent: null
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



  const handlePlatformToggle = (platformId) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const handleContentSelect = (content) => {
    setFormData(prev => ({
      ...prev,
      selectedContent: content
    }));
  };

  const handleContentUpdate = (updatedContent) => {
    setFormData(prev => ({
      ...prev,
      editedContent: updatedContent
    }));
  };



  const validateCurrentStep = () => {
    if (currentStep === 1) {
      if (formData.platforms.length === 0) {
        setErrors({ platforms: 'Please select at least one channel' });
        return false;
      }
    }
    setErrors({});
    return true;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) return;
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
  };

  const skipStep = () => {
    setCurrentStep(prev => prev + 1);
    setErrors({});
  };

  const handleSubmit = () => {
    // For now, just close the modal - will be extended for final submission
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      platforms: [],
      selectedContent: null,
      editedContent: null
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
            {/* Step 1: Channel Selection */}
            {currentStep === 1 && (
              <ChannelSelectionStep
                formData={formData}
                onPlatformToggle={handlePlatformToggle}
                errors={errors}
              />
            )}

            {/* Step 2: Content Selection */}
            {currentStep === 2 && (
              <ContentSelectionStep
                formData={formData}
                onContentSelect={handleContentSelect}
              />
            )}

            {/* Step 3: Content Editing */}
            {currentStep === 3 && (
              <ContentEditingStep
                formData={formData}
                onContentUpdate={handleContentUpdate}
                errors={errors}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100/40 p-8 bg-gray-50/40">
          <div className="flex justify-between items-center">
            {/* Back Button */}
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2.5 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                >
                  ← Back
                </button>
              )}
            </div>

            {/* Next/Skip Buttons */}
            <div className="flex gap-3">
              {currentStep === 2 && (
                <button
                  type="button"
                  onClick={skipStep}
                  className="px-8 py-2.5 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors border border-gray-300 rounded-xl hover:bg-gray-50"
                >
                  Skip
                </button>
              )}
              
              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={formData.platforms.length === 0}
                  className="px-10 py-3 bg-[#3264DF] text-white text-sm rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  Continue
                </button>
              ) : currentStep === 2 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-10 py-3 bg-[#3264DF] text-white text-sm rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Continue
                </button>
              ) : currentStep === 3 ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-10 py-3 bg-[#3264DF] text-white text-sm rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Schedule
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;