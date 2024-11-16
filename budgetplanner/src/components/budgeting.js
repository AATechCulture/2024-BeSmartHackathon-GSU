import React, { useState } from "react";
import "../styles/budgetingPage.css";
import { Pie } from "react-chartjs-2"; // Importing chart for visualization
import "chart.js/auto"; // Automatically register required chart components

function BudgetingPage() {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [savingsGoal, setSavingsGoal] = useState("");
  const [expenseData, setExpenseData] = useState([
    { category: "Rent", amount: 0 },
    { category: "Groceries", amount: 0 },
    { category: "Utilities", amount: 0 },
  ]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newExpense = {
      category: e.target.category.value,
      amount: parseFloat(e.target.amount.value),
    };
    setExpenseData([...expenseData, newExpense]);
    e.target.reset();
  };

  const totalExpenses = expenseData.reduce((total, item) => total + item.amount, 0);
  const remainingBudget = monthlyIncome - totalExpenses - savingsGoal;

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
          <h1>Create a Personalized Budget</h1>
          <p>
            Input your expenses, savings goals, and investment preferences to get
            a tailored budget plan.
          </p>
        </div>
      </header>

      {/* Expense Input Form */}
      <section className="expense-input">
        <h2>Input Your Monthly Details</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="form-group">
            <label htmlFor="monthlyIncome">Monthly Income ($)</label>
            <input
              type="number"
              id="monthlyIncome"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || "")}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="savingsGoal">Savings Goal ($)</label>
            <input
              type="number"
              id="savingsGoal"
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(parseFloat(e.target.value) || "")}
              required
            />
          </div>
        </form>

        <form onSubmit={handleAddExpense}>
          <div className="form-group">
            <label htmlFor="category">Expense Category</label>
            <input type="text" id="category" name="category" placeholder="e.g., Rent" required />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount ($)</label>
            <input type="number" id="amount" name="amount" placeholder="e.g., 500" required />
          </div>

          <button type="submit">Add Expense</button>
        </form>
      </section>

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
              <strong>Total Income:</strong> ${monthlyIncome || 0}
            </p>
            <p>
              <strong>Total Expenses:</strong> ${totalExpenses}
            </p>
            <p>
              <strong>Savings Goal:</strong> ${savingsGoal || 0}
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
    </div>
  );
}

export default BudgetingPage;
