import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("admin@ecosentinel.org");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    }
  };

  return (
    <div className="auth-screen topo-bg">
      <div className="auth-card">
        <div className="eyebrow">Field Console</div>
        <h1>EcoSentinel</h1>
        <p className="sub">Sign in to monitor tracked wildlife in real time.</p>

        {error && <div className="error-text">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary">Sign in</button>
        </form>

        <span className="link-muted">
          New ranger account? <Link to="/register" style={{ color: "var(--amber)" }}>Register here</Link>
        </span>
        <span className="link-muted" style={{ marginTop: 8 }}>
          Demo login pre-filled — run <code>npm run seed</code> in backend first.
        </span>
      </div>
    </div>
  );
};

export default Login;
