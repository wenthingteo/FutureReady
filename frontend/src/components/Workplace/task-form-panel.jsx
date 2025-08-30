"use client"

import { useState, useEffect } from "react"

const platforms = ["TikTok", "Instagram", "YouTube", "Twitter", "LinkedIn", "Facebook"]
const assignees = ["Kelly Tan", "John Doe", "Jane Smith", "Mike Johnson"]

export function TaskFormPanel({ isOpen, onClose, onSubmit, prefilledData = {} }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "",
    targetAudience: "",
    platform: "",
    assignee: "",
  })

  // Update form data when prefilledData changes
  useEffect(() => {
    if (prefilledData && Object.keys(prefilledData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        ...prefilledData,
      }))
    }
  }, [prefilledData])

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("[v0] Form submitted with data:", formData)

    if (formData.title && formData.platform && formData.assignee) {
      console.log("[v0] Form validation passed, calling onSubmit")
      onSubmit(formData)

      setFormData({
        title: "",
        description: "",
        topic: "",
        targetAudience: "",
        platform: "",
        assignee: "",
      })
      console.log("[v0] Form data reset")
    } else {
      console.log("[v0] Form validation failed - missing required fields")
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Full-screen blurred overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30" onClick={onClose} />

      {/* Centered panel */}
      <div className="relative w-[700px] sm:w-[900px] max-h-[90vh] bg-white shadow-xl overflow-y-auto rounded-2xl">
        {/* Panel header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Add New Task</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Panel form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title *{prefilledData?.title && <span className="text-blue-600 text-xs ml-1">(Auto-filled)</span>}
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter task title"
              required
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                prefilledData?.title ? "border-blue-300 bg-blue-50" : "border-gray-300"
              }`}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">
              Target Audience
              {prefilledData?.targetAudience && <span className="text-blue-600 text-xs ml-1">(Auto-filled)</span>}
            </label>
            <input
              id="targetAudience"
              type="text"
              value={formData.targetAudience}
              onChange={(e) => handleInputChange("targetAudience", e.target.value)}
              placeholder="Who is this content for?"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none ${
                prefilledData?.targetAudience ? "border-blue-300 bg-blue-50" : "border-gray-300"
              }`}
            />
          </div>

          {/* Platform + Assignee in one row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
                Platform *
              </label>
              <select
                id="platform"
                value={formData.platform}
                onChange={(e) => handleInputChange("platform", e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Select platform</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">
                Assignee *
              </label>
              <select
                id="assignee"
                value={formData.assignee}
                onChange={(e) => handleInputChange("assignee", e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Select assignee</option>
                {assignees.map((assignee) => (
                  <option key={assignee} value={assignee}>
                    {assignee}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
              {prefilledData?.description && <span className="text-blue-600 text-xs ml-1">(Auto-filled)</span>}
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the task in detail..."
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none ${
                prefilledData?.description ? "border-blue-300 bg-blue-50" : "border-gray-300"
              }`}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="bg-[#475ECD] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-[#475ECD] rounded-md hover:bg-gray-50 transition-colors font-medium text-[#475ECD]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
