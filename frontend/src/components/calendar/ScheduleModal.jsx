import React, { useState, useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import UnifiedContentStep from './steps/UnifiedContentStep';
import SchedulingStep from './steps/SchedulingStep';

const ScheduleModal = ({ isOpen, onClose, onSchedule, editingPost = null, isFullPage = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    platforms: editingPost?.platforms || [],
    selectedContent: null,
    editedContent: null
  });

  const [errors, setErrors] = useState({});

  // Prevent background scroll when modal is open (only for modal mode)
  useEffect(() => {
    if (isOpen && !isFullPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isFullPage]);

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

  // Full Page Mode
  if (isFullPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Back Button */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleClose}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Calendar</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {editingPost ? 'Edit Post' : 'Schedule New Post'}
              </h1>
              <p className="text-sm text-gray-600">
                Step {currentStep} of 2
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto py-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Step Content */}
            <div className="p-8">
              {/* Step 1: Unified Content Step (Platforms + Content Selection + Editing) */}
              {currentStep === 1 && (
                <UnifiedContentStep
                  formData={formData}
                  onPlatformToggle={handlePlatformToggle}
                  onContentSelect={handleContentSelect}
                  onContentUpdate={handleContentUpdate}
                  errors={errors}
                />
              )}

              {/* Step 2: Scheduling */}
              {currentStep === 2 && (
                <SchedulingStep
                  formData={formData}
                  onSchedule={onSchedule}
                  errors={errors}
                />
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-8 bg-gray-50">
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

                {/* Next Button */}
                <div className="flex gap-3">
                  {currentStep === 1 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={formData.platforms.length === 0}
                      className="px-10 py-3 bg-[#3264DF] text-white text-sm rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                    >
                      Continue to Scheduling
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modal Mode (original behavior)
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg w-full max-w-6xl max-h-[90vh] flex flex-col border border-white/20 overflow-hidden">
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
            {/* Step 1: Unified Content Step (Platforms + Content Selection + Editing) */}
            {currentStep === 1 && (
              <UnifiedContentStep
                formData={formData}
                onPlatformToggle={handlePlatformToggle}
                onContentSelect={handleContentSelect}
                onContentUpdate={handleContentUpdate}
                errors={errors}
              />
            )}

            {/* Step 2: Scheduling */}
            {currentStep === 2 && (
              <SchedulingStep
                formData={formData}
                onSchedule={onSchedule}
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

            {/* Next Button */}
            <div className="flex gap-3">
              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={formData.platforms.length === 0}
                  className="px-10 py-3 bg-[#3264DF] text-white text-sm rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  Continue to Scheduling
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