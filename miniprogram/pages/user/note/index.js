// miniprogram/pages/note/index.js
const db = wx.cloud.database({
  env: "demo-8gww0qau03b0af5a"
})
const app = getApp()
Component({

  /**
   * 页面的初始数据
   */
  data: {

  },
  created(){
    this.Load_list()
  },
  methods: {
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
        note_list:res.data
      })
      })
  
    },
  },
  
  
})