"""Tests for the flask POST apis defined in main.py"""
import requests as req


API_POST_URL = "https://fantastic-capybara-g4w9xx544wh5j4-5000.app.github.dev/"

def test_get_potential_stock():
    """Test get_potential_stock"""
    response = req.post(API_POST_URL + "stock", json={"iin": "216040"}, timeout=10)
    # assert response.status_code == 200
    print(response.json())
    # assert response.json() == ["Investment Mix 1", "Investment Mix 2"]

def test_get_profile_data():
    """Test get_profile_data"""
    response = req.post(API_POST_URL + "profile", timeout=10)
    # assert response.status_code == 200
    print(response.json())
    # assert response.json()["full_name"] == "John Doe"

if __name__ == "__main__":
    # test_get_potential_stock()
    test_get_profile_data()
