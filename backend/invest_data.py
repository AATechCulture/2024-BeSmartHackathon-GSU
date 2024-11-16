"""Generates stock data for the application"""

import heapq
import json

from collections import deque
from random import randint
from statistics import mean

MAX_LENGTH = 3


def predict_potential_stock_mix(extra_money: int) -> str:
    """Predicts the potential stock mix for the user
    It will get the average price of the stocks in each stock mix.
    It will then list which of them are below your money_to_invest.
    After that it will calculate the averages of the stock of those that are below your money_to_invest.
    It will then return the top 2 stock mixes with the highest average stock increase.
    Uses a min-heap to ensure that the top 2 stock mixes are always at the top
    """
    with open("stock_data.json", 'r', encoding="utf-8") as file:
        stock_data = json.load(file)
    print(extra_money)
    money_to_invest = extra_money // 1.5
    stocks_to_invest = deque(maxlen=MAX_LENGTH)
    top_3 = []
    print(money_to_invest)

    for stock_mix, stock_data in stock_data.items():
        stock_value_average = mean(stock["value"] for stock in stock_data["stocks"])
        stock_percent_average = mean(stock["percentage"] for stock in stock_data["stocks"])
        # adds those with average price within range of money_to_invest
        if money_to_invest // 2 < stock_value_average < money_to_invest:
            if len(top_3) < MAX_LENGTH:
                heapq.heappush(top_3, stock_percent_average)
                stocks_to_invest.append(stock_mix)
            elif 0 > stock_percent_average > top_3[0]:
                heapq.heapreplace(top_3, stock_percent_average)
                stocks_to_invest.append(stock_mix)

    return list(stocks_to_invest)


def generate_stock_data() -> None:
    """Generates stock data classified into investment mixes"""
    investment_mixes = {}
    for mix_index in range(1, 20):
        investment_mix = {}
        investment_mix_stocks = []
        for stock_index in range(1, randint(3, 8)):
            stock = {}
            stock["name"] = f"Stock_{mix_index}_{stock_index}"
            stock["value"] = randint(100, 15000)
            stock["percentage"] = randint(-50, 100)/10
            investment_mix_stocks.append(stock)
            investment_mix["stocks"] = investment_mix_stocks
        investment_mixes[f"Investment Mix {mix_index}"] = investment_mix

    with open("stock_data.json", 'w', encoding="utf-8") as file:
        json.dump(investment_mixes, file)


if __name__ == "__main__":
    generate_stock_data()
    # predict_potential_stock_mix(10)
