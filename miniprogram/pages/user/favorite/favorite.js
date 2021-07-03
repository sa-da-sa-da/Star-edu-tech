const app = getApp()
import api from "../../../utils/api.js"
import task from "../../../utils/request.js"







// 松阳
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loding: true,
    active: 0,
    tab: [
      "收藏",
      "点赞",
    ]

  },

  initial() {
    task.Tree_get( api.GET_Article_collect).then(res => {
      console.log(res)
      this.setData({
        xw_list: res,
        loding: false
      })
    })
  },
  onChange(event) {
    this.setData({
      loding: true
    })
    var db2
    if (event.detail.title == "收藏") {
      db2 = api.GET_Article_collect
    } else {
      db2 = api.GET_Article_statr
    }
    task.Tree_get( db2).then(res => {
      this.setData({
        xw_list: res,
        loding: false
      })
    })
  },

  onLoad: function (options) {
this.initial()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})