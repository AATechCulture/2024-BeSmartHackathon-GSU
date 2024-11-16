import React, { useState } from "react";
import "../styles/login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [greeting, setGreeting] = useState(""); // To store the greeting
  const [error, setError] = useState(""); // To handle errors

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await fetch(
        "https://fantastic-capybara-g4w9xx544wh5j4-5000.app.github.dev/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from the API.");
      }

      const data = await response.json();
      const username = data.full_name || "Guest"; // Extract username or use "Guest"
      const iin = data.iin;
      localStorage.iin = iin;
      setGreeting(`Hi, ${username}!`);
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-text">{error}</p>}
        {greeting && <p className="greeting">{greeting}</p>}
      </div>
    </div>
  );
}

export default Login;
