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
        name = tree.xpath("//img[@alt='Map of cases by DHB']");

        content = HTMLParser().unescape(html.tostring(name[0]).decode()); 
        soup = BeautifulSoup(content,'html.parser');
        data = soup.find_all('img');      
        pic_file = 'https://www.health.govt.nz' + data[0]['src'];
        download_file(pic_file,'covid.jpg');
 
get_excel();
get_pic();