from transformers import pipeline
import pandas as pd
import json

# Load data from bank_data.json
with open('C:\\Users\\saril\\Documents\\BeSmart\\bank_data.json', 'r') as f:
    bank_data = json.load(f)

# Load user data from user_details.json
with open('C:\\Users\\saril\\Documents\\BeSmart\\user_details.json', 'r') as f:
    user_details = json.load(f)

# Select a user to generate a financial plan
user_id = "220507"  # Replace with any valid user ID from the data
user_data = bank_data[user_id]
user_profile = user_details[user_id]

# Create a sample DataFrame from user transactions
data = {
    "description": ["Salary", "Starbucks coffee", "Rent payment", "Grocery shopping", "Netflix subscription", "Dining out"],
    "amount": [user_data["salary"], user_data["shopping"], user_data["bills"], user_data["groceries"], 13.99, 25.0],
    "category": [None] * 6  # Placeholder for predicted categories
}
df = pd.DataFrame(data)

# Define categories for zero-shot classification
categories = ["Income", "Food & Beverage", "Housing", "Entertainment", "Shopping", "Transportation", "Health", "Utilities"]

# Load a text classification model for categorizing transactions
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# Classify each transaction description to find the most likely category
df["category"] = df["description"].apply(lambda x: classifier(x, categories)["labels"][0])

# Summarize monthly spending per category
monthly_spending = df[df["category"] != "Income"].groupby("category")["amount"].sum().reset_index()

# Define the user income (salary) and target allocations
income = user_data["salary"]
target_allocation = {
    "Housing": 0.30,
    "Food & Beverage": 0.20,
    "Entertainment": 0.10,
    "Shopping": 0.10,
    "Utilities": 0.10,
    "Transportation": 0.10
}

# Generate budget recommendations based on spending patterns and target allocation
def generate_budget_recommendations(spending_data, income):
    recommendations = []
    for _, row in spending_data.iterrows():
        category, total_spent = row["category"], row["amount"]
        target_percent = target_allocation.get(category, 0.1)  # Default to 10% if category not specified
        target_amount = income * target_percent

        if total_spent > target_amount:
            recommendation = f"Reduce spending in {category}. You spent ${total_spent:.2f}, exceeding the target of ${target_amount:.2f}."
        else:
            recommendation = f"Your spending in {category} is within budget."

        recommendations.append(recommendation)
    return recommendations

# Generate recommendations based on categorized spending
recommendations = generate_budget_recommendations(monthly_spending, income)

# Display categorized transactions, monthly spending summary, and budget recommendations
print("Categorized Transactions:")
print(df)
print("\nMonthly Spending Summary:")
print(monthly_spending)
print("\nBudget Recommendations:")
for rec in recommendations:
    print(rec)
