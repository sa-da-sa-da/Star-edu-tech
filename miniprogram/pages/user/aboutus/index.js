// pages/intro/intro.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },

  /**
   * Lifecycle function--Called when page load
   */
  showQrcode1: function () {
    wx.previewImage({
      current: 'cloud://demo-8gww0qau03b0af5a.6465-demo-8gww0qau03b0af5a-1304763314/微信二维码.png',
      urls: ['cloud://demo-8gww0qau03b0af5a.6465-demo-8gww0qau03b0af5a-1304763314/微信二维码.png']
    })
  },
  showQrcode2: function () {
    wx.previewImage({
      current: 'cloud://demo-8gww0qau03b0af5a.6465-demo-8gww0qau03b0af5a-1304763314/钉钉二维码.jpg',
      urls: ['cloud://demo-8gww0qau03b0af5a.6465-demo-8gww0qau03b0af5a-1304763314/钉钉二维码.jpg']
    })
  },
  //电话拨打
  phoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '13343921279',
      fail() {
        console.log('拨打失败');
      }
    })
  },
  //保存通讯录
  saveContact: function () {
    wx.addPhoneContact({
      nickName: '颯龘',
      firstName: '真',
      lastName: '张',
      remark: '信息技术教师',
      mobilePhoneNumber: '13343921279',
      weChatNumber: 'zz25820819',
      addressCountry:'中国',
      addressState: '河南',
      addressCity: '鹤壁',
      email:'3206908770@qq.com',
      url:'http://serverlessframe.com',
      success() {},
      fail() {
        console.log('保存失败');
      }
    })
  },
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function (ops) {
    return {
      title: '个人简历',
      path: 'pages/index/index'
    }

  }
})