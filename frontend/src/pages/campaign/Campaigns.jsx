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
  isSchedulingMode,
  onBackToCalendar,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#3264DF]">Campaign Hub</h1>
      </div>

      {/* Conditional Rendering */}
      {isSchedulingMode ? (
        /* Scheduling Interface */
        <div className="min-h-screen">
          <ScheduleModal
            isOpen={true}
            onClose={onBackToCalendar}
            onSchedule={handleSchedulePost}
            editingPost={editingPost}
            isFullPage={true}
          />
        </div>
      ) : (
        /* Calendar View */
        <>
          <Calendar
            view={view}
            setView={setView}
            posts={posts}
            onSchedulePost={handleOpenScheduleModal}
            onEditPost={handleEditPost}
          />

          {/* Legacy Modal (keeping for backward compatibility) */}
          <ScheduleModal
            isOpen={isScheduleModalOpen}
            onClose={() => {
              setIsScheduleModalOpen(false);
              setEditingPost(null);
            }}
            onSchedule={handleSchedulePost}
            editingPost={editingPost}
            isFullPage={false}
          />
        </>
      )}
    </div>
  );
};

export default Campaigns;
