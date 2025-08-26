"use client"

export function TaskDetailPanel({ task, isOpen, onClose }) {
  if (!isOpen || !task) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Task Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
            <p className="text-gray-900 bg-gray-50 rounded-lg px-3 py-2">{task.title}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <p className="text-gray-900 bg-gray-50 rounded-lg px-3 py-2 min-h-[80px]">{task.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
              <p className="text-gray-900 bg-gray-50 rounded-lg px-3 py-2">{task.targetAudience}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
              <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-lg font-medium">
                {task.platform}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2">
              <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {task.assignee
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
              <span className="text-gray-900">{task.assignee}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <span
              className={`inline-block text-sm px-3 py-1 rounded-lg font-medium capitalize ${
                task.status === "unassigned"
                  ? "bg-gray-100 text-gray-800"
                  : task.status === "todo"
                  ? "bg-blue-100 text-blue-800"
                  : task.status === "inprogress"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {task.status === "inprogress" ? "In Progress" : task.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div>
              <label className="block font-medium mb-1">Created</label>
              <p>{new Date(task.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block font-medium mb-1">Updated</label>
              <p>{new Date(task.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
