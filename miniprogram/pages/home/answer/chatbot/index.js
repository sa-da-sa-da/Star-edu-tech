// pages/home/answer/chatbot/index.js
const app = getApp()
var plugin = requirePlugin("chatbot");


Page({

    data: {
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLaunch: function () {
        plugin.init({
          appid: "ft73f1tsSTwpV98GeB2obQAuKh4yZV", //小程序示例账户，仅供学习和参考
          openid: "oPeBX4947kgl3gAO6KVSBGVQpjFA", //用户的openid，必填项，可通过wx.login()获取code，然后通过后台接口获取openid
          userHeader: "", // 用户头像
          userName: "", // 用户昵称 
          anonymous: false, // 是否允许匿名用户评价，默认为false，设为ture时，未传递userName、userHeader两个字段时将弹出登录框
          success: () => {}, //非必填
          fail: (error) => {}, //非必填
        })
    },

    onLoad: function (options) {
        wx.getSystemInfo({
            success: (res) => {
              let isIOS = res.system.indexOf('iOS') > -1
              let navHeight = 0
              if (!isIOS) {
                navHeight = 48
              } else {
                navHeight = 44
              }
              this.setData({
                status: res.statusBarHeight,
                navHeight: navHeight,
                statusBarHeight: res.statusBarHeight + navHeight
              })
            }
          })
    },

    getQueryCallback: function (e) {
  
    },
    goBackHome: function () {
      // wx.navigateBack({
      //   delta: 1
      // })
    },
    back:function(e) {
      this.goBackHome()
    },
    onShareAppMessage:function(e) {
      console.log(e)
    }
})