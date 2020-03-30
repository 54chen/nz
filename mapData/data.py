#!/bin/env python

#import xlrd
import matplotlib.pyplot as plt
from matplotlib.dates import DateFormatter
import pandas as pd
import numpy as np
import seaborn as sns
import os
from matplotlib import ft2font
import matplotlib.font_manager as font_manager
import math

plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False



df = pd.read_excel('covid.xlsx',header=3);
df['count'] = 1;
df = df.pivot_table(index=[u'DHB',u'Report Date'],values='count',aggfunc = 'sum');


#df_idx = df.set_index([u'DHB',u'Report Date']).sort_index();

sns.set(font_scale=1.5, style="whitegrid");
#dir = os.path.abspath(os.path.dirname(__file__))
font = font_manager.FontProperties('SimHei', size=12);



dhbss = [['Auckland','Waitemata','Counties Manukau'],['Southern','South Canterbury','Canterbury'],['West Coast','Nelson Marlborough','Northland'],['Capital and Coast','Hutt Valley','Wairarapa','MidCentral'],['Taranaki','Whanganui','Hawke\'s Bay','Tairawhiti'],['Waikato','Lakes','Bay of Plenty']]

i = 0
for dhbs in dhbss:
    i = i + 1
    fig, ax = plt.subplots(figsize=(5, 5));
    ax.set_xlabel(u"日期",fontproperties=font);
    ax.set_ylabel(u"人数",fontproperties=font);
    ax.set_title(u"每日新增确诊",fontproperties=font);
    date_form = DateFormatter("%m-%d");
    ax.xaxis.set_major_formatter(date_form);
    for dhb in dhbs:
        data = df.loc[dhb].tail(7);
        for a,b in zip(data.index,data.values):
            plt.text(a, b, '%d' % b, ha='center', va= 'bottom',fontsize=9)
        y = data.values;
        y_int = range(math.floor(min(y)), math.ceil(max(y))+1)
        plt.plot(data.index, y)
        plt.yticks(y_int)

        
    plt.legend(dhbs,prop={'size': 8})
    #plt.show()
    plt.savefig('./'+str(i)+'.png')

