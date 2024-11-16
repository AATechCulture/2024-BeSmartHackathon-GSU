import requests as req

API_POST_URL = "https://fictional-sniffle-x76pxj954xr355j-5000.app.github.dev/"

def test_generate_budget():
    response = req.post(API_POST_URL + "budget", json={"iin": "591945"})
    print(response)
    # print(response.json())

if __name__ == "__main__":
    test_generate_budget()
