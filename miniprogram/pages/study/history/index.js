import api from "../../../utils/api.js"
import task from "../../../utils/request.js"
Component({
  
  created() {
    this.list(0)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    list() {
      task.Tree_get(api.GET_History_list).then(res => {
        this.setData({
          ls_list: res
        })
      })
    },
    tz(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
      })
    },

  }
})