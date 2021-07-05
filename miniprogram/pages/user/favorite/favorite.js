import Dialog from '@vant/weapp/dialog/dialog';
const db = wx.cloud.database({
  env: "demo-8gww0qau03b0af5a"
})
const app = getApp()
Component({
  data: {
    loding: true,
    active: 0,
    type: "小程序",
    tab: [
      "收藏",
      "点赞",
<<<<<<< HEAD

    ]

=======
    ]
>>>>>>> f7e3c4207c09bfbb73c34006e6c6e0f2a090abf1
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
<<<<<<< HEAD

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

=======

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
>>>>>>> f7e3c4207c09bfbb73c34006e6c6e0f2a090abf1

    tz: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },


  }
})
