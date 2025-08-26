"use client"

import { useDraggable } from "@dnd-kit/core"
import { GripVertical } from "lucide-react" // drag icon

export function TaskCard({ task, onClick }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  const platformColors = {
    TikTok: "bg-pink-100 text-pink-800",
    Instagram: "bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800",
    YouTube: "bg-red-100 text-red-800",
    Twitter: "bg-blue-100 text-blue-800",
    LinkedIn: "bg-blue-200 text-blue-900",
    Facebook: "bg-blue-300 text-blue-900",
    default: "bg-gray-100 text-gray-800",
  }

  const assigneeColors = {
    "Kelly Tan": "bg-green-200 text-green-800",
    "John Doe": "bg-orange-200 text-orange-800",
    "Jane Smith": "bg-purple-200 text-purple-800",
    "Mike Johnson": "bg-teal-200 text-teal-800",
    default: "bg-gray-300 text-gray-700",
  }

  const initials = task.assignee
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div
      ref={setNodeRef}
      style={style}
      // Moved the onClick handler here to make the entire card clickable
      onClick={() => onClick(task)}
      className={`bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
        isDragging ? "opacity-50 rotate-3 scale-105" : ""
      }`}
    >
      {/* Header row with drag handle */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg text-gray-900">
          {task.title}
        </h3>

      {/* Drag handle */}
      <div
        {...listeners}
        {...attributes}
        className="p-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        onClick={(e) => e.stopPropagation()} // Prevent the card's onClick from triggering
      >
        <GripVertical className="w-4 h-4" />
      </div>
      </div>

    {/* Description */}
    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {task.description}
    </p>

    {/* Footer */}
     <div className="flex items-center justify-between">
         <span
            className={`text-xs px-2 py-1 rounded-md font-medium ${
                platformColors[task.platform] || platformColors.default
            }`}
         >
         {task.platform}
        </span>

         <div
            className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${
                assigneeColors[task.assignee] || assigneeColors.default
            }`}
         >
            {initials}
            </div>
        </div>
    </div>

    )
}