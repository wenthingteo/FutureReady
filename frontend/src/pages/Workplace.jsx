"use client"

import { useState } from "react"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { Lightbulb } from "lucide-react"
import { KanbanColumn } from "@/components/Workplace/kanban-column"
import { TaskFormPanel } from "@/components/Workplace/task-form-panel"
import { TaskCard } from "@/components/Workplace/task-card"
import { TaskDetailPanel } from "@/components/Workplace/task-detail-panel"
import ContentPlanningTool from "./Ideation"

// ✅ Simple reusable Button component
function Button({ children, className = "", variant = "solid", ...props }) {
  const baseStyles =
    "px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variants = {
    solid: "bg-[#3264DF] text-white hover:bg-[#2854CC] focus:ring-[#3264DF]",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

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
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [activeTask, setActiveTask] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [currentView, setCurrentView] = useState("kanban")
  const [prefilledData, setPrefilledData] = useState(null)

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
    setIsFormOpen(false)
    setPrefilledData(null)
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

  // ✅ FIXED: This function now properly handles task creation from content planning
  const handleCreateTaskFromContent = (taskData) => {
    console.log("Creating task from content planning:", taskData)
    
    // Create the new task with proper structure
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title || "",
      description: taskData.description || "",
      topic: taskData.topic || "",
      targetAudience: taskData.targetAudience || "",
      platform: taskData.platform || "",
      assignee: taskData.assignee || "",
      status: "unassigned",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Add the task to the tasks array
    setTasks((prevTasks) => [...prevTasks, newTask])
    
    // Navigate back to workplace
    setCurrentView("kanban")
    
    console.log("Task created successfully:", newTask)
  }

  // --- Content Planning View ---
  if (currentView === "content-planning") {
    return (
      <div className="flex h-screen bg-background">
        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#3264DF]">Content Planning</h1>
            <Button variant="outline" onClick={() => setCurrentView("kanban")}>
              Back to Workplace
            </Button>
          </div>
          {/* ✅ FIXED: Use the correct prop name */}
          <ContentPlanningTool onCreateTask={handleCreateTaskFromContent} />
        </main>
      </div>
    )
  }

  // --- Workplace (Kanban) View ---
  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#3264DF]">Workplace</h1>
          <Button onClick={() => setCurrentView("content-planning")} className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Generate Content Ideas
          </Button>
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
                onTaskClick={handleViewDetails}
              />
            ))}
          </div>
          <DragOverlay>{activeTask ? <TaskCard task={activeTask} /> : null}</DragOverlay>
        </DndContext>
      </main>

      <TaskFormPanel
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setPrefilledData(null)
        }}
        onSubmit={handleAddTask}
        prefilledData={prefilledData}
      />

      <TaskDetailPanel isOpen={isDetailOpen} onClose={handleCloseDetails} task={selectedTask} />
    </div>
  )
}