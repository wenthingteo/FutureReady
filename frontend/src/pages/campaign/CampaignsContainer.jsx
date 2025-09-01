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
    console.log('handleSchedulePost called with:', postData);
    
    if (editingPost) {
      // Update existing post
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === editingPost.id ? postData : post
        )
      );
      setEditingPost(null);
    } else {
      // Handle new scheduling data - check if it contains posts array
      if (postData.posts && Array.isArray(postData.posts)) {
        // AI scheduling completed - add all the scheduled posts
        console.log('Adding scheduled posts to calendar:', postData.posts);
        setPosts(prevPosts => [...prevPosts, ...postData.posts]);
      } else if (postData.id) {
        // Single post object - add it directly
        console.log('Adding single post to calendar:', postData);
        setPosts(prevPosts => [...prevPosts, postData]);
      } else {
        // Legacy format or unexpected data
        console.warn('Unexpected post data format:', postData);
      }
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
