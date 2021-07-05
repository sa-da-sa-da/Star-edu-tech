import api from "../../../utils/api.js"
import task from "../../../utils/request.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  created(){
    this.list(0)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    list(){
      task.Tree_get(  api.GET_History_list) .then(res => {
        this.setData({
          ls_list: res
        })
      })
    },
    tz: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
      })
    },
    
    }
})
