const WordCloud = () => {
  const keywords = [
    { text: "AI", size: "text-4xl", color: "text-blue-600" },
    { text: "Machine Learning", size: "text-2xl", color: "text-purple-500" },
    { text: "Data", size: "text-3xl", color: "text-green-500" },
    { text: "Analytics", size: "text-xl", color: "text-orange-500" },
    { text: "Algorithm", size: "text-2xl", color: "text-red-500" },
    { text: "Neural", size: "text-lg", color: "text-indigo-500" },
    { text: "Deep Learning", size: "text-xl", color: "text-pink-500" },
    { text: "Automation", size: "text-lg", color: "text-teal-500" },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 min-h-[200px]">
      {keywords.map((keyword, index) => (
        <span
          key={index}
          className={`${keyword.size} ${keyword.color} font-bold hover:scale-110 transition-transform cursor-pointer select-none`}
          style={{
            transform: `rotate(${Math.random() * 20 - 10}deg)`,
          }}
        >
          {keyword.text}
        </span>
      ))}
    </div>
  )
}

export default WordCloud
