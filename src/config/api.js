// Dynamic API Resolution Strategy:
// Resolves explicit env flags first, falls back seamlessly to the Live Render Service on Cloud instances, or Localhost for local dev
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && (window.location.hostname.includes('netlify.app') || window.location.hostname.includes('vercel.app'))
    ? 'https://lifescore-backend.onrender.com' 
    : 'http://localhost:5001');

export default API_BASE_URL;
