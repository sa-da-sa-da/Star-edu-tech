const app = getApp()
import api from "../../../utils/api.js"
import task from "../../../utils/request.js"
import f from "../replace"
Page({
  data: {
  },

  initial() {
    this.setData({
      loding: true
    })
    task.Tree_cloud("notice2", {
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
    task.Tree_cloud("notice", {
      id: this.data.id,
      bl: true
    }).then(res => {
      console.log(res)
      this.setData({
        article: res.data,
      })
    })
  },
  details_cs(bl) {
    console.log(this.data.id)
    task.Tree_cloud('notice', {
      id: this.data.id,
      bl
    }).then(res => {
      if (bl) {
        this.setData({
          article: res.data,
        })
      }
    })
  },
  tz(e) {
    wx.navigateTo({
      url: "../../../pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
    })
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.initial(options.id)
    this.details_cs()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      fx_show: true
    })
  }
})