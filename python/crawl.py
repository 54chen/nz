#!/bin/env python
# pip instll bs4 lxml
import requests
import json
from lxml import html
from html.parser import HTMLParser
from bs4 import BeautifulSoup

def read_all_part(filename):
    with open(filename) as f:
        lines = f.readlines()
    return lines


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
    lines = read_all_part("./YQinfo.json.tpl");
    tpl = ''
    for line in lines:
        tpl += line
        
    tpl = tpl.replace('$update',soup("caption")[0].text);
    for row in soup("tr"):
        if (row("th")[0].text == 'Number of confirmed cases in New Zealand'):
            tpl = tpl.replace('$qtotal',row("td")[0].text);
            tpl = tpl.replace('$qcompare',row("td")[1].text);
        
        if (row("th")[0].text == 'Number of probable cases'):
            tpl = tpl.replace('$ytotal',row("td")[0].text);
            tpl = tpl.replace('$ycompare',row("td")[1].text);

        if (row("th")[0].text == 'Number of recovered cases'):
            tpl = tpl.replace('$ztotal',row("td")[0].text);
            tpl = tpl.replace('$zcompare',row("td")[1].text);

        if (row("th")[0].text == 'Number of deaths'):
            tpl = tpl.replace('$dead',row("td")[0].text);
            tpl = tpl.replace('$dcompare',row("td")[1].text);
        
    tpl = tpl.replace('+ ','+0');
    #rs = json.dumps(tpl);
    #print(tpl);
    with open('../nzcovid/YQInfo.json', 'w') as outfile:
        outfile.write(tpl);
        #   json.dump(tpl, outfile)

get_excel();
get_pic();
get_num();
