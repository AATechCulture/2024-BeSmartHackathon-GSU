import React from "react";
import "../styles/landingpage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to sAIve</h1>
          <p>Your trusted partner for smart budgeting, investments, and financial growth.</p>
          <div className="hero-buttons">
            <button onClick={() => window.location.href = "/budgeting"}>Explore Budgeting</button>
            <button onClick={() => window.location.href = "/signup"}>Sign Up</button>
            <button onClick={() => window.location.href = "/investment"}>Investment Plans</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://via.placeholder.com/500" alt="Smart Financial Planning" />
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose sAIve?</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Smart Budgeting</h3>
            <p>Gain insights into your spending habits and set realistic goals with ease.</p>
          </div>
          <div className="card">
            <h3>Tailored Investments</h3>
            <p>Let sAIve guide you to investment opportunities that align with your financial goals.</p>
          </div>
          <div className="card">
            <h3>Secure & Reliable</h3>
            <p>Join a growing community that values security and reliability in financial planning.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta">
        <h2>Start Your Financial Journey</h2>
        <p>Sign up today and take the first step toward financial empowerment with sAIve.</p>
        <button onClick={() => window.location.href = "/signup"}>Get Started</button>
      </section>

    </div>
  );
}

export default LandingPage;
