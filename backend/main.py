"""Module for the bank data API """
import json
import os

from flask import Flask, request, jsonify


app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# make a route for the bank data
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
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "db.sqlite")
