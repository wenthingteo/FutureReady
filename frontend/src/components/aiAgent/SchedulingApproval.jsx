import { useState } from 'react';
import { FiEdit3, FiCheck, FiClock, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

// Custom TikTok Icon Component
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.10z"/>
  </svg>
);

const getPlatformIcon = (platform) => {
  switch (platform) {
    case 'Facebook': return Facebook;
    case 'Instagram': return Instagram;
    case 'LinkedIn': return Linkedin;
    case 'TikTok': return TikTokIcon;
    case 'YouTube': return Youtube;
    default: return Facebook;
  }
};

const getPlatformColor = (platform) => {
  switch (platform) {
    case 'Facebook': return 'bg-blue-100 text-blue-700';
    case 'Instagram': return 'bg-pink-100 text-pink-700';
    case 'LinkedIn': return 'bg-blue-100 text-blue-700';
    case 'TikTok': return 'bg-black text-white';
    case 'YouTube': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const SchedulingApproval = ({ schedule, onApprove, onModify }) => {
  const [editingSchedule, setEditingSchedule] = useState({});
  const [approvedSchedule, setApprovedSchedule] = useState({});
  const [modifiedSchedule, setModifiedSchedule] = useState(schedule);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];
  const platforms = ['Facebook', 'Instagram', 'LinkedIn', 'TikTok', 'YouTube'];

  const handleEditSchedule = (index) => {
    setEditingSchedule({ ...editingSchedule, [index]: true });
  };

  const handleSaveSchedule = (index, field, value) => {
    const updatedSchedule = [...modifiedSchedule];
    updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
    setModifiedSchedule(updatedSchedule);
    onModify(updatedSchedule);
  };

  const handleApproveSchedule = (index) => {
    setApprovedSchedule({ ...approvedSchedule, [index]: true });
  };

  const handleApproveAll = () => {
    onApprove(modifiedSchedule);
  };

  const handleQuickApprove = () => {
    // Auto-approve all schedule items
    const allApproved = {};
    modifiedSchedule.forEach((_, index) => {
      allApproved[index] = true;
    });
    setApprovedSchedule(allApproved);
    onApprove(modifiedSchedule);
  };

  const isAllScheduleApproved = () => {
    return modifiedSchedule.every((_, index) => approvedSchedule[index]);
  };

  const addNewScheduleItem = () => {
    const newItem = {
      day: 'Monday',
      time: '9:00 AM',
      platform: 'Facebook',
      content: 'New social media post'
    };
    setModifiedSchedule([...modifiedSchedule, newItem]);
  };

  const removeScheduleItem = (index) => {
    const updatedSchedule = modifiedSchedule.filter((_, i) => i !== index);
    setModifiedSchedule(updatedSchedule);
    onModify(updatedSchedule);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">📅 Schedule Review</h3>
        <div className="text-sm text-gray-500">Review your posting schedule</div>
      </div>

      <div className="space-y-3">
        {modifiedSchedule.map((item, index) => {
          const Icon = getPlatformIcon(item.platform);
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-gray-400" size={16} />
                  <span className="text-sm font-medium text-gray-700">Schedule Item {index + 1}</span>
                </div>
                <div className="flex items-center gap-2">
                  {approvedSchedule[index] && (
                    <span className="text-green-600 text-xs flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                      <FiCheck size={12} /> Approved
                    </span>
                  )}
                  <button
                    onClick={() => handleEditSchedule(index)}
                    className="p-1 text-gray-400 hover:text-[#475ECD] transition-colors"
                    title="Edit schedule"
                  >
                    <FiEdit3 size={14} />
                  </button>
                  <button
                    onClick={() => removeScheduleItem(index)}
                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                    title="Remove item"
                  >
                    ×
                  </button>
                  {!approvedSchedule[index] && (
                    <button
                      onClick={() => handleApproveSchedule(index)}
                      className="px-3 py-1 bg-[#475ECD] text-white text-xs rounded-lg hover:bg-[#3d4fb8] transition-colors"
                    >
                      Approve
                    </button>
                  )}
                </div>
              </div>

              {editingSchedule[index] ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Day</label>
                      <select
                        value={item.day}
                        onChange={(e) => handleSaveSchedule(index, 'day', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#475ECD] focus:border-transparent"
                      >
                        {daysOfWeek.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
                      <select
                        value={item.time}
                        onChange={(e) => handleSaveSchedule(index, 'time', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#475ECD] focus:border-transparent"
                      >
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Platform</label>
                      <select
                        value={item.platform}
                        onChange={(e) => handleSaveSchedule(index, 'platform', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#475ECD] focus:border-transparent"
                      >
                        {platforms.map(platform => (
                          <option key={platform} value={platform}>{platform}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Content Type</label>
                      <input
                        type="text"
                        value={item.content}
                        onChange={(e) => handleSaveSchedule(index, 'content', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#475ECD] focus:border-transparent"
                        placeholder="Content description"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingSchedule({ ...editingSchedule, [index]: false })}
                      className="px-3 py-1 bg-[#475ECD] text-white text-xs rounded-lg hover:bg-[#3d4fb8] transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingSchedule({ ...editingSchedule, [index]: false })}
                      className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <FiClock className="text-gray-400" size={14} />
                    <span className="text-gray-600">{item.day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">🕐</span>
                    <span className="text-gray-600">{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <span className={`px-2 py-1 rounded text-xs ${getPlatformColor(item.platform)}`}>
                      {item.platform}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">📝</span>
                    <span className="text-gray-600 truncate">{item.content}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          {isAllScheduleApproved() ? 'All schedule items approved!' : 'Review and approve your schedule'}
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleQuickApprove}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <FiCheck size={16} />
            Approve All
          </button>
          <button
            onClick={handleApproveAll}
            disabled={!isAllScheduleApproved()}
            className="px-6 py-2 bg-gradient-to-r from-[#475ECD] to-purple-600 text-white rounded-lg hover:from-[#3d4fb8] hover:to-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            Continue
            <FiArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchedulingApproval;
