// miniprogram/pages/details/index.js
var {config} = require('../../../utils/config.js');
const db = wx.cloud.database({
  env: config.env
})
const _ = db.command
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
    deta: {},
    html: "",
    sc_show: false,
    dz_show: false,
    fx_show: true
  },

  initial: function (id) {
    this.setData({
      loding: true
    })
    task.Tree_cloud("details", {
      id: this.data.id,
    }).then(res => {
      let result = res.details.html
      this.setData({
        loding: false
      })
      result = f.replace(result)
      this.setData({
        html: result,
        xw_list: res.details
      })
    })

  },
  initial_tx: function () {
    task.Tree_cloud("details_cs", {
      id: this.data.id,
      bl: true
    }).then(res => {
      console.log(res)
      this.setData({
        sc_show: res.collect,
        dz_show: res.statr,
        xw_list: res.collect_data,
      })
    })
  },

  tz (e) {
    wx.navigateTo({
      url: "../../../pages/" + e.currentTarget.dataset.url + "?wzid=" + e.currentTarget.dataset.id
    })
  },
  details_cs() {
    console.log(this.data.id)
    wx.cloud.callFunction({
      name: "details_cs",
      data: {
        id: this.data.id,
        bl: true,
      },
    }).then(res => {
      console.log(res)
 
        this.setData({

          xw_list: res.collect_data,
        })
   
      this.setData({
        sc_show: res.result.collect,
        dz_show: res.result.statr
      })
    })
  },
  statr_sc(e) {
    let openid = wx.getStorageSync("openid")
    if (openid) {
      let that = this
      wx.showToast({
        title: "加载中",
        icon: 'loading',
        mask: true,
        duration: 2000
      })
      let data = this.data.xw_list
      data.press_id = data._id
      console.log(data._id)
      task.Tree_cloud(e.currentTarget.dataset.id, {
        press: this.data.xw_list
      }).then(res => {
        wx.showToast({
          title: res,
          duration: 1000,
          icon: 'none',
          mask: true
        })
        this.initial_tx()

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
    console.log(this.data.xw_list.img)
    this.setData({
      fx_show: false
    })
    return {
      title: this.data.xw_list.tille,
      path: '/pages/index/index?id=' + this.data.id + "&share=true",
      imageUrl: this.data.xw_list.img || "",

    }
  },

  onShareTimeline: function (res) {
    console.log(res)

    return {
      title: this.data.xw_list.tille,
      imageUrl: this.data.xw_list.img
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