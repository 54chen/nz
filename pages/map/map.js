/*
 * 
 * WordPres版微信小程序
 * author: jianbo
 * organization: 守望轩  www.watch-life.net
 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
 * 技术支持微信号：iamxjb
 * 开源协议：MIT
 * 
 *  *Copyright (c) 2017 https://www.watch-life.net All rights reserved.
 */ 

import config from '../../utils/config.js'
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var Auth = require('../../utils/auth.js');
var WxParse = require('../../wxParse/wxParse.js');
var wxApi = require('../../utils/wxApi.js')
var wxRequest = require('../../utils/wxRequest.js');
var webSiteName = config.getWebsiteName;
var domain = config.getDomain
const app = getApp();
 
function fetchTopYQInfo2 (canvas, width, height, dpr,yQdata) {
  if(yQdata!=null)  return [ { name: 'Auckland', value: 1 }  ];
  var YQ = wxRequest.getRequest(Api.getYQInfo2());
  
  YQ.then(res=>{
    if (res.statusCode == 200 && res.data) {
    initChart(canvas, width, height, dpr,res.data)
    return res.data;
  }
  });
  return [ { name: 'Auckland', value: 1 }  ];
  };
function initChart(canvas, width, height, dpr, yQdata) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  echarts.registerMap('nz', geoJson);
  const data = yQdata==null?fetchTopYQInfo2(canvas, width, height, dpr,null):yQdata;
 

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },

    visualMap: {
      min: 1,
      max: 100,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true
    },
    toolbox: {
      show: false,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    series: [{
      type: 'map',
      mapType: 'nz',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          textStyle: {
            color: '#fff'
          }
        }
      },
      itemStyle: {

        normal: {
          borderColor: '#389BB7',
          areaColor: '#fff',
        },
        emphasis: {
          areaColor: '#389BB7',
          borderWidth: 0
        }
      },
      animation: false,

      data: data

    }],

  };

  chart.setOption(option);
  
  return chart;
}


Page({
  data: {
     
    text: "map",
    categoriesList: {},
    floatDisplay: "none",
    openid: "",
    userInfo: {},
    webSiteName: webSiteName,
    domain: domain
  },
  onReady: function(){
  },
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '地图'
    });
  

  },
  onShow: function () {
  }


})