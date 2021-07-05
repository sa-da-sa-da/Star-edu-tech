const db = wx.cloud.database({
  env: "demo-8gww0qau03b0af5a"
})

import task from "../../../utils/request.js"
import api from "../../../utils/api.js"
import f from "../replace"
Page({
  data: {
    id: "",
    deta: {},
    html: "",
    sc_show: false,
    dz_show: false,
    fx_show: true
  },
  initial: function (id) {
    var that = this
    api.GET_History_list.doc=id
    task.Tree_get( api.GET_History_list).then(res => {
      let result = res.html
      result = f.replace(result)
      that.setData({
        html: result,
        xw_list: res
      })
    })
  },


  tz: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../../../pages/" + e.currentTarget.dataset.url + "?wzid=" + e.currentTarget.dataset.id
    })
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.initial(options.id)

  },

})