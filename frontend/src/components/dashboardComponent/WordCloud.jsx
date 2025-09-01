const WordCloud = () => {
  // const keywords = [
  //   { text: "skincare routine", size: "text-4xl", color: "text-pink-600", weight: 90 },
  //   { text: "natural beauty", size: "text-2xl", color: "text-emerald-500", weight: 75 },
  //   { text: "glowing skin", size: "text-3xl", color: "text-orange-500", weight: 85 },
  //   { text: "moisturizer", size: "text-xl", color: "text-blue-500", weight: 60 },
  //   { text: "anti-aging", size: "text-2xl", color: "text-purple-500", weight: 70 },
  //   { text: "hydration", size: "text-lg", color: "text-cyan-500", weight: 55 },
  //   { text: "collagen", size: "text-xl", color: "text-rose-500", weight: 65 },
  //   { text: "vitamin C", size: "text-lg", color: "text-amber-500", weight: 50 },
  //   { text: "serum", size: "text-xl", color: "text-indigo-500", weight: 68 },
  //   { text: "facial care", size: "text-lg", color: "text-teal-500", weight: 45 },
  //   { text: "retinol", size: "text-base", color: "text-violet-500", weight: 40 },
  //   { text: "SPF", size: "text-base", color: "text-yellow-500", weight: 38 },
  // ]

  const keywords = [
  { text: "Cloud Storage", size: "text-4xl", color: "text-blue-600", weight: 90 },
  { text: "Compute Power", size: "text-2xl", color: "text-emerald-500", weight: 75 },
  { text: "AI APIs", size: "text-3xl", color: "text-indigo-500", weight: 85 },
  { text: "Data Security", size: "text-xl", color: "text-red-500", weight: 60 },
  { text: "Scalability", size: "text-2xl", color: "text-purple-500", weight: 70 },
  { text: "Cloud Migration", size: "text-lg", color: "text-cyan-500", weight: 55 },
  { text: "Uptime 99.9%", size: "text-xl", color: "text-green-500", weight: 65 },
  { text: "DevOps", size: "text-lg", color: "text-amber-500", weight: 50 },
  { text: "API Gateway", size: "text-xl", color: "text-indigo-400", weight: 68 },
  { text: "Serverless", size: "text-lg", color: "text-teal-500", weight: 45 },
  { text: "Containers", size: "text-base", color: "text-violet-500", weight: 40 },
  { text: "Multi-Cloud", size: "text-base", color: "text-pink-500", weight: 38 },
];

  return (
    <div className="relative">
      {/* Simple background */}
      <div className="absolute inset-0 bg-gray-50 rounded-xl border border-gray-200"></div>
      
      {/* Main content */}
      <div className="relative flex flex-wrap items-center justify-center gap-4 p-8 min-h-[240px] overflow-hidden">
        {keywords.map((keyword, index) => {
          const rotation = (Math.random() - 0.5) * 30; // Random rotation between -15 and 15 degrees
          const animationDelay = index * 100; // Staggered animation
          
          return (
            <span
              key={index}
              className={`
                ${keyword.size} ${keyword.color} 
                font-bold cursor-pointer select-none relative group
                transition-all duration-300 ease-out
                hover:scale-110 hover:z-10
                animate-fade-in
              `}
              style={{
                transform: `rotate(${rotation}deg)`,
                animationDelay: `${animationDelay}ms`,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = `rotate(0deg) scale(1.15)`;
                e.target.style.textShadow = '0 4px 8px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = `rotate(${rotation}deg) scale(1)`;
                e.target.style.textShadow = 'none';
              }}
            >
              {keyword.text}
              
              {/* Hover tooltip */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                            bg-gray-800 text-white text-xs px-2 py-1 rounded-md
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200
                            whitespace-nowrap pointer-events-none z-20">
                {keyword.weight}% relevance
              </div>
            </span>
          )
        })}
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

export default WordCloud
