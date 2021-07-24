// pages/answer/index.js
var {config} = require('../../utils/config.js');
const db = wx.cloud.database({
  env: config.env
})
const app = getApp()

import api from "../../utils/api.js"
import task from "../../utils/request.js"
Component({
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: true
  },
  created(){
    this.post()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tz: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id + "&limt=" + e.currentTarget.dataset.limt
      })
    },
    post() {
      task.Tree_get(api.GET_Article_ms).then(res => {
        this.setData({
          wz_list: res,
        })
    })
      task.Tree_get(api.GET_Interview_ms).then(res => {
          this.setData({
            xw_list: res
          })
          console.log(this.data.xw_list)
      })
      db.collection('interview').where({ select: true, ly:'Js' }).count().then(res => {
        this.setData({
         js_L:res.total
        })
      })
      db.collection('interview').where({ select: true, ly:'CSS' }).count().then(res => {
        this.setData({
         CS_L:res.total
        })
      })
    },
  }
})
