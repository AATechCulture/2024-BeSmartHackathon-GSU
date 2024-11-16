
"""Module for generating bank data"""
import json
from random import randint

import requests as req  # type: ignore

def percent(salary, start=10, end=25):
    """Returns a random percentage of the salary"""
    return int((randint(start, end)/100) * salary)

def generate_bank_data(add=False):
    """Generates bank data"""
    bank_data = {}
    for _ in range(100):
        iin = randint(100000, 999999)
        salary = randint(3000, 100000)
        shopping = randint(percent(salary, 3, 9), percent(salary))
        groceries = randint(percent(salary, 3, 9), percent(salary))
        gas = randint(percent(salary, 3, 9), percent(salary))
        bills = randint(percent(salary, 3, 9), percent(salary))
        bank_data[iin] = {
            "salary": salary,
            "shopping": shopping,
            "groceries": groceries,
            "gas": gas,
            "bills": bills
        }


    with open("bank_data.json", 'r' if add else 'w', encoding="utf-8") as file:
        json.dump(bank_data, file)

def verify_bank_data():
    """Verifies bank data"""
    with open("bank_data.json", 'r', encoding="utf-8") as file:
        bank_data = json.load(file)

    count = 0
    for iin, data in bank_data.items():
        # print the salary and the sum
        if sum(data.values())-data["salary"] > data["salary"]:
            print(f"Error: IIN: {iin} has a category that is greater than the salary")
            count += 1
    print(f"Total errors: {count}")

def fetch_data(iin: str) -> dict:
    """Fetches bank data"""
    # using requests to fetch the data of a bank iin
    response = req.post(
       "https://fantastic-capybara-g4w9xx544wh5j4-5000.app.github.dev/bank", json={"iin": iin})
    print(response)
    return response.json()


if __name__ == "__main__":
    # generate_bank_data()
    # verify_bank_data()
    x = fetch_data("834682")
    print(x)
