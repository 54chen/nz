#!/bin/env python
# pip instll bs4 lxml
import requests
import json
from lxml import html
from html.parser import HTMLParser
from bs4 import BeautifulSoup

def download_file(file,filename):
        if (file != ''):
                res = requests.get(file);
                res.encoding = 'utf-8'; 
                with  open(filename, 'wb') as  res.raw:  
                        res.raw.write(res.content)  
                        print(filename+'文件下载成功！！')

def get_excel(): 
        url = 'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases/covid-19-current-cases-details';
        res = requests.get(url);
        res.encoding = 'utf-8';
        content = html.fromstring(res.text);
        content = HTMLParser().unescape(html.tostring(content).decode());
        soup = BeautifulSoup(content,'html.parser');
        data = soup.find_all('a');
        excel_file = '';
        for k in data:
                href = k['href'] if(k.has_attr('href')) else '';
                if (href.endswith('.xlsx')):
                        excel_file = 'https://www.health.govt.nz' + href;
        download_file(excel_file,'covid.xlsx');
        
def get_pic():
        picurl = 'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases#summary'
        res = requests.get(picurl);
        res.encoding = 'utf-8';
        tree = html.fromstring(res.text);
        name = tree.xpath("//img");
        i = 10;
        for n in name:
            content = HTMLParser().unescape(html.tostring(n).decode()); 
            if (content.find('images/our-work')<=0):
                continue;
            i = i + 1;
            soup = BeautifulSoup(content,'html.parser');
            data = soup.find_all('img');
            for d in data:
                pic_file = 'https://www.health.govt.nz' + d['src'];
                print(pic_file);
            download_file(pic_file,str(i)+'.png');
 

def get_num():
    url = 'https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases';
    res = requests.get(url);
    res.encoding = 'utf-8';
    tree = html.fromstring(res.text);
    name = tree.xpath("//table[@class='table-style-two']");
    content = HTMLParser().unescape(html.tostring(name[0]).decode());

    soup = BeautifulSoup(content,'html.parser');
    result = [];
    result.append(soup("caption")[0].text);

    for row in soup("tr"):
        r = []
        r.append(row("th")[0].text);
        for td in row("td"):
            r.append(td.text);
        result.append(r);
    rs = json.dumps(result);
    with open('./data.json', 'w') as outfile:
        json.dump(rs, outfile)

    print(rs);
get_excel();
get_pic();
get_num();
