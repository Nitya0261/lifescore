import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';

export default function BookmarkButton({ itemType, title, slug, initialIsBookmarked = false, className = "" }) {
  const { user, addXp, updateUserProfile, toggleAuthModal } = useAuth();
  const navigate = useNavigate();
  
  const isBookmarked = user?.bookmarks?.some(b => (typeof b === 'string' ? b === slug : b.slug === slug)) || initialIsBookmarked;
  const [loading, setLoading] = useState(false);
  const [showCutePopup, setShowCutePopup] = useState(false);

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user || user.role === "guest") {
      toggleAuthModal(true);
      return;
    }

    setLoading(true);
    let wasAdded = false;

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
      if (!res.ok) throw new Error("Failed remote toggle handshake");
      const data = await res.json();
      
      if (data.bookmarks && updateUserProfile) {
        updateUserProfile({ bookmarks: data.bookmarks });
      }
      
      if (data.status === 'added') {
        wasAdded = true;
        addXp(5, `Saved: ${title}`);
      }
    } catch (err) {
      console.warn("Backend offline, triggering local bookmark simulation toggle:", err.message);
      const currentList = user?.bookmarks || [];
      const isAlreadyAdded = currentList.some(s => (typeof s === 'string' ? s === slug : s.slug === slug));
      const nextBookmarks = isAlreadyAdded 
        ? currentList.filter(s => (typeof s === 'string' ? s !== slug : s.slug !== slug)) 
        : [...currentList, { slug, title, itemType, _id: slug, createdAt: new Date().toISOString() }];
      
      if (updateUserProfile) {
        updateUserProfile({ bookmarks: nextBookmarks });
      }
      
      if (!isAlreadyAdded) {
        wasAdded = true;
        addXp(5, `Saved: ${title}`);
      }
    } finally {
      setLoading(false);
      // Trigger cute popup if newly favorited
      if (wasAdded) {
        setShowCutePopup(true);
      }
    }
  };

  // Auto-dismiss the cute popup after 2.2 seconds
  useEffect(() => {
    if (showCutePopup) {
      const timer = setTimeout(() => {
        setShowCutePopup(false);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [showCutePopup]);

  return (
    <>
      <button 
        onClick={handleToggle}
        disabled={loading}
        className={`btn btn-sm ${className}`}
        style={{ 
          borderRadius: "50%", 
          width: "36px", 
          height: "36px", 
          display: "inline-flex", 
          alignItems: "center", 
          justifyContent: "center",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: loading ? "scale(0.9)" : "scale(1)",
          background: isBookmarked ? "rgba(225, 29, 72, 0.1)" : "transparent",
          color: isBookmarked ? "#e11d48" : "var(--ink3)",
          border: isBookmarked ? "1px solid rgba(225, 29, 72, 0.2)" : "1px solid var(--border)",
        }}
        title={isBookmarked ? "Remove from Favorites" : "Add to Favorites"}
        aria-label={isBookmarked ? "Remove from Favorites" : "Add to Favorites"}
      >
        <i className={`bi ${isBookmarked ? 'bi-heart-fill animate-pulse text-danger' : 'bi-heart'}`}></i>
      </button>

      {/* Cute and Simple Overlay Popup for Favoriting Items wrapped in React Portal to bypass CSS parent transforms */}
      {showCutePopup && createPortal(
        <div 
          className="position-fixed"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000000,
            pointerEvents: "none",
            animation: "cutePopIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, cutePopOut 0.3s ease 1.9s forwards"
          }}
        >
          <div 
            className="p-4 text-center rounded-4 shadow-lg"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              border: "2px solid #fecdd3",
              boxShadow: "0 20px 40px rgba(244, 63, 94, 0.15)",
              minWidth: "220px"
            }}
          >
            {/* Cute Bouncy Heart Mascot Icon */}
            <div 
              className="mx-auto mb-2 d-flex align-items-center justify-content-center"
              style={{
                width: "56px",
                height: "56px",
                background: "linear-gradient(135deg, #ffe4e6, #fecdd3)",
                borderRadius: "50%",
                color: "#e11d48",
                fontSize: "1.8rem",
                animation: "cuteHeartBeat 0.6s infinite alternate ease-in-out"
              }}
            >
              ❤️
            </div>

            <h5 className="fw-bolder mb-1" style={{ color: "#be123c", fontFamily: "var(--serif)", fontSize: "1.2rem" }}>
              Added to Favourites!
            </h5>
            <p className="small mb-0 text-muted fw-bold" style={{ fontSize: "0.8rem" }}>
              Saved directly to your Member Profile.
            </p>
          </div>

          <style>{`
            @keyframes cutePopIn {
              0% { opacity: 0; transform: translate(-50%, -40%) scale(0.6); }
              100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes cutePopOut {
              0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
              100% { opacity: 0; transform: translate(-50%, -60%) scale(0.8); }
            }
            @keyframes cuteHeartBeat {
              0% { transform: scale(0.95) rotate(-3deg); }
              100% { transform: scale(1.15) rotate(5deg); }
            }
          `}</style>
        </div>,
        document.body
      )}
    </>
  );
}
