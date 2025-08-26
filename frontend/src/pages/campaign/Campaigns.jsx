import React from "react";
import Calendar from "../../components/calendar/Calendar";
import ScheduleModal from "../../components/calendar/ScheduleModal";

const Campaigns = ({
  view,
  setView,
  posts,
  handleOpenScheduleModal,
  handleEditPost,
  isScheduleModalOpen,
  setIsScheduleModalOpen,
  handleSchedulePost,
  editingPost,
  setEditingPost,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#3264DF]">Campaign Hub</h1>
      </div>

      {/* Calendar Component */}
      <Calendar
        view={view}
        setView={setView}
        posts={posts}
        onSchedulePost={handleOpenScheduleModal}
        onEditPost={handleEditPost}
      />

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => {
          setIsScheduleModalOpen(false);
          setEditingPost(null);
        }}
        onSchedule={handleSchedulePost}
        editingPost={editingPost}
      />
    </div>
  );
};

export default Campaigns;
