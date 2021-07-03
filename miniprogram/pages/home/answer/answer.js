
import api from "../../../utils/api.js"
import task from "../../../utils/request.js"
Page({
  data: {

  },

  tz: function (e) {
  
    wx.navigateTo({
      url: "../../../pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
    })
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  post(){
    task.Tree_get( api.GET_answer,true).then(res => {
      this.setData({
        as_list: res
      })
    })
  },
  onLoad: function (options) {
    this.post()

  },



})