import {
  config
} from "../../../utils/config.js"
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
        this.setData({
          carousels: res.data
        })
      })

      db.collection('periodical').where({
        style: "my"
      }).get().then(res => {
        this.setData({
          columns_my: res.data
        })
      })

      db.collection('periodical').where({
        style: "sj"
      }).get().then(res => {
        this.setData({
          columns_ms: res.data
        })
      })

      db.collection('periodical').where({
        style: "yd"
      }).get().then(res => {
        this.setData({
          columns_yd: res.data
        })
      })

      db.collection('periodical').where({
        style: "yg"
      }).get().then(res => {
        this.setData({
          columns_yg: res.data
        })
        console.log(res)
      })

      db.collection('periodical').where({
        style: "ms"
      }).get().then(res => {
        this.setData({
          columns_ms: res.data
        })
        console.log(res)
      })
    },
    tz(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },
  }

});