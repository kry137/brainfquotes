import requests
import pyclip
import json

url: str = 'https://api.quotable.io/quotes'

results: list = []

for page in range(1, 108):
    print(f'Mengambil halaman {page}...')
    fetch = requests.get(url + '?page=' + str(page), verify=False)

    if fetch.status_code == 200:
        data = fetch.json()
        results += data['results']
        # pyclip.copy(json.dumps(results, indent=2))

with open("quotes.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print(f"Selesai! Total quote: {len(results)}")