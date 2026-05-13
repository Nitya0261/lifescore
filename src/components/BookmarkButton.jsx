import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';

export default function BookmarkButton({ itemType, title, slug, initialIsBookmarked = false, className = "" }) {
  const { user, addXp, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  // Directly evaluate dynamic flag from context arrays to sync multi-card displays natively
  const isBookmarked = user?.bookmarks?.includes(slug) || initialIsBookmarked;
  const [loading, setLoading] = useState(false);

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user || user.role === "guest") {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookmarks/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          itemType,
          title,
          slug
        })
      });
      const data = await res.json();
      
      if (data.bookmarks && updateUserProfile) {
        updateUserProfile({ bookmarks: data.bookmarks });
      }
      
      if (data.status === 'added') {
        addXp(5, "Saved an item!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={loading}
      className={`btn btn-sm ${isBookmarked ? 'btn-teal' : 'btn-outline-secondary'} ${className}`}
      style={{ 
        borderRadius: "50%", 
        width: "36px", 
        height: "36px", 
        display: "inline-flex", 
        alignItems: "center", 
        justifyContent: "center",
        transition: "all 0.2s ease"
      }}
      title={isBookmarked ? "Remove Bookmark" : "Save for Later"}
    >
      <i className={`bi ${isBookmarked ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
    </button>
  );
}
