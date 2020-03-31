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

Page({
  data: {
    text: "map",
    categoriesList: {},
    floatDisplay: "none",
    openid: "",
    userInfo: {},
    webSiteName: webSiteName,
    domain: domain,
    currentTab: 0,
    used: 0, //已使用
    noused: 0, //未使用
    enddate: 0, //已过期
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onReady: function() {},
  onLoad: function(options) {

    wx.setNavigationBarTitle({
      title: '地图'
    });


  },
  onShow: function() {}


})