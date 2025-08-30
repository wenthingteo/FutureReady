import React, { useState } from "react";
import Campaigns from "./Campaigns";

const CampaignsContainer = () => {
  const [view, setView] = useState('week'); // 'week' or 'month'
  const [posts, setPosts] = useState([]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [isSchedulingMode, setIsSchedulingMode] = useState(false);

  // Handle scheduling a new post or updating an existing one
  const handleSchedulePost = (postData) => {
    if (editingPost) {
      // Update existing post
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === editingPost.id ? postData : post
        )
      );
      setEditingPost(null);
    } else {
      // Add new post
      setPosts(prevPosts => [...prevPosts, postData]);
    }
    setIsSchedulingMode(false);
    setIsScheduleModalOpen(false);
  };

  // Handle editing a post
  const handleEditPost = (post) => {
    setEditingPost(post);
    setIsSchedulingMode(true);
  };

  // Handle opening schedule modal for new post
  const handleOpenScheduleModal = () => {
    setEditingPost(null);
    setIsSchedulingMode(true);
  };

  // Handle going back to calendar view
  const handleBackToCalendar = () => {
    setIsSchedulingMode(false);
    setEditingPost(null);
  };

  return (
    <Campaigns
      view={view}
      setView={setView}
      posts={posts}
      handleOpenScheduleModal={handleOpenScheduleModal}
      handleEditPost={handleEditPost}
      isScheduleModalOpen={isScheduleModalOpen}
      setIsScheduleModalOpen={setIsScheduleModalOpen}
      handleSchedulePost={handleSchedulePost}
      editingPost={editingPost}
      setEditingPost={setEditingPost}
      isSchedulingMode={isSchedulingMode}
      onBackToCalendar={handleBackToCalendar}
    />
  );
};

export default CampaignsContainer;
