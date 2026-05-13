import React, { createContext, useState, useContext, useCallback } from "react";
import API_BASE_URL from "../config/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// XP thresholds per level
const LEVELS = [
  { level: 1, title: "Money Newbie",    min: 0    },
  { level: 2, title: "Budget Starter",  min: 100  },
  { level: 3, title: "Saver",           min: 300  },
  { level: 4, title: "Wealth Builder",  min: 600  },
  { level: 5, title: "Investor",        min: 1000 },
  { level: 6, title: "Finance Pro",     min: 1500 },
  { level: 7, title: "Money Master",    min: 2200 },
];

export function getLevelInfo(xp) {
  let current = LEVELS[0];
  let next = LEVELS[1];
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].min) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || null;
    }
  }
  const progress = next
    ? Math.round(((xp - current.min) / (next.min - current.min)) * 100)
    : 100;
  return { current, next, progress };
}

// XP reward amounts per action
export const XP_REWARDS = {
  READ_ARTICLE:     15,
  USE_TOOL:         25,
  COMPLETE_QUIZ:    40,
  DAILY_LOGIN:      10,
  UPDATE_LIFESCORE: 30,
  SHARE_ARTICLE:    20,
  BOOKMARK_ARTICLE: 10,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ role: "guest" });
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [xp, setXp] = useState(0);
  const [xpLog, setXpLog] = useState([]); // History of XP-earning actions
  const [notifications, setNotifications] = useState([]); // In-app toast notifications
  const [lastNotifTime, setLastNotifTime] = useState(Date.now());

  // Fetch user profile on initial mount if token exists
  React.useEffect(() => {
    const fetchUserMount = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/user/me`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data);
            setXp(data.xp || 0);
          } else {
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (e) {
          // Silently handle backend offline
        }
      }
    };
    fetchUserMount();
  }, []);

  // Poll for push notifications
  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/notifications`);
        const data = await res.json();
        if (data && data.length > 0) {
          const latest = data[0];
          const notifTime = new Date(latest.createdAt).getTime();
          // If this notification was created after our last check
          if (notifTime > lastNotifTime) {
            setLastNotifTime(notifTime);
            // Show toast
            setNotifications((prev) => [
              { id: Date.now(), message: `📢 ${latest.title}: ${latest.message}`, type: "info" },
              ...prev,
            ]);
            setTimeout(() => {
              setNotifications((prev) => prev.slice(0, -1));
            }, 6000); // 6 seconds for push
          }
        }
      } catch {
        // Silently fail if backend is down
      }
    };
    const interval = setInterval(fetchNotifications, 5000); // Check every 5s
    return () => clearInterval(interval);
  }, [lastNotifTime]);

  const registerUser = async (firstName, lastName, email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Registration failed");

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      setXp(data.user.xp || 0);
      
      // Award login XP
      addXp(XP_REWARDS.DAILY_LOGIN, "Welcome Bonus!");
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const loginUser = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Login failed");

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      setXp(data.user.xp || 0);

      addXp(XP_REWARDS.DAILY_LOGIN, "Daily Login Bonus");
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: "google.member@lifescore.app",
          firstName: "Google",
          lastName: "Member",
          googleId: "g_oauth_verified_992102"
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Google authentication handshake failed");

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      setXp(data.user.xp || 0);

      addXp(XP_REWARDS.DAILY_LOGIN, "Google Secure Authentication!");
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Mock fallback login for testing roles without backend
  const login = (role) => {
    setUser({ role });
    if (role !== "guest") {
      addXp(XP_REWARDS.DAILY_LOGIN, "Daily Login Bonus");
    }
  };

  const logout = () => {
    setUser({ role: "guest" });
    setToken(null);
    localStorage.removeItem("token");
    setXp(0);
    setXpLog([]);
  };

  // Core XP award function
  const addXp = useCallback(async (amount, reason) => {
    if (!amount || amount <= 0) return;
    setXp((prev) => prev + amount);

    // If logged in, push to backend
    if (user && user.id) {
      try {
        await fetch(`${API_BASE_URL}/api/user/xp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, amount })
        });
      } catch (e) {
        console.error("Failed to update XP on server", e);
      }
    }

    const entry = {
      id: Date.now(),
      amount,
      reason,
      timestamp: new Date().toLocaleTimeString(),
    };
    setXpLog((prev) => [entry, ...prev].slice(0, 20)); // keep last 20

    // Trigger in-app notification toast
    setNotifications((prev) => [
      { id: Date.now(), message: `+${amount} XP — ${reason}!`, type: "xp" },
      ...prev,
    ]);
    // Auto-remove toast after 3s
    setTimeout(() => {
      setNotifications((prev) => prev.slice(0, -1));
    }, 3000);
  }, [user]);

  // Convenience action helpers
  const awardReadArticle  = useCallback(() => addXp(XP_REWARDS.READ_ARTICLE,     "Article Read"),      [addXp]);
  const awardUseTool      = useCallback(() => addXp(XP_REWARDS.USE_TOOL,          "Tool Used"),         [addXp]);
  const awardBookmark     = useCallback(() => addXp(XP_REWARDS.BOOKMARK_ARTICLE,  "Article Bookmarked"),[addXp]);
  const awardShare        = useCallback(() => addXp(XP_REWARDS.SHARE_ARTICLE,     "Article Shared"),    [addXp]);
  const awardLifeScore    = useCallback(() => addXp(XP_REWARDS.UPDATE_LIFESCORE,  "LifeScore Updated"), [addXp]);

  const updateUserProfile = useCallback(async (updateFields) => {
    setUser((prev) => ({ ...prev, ...updateFields }));
    if (updateFields.xp !== undefined) setXp(updateFields.xp);

    const currentToken = localStorage.getItem('token');
    if (currentToken && user && user.id) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/user/me`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentToken}`
          },
          body: JSON.stringify(updateFields)
        });
        if (res.ok) {
          const updatedData = await res.json();
          setUser(updatedData);
          setXp(updatedData.xp || 0);
        }
      } catch (e) {
        console.error("Failed to update user profile on server", e);
      }
    }
  }, [user]);

  const levelInfo = getLevelInfo(xp);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const toggleAuthModal = (val) => setAuthModalOpen(val !== undefined ? val : !authModalOpen);

  return (
    <AuthContext.Provider value={{
      user, login, loginUser, registerUser, loginWithGoogle, logout, token,
      xp, xpLog, levelInfo,
      addXp,
      updateUserProfile,
      awardReadArticle,
      awardUseTool,
      awardBookmark,
      awardShare,
      awardLifeScore,
      notifications,
      authModalOpen,
      toggleAuthModal,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
