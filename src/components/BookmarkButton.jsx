import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';

export default function BookmarkButton({ itemType, title, slug, initialIsBookmarked = false, className = "" }) {
  const { user, addXp } = useAuth();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [loading, setLoading] = useState(false);

  // If we don't know the initial state, we could fetch it, but usually it's better 
  // to fetch all user bookmarks once in context and pass them down. 
  // For simplicity, we'll assume the parent handles initial state or we just let them toggle.

  const handleToggle = async (e) => {
    e.preventDefault(); // Prevent navigating if this button is inside a Link card
    e.stopPropagation();

    if (!user) {
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
      
      if (data.status === 'added') {
        setIsBookmarked(true);
        addXp(5, "Saved an item!");
      } else if (data.status === 'removed') {
        setIsBookmarked(false);
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
