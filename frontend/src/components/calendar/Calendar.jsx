import React, { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Plus,
  CalendarIcon,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  MessageCircle,
  Camera,
  Music,
} from "lucide-react"

const Calendar = ({ view = "week", setView, posts = [], onSchedulePost, onEditPost }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedPosts, setSelectedPosts] = useState([])
  const [selectedPlatforms, setSelectedPlatforms] = useState(["facebook", "instagram", "linkedin", "tiktok", "youtube"])
  const [searchQuery, setSearchQuery] = useState("")

  // Helper functions for dates
  const getTodayDate = () => new Date().toISOString().split('T')[0]
  const getDateOffset = (days) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date.toISOString().split('T')[0]
  }

  // Sample posts data - you can replace this with actual data
  const samplePosts = [
    {
      id: 1,
      title: "Growing your business with AI",
      content:
        "Discover how artificial intelligence can transform your business operations and drive growth in the digital age.",
      time: "08:00",
      date: getTodayDate(),
      platforms: ["facebook", "instagram", "linkedin"],
      image: "/neoneo.jpeg",
    },
    {
      id: 2,
      title: "Marketing Tips & Strategies",
      content: "Essential marketing strategies that every business owner should know to boost their online presence.",
      time: "14:00",
      date: getTodayDate(),
      platforms: ["linkedin"],
      image: "/neoneo.jpeg",
    },
    {
      id: 3,
      title: "Social Media Growth Hacks",
      content: "Explore effective growth hacks to boost your social media presence and engagement.",
      time: "10:00",
      date: getDateOffset(1), // Tomorrow
      platforms: ["tiktok", "youtube"],
      image: "/neoneo.jpeg",
    },
    {
      id: 4,
      title: "Content Creation Tips",
      content: "Learn how to create compelling content that resonates with your audience.",
      time: "16:00",
      date: getDateOffset(2), // Day after tomorrow
      platforms: ["instagram", "tiktok"],
      image: "/neoneo.jpeg",
    },
    {
      id: 5,
      title: "Engagement Strategies",
      content: "Discover strategies to increase engagement and interaction on your posts.",
      time: "09:00",
      date: getDateOffset(-1), // Yesterday
      platforms: ["facebook", "linkedin"],
      image: "/neoneo.jpeg",
    },
    {
      id: 6,
      title: "Video Marketing Insights",
      content: "Uncover the power of video marketing and how it can drive conversions.",
      time: "11:00",
      date: getDateOffset(3), // 3 days from now
      platforms: ["youtube", "instagram"],
      image: "/neoneo.jpeg",
    },
    {
      id: 7,
      title: "Brand Building Techniques",
      content: "Effective techniques to build and maintain a strong brand identity.",
      time: "13:00",
      date: getDateOffset(4), // 4 days from now
      platforms: ["linkedin", "youtube"],
      image: "/neoneo.jpeg",
    },
  ]

  const allPosts = posts.length > 0 ? posts : samplePosts

  // Get current week dates
  const getWeekDates = (date) => {
    const week = []
    const startDate = new Date(date)
    const day = startDate.getDay()
    const diff = startDate.getDate() - day

    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startDate)
      weekDate.setDate(diff + i)
      week.push(weekDate)
    }
    return week
  }

  // Get month dates
  const getMonthDates = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const dates = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      dates.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(year, month, day))
    }

    return dates
  }

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]
  }

  const getPostsForDate = (date) => {
    if (!date) return []
    const dateStr = formatDate(date)
    return allPosts.filter((post) => {
      // Filter by date
      const matchesDate = post.date === dateStr
      // Filter by selected platforms - show post if it has at least one selected platform
      const hasSelectedPlatform = post.platforms.some(platform => selectedPlatforms.includes(platform))
      // Filter by search query - search in title (case insensitive)
      const matchesSearch = searchQuery.trim() === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
      
      return matchesDate && hasSelectedPlatform && matchesSearch
    })
  }

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate)
    if (view === "week") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  const isToday = (date) => {
    if (!date) return false
    const today = new Date()
    return formatDate(date) === formatDate(today)
  }

  const getPlatformColor = (platform, isSelected = true) => {
    if (!isSelected) return "bg-gray-100 text-black"

    switch (platform) {
      case "facebook":
        return "bg-[#1877F2] text-white"
      case "instagram":
        return "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white"
      case "linkedin":
        return "bg-[#0A66C2] text-white"
      case "tiktok":
        return "bg-black text-white"
      case "youtube":
        return "bg-[#FF0000] text-white"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPlatformIcon = (platform, isSelected = true) => {
    const iconProps = {
      className: `w-4 h-4 ${isSelected ? "" : "text-black"}`,
    }

    switch (platform) {
      case "facebook":
        return <Facebook {...iconProps} />
      case "instagram":
        return <Instagram {...iconProps} />
      case "linkedin":
        return <Linkedin {...iconProps} />
      case "tiktok":
        return <Music {...iconProps} />
      case "youtube":
        return <Youtube {...iconProps} />
      default:
        return <CalendarIcon {...iconProps} />
    }
  }

  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) => (prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]))
  }

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

    // Use post ID to consistently assign colors
    const colorIndex = post.id % softColors.length
    return softColors[colorIndex]
  }

  const PostCard = ({ post, isCompact = false, isMonthView = false }) => {
    const cardColors = getPostCardColors(post)

    return (
      <div
        className={`${cardColors.bg} border ${cardColors.border} rounded cursor-pointer hover:shadow-sm transition-all duration-200 ${
          isMonthView ? "p-1 mb-1 text-xs" : isCompact ? "p-2 mb-1 text-xs" : "p-4 mb-2 text-sm"
        }`}
        onClick={() => onEditPost && onEditPost(post)}
      >
        {/* Title */}
        <h3 className={`font-medium text-gray-900 leading-tight ${
          isMonthView ? "text-xs mb-1" : "text-sm mb-2"
        }`} 
        style={{
          display: '-webkit-box',
          WebkitLineClamp: isMonthView ? 1 : 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {post.title}
        </h3>
        
        {/* Footer with time and platforms */}
        <div className="flex items-center justify-between">
          <span className={`px-1 py-0.5 rounded font-medium ${cardColors.text} bg-white/50 ${
            isMonthView ? "text-xs" : "text-xs"
          }`}>
            {post.time}
          </span>
          
          <div className="flex items-center gap-0.5">
            {post.platforms.slice(0, isMonthView ? 1 : 2).map((platform, idx) => (
              <div 
                key={idx} 
                className={`rounded-full flex items-center justify-center ${getPlatformColor(platform, selectedPlatforms.includes(platform))} ${
                  isMonthView ? "w-3 h-3" : "w-4 h-4"
                }`}
              >
                <div className={isMonthView ? "w-2 h-2" : "w-3 h-3"}>
                  {getPlatformIcon(platform, selectedPlatforms.includes(platform))}
                </div>
              </div>
            ))}
            {post.platforms.length > (isMonthView ? 1 : 2) && (
              <span className={`font-medium ${cardColors.text} ${
                isMonthView ? "text-xs" : "text-xs"
              }`}>+{post.platforms.length - (isMonthView ? 1 : 2)}</span>
            )}
          </div>
        </div>
      </div>
    )
  }

  const TimeSlot = ({ time, posts, date }) => (
    <div className="border-b border-gray-100 py-2">
      <div className="text-base text-gray-500 mb-1 font-medium">{time}</div>
      {posts
        .filter((post) => post.time.startsWith(time.split(":")[0]))
        .map((post) => (
          <PostCard key={post.id} post={post} isCompact={true} />
        ))}
    </div>
  )

  const weekDates = view === "week" ? getWeekDates(currentDate) : []
  const monthDates = view === "month" ? getMonthDates(currentDate) : []

  const timeSlots = [
    { label: "00:00 am", value: "00" },
    { label: "02:00 am", value: "02" },
    { label: "04:00 am", value: "04" },
    { label: "06:00 am", value: "06" },
    { label: "08:00 am", value: "08" },
    { label: "10:00 am", value: "10" },
    { label: "12:00 pm", value: "12" },
    { label: "02:00 pm", value: "14" },
    { label: "04:00 pm", value: "16" },
    { label: "06:00 pm", value: "18" },
    { label: "08:00 pm", value: "20" },
    { label: "10:00 pm", value: "22" },
  ]

  return (
    <div className="bg-white p-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-6 h-16">
          {/* Left side - Month navigation */}
          <div className="flex items-center gap-2 h-full">
            <button onClick={() => navigateDate("prev")} className="p-3 hover:bg-gray-100 rounded transition-colors h-12 w-12 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 px-4">
              {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h2>
            <button onClick={() => navigateDate("next")} className="p-3 hover:bg-gray-100 rounded transition-colors h-12 w-12 flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Center - Week/Month toggle and Search */}
          <div className="flex items-center gap-4 h-full">
            {/* Week/Month Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 h-12">
              <button
                onClick={() => setView('week')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors h-10 flex items-center ${
                  view === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView('month')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors h-10 flex items-center ${
                  view === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Month
              </button>
            </div>

            {/* Search */}
            <div className="relative h-12 flex items-center">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 py-3 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-1 focus:ring-[#3264DF] focus:border-[#3264DF] text-sm h-12"
              />
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Right side - Schedule button and avatars */}
          <div className="flex items-center gap-4 h-full">
            <button
              onClick={() => onSchedulePost && onSchedulePost()}
              className="bg-[#3264DF] text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-md hover:shadow-lg h-12 flex items-center"
            >
              Schedule Now
            </button>
            
            {/* Social media icons */}
            <div className="flex -space-x-1 h-12 items-center">
              <button
                onClick={() => togglePlatform("facebook")}
                className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center transition-all hover:scale-110 ${
                  selectedPlatforms.includes("facebook") 
                    ? getPlatformColor("facebook", true)
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200 opacity-50"
                }`}
                title="Toggle Facebook posts"
              >
                {getPlatformIcon("facebook", selectedPlatforms.includes("facebook"))}
              </button>
              <button
                onClick={() => togglePlatform("instagram")}
                className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center transition-all hover:scale-110 ${
                  selectedPlatforms.includes("instagram") 
                    ? getPlatformColor("instagram", true)
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200 opacity-50"
                }`}
                title="Toggle Instagram posts"
              >
                {getPlatformIcon("instagram", selectedPlatforms.includes("instagram"))}
              </button>
              <button
                onClick={() => togglePlatform("linkedin")}
                className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center transition-all hover:scale-110 ${
                  selectedPlatforms.includes("linkedin") 
                    ? getPlatformColor("linkedin", true)
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200 opacity-50"
                }`}
                title="Toggle LinkedIn posts"
              >
                {getPlatformIcon("linkedin", selectedPlatforms.includes("linkedin"))}
              </button>
              <div className="w-12 h-12 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium">
                +2
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-4">
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-200 text-sm">
              <Search className="w-4 h-4" />
              <span>
                Search results for "{searchQuery}": {allPosts.filter(post => {
                  const hasSelectedPlatform = post.platforms.some(platform => selectedPlatforms.includes(platform))
                  const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
                  return hasSelectedPlatform && matchesSearch
                }).length} posts found
              </span>
              <button
                onClick={() => setSearchQuery("")}
                className="ml-auto text-blue-600 hover:text-blue-800 underline text-xs"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {view === "week" ? (
        <div className="grid grid-cols-8 gap-0">
            {/* Time column header */}
            <div className="p-4 font-medium text-sm text-gray-600 border-r border-gray-200">Time</div>

            {/* Day headers */}
            {weekDates.map((date, index) => (
              <div
                key={index}
                className={`p-4 text-center transition-colors border-b border-gray-200 ${
                  index < 6 ? "border-r border-gray-200" : ""
                }`}
              >
                <div className={`text-xs mb-2 font-medium ${isToday(date) ? "text-blue-600" : "text-gray-500"}`}>
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div className={`text-base font-bold ${isToday(date) ? "text-blue-600" : "text-gray-900"}`}>
                  {date.getDate()}
                </div>
              </div>
            ))}

            {/* Time slots and posts */}
            {timeSlots.map((timeSlot, timeIndex) => (
              <React.Fragment key={timeIndex}>
                {/* Time label */}
                <div className="p-2 text-sm text-gray-500 font-medium border-r border-gray-200 flex items-center justify-center min-h-[40px]">{timeSlot.label}</div>

                {/* Day columns */}
                {weekDates.map((date, dayIndex) => {
                  const dayPosts = getPostsForDate(date)
                  const timeSlotPosts = dayPosts.filter((post) => post.time.startsWith(timeSlot.value))
                  const hasPostsInSlot = timeSlotPosts.length > 0

                  return (
                    <div
                      key={dayIndex}
                      className={`p-2 transition-colors border-t border-gray-200 ${
                        dayIndex < 6 ? "border-r border-gray-200" : ""
                      } ${isToday(date) ? "bg-blue-50/20" : "hover:bg-gray-50/30"} ${
                        hasPostsInSlot ? "min-h-[80px]" : "min-h-[40px]"
                      }`}
                    >
                      {timeSlotPosts.map((post) => (
                        <PostCard key={post.id} post={post} isCompact={true} />
                      ))}
                    </div>
                  )
                })}
              </React.Fragment>
            ))}
          </div>
      ) : (
        /* Month View */
        <div className="grid grid-cols-7 gap-0">
            {/* Day headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
              <div
                key={day}
                className={`p-2 text-center font-medium text-sm text-gray-600 border-b border-gray-100 ${
                  index < 6 ? "border-r border-gray-100" : ""
                }`}
              >
                {day}
              </div>
            ))}

            {/* Month dates */}
            {monthDates.map((date, index) => {
              const datePosts = date ? getPostsForDate(date) : []
              const hasPostsInDate = datePosts.length > 0

              return (
                <div
                  key={index}
                  className={`min-h-[80px] p-1.5 transition-colors ${index % 7 < 6 ? "border-r border-gray-100" : ""} ${
                    hasPostsInDate && Math.floor(index / 7) < Math.floor((monthDates.length - 1) / 7)
                      ? "border-b border-gray-100"
                      : ""
                  } ${!date ? "bg-gray-50/30" : isToday(date) ? "bg-blue-50/20" : "hover:bg-gray-50/30"} ${date ? "bg-gray-50/10" : ""}`}
                >
                  {date && (
                    <>
                      <div
                        className={`text-sm font-bold mb-1 ${
                          isToday(date)
                            ? "text-white bg-[#3264DF] w-6 h-6 rounded-full flex items-center justify-center text-xs"
                            : "text-gray-900"
                        }`}
                      >
                        {date.getDate()}
                      </div>
                      <div className="space-y-0.5">
                        {getPostsForDate(date).map((post) => (
                          <PostCard key={post.id} post={post} isCompact={true} isMonthView={true} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default Calendar
