import React, { useState } from "react";
import Campaigns from "./Campaigns";

const CampaignsContainer = () => {
  const [view, setView] = useState('week'); // 'week' or 'month'
  const [posts, setPosts] = useState([]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

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
    setIsScheduleModalOpen(false);
  };

  // Handle editing a post
  const handleEditPost = (post) => {
    setEditingPost(post);
    setIsScheduleModalOpen(true);
  };

  // Handle opening schedule modal for new post
  const handleOpenScheduleModal = () => {
    setEditingPost(null);
    setIsScheduleModalOpen(true);
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
    />
  );
};

export default CampaignsContainer;
