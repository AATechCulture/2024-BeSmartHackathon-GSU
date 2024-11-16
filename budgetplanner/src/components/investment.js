import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/investmentPage.css";

function InvestmentPage() {
  const [apiHeadings, setApiHeadings] = useState([]); // Store API headings
  const [selectedMix, setSelectedMix] = useState(null);
  const [error, setError] = useState(null);

  // Investment mixes with placeholder names
  const investmentMixes = [
    {
      name: "Tech Innovators Portfolio",
      sectors: ["Technology", "AI", "Consumer Electronics"],
      projectedReturn: 15,
      risk: "High",
      distribution: { Tech: 50, AI: 30, ConsumerElectronics: 20 },
      description: "A high-risk, high-reward portfolio focused on cutting-edge tech companies.",
    },
    {
      name: "Sustainable Energy Fund",
      sectors: ["Renewable Energy", "Green Tech"],
      projectedReturn: 10,
      risk: "Medium",
      distribution: { RenewableEnergy: 60, GreenTech: 40 },
      description: "Invest in companies leading the way in sustainable energy and green technology.",
    },
    {
      name: "Healthcare Stability Mix",
      sectors: ["Healthcare", "Pharmaceuticals"],
      projectedReturn: 8,
      risk: "Low",
      distribution: { Healthcare: 70, Pharmaceuticals: 30 },
      description: "A stable portfolio focusing on established healthcare and pharmaceutical companies.",
    },
  ];

  // Fetch the headings from the API
  useEffect(() => {
    const fetchHeadings = async () => {
      try {
        const response = await fetch(
          "https://fantastic-capybara-g4w9xx544wh5j4-5000.app.github.dev/stock",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ iin: localStorage.iin }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setApiHeadings(data); // Save the array of strings
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchHeadings();
  }, []);

  const handleMixSelection = (mix) => {
    setSelectedMix(mix);
  };

  return (
    <div className="investment-mix-page">
      <div className="investment-hero">
        <h1>Explore Your Investment Mix</h1>
        <p>AI-powered recommendations tailored to your goals and risk appetite.</p>
      </div>

      <div className="investment-mix-section">
        <h2>Recommended Investment Mixes</h2>
        <div className="investment-cards">
          {investmentMixes.map((mix, index) => (
            <div
              key={index}
              className="card"
              onClick={() => handleMixSelection(mix)}
            >
              {/* Replace heading with API data if available */}
              <h3>{apiHeadings[index] || mix.name}</h3>
              <p>Sectors: {mix.sectors.join(", ")}</p>
              <p>Risk Level: {mix.risk}</p>
              <p>Projected Return: {mix.projectedReturn}%</p>
              <button>View Details</button>
            </div>
          ))}

          {error && <p className="error-text">{error}</p>}
        </div>
      </div>

      {selectedMix && (
        <div className="selected-mix-details">
          <h2>{selectedMix.name}</h2>
          <p>{selectedMix.description || "No description available."}</p>
          <h3>Portfolio Distribution</h3>
          <div className="chart-container">
            <Pie
              data={{
                labels: Object.keys(selectedMix.distribution),
                datasets: [
                  {
                    data: Object.values(selectedMix.distribution),
                    backgroundColor: ["#4caf50", "#81c784", "#a5d6a7"],
                    hoverBackgroundColor: ["#388e3c", "#66bb6a", "#9ccc65"],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default InvestmentPage;
