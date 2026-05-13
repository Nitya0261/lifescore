import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await registerUser(firstName, lastName, email, password);
    
    setLoading(false);

    if (res.success) {
      navigate("/profile");
    } else {
      setError(res.error || "Registration failed");
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
        setError(res?.error || "Google sign-up flow failed");
      }
    } else {
      setLoading(false);
      setError("Google Sign-In is not initialized");
    }
  };

  return (
    <div style={{ background: "var(--cream)", minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1rem" }}>
      <div style={{ background: "var(--card-bg)", width: "100%", maxWidth: "1000px", borderRadius: "var(--radius-lg)", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", display: "flex", overflow: "hidden", flexDirection: "row-reverse" }}>
        
        {/* Right Side - Image/Branding */}
        <div className="d-none d-lg-flex flex-column justify-content-between" style={{ flex: 1, background: "linear-gradient(135deg, var(--teal), #0a3d2e)", color: "#fff", padding: "3rem" }}>
          <div style={{ textAlign: "right" }}>
            <Link to="/" className="nav-logo" style={{ color: "#fff", fontSize: "1.8rem" }}>
              Life<span style={{ color: "var(--gold)" }}>Score</span>
            </Link>
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--serif)", fontWeight: 900, fontSize: "2.5rem", marginTop: "4rem", lineHeight: 1.2 }}>
              Start your journey today.
            </h2>
            <p style={{ opacity: 0.9, fontSize: "1.1rem", marginTop: "1rem", maxWidth: "90%" }}>
              Create your free account to track your net worth, get personalized AI advice, and access premium tools.
            </p>
          </div>
          <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
            "LifeScore completely changed how I look at my finances. Highly recommended!" — Sarah J.
          </div>
        </div>

        {/* Left Side - Form */}
        <div style={{ flex: 1, padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--card-bg)" }}>
          <div style={{ maxWidth: "400px", margin: "0 auto", width: "100%" }}>
            <h3 style={{ fontFamily: "var(--serif)", fontWeight: 900, marginBottom: "0.5rem", color: "var(--ink)" }}>Create an account</h3>
            <p style={{ color: "var(--ink3)", marginBottom: "2rem" }}>Enter your details below to get started.</p>

            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger" style={{ fontSize: "0.85rem", padding: "0.5rem" }}>{error}</div>}
              
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)" }}>First Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Jane" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    style={{ padding: "0.75rem", borderRadius: "8px" }}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)" }}>Last Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Doe" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    style={{ padding: "0.75rem", borderRadius: "8px" }}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)" }}>Email address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ padding: "0.75rem", borderRadius: "8px" }}
                />
              </div>
              <div className="mb-4">
                <label className="form-label" style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)" }}>Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Create a password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ padding: "0.75rem", borderRadius: "8px" }}
                />
                <div style={{ fontSize: "0.7rem", color: "var(--ink3)", marginTop: "0.3rem" }}>
                  Must be at least 8 characters long.
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-dark w-100 mb-3" style={{ padding: "0.75rem", fontWeight: 600, borderRadius: "8px" }}>
                {loading ? "Creating Account..." : "Create Account"}
              </button>
              
              <button type="button" onClick={handleGoogleLogin} disabled={loading} className="btn btn-outline-secondary w-100 mb-4" style={{ padding: "0.75rem", fontWeight: 600, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <i className="bi bi-google text-danger"></i> Sign up with Google
              </button>
            </form>

            <div style={{ textAlign: "center", fontSize: "0.9rem", color: "var(--ink3)" }}>
              Already have an account? <Link to="/login" style={{ color: "var(--ink)", fontWeight: 700, textDecoration: "none" }}>Sign in</Link>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
