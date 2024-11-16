"""Module for the bank data API """
import json
import os

from random import choice

from flask import Flask, request, jsonify
from flask_cors import CORS

from bank_gen import fetch_bank_data
from invest_data import predict_potential_stock_mix

app = Flask(__name__)

# Allow all origins
# CORS(app, resources={r"/*": {"origins": "*"}})

basedir = os.path.abspath(os.path.dirname(__file__))
API_POST_URL = "https://fantastic-capybara-g4w9xx544wh5j4-5000.app.github.dev/"

CORS(app, resources={r"/*": {"origins": "*"}})

@app.post("/bank")
def get_bank_data() -> str:
    """Returns bank data"""
    iin = request.get_json()["iin"]
    # return the bank data for the given IIN
    with open(os.path.join(basedir, "bank_data.json"), 'r', encoding="utf-8") as file:
        bank_data = json.load(file)[iin]
    return jsonify(bank_data)


@app.post("/user")
def get_user_data() -> str:
    """Returns user data"""
    iin = request.get_json()["iin"]
    # return the user data
    with open(os.path.join(basedir, "user_details.json"), 'r', encoding="utf-8") as file:
        users_data = json.load(file)
    return jsonify(users_data[iin])

@app.post("/stock")
def get_potential_stock() -> str:
    """Returns potential stock data for the user"""
    iin = request.get_json()["iin"]
    # return the potential stock data
    bank_data = fetch_bank_data(iin)
    # Get the amount of money left after all the expenses
    extra_money = 2*bank_data["salary"] - sum(bank_data.values())
    # send a post request to the stock data API
    potential_mixes_to_invest = {
        "potential_investments": predict_potential_stock_mix(extra_money)
    }

    return jsonify(potential_mixes_to_invest)

@app.post("/profile")
def get_profile_data() -> str:
    """Returns the profile data"""
    # return the profile data
    with open(os.path.join(basedir, "user_details.json"), 'r', encoding="utf-8") as file:
        users_data = json.load(file)
        iin = choice(tuple(users_data))
        full_name = users_data[iin]["name"]
    profile_data = {
        "full_name": full_name,
        "iin": iin
    }

    return jsonify(profile_data)
