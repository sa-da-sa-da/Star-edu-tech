const app = getApp()

import api from "../../utils/api.js"
import task from "../../utils/request.js"
Page({


  data: {
    page: 1,
    id: 0,
    tab: [{
        name: "首页",
        icon: "",
        main: true
      },
{
        name: "学习",
        icon: "",
        main: true

      }, {
        name: "我的",
        icon: "",
        main: true
      },

    ]

  },


  closeThis() {
    wx.setStorageSync("loadOpen", true)
    this.setData({
      guide: false,
    })
  },
  initial() {
    console.log("1123")
    let firstOpen = wx.getStorageSync("loadOpen")
    if (firstOpen == undefined || firstOpen == '') {
      this.setData({
        guide: true,
      })
      console.log(this.data.guide)
    } else {
      this.setData({
        guide: false,
      })

    }
  },


  tab_checked: function (e) {
    var id = e.currentTarget.dataset.id
    wx.pageScrollTo({
      scrollTop: 0
    })
    console.log(id)
    this.setData({
      id: id
    })
  },
  tab_xz(e){
    this.initial_study(e)
  },

  initial_study(e) {
    console.log("asd")
    if (this.data.page == 1) {
      this.setData({
        loding: true
      })
    }
    if (e) {
      this.setData({
        page: 1
      })
      if (e.detail == "全部") {
        e.detail = ""
      }
    }
    let data = {
      size: 10,
      page: this.data.page,
      Type: e ? e.detail : "",
      database: "press"
    }

    task.Tree_cloud("list", data).then(res => {
      let data = res.data.data
      let list = this.data.list
      if (this.data.page == 1) {
        this.setData({
          list: data,
          loding: false,
          count: res.count
        })
      } else {
        data.forEach(res => {
          list.push(res)
        })
        this.setData({
          list,
          count: res.count,
          loding: false
        })
      }

    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initial(0)
    this.initial_study(0)
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
    if (this.data.id == 2) {
      return {
        path: '/pages/index/index?id_index=' + this.data.id,
        imageUrl: "cloud://demo-8gww0qau03b0af5a.6465-demo-8gww0qau03b0af5a-1304763314/1.jpg",

      }
    } else {
      return {
        imageUrl: "cloud://demo-8gww0qau03b0af5a.6465-demo-8gww0qau03b0af5a-1304763314/1.jpg",

      }
    }


  }
})