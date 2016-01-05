import json
from pprint import pprint as pp

brothers = []

with open('brothers_raw.txt', 'r') as raw:
    for line in raw.readlines():
        splits = line.split()
        brothers.append({
            'first': splits[0],
            'last': splits[1],
        })

print(json.dumps(brothers))
