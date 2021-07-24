
import api from "../../utils/api.js"
import task from "../../utils/request.js"
Component({
  options: {
    addGlobalClass: true
  },
  ready(){
    this.initial()
  },
  methods: {
    initial() {
      task.Tree_get(api.GET_Article_list).then(res => {
        this.setData({
          xw_list: res 
        })
      })
      task.Tree_get(api.GET_Article_top).then(res => {
        this.setData({
          tz_list: res  // 推荐Top 列表
        })
      })
      task.Tree_get(api.GET_notice).then(res =>{
        this.setData({
          nt_list: res
        })
      })
      task.Tree_cloud('today',{db:123}).then(res => {
        this.setData({
          userlist: res.data,
          total:res.total
        })
      })
    },
    tz(e) {
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },
  }
})
    