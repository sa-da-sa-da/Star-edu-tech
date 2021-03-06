// pages/account/account.js
import store from '../../store/store'
import create from '../../store/create'
const USER = require('../../api/user.js')
const REPO = require('../../api/repo.js')
let interstitialAd = null

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    empty: '--',
    repos: '-',
    hasLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.update()
    wx.setStorageSync('lastTab', '../account/account')
    wx.setStorageSync('lastPage', '')
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-b37661a7e73674dd'
      })
      interstitialAd.onLoad(() => {})
      interstitialAd.onError((err) => {})
      interstitialAd.onClose(() => {})
    }
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!this.store.data.token) {
      this.setData({
        hasLogin: false,
        userInfo: {
          avatar_url: 'cloud://demo-8gww0qau03b0af5a.6465-demo-8gww0qau03b0af5a-1304763314/icon/def_ava.png'
        }
      })
    } else {
      this.fetchInfo()
      this.setData({
        hasLogin: true
      })
    }
  },

  fetchInfo: function () {
    USER.getMyInfo(this.store.data.token).then(res => {
      this.setData({
        userInfo: res
      })
    }).catch(err => {
      console.log(err)
    })
  },

  fetchRepos: function () {
    const query = {
      sort: 'pushed',
      per_page: 100
    }
    REPO.getMyRepos(query).then(res => {
      this.setData({
        repos: res.length < 100 ? res.length : '99+'
      })
    }).catch(err => {
      console.log(err)
    })
  },

  copyIt: function (e) {
    const data = e.currentTarget.dataset.text
    if (data) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.text,
        success (res) {
          wx.showToast({
            title: '内容已复制！'
          })
        }
      })
    }
  },

  feedback: function () {
    wx.navigateToMiniProgram({
      appId: 'wx5a28d83ceeee2112',
      extraData: {
        id: '125954'
      },
      fail: err => {
        console.log(err)
      }
    })
  },


})