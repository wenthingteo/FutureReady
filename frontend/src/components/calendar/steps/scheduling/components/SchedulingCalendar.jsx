import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Facebook, Instagram, Linkedin, Twitter, Youtube, Music } from 'lucide-react';

// Custom TikTok Icon Component
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.10z"/>
  </svg>
);

export const SchedulingCalendar = ({ schedulingData, formData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredPost, setHoveredPost] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Helper functions for dates (same as original calendar)
  const getTodayDate = () => new Date().toISOString().split('T')[0]
  const getDateOffset = (days) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date.toISOString().split('T')[0]
  }

  // Use the exact same sample posts data as the original calendar
  const getCurrentMonthPosts = () => {
    return [
      {
        id: 1,
        title: "🚀 5 Cloud Innovations That Will Transform Enterprise IT",
        content: "Explore groundbreaking cloud technologies that are reshaping how businesses scale and operate in 2024",
        time: "11:00",
        date: getTodayDate(),
        platforms: ["instagram", "linkedin"],
        image: "/src/assets/random_photos/random_photo_1.png",
        optimalTiming: true,
        engagement: "92%",
        type: "educational"
      },
      {
        id: 2,
        title: "✨ Behind the Scenes of Cloud Architecture",
        content: "An inside look at how enterprises design secure and scalable cloud-native systems to support global operations",
        time: "14:00",
        date: getTodayDate(),
        platforms: ["instagram", "facebook"],
        image: "/src/assets/random_photos/random_photo_2.png",
        optimalTiming: true,
        engagement: "88%",
        type: "behind-the-scenes"
      },
      {
        id: 3,
        title: "🌍 Global Cloud Infrastructure Tour",
        content: "Take a virtual journey through world-class data centers powering modern applications and global connectivity",
        time: "19:00",
        date: getDateOffset(1), // Tomorrow
        platforms: ["youtube", "linkedin"],
        image: "/src/assets/random_photos/random_photo_3.png",
        optimalTiming: false,
        engagement: "76%",
        type: "tutorial",
        duration: "3:28"
      },
      {
        id: 4,
        title: "🎨 Cloud Migration That Transformed an Enterprise",
        content: "The complete shift to a cloud-first strategy that turned a struggling company into a digital leader overnight",
        time: "20:00",
        date: getDateOffset(2), // Day after tomorrow
        platforms: ["instagram", "youtube"],
        image: "/src/assets/random_photos/random_photo_4.png",
        optimalTiming: true,
        engagement: "94%",
        type: "case-study"
      },
      {
        id: 5,
        title: "Cloud Cost Optimization Strategies",
        content: "Proven methods to reduce infrastructure costs while maintaining performance and scalability in the cloud.",
        time: "09:00",
        date: getDateOffset(-1), // Yesterday
        platforms: ["facebook", "linkedin"],
        image: "/neoneo.jpeg",
      },
      {
        id: 6,
        title: "Cloud Security Insights",
        content: "Key practices to strengthen cloud environments, protect workloads, and ensure compliance.",
        time: "11:00",
        date: getDateOffset(3), // 3 days from now
        platforms: ["youtube", "instagram"],
        image: "/neoneo.jpeg",
      },
      {
        id: 7,
        title: "Building Resilient Cloud Architectures",
        content: "Effective techniques to design cloud systems that scale seamlessly and withstand failures.",
        time: "13:00",
        date: getDateOffset(4), // 4 days from now
        platforms: ["linkedin", "youtube"],
        image: "/neoneo.jpeg",
      },
    ];
  };


  const existingPosts = getCurrentMonthPosts();
  
  // Debug: Log the posts to verify they're being generated
  console.log('Calendar Posts:', existingPosts);

  const getNewPostData = () => {
    // Get the first platform with a suggested time
    const platformWithTime = Object.entries(schedulingData).find(([platform, data]) => data?.suggestedTime);
    
    if (platformWithTime) {
      const [platform, data] = platformWithTime;
      // Create a new post for tomorrow at the suggested time
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      return {
        title: formData.selectedContent?.title || "New Post",
        platforms: formData.platforms,
        date: tomorrow,
        time: data.suggestedTime,
        status: 'new'
      };
    }
    return null;
  };

  const newPost = getNewPostData();
  
  // Debug: Log the new post data
  console.log('New Post Data:', newPost);
  console.log('Scheduling Data:', schedulingData);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatDateString = (date) => {
    return date.toISOString().split("T")[0]
  }

  const isSameDay = (date1, date2) => {
    if (typeof date1 === 'string' && typeof date2 === 'string') {
      return date1 === date2;
    }
    if (typeof date1 === 'string') {
      date1 = new Date(date1);
    }
    if (typeof date2 === 'string') {
      date2 = new Date(date2);
    }
    return date1.getDate() === date2.getDate() && 
           date1.getMonth() === date2.getMonth() && 
           date1.getFullYear() === date2.getFullYear();
  };

  // Helper functions for pretty post styling
  const getPostCardColors = (post) => {
    // Soft color palette like Workplace
    const softColors = [
      { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800" },
      { bg: "bg-green-50", border: "border-green-200", text: "text-green-800" },
      { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-800" },
      { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-800" },
      { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800" },
      { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-800" },
      { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-800" },
    ]

    // Use post ID to consistently assign colors, handle undefined IDs
    const postId = post.id || 0;
    const colorIndex = postId % softColors.length
    return softColors[colorIndex]
  }

  const getPlatformIcon = (platform) => {
    const iconProps = {
      className: "w-2.5 h-2.5 text-white",
    }

    switch (platform) {
      case "facebook":
        return <Facebook {...iconProps} />
      case "instagram":
        return <Instagram {...iconProps} />
      case "linkedin":
        return <Linkedin {...iconProps} />
      case "tiktok":
        return <TikTokIcon {...iconProps} />
      case "youtube":
        return <Youtube {...iconProps} />
      case "twitter":
        return <Twitter {...iconProps} />
      default:
        return <Music {...iconProps} />
    }
  }

  const getPostsForDay = (day) => {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayDateString = formatDateString(dayDate);
    const posts = [];
    
    // Debug: Log the comparison
    console.log(`Checking day ${day}:`, {
      dayDate: dayDateString,
      currentMonth: currentDate.getMonth(),
      existingPosts: existingPosts.map(p => ({
        title: p.title,
        date: p.date,
        month: new Date(p.date).getMonth()
      }))
    });
    
    existingPosts.forEach(post => {
      if (isSameDay(post.date, dayDateString)) {
        console.log(`Found post for day ${day}:`, post.title);
        posts.push(post);
      }
    });
    
    if (newPost && isSameDay(newPost.date, dayDateString)) {
      posts.push(newPost);
    }
    
    // Debug: Log posts for specific days
    if (posts.length > 0) {
      console.log(`Posts for day ${day}:`, posts);
    }
    
    return posts;
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const calendarDays = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
             <style>{`
         @keyframes shine {
           0% {
             box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.4), 0 0 20px rgba(168, 85, 247, 0.2);
           }
           100% {
             box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.6), 0 0 30px rgba(168, 85, 247, 0.4);
           }
         }
       `}</style>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Schedule Overview</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
              {formatDate(currentDate)}
            </span>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
                     {calendarDays.map((day, index) => {
             if (!day) {
               return <div key={index} className="min-h-[80px]"></div>;
             }

            const posts = getPostsForDay(day);
            const isToday = isSameDay(new Date(), new Date(currentDate.getFullYear(), currentDate.getMonth(), day));

            return (
                             <div
                 key={day}
                 className={`min-h-[80px] border border-gray-100 rounded-lg p-1 relative ${
                   isToday ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                 }`}
               >
                <div className={`text-xs font-medium mb-1 ${
                  isToday ? 'text-blue-600' : 'text-gray-700'
                }`}>
                  {day}
                </div>

                                                                   <div className="space-y-0.5">
                                        {posts.slice(0, 3).map((post, postIndex) => {
                      const cardColors = getPostCardColors(post);
                      const isNewPost = post.status === 'new';
                      
                      return (
                        <div
                          key={`${post.id || 'new'}-${postIndex}-${post.title?.slice(0, 10)}`}
                                                   className={`${cardColors.bg} border ${cardColors.border} rounded cursor-pointer hover:shadow-sm transition-all duration-200 relative p-0.5 text-xs ${
                            isNewPost ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200' : ''
                          }`}
                         style={isNewPost ? {
                           boxShadow: '0 0 0 1px rgba(168, 85, 247, 0.4), 0 0 20px rgba(168, 85, 247, 0.2)',
                           animation: 'shine 2s ease-in-out infinite alternate'
                         } : {}}
                         onMouseEnter={(e) => {
                           setHoveredPost(post);
                           setMousePosition({ x: e.clientX, y: e.clientY });
                         }}
                         onMouseLeave={() => setHoveredPost(null)}
                         title={post.title}
                       >
                         {/* New Post Indicator */}
                         {isNewPost && (
                           <div className="absolute -top-1 -right-1">
                             <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
                               <span className="text-white text-xs">✨</span>
                             </div>
                           </div>
                         )}

                         {/* Optimal Timing Indicator */}
                         {post.optimalTiming && !isNewPost && (
                           <div className="absolute -top-1 -right-1">
                             <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                               <span className="text-white text-xs">⚡</span>
                             </div>
                           </div>
                         )}

                         {/* Title */}
                         <h3 className={`font-medium text-gray-900 leading-tight text-xs mb-1`} 
                         style={{
                           display: '-webkit-box',
                           WebkitLineClamp: 1,
                           WebkitBoxOrient: 'vertical',
                           overflow: 'hidden'
                         }}>
                           {post.title}
                         </h3>
                         
                         {/* Engagement Rate */}
                         {post.engagement && !isNewPost && (
                           <div className="flex items-center gap-1 mb-1">
                             <div className={`w-1.5 h-1.5 rounded-full ${
                               parseInt(post.engagement) >= 90 ? 'bg-green-500' :
                               parseInt(post.engagement) >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                             }`}></div>
                             <span className="text-xs text-gray-600">{post.engagement}</span>
                           </div>
                         )}
                         
                         {/* Footer with time and platforms */}
                         <div className="flex items-center justify-between">
                           <div className="flex items-center gap-1">
                             <span className={`px-1 py-0.5 rounded font-medium ${cardColors.text} bg-white/50 text-xs`}>
                               {post.time}
                             </span>
                             {post.duration && (
                               <span className="text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded">
                                 {post.duration}
                               </span>
                             )}
                           </div>
                           
                           <div className="flex items-center gap-0.5">
                             {post.platforms.slice(0, 2).map((platform, idx) => {
                               const platformColors = {
                                 instagram: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
                                 facebook: 'bg-blue-600',
                                 linkedin: 'bg-blue-700',
                                 youtube: 'bg-red-500',
                                 tiktok: 'bg-black',
                                 twitter: 'bg-blue-400'
                               };

                               return (
                                 <div 
                                   key={idx} 
                                   className={`rounded-full flex items-center justify-center ${platformColors[platform] || 'bg-gray-500'} w-4 h-4`}
                                 >
                                   {getPlatformIcon(platform)}
                                 </div>
                               );
                             })}
                             {post.platforms.length > 2 && (
                               <span className={`font-medium ${cardColors.text} text-xs`}>+{post.platforms.length - 2}</span>
                             )}
                           </div>
                         </div>
                       </div>
                     );
                   })}
                   {posts.length > 3 && (
                     <div className="text-xs text-gray-500 text-center bg-gray-50 rounded px-1 py-0.5">
                       +{posts.length - 3} more posts
                     </div>
                   )}
                 </div>
              </div>
            );
          })}
        </div>
      </div>

             <div className="p-4 bg-gray-50 border-t border-gray-200">
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-4 text-xs text-gray-600">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                 <span className="text-white text-xs">✨</span>
               </div>
               <span>New Post</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-blue-50 border border-blue-200 rounded"></div>
               <span>Existing Posts</span>
             </div>
           </div>
           <div className="text-xs text-gray-500">
             {existingPosts.length} scheduled posts • {newPost ? '1 new post' : '0 new posts'}
           </div>
         </div>
       </div>

      {/* Post Details Tooltip */}
      {hoveredPost && (
        <div className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm pointer-events-none"
             style={{
               left: mousePosition.x + 10,
               top: mousePosition.y - 10,
               transform: 'translateY(-50%)'
             }}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${
              hoveredPost.status === 'new' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                : 'bg-gray-400'
            }`}></div>
            <span className="font-medium text-sm text-gray-800">
              {hoveredPost.status === 'new' ? 'New Post' : 'Scheduled Post'}
            </span>
          </div>
                     <h4 className="font-semibold text-gray-900 text-sm mb-1">{hoveredPost.title}</h4>
           <div className="text-xs text-gray-600 mb-2">
             {typeof hoveredPost.date === 'string' ? new Date(hoveredPost.date).toLocaleDateString() : hoveredPost.date.toLocaleDateString()} at {hoveredPost.time}
           </div>
          <div className="flex flex-wrap gap-1">
            {hoveredPost.platforms.map((platform, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {platform}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
