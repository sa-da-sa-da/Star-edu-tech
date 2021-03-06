// pages/explore/explore.js
const REPO = require('../../api/repo.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:['全站热门', '本周热门', '今日热门'],
    active: 0,
    index: 0,
    lang: '',
    currLang: '全部语言',
    page: 1,
    total_pages: 100,
    langArr: [],
    repos: null,
    loading: true,
    btmloading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTrending()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  getTrending: function () {
    wx.cloud.callFunction({
      name: 'trending',
      data: {
        lang: this.data.lang,
        page: this.data.page
      }
    }).then(res => {
      console.log('云函数[trending]调用成功')
      if (!this.data.repos) {
        this.setData({
          repos: []
        })
      }
      const repos = this.data.page > 1 ? this.data.repos.concat(res.result.repos) : res.result.repos
      this.setData({
        langArr: res.result.langs,
        trending: res.result.trending,
        total_pages: res.result.pages,
        repos: repos,
        loading: false,
        btmloading: false
      })
      wx.stopPullDownRefresh()
    }).catch(err => {
      this.setData({
        loading: false
      })
      wx.showToast({
        icon: 'none',
        title: '云函数调用失败',
      })
      console.error('云函数[trending]调用失败：', err)
      wx.stopPullDownRefresh()
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      index: 0,
      // index: e.detail.value,
      lang: this.data.langArr[e.detail.value].query,
      page: 1,
      repos: [],
      loading: true,
      currLang: this.data.langArr[e.detail.value].val
    })
    this.getTrending()
  },

  tabChange: function(e) {
    this.setData({ active: e.detail.index })
  },
  tz(){
    
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page: 1
    })
    this.getTrending()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.page < this.data.total_pages && this.data.active == 0) {
      this.setData({
        btmloading: true,
        page: this.data.page + 1
      })
      this.getTrending()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})