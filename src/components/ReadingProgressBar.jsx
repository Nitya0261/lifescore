import React, { useState, useEffect } from 'react';

export default function ReadingProgressBar() {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Get current scroll position
      const scrollY = window.scrollY;
      
      // Get total scrollable height
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      
      const scrollPercent = (scrollY / (docHeight - winHeight)) * 100;
      
      setScrollWidth(scrollPercent);
    };

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        width: `${scrollWidth}%`,
        background: 'linear-gradient(90deg, var(--teal), #4ade80)',
        zIndex: 9999, // Super high z-index to stay above navbars
        transition: 'width 0.1s ease-out',
        pointerEvents: 'none' // Don't block clicks
      }}
    />
  );
}
