#!/bin/env python
# pip instll bs4 lxml
import requests
import json
from lxml import html
from html.parser import HTMLParser
from bs4 import BeautifulSoup

url = 'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases';
res = requests.get(url);
res.encoding = 'utf-8';
tree = html.fromstring(res.text);
name = tree.xpath("//table[@class='table-style-two']");
content = HTMLParser().unescape(html.tostring(name[1]).decode());

soup = BeautifulSoup(content,'html.parser');

table_data = [[cell.text for cell in row("td")] for row in soup("tr")];
table = [x for x in table_data if x != []];
result = [];
data = dict(table);
for k, v in data.items():
        result.append({'name': k, 'value': v})


with open('data.json', 'w') as outfile:
        json.dump(result, outfile)
