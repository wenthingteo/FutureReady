"use client"

import { useState } from "react"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { KanbanColumn } from "@/components/kanban-column"
import { TaskFormPanel } from "@/components/task-form-panel"
import { TaskCard } from "@/components/task-card"
import { TaskDetailPanel } from "@/components/task-detail-panel" // Import the detail panel

// Dummy data for initial state
const initialTasks = [
  {
    id: "1",
    title: "This or That",
    description: "Show two options, and the player only choose one, to left or right",
    topic: "Interactive Content",
    targetAudience: "Gen Z",
    platform: "TikTok",
    assignee: "Kelly Tan",
    status: "unassigned",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function WorkplacePage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [isFormOpen, setIsFormOpen] = useState(false) // State for the 'Add Task' form
  const [isDetailOpen, setIsDetailOpen] = useState(false) // State for the 'Task Details' panel
  const [activeTask, setActiveTask] = useState(null) // State for drag and drop
  const [selectedTask, setSelectedTask] = useState(null) // State for the selected task to view details

  const columns = [
    { title: "Unassigned", status: "unassigned" },
    { title: "To Do", status: "todo" },
    { title: "In Progress", status: "inprogress" },
    { title: "Done", status: "done" },
  ]

  // --- Drag and Drop Handlers ---
  const handleDragStart = (event) => {
    const task = tasks.find((t) => t.id === event.active.id)
    setActiveTask(task || null)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over || active.id === over.id) return

    const taskId = active.id
    const newStatus = over.id
    
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus, updatedAt: new Date() } : task)),
    )
  }

  // --- Form Handlers (Add Task) ---
  const handleAddTask = (formData) => {
    const newTask = {
      id: Date.now().toString(),
      ...formData,
      status: "unassigned",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  // --- Panel Handlers (View Details) ---
  const handleViewDetails = (task) => {
    setSelectedTask(task)
    setIsDetailOpen(true)
  }

  const handleCloseDetails = () => {
    setIsDetailOpen(false)
    setSelectedTask(null)
  }

  const getTasksByStatus = (status) => tasks.filter((task) => task.status === status)

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#3264DF]">Workplace</h1>
        </div>

        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-6 h-full">
            {columns.map((column) => (
              <KanbanColumn
                key={column.status}
                title={column.title}
                status={column.status}
                tasks={getTasksByStatus(column.status)}
                onAddTask={column.status === "unassigned" ? () => setIsFormOpen(true) : undefined}
                onTaskClick={handleViewDetails} // Pass the click handler to the KanbanColumn
              />
            ))}
          </div>
          <DragOverlay>{activeTask ? <TaskCard task={activeTask} /> : null}</DragOverlay>
        </DndContext>
      </main>

      {/* Add Task Panel */}
      <TaskFormPanel isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleAddTask} />

      {/* Task Details Panel */}
      <TaskDetailPanel isOpen={isDetailOpen} onClose={handleCloseDetails} task={selectedTask} />
    </div>
  )
}