import React from "react";
import saiveImage from "../images/saive.jpg"
import "../styles/landingpage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to <span className="brand">sAIve</span></h1>
          <p>Your trusted partner for smart budgeting, investments, and financial growth.</p>
          <div className="hero-buttons">
            <a href="/budgeting" className="hero-link">Explore Budgeting</a>
            <a href="/signup" className="hero-link">Sign Up</a>
            <a href="/investment" className="hero-link">Investment Plans</a>
          </div>
        </div>
        <div className="hero-image">
          <img src={saiveImage} alt="Smart Financial Planning" />
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
        <a href="/signup" className="cta-button">Get Started</a>
    </section>


    </div>
  );
}

export default LandingPage;
