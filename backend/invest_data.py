"""Generates stock data for the application"""

import json
from random import randint




def genrate_stock_data() -> None:
    """Generates stock data classified into investment mixes"""
    investment_mixes = []
    for mix_index in range(1, 20):
        investment_mix = {}
        investment_mix["name"] = f"Investment Mix {mix_index}"
        investment_mix_stocks = []
        for stock_index in range(1, randint(3, 8)):
            stock = {}
            stock["name"] = f"Stock_{mix_index}_{stock_index}"
            stock["value"] = randint(50, 1000)
            stock["percentage"] = randint(-100, 100)/10
            investment_mix_stocks.append(stock)
            investment_mix["stocks"] = investment_mix_stocks
        investment_mixes.append(investment_mix)

    with open("stock_data.json", 'w', encoding="utf-8") as file:
        json.dump(investment_mixes, file)


if __name__ == "__main__":
    genrate_stock_data()