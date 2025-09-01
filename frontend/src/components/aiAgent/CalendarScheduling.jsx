import React, { useState, useEffect } from 'react';
import { FiCheck, FiFileText, FiCalendar, FiGlobe, FiStar, FiTrendingUp, FiArrowLeft, FiPlay, FiImage, FiVideo, FiEdit3, FiClock } from 'react-icons/fi';

const CalendarScheduling = ({ scheduleData, aiRecommendation, onScheduleComplete, onTriggerAIResponse, workspaceRef }) => {
  const [clickedButtons, setClickedButtons] = useState(new Set());
  const [currentStep, setCurrentStep] = useState('content'); // 'content' or 'scheduling'
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Ensure we always have schedule data to display
  const displayScheduleData = scheduleData && scheduleData.length > 0 ? scheduleData : [
    { id: 1, title: "Brand Video Launch", platform: "All Platforms", date: "2024-01-15", time: "10:00 AM", type: "video", reach: "10.5K", engagement: "8.2%" },
    { id: 2, title: "Social Post Series", platform: "Instagram", date: "2024-01-16", time: "2:00 PM", type: "post", reach: "2.8K", engagement: "12.5%" },
    { id: 3, title: "LinkedIn Article", platform: "LinkedIn", date: "2024-01-17", time: "9:00 AM", type: "article", reach: "850", engagement: "6.8%" },
    { id: 4, title: "Facebook Ad Campaign", platform: "Facebook", date: "2024-01-18", time: "7:00 PM", type: "ad", reach: "4.2K", engagement: "9.1%" },
    { id: 5, title: "TikTok Challenge", platform: "TikTok", date: "2024-01-19", time: "6:00 PM", type: "challenge", reach: "6.7K", engagement: "15.3%" },
    { id: 6, title: "YouTube Tutorial", platform: "YouTube", date: "2024-01-20", time: "11:00 AM", type: "video", reach: "1.2K", engagement: "7.4%" }
  ];

  // Log data state for debugging
  useEffect(() => {
    console.log('CalendarScheduling - scheduleData:', scheduleData);
    console.log('CalendarScheduling - using fallback data:', !scheduleData || scheduleData.length === 0);
  }, [scheduleData]);

  // Reset clicked buttons when messages are empty and we're at welcome step
  useEffect(() => {
    if (scheduleData && scheduleData.length === 0) {
      setClickedButtons(new Set());
    }
  }, [scheduleData]);

  // Scroll to top when component mounts or step changes
  useEffect(() => {
    if (workspaceRef && workspaceRef.current) {
      // Add a small delay to ensure the component is fully rendered
      setTimeout(() => {
        workspaceRef.current.scrollTop = 0;
      }, 100);
    }
  }, [currentStep, workspaceRef]);

  // Scroll to top when component first mounts
  useEffect(() => {
    if (workspaceRef && workspaceRef.current) {
      // Add a small delay to ensure the component is fully rendered
      setTimeout(() => {
        workspaceRef.current.scrollTop = 0;
      }, 100);
    }
  }, [workspaceRef]);



  const getContentIcon = (type) => {
    switch (type) {
      case 'video':
        return <FiVideo className="w-4 h-4" />;
      case 'post':
        return <FiImage className="w-4 h-4" />;
      case 'article':
        return <FiFileText className="w-4 h-4" />;
      case 'ad':
        return <FiTrendingUp className="w-4 h-4" />;
      case 'challenge':
        return <FiPlay className="w-4 h-4" />;
      default:
        return <FiGlobe className="w-4 h-4" />;
    }
  };

  const getOptimalTimingReason = (item) => {
    const reasons = {
      '10:00 AM': 'Peak professional engagement time',
      '2:00 PM': 'Lunch break browsing period',
      '9:00 AM': 'Morning routine check-in',
      '7:00 PM': 'Evening relaxation browsing',
      '6:00 PM': 'Post-work social media time',
      '11:00 AM': 'Mid-morning productivity break'
    };
    return reasons[item.time] || 'AI-optimized timing';
  };

  const handleContinue = () => {
    setClickedButtons(prev => new Set([...prev, 'continue']));
    if (onScheduleComplete) {
      setTimeout(() => {
        onScheduleComplete(displayScheduleData);
      }, 100);
    }
  };

  const handlePhotoGeneration = () => {
    setIsGeneratingImage(true);
    setClickedButtons(prev => new Set([...prev, 'photo']));
    
    // Simulate AI image generation
    setTimeout(() => {
      setGeneratedImage('/src/assets/random_photos/Gemini_Generated_Image_fyo2ofyo2ofyo2of.png');
      setIsGeneratingImage(false);
    }, 2000);
  };

  const handleImageEnhancement = () => {
    setIsGeneratingImage(true);
    setClickedButtons(prev => new Set([...prev, 'enhance']));
    
    // Simulate AI image enhancement
    setTimeout(() => {
      setIsGeneratingImage(false);
      // In a real app, this would return an enhanced version
      console.log('Image enhanced with AI');
    }, 1500);
  };

  const handleRegenerateImage = () => {
    setIsGeneratingImage(true);
    setClickedButtons(prev => new Set([...prev, 'regenerate']));
    
    // Simulate regenerating the image
    setTimeout(() => {
      setIsGeneratingImage(false);
      // In a real app, this would generate a new image
      console.log('New image generated');
    }, 2000);
  };

  const handleContentComplete = () => {
    setCurrentStep('scheduling');
  };

  const selectedCount = displayScheduleData.filter(item => item.selected).length;
  const totalCount = displayScheduleData.length;

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <div className={`flex items-center space-x-2 ${currentStep === 'content' ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            currentStep === 'content' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <span className="font-medium">Content Generation</span>
        </div>
        <div className="w-16 h-0.5 bg-gray-300"></div>
        <div className={`flex items-center space-x-2 ${currentStep === 'scheduling' ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            currentStep === 'scheduling' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
          <span className="font-medium">Scheduling</span>
        </div>
      </div>

      {currentStep === 'content' ? (
        /* Content Generation Step */
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">AI Content Generation</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your cloud product content has been created and optimized
            </p>
          </div>

          {/* Generated Content */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-3">
                <FiFileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Generated Content</h3>
              <p className="text-gray-600">Your cloud product content has been created and optimized</p>
            </div>
            
            {/* Generated Content */}
            <div className="bg-white rounded-lg p-4 border border-blue-100 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">🚀 CloudSync Pro - Next-Gen Cloud Storage</h4>
              
              <div className="space-y-3 text-sm text-gray-700">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">📝 Main Content:</h5>
                  <p>"Transform your digital workflow with CloudSync Pro - the intelligent cloud storage solution that adapts to your business needs. Experience lightning-fast sync speeds, enterprise-grade security, and AI-powered file organization. Perfect for teams, freelancers, and growing businesses who demand reliability without compromise."</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h5 className="font-medium text-green-900 mb-1">🎯 Key Benefits:</h5>
                    <ul className="text-xs space-y-1">
                      <li>• 99.9% Uptime Guarantee</li>
                      <li>• Military-grade Encryption</li>
                      <li>• AI-Powered Search</li>
                      <li>• Real-time Collaboration</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h5 className="font-medium text-purple-900 mb-1">💡 Call-to-Action:</h5>
                    <p className="text-xs">"Start your 30-day free trial today and see why 10,000+ businesses trust CloudSync Pro for their cloud storage needs."</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Photo Generation Section */}
            <div className="bg-white rounded-lg p-4 border border-blue-100 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiImage className="w-5 h-5 text-blue-600" />
                AI Photo Generation
              </h4>
              
              {!generatedImage ? (
                <div className="text-center space-y-4">
                  <p className="text-gray-600">Generate a custom image for your cloud product content</p>
                  <button
                    onClick={handlePhotoGeneration}
                    disabled={isGeneratingImage || clickedButtons.has('photo')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all cursor-pointer ${
                      isGeneratingImage || clickedButtons.has('photo')
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                    }`}
                  >
                    {isGeneratingImage ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating Image...
                      </div>
                    ) : (
                      'Generate AI Photo'
                    )}
                  </button>
                </div>
                             ) : (
                 <div className="text-center space-y-4">
                   <div className="relative">
                     <img 
                       src={generatedImage} 
                       alt="AI Generated Cloud Product Image" 
                       className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                     />
                     <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                       AI Generated
                     </div>
                   </div>
                   <p className="text-sm text-green-600 font-medium">✨ AI-generated image created successfully!</p>
                   
                   {/* Image Action Buttons */}
                   <div className="flex items-center justify-center gap-3 pt-2">
                     <button
                       onClick={handleImageEnhancement}
                       disabled={isGeneratingImage}
                       className={`px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                         isGeneratingImage
                           ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                           : 'bg-blue-500 text-white hover:bg-blue-600'
                       }`}
                     >
                       {isGeneratingImage && clickedButtons.has('enhance') ? (
                         <div className="flex items-center gap-2">
                           <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                           Enhancing...
                         </div>
                       ) : (
                         <div className="flex items-center gap-2">
                           <FiStar className="w-3 h-3" />
                           Enhance
                         </div>
                       )}
                     </button>
                     
                     <button
                       onClick={handleRegenerateImage}
                       disabled={isGeneratingImage}
                       className={`px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                         isGeneratingImage
                           ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                           : 'bg-purple-500 text-white hover:bg-purple-600'
                       }`}
                     >
                       {isGeneratingImage && clickedButtons.has('regenerate') ? (
                         <div className="flex items-center gap-2">
                           <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                           Regenerating...
                         </div>
                       ) : (
                         <div className="flex items-center gap-2">
                           <FiImage className="w-3 h-3" />
                           Regenerate
                         </div>
                       )}
                     </button>
                   </div>
                 </div>
               )}
            </div>
            
            {/* Content Performance Preview */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <div className="text-lg font-bold text-blue-600">A+</div>
                <div className="text-xs text-gray-600">Content Score</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-green-100">
                <div className="text-lg font-bold text-green-600">95%</div>
                <div className="text-xs text-gray-600">Engagement Rate</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-purple-100">
                <div className="text-lg font-bold text-purple-600">4.8/5</div>
                <div className="text-xs text-gray-600">AI Rating</div>
              </div>
            </div>
          </div>

          {/* Content Step Action Button */}
          <div className="flex justify-center pt-6">
            <button
              onClick={handleContentComplete}
              disabled={!generatedImage}
              className={`px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${
                !generatedImage
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>Continue to Scheduling</span>
                <FiPlay className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      ) : (
        /* Scheduling Step */
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">AI-Optimized Content Scheduling</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your content is strategically scheduled across all platforms for maximum engagement and reach
            </p>
          </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Scheduling Progress</h3>
          <span className="text-sm text-gray-500">{selectedCount} of {totalCount} scheduled</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(selectedCount / totalCount) * 100}%` }}
          ></div>
        </div>
        
                 {/* AI Scheduling Performance Score */}
         <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
           <div className="text-center">
             <div className="text-2xl font-bold text-blue-600">25.8K</div>
             <div className="text-xs text-gray-600">Total Reach</div>
           </div>
           <div className="text-center">
             <div className="text-2xl font-bold text-green-600">9.9%</div>
             <div className="text-xs text-gray-600">Avg Engagement</div>
           </div>
           <div className="text-center">
             <div className="text-2xl font-bold text-purple-600">87</div>
             <div className="text-xs text-gray-600">AI Score</div>
           </div>
         </div>
      </div>

      {/* Schedule Items */}
      <div className="space-y-4">
        {displayScheduleData.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  {getContentIcon(item.type)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FiGlobe className="w-3 h-3" />
                      {item.platform}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-3 h-3" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="w-3 h-3" />
                      {item.time}
                    </span>
                  </div>
                  {/* AI Performance Metrics */}
                  <div className="flex items-center gap-4 text-sm mt-1">
                    <span className="flex items-center gap-1 text-blue-600">
                      <FiTrendingUp className="w-3 h-3" />
                      Reach: {item.reach || "N/A"}
                    </span>
                    <span className="flex items-center gap-1 text-green-600">
                      <FiStar className="w-3 h-3" />
                      Engagement: {item.engagement || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.selected || false}
                  onChange={() => {
                    // Toggle selection
                    const updatedData = displayScheduleData.map(scheduleItem => 
                      scheduleItem.id === item.id 
                        ? { ...scheduleItem, selected: !scheduleItem.selected }
                        : scheduleItem
                    );
                    // Update the local state (this would normally update the parent state)
                    console.log('Updated schedule data:', updatedData);
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-xs text-gray-500">Select</span>
              </div>
            </div>
            
            {/* Optimal Timing Reason */}
            {item.time && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <FiStar className="w-3 h-3" />
                  <span>{getOptimalTimingReason(item)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>



      {/* AI Scheduling Insights */}
      {aiRecommendation && (
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <h4 className="font-medium text-purple-900 mb-3 flex items-center gap-2">
            <FiTrendingUp className="w-4 h-4" />
            AI Scheduling Insights
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-purple-800">Engagement Optimization</div>
              <div className="text-purple-600">Timing aligned with audience peak activity</div>
            </div>
            <div>
              <div className="font-medium text-purple-800">Cross-Platform Sync</div>
              <div className="text-purple-600">Coordinated posting across all platforms</div>
            </div>
          </div>
        </div>
      )}

             {/* Action Buttons */}
       <div className="flex items-center justify-between pt-6">
         <button
           onClick={() => {
             setClickedButtons(prev => new Set([...prev, 'back']));
             setCurrentStep('content');
           }}
           disabled={clickedButtons.has('back')}
           className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${
             clickedButtons.has('back')
               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
           }`}
         >
           <div className="flex items-center gap-2">
             <FiArrowLeft className="w-4 h-4" />
             Back to Content Creation
           </div>
         </button>

        <button
          onClick={handleContinue}
          disabled={clickedButtons.has('continue')}
          className={`px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${
            clickedButtons.has('continue')
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>Continue to Ads Setup</span>
            <FiPlay className="w-4 h-4" />
                     </div>
         </button>
       </div>
         </div>
       )}
     </div>
   );
 };

export default CalendarScheduling;
