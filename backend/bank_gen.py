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
        salary = randint(3000, 20000)
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

def fetch_bank_data(iin: str) -> dict:
    """Fetches bank data"""
    # using requests to fetch the data of a bank iin
    with open("bank_data.json", 'r', encoding="utf-8") as file:
        bank_data = json.load(file)
    return bank_data[iin]


def get_extra_monies() -> list[int]:
    """Get the extra monies - to check the range for stock investment"""
    # for each bank data get extra_money = 2*bank_data["salary"] - sum(bank_data.values())
    with open("bank_data.json", 'r', encoding="utf-8") as file:
        bank_data = json.load(file)
    with open("extra_monies.json", 'w', encoding="utf-8") as file:
        extra_monies = [2*data["salary"] - sum(data.values()) for data in bank_data.values()]
        json.dump(extra_monies, file)

if __name__ == "__main__":
    generate_bank_data()
    verify_bank_data()
    get_extra_monies()
    # print(x)
