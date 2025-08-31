import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiStar, FiTrendingUp, FiTarget, FiUsers, FiClock, FiArrowLeft } from 'react-icons/fi';

const KanbanBoard = ({ tasks, onTasksComplete, aiRecommendation, onBack, onTriggerAIResponse }) => {
  const [taskStates, setTaskStates] = useState(
    tasks.reduce((acc, task) => {
      acc[task.id] = task.status;
      return acc;
    }, {})
  );
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [autoCompleted, setAutoCompleted] = useState(false);
  const [clickedButtons, setClickedButtons] = useState(new Set());

  // Reset clicked buttons when component mounts (new step)
  useEffect(() => {
    setClickedButtons(new Set());
  }, []);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'review', title: 'Review', color: 'bg-yellow-100' },
    { id: 'done', title: 'Done', color: 'bg-green-100' }
  ];

  useEffect(() => {
    if (aiRecommendation && !autoCompleted) {
      setShowAutoComplete(true);
    }
  }, [aiRecommendation, autoCompleted]);

  const handleAutoComplete = () => {
    setClickedButtons(prev => new Set([...prev, 'auto-complete']));
    
    // Trigger user dialog for auto-complete action
    if (onTriggerAIResponse) {
      setTimeout(() => {
        onTriggerAIResponse(`I have used AI to auto-complete high priority tasks. Please continue with the remaining workflow.`);
      }, 100);
    }
    
    // Simulate AI moving tasks based on priority
    const newTaskStates = { ...taskStates };
    
    tasks.forEach(task => {
      if (task.priority === 'high') {
        newTaskStates[task.id] = 'done';
      } else if (task.priority === 'medium') {
        newTaskStates[task.id] = 'review';
      } else {
        newTaskStates[task.id] = 'in-progress';
      }
    });
    
    setTaskStates(newTaskStates);
    setAutoCompleted(true);
    setShowAutoComplete(false);
  };

  const handleCompleteRemaining = () => {
    setClickedButtons(prev => new Set([...prev, 'complete-remaining']));
    
    // Trigger user dialog for complete remaining action
    if (onTriggerAIResponse) {
      setTimeout(() => {
        onTriggerAIResponse(`I have completed all remaining tasks. The content creation workflow is now ready.`);
      }, 100);
    }
    
    // Move all remaining tasks to done
    const newTaskStates = { ...taskStates };
    
    tasks.forEach(task => {
      if (taskStates[task.id] !== 'done') {
        newTaskStates[task.id] = 'done';
      }
    });
    
    setTaskStates(newTaskStates);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => taskStates[task.id] === status);
  };

  const isAllTasksDone = () => {
    return tasks.every(task => taskStates[task.id] === 'done');
  };

  const handleContinue = () => {
    setClickedButtons(prev => new Set([...prev, 'continue']));
    
    // Trigger user dialog for continue action
    if (onTriggerAIResponse) {
      setTimeout(() => {
        onTriggerAIResponse(`I have finished the content creation workflow. Please proceed to schedule the content.`);
      }, 100);
    }
    
    // Small delay to show the grey state before action
    setTimeout(() => {
      onTasksComplete(tasks.map(task => ({
        ...task,
        status: taskStates[task.id]
      })));
    }, 100);
  };

  const handleModifyClick = () => {
    setClickedButtons(prev => new Set([...prev, 'modify']));
    
    // Trigger user dialog for modify action
    if (onTriggerAIResponse) {
      setTimeout(() => {
        onTriggerAIResponse(`I would like to modify the content creation workflow. Can you help me adjust the tasks or priorities?`);
      }, 100);
    }
    
    console.log('User wants to modify workflow via chat');
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Strategy
        </button>
      )}

      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
          <FiUsers className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Content Creation Workflow</h3>
          <p className="text-gray-600">Organize and track your campaign content creation process</p>
        </div>
      </div>

      {/* AI Auto-Complete Suggestion */}
      {showAutoComplete && (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <FiStar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">AI Workflow Optimization</h4>
                <p className="text-sm text-gray-600">
                  I can automatically organize tasks based on priority and deadlines
                </p>
              </div>
            </div>
            <button
              onClick={handleAutoComplete}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all flex items-center gap-2"
            >
              <FiTrendingUp className="w-4 h-4" />
              Auto-Complete
            </button>
          </div>
        </div>
      )}

      {/* Progress Overview */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900">Progress Overview</h4>
          <div className="text-sm text-gray-600">
            {tasks.filter(task => taskStates[task.id] === 'done').length} of {tasks.length} completed
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${(tasks.filter(task => taskStates[task.id] === 'done').length / tasks.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-4 gap-4">
        {columns.map((column) => (
          <div key={column.id} className="space-y-3">
            <div className={`${column.color} rounded-lg p-3 text-center`}>
              <h5 className="font-medium text-gray-900">{column.title}</h5>
              <div className="text-sm text-gray-600">
                {getTasksByStatus(column.id).length} tasks
              </div>
            </div>
            <div className="space-y-2">
              {getTasksByStatus(column.id).map((task) => (
                <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm relative">
                  {taskStates[task.id] === 'done' && (
                    <div className="absolute -top-1 -right-1 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                      <FiStar className="w-2 h-2" />
                      AI
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-2">
                    <h6 className="font-medium text-gray-900 text-sm">{task.title}</h6>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {task.priority}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{task.assignee}</span>
                    <span>{task.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* AI Workflow Insights */}
      {aiRecommendation && (
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <h4 className="font-medium text-purple-900 mb-3 flex items-center gap-2">
            <FiTarget className="w-4 h-4" />
            AI Workflow Insights
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-purple-800">Priority Optimization</div>
              <div className="text-purple-600">High-priority tasks moved to completion</div>
            </div>
            <div>
              <div className="font-medium text-purple-800">Efficiency Boost</div>
              <div className="text-purple-600">Streamlined workflow reduces bottlenecks</div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {isAllTasksDone() 
            ? 'All tasks completed! Ready to move to scheduling.'
            : `${tasks.filter(task => taskStates[task.id] === 'done').length} of ${tasks.length} tasks completed`
          }
        </div>
        <div className="flex gap-3">
                        <button
                onClick={handleModifyClick}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  clickedButtons.has('modify')
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={clickedButtons.has('modify')}
              >
                <FiX className="w-4 h-4" />
                Modify
              </button>
              {!isAllTasksDone() && (
                <button
                  onClick={handleCompleteRemaining}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 cursor-pointer ${
                    clickedButtons.has('complete-remaining')
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                  disabled={clickedButtons.has('complete-remaining')}
                >
                  <FiCheck className="w-4 h-4" />
                  Complete Remaining
                </button>
              )}
              <button
                onClick={handleContinue}
                disabled={!isAllTasksDone() || clickedButtons.has('continue')}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  !isAllTasksDone() || clickedButtons.has('continue')
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg'
                }`}
              >
                Continue to Scheduling
                <FiTrendingUp className="w-4 h-4" />
              </button>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
