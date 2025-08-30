"use client"

import { TaskCard } from "./task-card"
import { useDroppable } from "@dnd-kit/core"
import { Plus } from "lucide-react"

export function KanbanColumn({ title, status, tasks, onAddTask, onTaskClick, newTaskId }) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  })

  const isUnassigned = status === "unassigned"

  return (
    <div
      ref={setNodeRef} // Set the droppable node ref on the column container
      className={`flex-1 max-h-[600px] bg-[#E8ECFF] border-2 border-dashed border-[#475ECD] rounded-lg ${isOver ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between text-lg font-medium text-gray-600">
          {title}
          <span className="bg-[#475ECD] text-white rounded-full px-2 py-1 text-xs">{tasks.length}</span>
        </div>
      </div>

      <div className="p-4 space-y-3 min-h-[500px]">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`transition-all duration-500 ${
              newTaskId === task.id 
                ? "ring-2 ring-green-400 shadow-lg transform scale-105 animate-pulse" 
                : ""
            }`}
          >
            <TaskCard task={task} onClick={onTaskClick} />
          </div>
        ))}

        {isUnassigned && (
          <button
            className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
            onClick={onAddTask}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </button>
        )}
      </div>
    </div>
  )
}