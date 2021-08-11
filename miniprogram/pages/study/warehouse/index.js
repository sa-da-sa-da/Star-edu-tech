const db = wx.cloud.database({
  env: "demo-8gww0qau03b0af5a",
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
    tz(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },
    post() {
      db.collection('encourage').get().then(res => {
        this.setData({
          carousels: res.data
        })
      })

      db.collection('periodical').get().then(res => {
        this.setData({
          columns: res.data
        })
        console.log(res)
      })
    }
  }

});