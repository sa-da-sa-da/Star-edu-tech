import api from "../../../utils/api.js"
import task from "../../../utils/request.js"

const db = wx.cloud.database({
  env: "demo-8gww0qau03b0af5a"
})

const app = getApp()
Component({
  options:{
    addGlobalClass:true
  },

  ready(){
    this.initial()
  },

  created(){
    this.Load_list()
  },

  methods: {

    initial(){
      task.Tree_get(api.GET_note).then(res => {
        this.setData({
          note_list1: res
        })
      })
    },

    tz: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../../pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
      })
    },

    Load_list(){
      let openid = wx.getStorageSync("openid")
      db.collection('note').where({
        _openid:openid
      }).get().then(res=>{
      this.setData({
        note_list: res
      })
      })
    },
  },
})