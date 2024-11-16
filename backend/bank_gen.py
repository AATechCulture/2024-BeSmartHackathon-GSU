"""Module for generating bank data"""
import json
from random import randint

def percent(salary, start=10, end=25):
    """Returns a random percentage of the salary"""
    return int((randint(start, end)/100) * salary)

def generate_bank_data(add=False):
    """Generates bank data"""
    bank_data = {}
    for _ in range(100):
        iin = randint(100000, 999999)
        salary = randint(3000, 100000) + 200
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

if __name__ == "__main__":
    generate_bank_data()
