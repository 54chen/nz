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

var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
var Auth = require('../../utils/auth.js');
var wxApi = require('../../utils/wxApi.js')
var wxRequest = require('../../utils/wxRequest.js')
import config from '../../utils/config.js'
var pageCount = config.getPageCount;

var webSiteName = config.getWebsiteName;
var domain = config.getDomain;
var topNav = config.getIndexNav;

Page({
  data: {
    //Tab
    currentTab: 0,
    used: 0, //已使用
    noused: 0, //未使用
    enddate: 0, //已过期

    postsList: [],
    postsShowSwiperList: [],
    isLastPage: false,
    page: 1,
    search: '',
    categories: 0,
    showerror: "none",
    showCategoryName: "",
    categoryName: "",
    showallDisplay: "block",
    displayHeader: "none",
    displaySwiper: "none",
    floatDisplay: "none",
    displayfirstSwiper: "none",
    topNav: topNav,
    listAdsuccess: true,
    webSiteName: webSiteName,
    domain: domain,
    isFirst: false, // 是否第一次打开,
    isLoading: false,
    showView: false,
    showTitle: "新西兰华人信息平台",

    jzsj_num: [{
      name: 'div',
      attrs: {
        class: 'div_class'
      },
      children: [{
        type: 'text',
        text: 'no'
      }]
    }],
    jzsj_new: [{
      name: 'div',
      attrs: {
        class: 'div_class'
      },
      children: [{
        type: 'text',
        text: '截至：26/3/2020'
      }]
    }],
    jzsj_title: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'font-family:verdana; font-size:16px; color: black;text-align:center;'
      },
      children: [{
        type: 'text',
        text: '新西兰华人防疫互助平台'
      }]
    }],
    xcqz_new: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'font-family:verdana; font-size:12px; color: grey;text-align:center;'
      },
      children: [{
        type: 'text',
        text: '较昨日+0'
      }]
    }],
    xcqz_num: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'font-family:verdana; font-size:20px; color: #e49594;text-align:center;'
      },
      children: [{
        type: 'text',
        text: '0'
      }]
    }],
    xcqz_title: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'font-family:verdana; font-size:16px; color: black;text-align:center;'
      },
      children: [{
        type: 'text',
        text: '累计确诊'
      }]
    }],
    xcqz_new: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'font-family:verdana; font-size:12px; color: grey;text-align:center;'
      },
      children: [{
        type: 'text',
        text: '较昨日+0'
      }]
    }],
    ljqz_num: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'font-family:verdana; font-size:20px; color: #ed8a2d;text-align:center;'
      },
      children: [{
        type: 'text',
        text: '0'
      }]
    }],
    ljqz_title: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'font-family:verdana; font-size:16px; color: black;text-align:center;'
      },
      children: [{
        type: 'text',
        text: '累计疑似'
      }]
    }],
    ljqz_new: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'font-family:verdana; font-size:12px; color: grey;text-align:center;'
      },
      children: [{
        type: 'text',
        text: '较昨日+0'
      }]
    }],
    ljzy_num: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'font-family:verdana; font-size:20px; color: #a8c37d;text-align:center;'
      },
      children: [{
        type: 'text',
        text: '0'
      }]
    }],
    ljzy_title: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'font-family:verdana; font-size:16px; color: black;text-align:center;'
      },
      children: [{
        type: 'text',
        text: '累计治愈'
      }]
    }],
    ljzy_new: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'font-family:verdana; font-size:12px; color: grey;text-align:center;'
      },
      children: [{
        type: 'text',
        text: '较昨日+0'
      }]
    }],
    ljsw_num: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'font-family:verdana; font-size:20px; color: #1aa3ed;text-align:center;'
      },
      children: [{
        type: 'text',
        text: '0'
      }]
    }],
    ljsw_title: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'font-family:verdana; font-size:16px; color: black;text-align:center;'
      },
      children: [{
        type: 'text',
        text: '累计死亡'
      }]
    }],
    ljsw_new: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'font-family:verdana; font-size:12px; color: grey;text-align:center;'
      },
      children: [{
        type: 'text',
        text: '较昨日+0'
      }]
    }],
  },


  formSubmit: function (e) {
    var url = '../list/list'
    var key = '';
    if (e.currentTarget.id == "search-input") {
      key = e.detail.value;
    } else {

      key = e.detail.value.input;

    }
    if (key != '') {
      url = url + '?search=' + key;
      wx.navigateTo({
        url: url
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入内容',
        showCancel: false,
      });
    }
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
  onShareAppMessage: function () {
    return {
      title: '“' + webSiteName + '”小程序',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onPullDownRefresh: function () {
    var self = this;
    self.setData({
      showerror: "none",
      showallDisplay: "block",
      displaySwiper: "none",
      floatDisplay: "none",
      isLastPage: false,
      page: 1,
      postsShowSwiperList: [],
      listAdsuccess: true

    });
    this.fetchTopFivePosts();
    this.fetchPostsData(self.data);

  },
  onReachBottom: function () {

    var self = this;
    if (!self.data.isLastPage) {
      self.setData({
        page: self.data.page + 1
      });
      console.log('当前页' + self.data.page);
      this.fetchPostsData(self.data);
    } else {
      console.log('最后一页');
    }

  },
  /**
   * 监听图片加载成功时触发
   */
  imgload: function (e) {
    this.setData({
      'baseWidth': e.detail.width, //获取图片真实宽度
      'baseHeight': e.detail.height, //获取图片真实高度
      'scaleWidth': '100%', //给图片设置宽度
      'scaleHeight': '100%' //给图片设置高度
    })
  },
  /**
   * 双手指触发开始 计算开始触发两个手指坐标的距离
   */
  touchstartCallback: function (e) {
    // 单手指缩放开始，不做任何处理
    if (e.touches.length == 1) return;
    // 当两根手指放上去的时候，将距离(distance)初始化。
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    //计算开始触发两个手指坐标的距离
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    this.setData({
      'distance': distance,
    })
  },
  /**
   * 双手指移动   计算两个手指坐标和距离
   */
  touchmoveCallback: function (e) {
    // 单手指缩放不做任何操作
    if (e.touches.length == 1) return;
    //双手指运动 x移动后的坐标和y移动后的坐标
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    //双手指运动新的 ditance
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    //计算移动的过程中实际移动了多少的距离
    let distanceDiff = distance - this.data.distance;
    let newScale = this.data.scale + 0.005 * distanceDiff
    // 为了防止缩放得太大，所以scale需要限制，同理最小值也是
    if (newScale >= 1) {
      newScale = 1
      let scaleWidth = newScale * this.data.baseWidth + 'px'
      let scaleHeight = newScale * this.data.baseHeight + 'px'
      this.setData({
        'distance': distance,
        'scale': newScale,
        'scaleWidth': scaleWidth,
        'scaleHeight': scaleHeight,
        'diff': distanceDiff
      })
    }
    //为了防止缩放得太小，所以scale需要限制
    if (newScale <= 0.3) {
      newScale = 0.3
      this.setData({
        'distance': distance,
        'scale': newScale,
        'scaleWidth': '100%',
        'scaleHeight': '100%',
        'diff': distanceDiff
      })
    }
  },
  onLoad: function (options) {
    var self = this;
    self.fetchTopYQInfo();
    self.fetchTopFivePosts();
    self.fetchPostsData(self.data);

    self.setData({
      dataimg: 'https://wp.wetopay.com/map/covid.jpg',
    })

    // 判断用户是不是第一次打开，弹出添加到我的小程序提示
    var isFirstStorage = wx.getStorageSync('isFirst');
    // console.log(isFirstStorage);
    if (!isFirstStorage) {
      self.setData({
        isFirst: true
      });
      wx.setStorageSync('isFirst', 'no')
      // console.log(wx.getStorageSync('isFirst'));
      setTimeout(function () {
        self.setData({
          isFirst: false
        });
      }, 5000)
    }
    Auth.setUserInfoData(this);
    Auth.checkLogin(this);
    // console.log("设置title前的title："+self.data.showTitle);

    wx.setNavigationBarTitle({
      title: self.data.showTitle
    })
    // console.log("设置title后的title：" + self.data.showTitle);


    this.fetchCategoriesData();


  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  onShow: function (options) {
    wx.setStorageSync('openLinkCount', 0);

    var nowDate = new Date();
    nowDate = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
    nowDate = new Date(nowDate).getTime();
    var _openAdLogs = wx.getStorageSync('openAdLogs') || [];
    var openAdLogs = [];
    _openAdLogs.map(function (log) {
      if (new Date(log["date"]).getTime() >= nowDate) {
        openAdLogs.unshift(log);
      }

    })
  },
  //获取疫情信息
  fetchTopYQInfo: function () {
    var self = this;
    var getYQInfo = wxRequest.getRequest(Api.getYQInfo());
    getYQInfo.then(res => {
      if (res.statusCode == 200 && res.data) {

        var xcqz_num = self.data.xcqz_num;
        var xcqz_title = self.data.xcqz_title;
        var xcqz_new = self.data.xcqz_new;

        var ljqz_num = self.data.ljqz_num;
        var ljqz_title = self.data.ljqz_title;
        var ljqz_new = self.data.ljqz_new;

        var ljzy_num = self.data.ljzy_num;
        var ljzy_title = self.data.ljzy_title;
        var ljzy_new = self.data.ljzy_new;

        var ljsw_num = self.data.ljsw_num;
        var ljsw_title = self.data.ljsw_title;
        var ljsw_new = self.data.ljsw_new;

        var jzsj_num = self.data.jzsj_num;
        var jzsj_title = self.data.jzsj_title;
        var jzsj_new = self.data.jzsj_new;


        xcqz_num[0].children[0].text = res.data.xcqz.total;
        xcqz_title[0].children[0].text = res.data.xcqz.title;
        xcqz_new[0].children[0].text = res.data.xcqz.compare;

        ljqz_num[0].children[0].text = res.data.ljqz.total;
        ljqz_title[0].children[0].text = res.data.ljqz.title;
        ljqz_new[0].children[0].text = res.data.ljqz.compare;

        ljzy_num[0].children[0].text = res.data.ljzy.total;
        ljzy_title[0].children[0].text = res.data.ljzy.title;
        ljzy_new[0].children[0].text = res.data.ljzy.compare;

        ljsw_num[0].children[0].text = res.data.ljsw.total;
        ljsw_title[0].children[0].text = res.data.ljsw.title;
        ljsw_new[0].children[0].text = res.data.ljsw.compare;

        jzsj_num[0].children[0].text = res.data.jzsj.total;
        jzsj_title[0].children[0].text = res.data.jzsj.title;
        jzsj_new[0].children[0].text = res.data.jzsj.compare;

        console.log("当前后台开关是：" + jzsj_num[0].children[0].text);
        console.log("1当前前台开关是：" + self.data.showView);

        if (jzsj_num[0].children[0].text == 0) {
          console.log("打开")
          console.log("后台平台title：" + jzsj_title[0].children[0].text);
          this.setData({
            showView: true,
            showTitle: jzsj_title[0].children[0].text
          });
          console.log("后台平台title设置showTitle,showTitle：" + self.data.showTitle);
          wx.setNavigationBarTitle({
            title: self.data.showTitle,
          })
        }
        console.log("2当前前台开关是：" + self.data.showView);

        self.setData({
          xcqz_num: xcqz_num,
          xcqz_title: xcqz_title,
          xcqz_new: xcqz_new,

          ljqz_num: ljqz_num,
          ljqz_title: ljqz_title,
          ljqz_new: ljqz_new,

          ljzy_num: ljzy_num,
          ljzy_title: ljzy_title,
          ljzy_new: ljzy_new,

          ljsw_num: ljsw_num,
          ljsw_title: ljsw_title,
          ljsw_new: ljsw_new,

          jzsj_num: jzsj_num,
          jzsj_title: jzsj_title,
          jzsj_new: jzsj_new,
          showTitle: jzsj_title,

        });
      }
    }).catch(function (response) {
      console.log(response);

    }).finally(function () {

    });

  },
  //获取分类列表
  fetchCategoriesData: function () {
    var self = this;
    self.setData({
      categoriesList: []
    });
    //console.log(Api.getCategories());
    var getCategoriesIdsRequest = wxRequest.getRequest(Api.getCategoriesIds());
    getCategoriesIdsRequest.then(res => {


      var ids = "";
      var openid = self.data.openid
      if (!res.data.Ids == "") {
        ids = res.data.Ids;
      }
      var getCategoriesRequest = wxRequest.getRequest(Api.getCategories(ids, openid));
      getCategoriesRequest.then(response => {
          if (response.statusCode === 200) {
            self.setData({
              floatDisplay: "block",
              categoriesList: self.data.categoriesList.concat(response.data.map(function (item) {
                if (typeof (item.category_thumbnail_image) == "undefined" || item.category_thumbnail_image == "") {
                  item.category_thumbnail_image = "../../images/website.png";

                }
                // item.subimg = "subscription.png";
                return item;
              })),
            });
          } else {
            console.log(response);
          }

        })
        // .then(res=>{
        //     if (self.data.openid) {                
        //         setTimeout(function () {
        //             self.getSubscription();
        //         }, 500);  
        //     }

        // })
        .catch(function (response) {
          console.log(response);

        }).finally(function () {

        })
    })

  },
  fetchTopFivePosts: function () {
    var self = this;
    //获取滑动图片的文章
    var getPostsRequest = wxRequest.getRequest(Api.getSwiperPosts());
    getPostsRequest.then(response => {
      if (response.data.status == '200' && response.data.posts.length > 0) {
        self.setData({
          postsShowSwiperList: self.data.postsShowSwiperList.concat(response.data.posts.map(function (item) {
            if (!item.post_large_image) {
              item.post_large_image = "../../images/logo700.png";
            }
            return item;
          })),
          displaySwiper: "block"
        });
      } else {
        self.setData({
          displaySwiper: "none"
        });
      }
    }).catch(function (response) {
      console.log(response);
      self.setData({
        showerror: "block",
        floatDisplay: "none"
      });
    }).finally(function () {});
  },

  //获取文章列表数据
  fetchPostsData: function (data) {
    var self = this;
    if (!data) data = {};
    if (!data.page) data.page = 1;
    if (!data.categories) data.categories = 0;
    if (!data.search) data.search = '';
    if (data.page === 1) {
      self.setData({
        postsList: []
      });
    };
    self.setData({
      isLoading: true
    })
    var getCategoriesRequest = wxRequest.getRequest(Api.getCategoriesIds());
    getCategoriesRequest.then(res => {
      if (!res.data.Ids == "") {
        data.categories = res.data.Ids;
        self.setData({
          categories: res.data.Ids
        })

      }

      var getPostsRequest = wxRequest.getRequest(Api.getPosts(data));
      getPostsRequest
        .then(response => {
          if (response.statusCode === 200) {
            if (response.data.length) {
              if (response.data.length < pageCount) {
                self.setData({
                  isLastPage: true,
                  isLoading: false
                });
              }
              self.setData({
                floatDisplay: "block",
                postsList: self.data.postsList.concat(response.data.map(function (item) {

                  var strdate = item.date
                  if (item.category_name != null) {

                    item.categoryImage = "../../images/category.png";
                  } else {
                    item.categoryImage = "";
                  }

                  if (item.post_medium_image == null || item.post_medium_image == '') {
                    item.post_medium_image = "../../images/logo700.png";
                  }
                  item.date = util.cutstr(strdate, 10, 1);
                  return item;
                })),

              });

            } else {
              if (response.data.code == "rest_post_invalid_page_number") {
                self.setData({
                  isLastPage: true,
                  isLoading: false
                });
                wx.showToast({
                  title: '没有更多内容',
                  mask: false,
                  duration: 1500
                });
              } else {
                wx.showToast({
                  title: response.data.message,
                  duration: 1500
                })
              }
            }
          }
        })
        .catch(function (response) {
          if (data.page == 1) {

            self.setData({
              showerror: "block",
              floatDisplay: "none"
            });

          } else {
            wx.showModal({
              title: '加载失败',
              content: '加载数据失败,请重试.',
              showCancel: false,
            });
            self.setData({
              page: data.page - 1
            });
          }

        })
        .finally(function (response) {
          wx.hideLoading();
          self.setData({
            isLoading: false
          })
          wx.stopPullDownRefresh();
        });

    })


  },
  //加载分页
  loadMore: function (e) {

    var self = this;
    if (!self.data.isLastPage) {
      self.setData({
        page: self.data.page + 1
      });
      //console.log('当前页' + self.data.page);
      this.fetchPostsData(self.data);
    } else {
      wx.showToast({
        title: '没有更多内容',
        mask: false,
        duration: 1000
      });
    }
  },
  // 跳转至查看文章详情
  redictDetail: function (e) {
    // console.log('查看文章');
    var id = e.currentTarget.id,
      url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
  },
  //首页图标跳转
  onNavRedirect: function (e) {
    var redicttype = e.currentTarget.dataset.redicttype;
    var url = e.currentTarget.dataset.url == null ? '' : e.currentTarget.dataset.url;
    var appid = e.currentTarget.dataset.appid == null ? '' : e.currentTarget.dataset.appid;
    var extraData = e.currentTarget.dataset.extraData == null ? '' : e.currentTarget.dataset.extraData;
    if (redicttype == 'apppage') { //跳转到小程序内部页面         
      wx.navigateTo({
        url: url
      })
    } else if (redicttype == 'webpage') //跳转到web-view内嵌的页面
    {
      url = '../webpage/webpage?url=' + url;
      wx.navigateTo({
        url: url
      })
    } else if (redicttype == 'miniapp') //跳转到其他app
    {
      wx.navigateToMiniProgram({
        appId: appid,
        envVersion: 'release',
        path: url,
        extraData: extraData,
        success(res) {
          // 打开成功
        },
        fail: function (res) {
          console.log(res);
        }
      })
    }

  },
  // 跳转至查看小程序列表页面或文章详情页
  redictAppDetail: function (e) {
    // console.log('查看文章');
    var id = e.currentTarget.id;
    var redicttype = e.currentTarget.dataset.redicttype;
    var url = e.currentTarget.dataset.url == null ? '' : e.currentTarget.dataset.url;
    var appid = e.currentTarget.dataset.appid == null ? '' : e.currentTarget.dataset.appid;

    if (redicttype == 'detailpage') //跳转到内容页
    {
      url = '../detail/detail?id=' + id;
      wx.navigateTo({
        url: url
      })
    }
    if (redicttype == 'apppage') { //跳转到小程序内部页面         
      wx.navigateTo({
        url: url
      })
    } else if (redicttype == 'webpage') //跳转到web-view内嵌的页面
    {
      url = '../webpage/webpage?url=' + url;
      wx.navigateTo({
        url: url
      })
    } else if (redicttype == 'miniapp') //跳转到其他app
    {
      wx.navigateToMiniProgram({
        appId: appid,
        envVersion: 'release',
        path: url,
        success(res) {
          // 打开成功
        },
        fail: function (res) {
          console.log(res);
        }
      })
    }
  },
  //返回首页
  redictHome: function (e) {
    //console.log('查看某类别下的文章');  
    var id = e.currentTarget.dataset.id,
      url = '/pages/index/index';
    wx.switchTab({
      url: url
    });
  },
  adbinderror: function (e) {
    var self = this;
    console.log(e.detail.errCode);
    console.log(e.detail.errMsg);
    if (e.detail.errCode) {
      self.setData({
        listAdsuccess: false
      })
    }

  },
  //跳转至某分类下的文章列表
  redictIndex: function (e) {
    //console.log('查看某类别下的文章');  
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.item;
    var url = '../list/list?categoryID=' + id;
    wx.navigateTo({
      url: url
    });
  },
  userAuthorization: function () {
    var self = this;
    // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
    wx.getSetting({
      success: function success(res) {
        console.log(res.authSetting);
        var authSetting = res.authSetting;
        if (!('scope.userInfo' in authSetting)) {
          //if (util.isEmptyObject(authSetting)) {
          console.log('第一次授权');
          self.setData({
            isLoginPopup: true
          })

        } else {
          console.log('不是第一次授权', authSetting);
          // 没有授权的提醒
          if (authSetting['scope.userInfo'] === false) {
            wx.showModal({
              title: '用户未授权',
              content: '如需正常使用评论、点赞、赞赏等功能需授权获取用户信息。是否在授权管理中选中“用户信息”?',
              showCancel: true,
              cancelColor: '#296fd0',
              confirmColor: '#296fd0',
              confirmText: '设置权限',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.openSetting({
                    success: function success(res) {
                      console.log('打开设置', res.authSetting);
                      var scopeUserInfo = res.authSetting["scope.userInfo"];
                      if (scopeUserInfo) {
                        self.getUsreInfo(null);
                      }
                    }
                  });
                }
              }
            })
          } else {
            auth.getUsreInfo(null);
          }
        }
      }
    });
  },
  agreeGetUser: function (e) {
    let self = this;
    Auth.checkAgreeGetUser(e, app, self, '0');

    setTimeout(function () {
      self.fetchCategoriesData();
    }, 1000);

  },
  closeLoginPopup() {
    this.setData({
      isLoginPopup: false
    });
  },
  openLoginPopup() {
    this.setData({
      isLoginPopup: true
    });
  },
  getOpenId(data) {
    var url = Api.getOpenidUrl();
    var self = this;
    var postOpenidRequest = wxRequest.postRequest(url, data);
    //获取openid
    postOpenidRequest.then(response => {
      if (response.data.status == '200') {
        //console.log(response.data.openid)
        console.log("openid 获取成功");
        app.globalData.openid = response.data.openid;
        app.globalData.isGetOpenid = true;

      } else {
        console.log(response);
      }
    }).then(res => {
      setTimeout(function () {
        self.getSubscription();
      }, 500);
    })
  },
  confirm: function () {
    this.setData({
      'dialog.hidden': true,
      'dialog.title': '',
      'dialog.content': ''
    })
  }
})