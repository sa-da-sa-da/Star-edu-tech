// components/top_list/index.js

import api from "../../utils/api.js"
import task from "../../utils/request.js"
Component({
  
  created() {
    this.list(0)
  },

  methods: {
    list() {
      task.Tree_get(api.GET_explain).then(res => {
        this.setData({
          top_list: res
        })
      })
    },
    tz(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
      })
    },

  }
})

