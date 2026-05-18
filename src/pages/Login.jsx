import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

export default function Login() {
  const { loginUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await loginUser(email, password);
    
    setLoading(false);
    
    if (res.success) {
      if (email.toLowerCase().includes("admin")) {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } else {
      setError(res.error || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    if (loginWithGoogle) {
      const res = await loginWithGoogle();
      setLoading(false);
      if (res?.success) {
        navigate("/profile");
      } else {
        setError(res?.error || "Google sign-in flow failed");
      }
    } else {
      setLoading(false);
      setError("Google Sign-In is not initialized");
    }
  };

  return (
    <div style={{ background: "var(--cream)", minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1rem" }}>
      <SEO 
        title="Sign In" 
        description="Access your personal LifeScore telemetry dashboard, track your goals, and view AI recommendations."
      />
      <div style={{ background: "var(--card-bg)", width: "100%", maxWidth: "1000px", borderRadius: "var(--radius-lg)", boxShadow: "0 20px 40px rgba(0,0,0,0.15)", display: "flex", overflow: "hidden" }}>
        
        {/* Left Side - Image/Branding (always dark) */}
        <div className="d-none d-lg-flex flex-column justify-content-between" style={{ flex: 1, background: "linear-gradient(160deg, #0f1923 0%, #1a3a5c 100%)", color: "#fff", padding: "3rem" }}>
          <div>
            <Link to="/" className="nav-logo" style={{ color: "#fff", fontSize: "1.8rem" }}>
              Life<span style={{ color: "var(--accent)" }}>Score</span>
            </Link>
            <h2 style={{ fontFamily: "var(--serif)", fontWeight: 900, fontSize: "2.5rem", marginTop: "4rem", lineHeight: 1.2 }}>
              Master your money.<br/>Master your life.
            </h2>
            <p style={{ opacity: 0.8, fontSize: "1.1rem", marginTop: "1rem", maxWidth: "80%" }}>
              Join over 120,000 members who are taking control of their financial future with our intelligent tracking and AI insights.
            </p>
          </div>
          <div style={{ fontSize: "0.85rem", opacity: 0.5 }}>
            © 2026 LifeScore Inc. All rights reserved.
          </div>
        </div>

        {/* Right Side - Form */}
        <div style={{ flex: 1, padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--card-bg)" }}>
          <div style={{ maxWidth: "400px", margin: "0 auto", width: "100%" }}>
            <h3 style={{ fontFamily: "var(--serif)", fontWeight: 900, marginBottom: "0.5rem", color: "var(--ink)" }}>Welcome back</h3>
            <p style={{ color: "var(--ink3)", marginBottom: "2rem" }}>Please enter your details to sign in.</p>

            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger" style={{ fontSize: "0.85rem", padding: "0.5rem" }}>{error}</div>}
              
              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)" }}>Email address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ padding: "0.75rem", borderRadius: "8px" }}
                />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)" }}>Password</label>
                  <a href="#" style={{ fontSize: "0.8rem", color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Forgot password?</a>
                </div>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ padding: "0.75rem", borderRadius: "8px" }}
                />
              </div>

              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe" style={{ fontSize: "0.85rem", color: "var(--ink3)" }}>
                  Remember me for 30 days
                </label>
              </div>

              <button type="submit" disabled={loading} className="btn btn-dark w-100 mb-3" style={{ padding: "0.75rem", fontWeight: 600, borderRadius: "8px" }}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
              
              <button type="button" onClick={handleGoogleLogin} disabled={loading} className="btn btn-outline-secondary w-100 mb-4" style={{ padding: "0.75rem", fontWeight: 600, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <i className="bi bi-google text-danger"></i> Sign in with Google
              </button>
            </form>

            <div style={{ textAlign: "center", fontSize: "0.9rem", color: "var(--ink3)" }}>
              Don't have an account? <Link to="/register" style={{ color: "var(--ink)", fontWeight: 700, textDecoration: "none" }}>Sign up</Link>
            </div>
            
            <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.75rem", color: "var(--border2)" }}>
              <strong>Demo Tip:</strong> Type "admin" in email for Admin role, "pro" for Premium, or anything else for Standard.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
