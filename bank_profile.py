
"""Module to map names to bank profiles """

import json

from random import randint, sample

import requests as req

def generate_names():
    """Generates names"""
    with open("name_list.txt", 'r', encoding="utf-8") as file:
        names = file.readlines()
    return sample([*map(str.strip, names)], 100)


def map_to_profile():
    """Maps names to IIN"""
    names = generate_names()
    with open("bank_data.json", 'r', encoding="utf-8") as file:
        bank_data = json.load(file)
    iins = list(bank_data)
    iin_to_profile = {}
    # profile is like this {"name": "...", age: ...}
    for iin, name in zip(iins, names):
        iin_to_profile[iin] = {"name": name, "age": randint(18, 60)}
    with open("user_details.json", 'w', encoding="utf-8") as file:
        json.dump(iin_to_profile, file)

if __name__ == "__main__":
    map_to_profile()
