import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2"; // Importing chart for visualization
import "chart.js/auto"; // Automatically register required chart components
import "../styles/budgetingPage.css";

function BudgetingPage() {
  const [budgetData, setBudgetData] = useState(null); // State for budget data from API
  const [recommendations, setRecommendations] = useState([]); // State for recommendations
  const [loading, setLoading] = useState(true); // Loading state for initial data
  const [loadingRecommendations, setLoadingRecommendations] = useState(false); // Loading state for recommendations
  const [error, setError] = useState(null); // Error state

  // Fetch budget details
  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await fetch(
          "https://fantastic-capybara-g4w9xx544wh5j4-5000.app.github.dev/bank", // Replace with your API endpoint
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ iin: localStorage.iin }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch budget details");
        }

        const data = await response.json(); // Parse the API response
        setBudgetData(data); // Set the budget data

        // Trigger fetching recommendations after budget details are loaded
        setLoadingRecommendations(true);
        fetchRecommendations();
      } catch (error) {
        setError(error.message); // Set the error message
      } finally {
        setLoading(false); // End the loading state for budget details
      }
    };

    fetchBudgetData();
  }, []);

  // Fetch recommendations after budget details are loaded
  const fetchRecommendations = async () => {
    try {
      const response = await fetch(
        "https://fictional-sniffle-x76pxj954xr355j-5000.app.github.dev/budget", // Replace with your API endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ iin: localStorage.iin }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch budget recommendations");
      }

      const data = await response.json(); // Parse the API response
      setRecommendations(data); // Set recommendations
    } catch (error) {
      setError(error.message); // Handle any errors
    } finally {
      setLoadingRecommendations(false); // End the loading state for recommendations
    }
  };

  if (loading) {
    return (
      <div className="budgeting-page">
        <h1>Fetching Bank Details...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="budgeting-page">
        <h1>Error: {error}</h1>
      </div>
    );
  }

  // Extract values from API data
  const { salary, shopping, groceries, gas, bills } = budgetData || {};

  // Expense categories and amounts
  const expenseData = [
    { category: "Shopping", amount: shopping || 0 },
    { category: "Groceries", amount: groceries || 0 },
    { category: "Gas", amount: gas || 0 },
    { category: "Bills", amount: bills || 0 },
  ];

  // Total Expenses
  const totalExpenses = expenseData.reduce((total, item) => total + item.amount, 0);

  // Remaining Budget
  const remainingBudget = salary - totalExpenses;

  // Data for Pie Chart
  const pieChartData = {
    labels: expenseData.map((expense) => expense.category),
    datasets: [
      {
        data: expenseData.map((expense) => expense.amount),
        backgroundColor: ["#4caf50", "#81c784", "#a5d6a7", "#c8e6c9"],
        hoverBackgroundColor: ["#388e3c", "#66bb6a", "#9ccc65", "#aed581"],
      },
    ],
  };

  return (
    <div className="budgeting-page">
      {/* Hero Section */}
      <header className="budget-hero">
        <div className="hero-content">
          <h1>Personalized Budget Overview</h1>
          <p>
            View your expenses, savings, and remaining budget based on your bank
            details.
          </p>
        </div>
      </header>

      {/* Budget Overview */}
      <section className="graphs-section">
        <h2>Your Financial Overview</h2>
        <div className="graphs-container">
          <div className="graph">
            <h3>Expense Breakdown</h3>
            <Pie data={pieChartData} />
          </div>
          <div className="graph">
            <h3>Budget Summary</h3>
            <p>
              <strong>Total Income (Salary):</strong> ${salary || 0}
            </p>
            <p>
              <strong>Total Expenses:</strong> ${totalExpenses}
            </p>
            <p>
              <strong>Remaining Budget:</strong>{" "}
              <span
                style={{
                  color: remainingBudget >= 0 ? "green" : "red",
                }}
              >
                ${remainingBudget >= 0 ? remainingBudget : 0}
              </span>
            </p>
          </div>
        </div>
      </section>
{/* Budget Recommendations */}
      <section className="recommendations-section">
        {loadingRecommendations ? (
          <h2>Generating Budget Recommendations...</h2>
        ) : (
          <>
            <h2>Budget Recommendations</h2>
            <div className="recommendations-container">
              {recommendations.map((rec, index) => (
                <div key={index} className="recommendation-card">
                  {/* Example icons (replace with relevant ones) */}
                  <div className="recommendation-icon">💡</div>
                  <p className="recommendation-text">{rec}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default BudgetingPage;
