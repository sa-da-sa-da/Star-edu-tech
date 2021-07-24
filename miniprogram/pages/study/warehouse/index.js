var {config} = require('../../../utils/config.js');
const db = wx.cloud.database({
  env: config.env
})
const _ = db.command
const app = getApp()
Component({
  data: {
    videos: [],
  },
  created() {
    this.post()
  },
  methods: {
    
    post() {
      db.collection('encourage').get().then(res => {
        let result = res.data
        this.setData({
          carousels: result
        })
        console.log(res)
      })
      db.collection('explain').where({top:"1024"}
      ).get().then(res => {
        let result = res.data
        this.setData({
          columns: result
        })
        console.log(res)
      })
    },
    tz(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },
  }



});