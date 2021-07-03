const app = getApp()
import api from "../../../utils/api.js"
import task from "../../../utils/request.js"
import f from "../replace"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    html: "",
    sc_show: false,
    dz_show: false,
    fx_show: true
  },

  initial: function (id) {
    this.setData({
      loding: true
    })
    task.Tree_cloud("Article_details2", {
      id: this.data.id,
    }).then(res => {
      let result = res.details.html
      this.setData({
        loding: false
      })
      result = f.replace(result)
      this.setData({
        html: result,
        article: res.details
      })
      console.log(this.data.article)
    })

  },
  initial_tx: function () {
    task.Tree_cloud("Article_details", {
      id: this.data.id,
      bl: true
    }).then(res => {
      console.log(res)
      this.setData({
        sc_show: res.collect,
        dz_show: res.statr,
        article: res.data,
      })
    })
  },

  tz(e) {
    wx.navigateTo({
      url: "../../../pages/" + e.currentTarget.dataset.url + "?wzid=" + e.currentTarget.dataset.id
    })
  },
  details_cs(bl) {
    console.log(this.data.id)
    task.Tree_cloud('Article_details', {
      id: this.data.id,
      bl
    }).then(res => {
      if (bl) {
        this.setData({

          article: res.data,
        })
      }

      this.setData({
        sc_show: res.collect,
        dz_show: res.statr
      })
    })
  },
  statr_sc(e) {
    let userInfo = wx.getStorageSync("userInfo")
    if (userInfo._openid) {
      let that = this
      wx.showToast({
        title: "树树加载中",
        icon: 'loading',
        mask: true,
        duration: 2000
      })
      let data = this.data.article
      data.press_id = data._id
      console.log(data)

      task.Tree_cloud(e.currentTarget.dataset.id, {
        press: this.data.article
      }).then(res => {
        wx.showToast({
          title: res,
          duration: 1000,
          icon: 'none',
          mask: true
        })
        this.details_cs(true)

      })
    } else {
      wx.showToast({
        title: '您尚未登录',
        duration: 1000,
        icon: 'none',
        mask: true
      })
    }
  },


  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.initial(options.id)
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    this.details_cs()


  },
  onShareAppMessage: function (res) {
    console.log(this.data.article.img)
    this.setData({
      fx_show: false
    })
    return {
      title: this.data.article.tille,
      path: '/pages/index/index?id=' + this.data.id + "&share=true",
      imageUrl: this.data.article.img || "",

    }
  },

  onShareTimeline: function (res) {
    console.log(res)

    return {
      title: this.data.article.tille,
      imageUrl: this.data.article.img
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      fx_show: true
    })
  },




})