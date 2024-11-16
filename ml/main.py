
"""Module for the bank data API """
import json
import os

from flask import Flask, request, jsonify
from flask_cors import CORS

from budget_assigner import generate_budget_recommendations, generate_user_data


app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))

# make a route for the bank data
@app.post("/budget")
def generate_budget():
    print("GOt here")
    iin = request.get_json()["iin"]
    user_data = generate_user_data(iin)
    recommendations = generate_budget_recommendations(*user_data)
    print(recommendations)
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(debug=True)
