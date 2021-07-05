import Dialog from '@vant/weapp/dialog/dialog';
const db = wx.cloud.database({
  env: "demo-8gww0qau03b0af5a"
})
const app = getApp()
Component({
  data: {
    loding: true,
    active: 1,
    type: "小程序",
    tab: [
      "收藏",
      "点赞",

    ]

  },
  pageLifetimes: {
    show: function () {
      this.post()
    },
  },
  created() {
    this.post()
  },

  methods: {
    post() {
      db.collection('collect').limit(10).orderBy('add_time', 'asc').get().then(res => {
        this.setData({
          xw_list: res.data,
          loding: false
        })
      })
    },
    onChange(event) {
      this.setData({

        loding: true
      })
      var db2
      if (event.detail.title == "收藏") {
        db2 = "collect"
      } else {
        db2 = 'statr'
      }
      db.collection(db2).limit(10).orderBy('add_time', 'asc').get().then(res => {
        this.setData({
          xw_list: res.data,
          loding: false
        })
      })

    },


    tz: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },


  }
})