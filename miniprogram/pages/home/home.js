
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
          tz_list: res
        })
      })
      task.Tree_cloud('today',{db:123}).then(res => {
        this.setData({
          userlist: res.data,
          total:res.total+24
        })
      })
    
    },
  }
})
