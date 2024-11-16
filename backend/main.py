"""Module for the bank data API """
import json
import os

from flask import Flask, jsonify


app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# make a route for the bank data
@app.post("/bank")
def get_bank_data(iin: str) -> str:
    """Returns bank data"""
    # return the bank data for the given IIN
    with open(os.path.join(basedir, "bank_data.json"), 'r', encoding="utf-8") as file:
        bank_data = json.load(file)[iin]
    return jsonify(bank_data)


# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "db.sqlite")
