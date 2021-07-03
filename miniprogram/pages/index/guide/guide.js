// pages/index/guide/guide.js
Component({

  properties: {
   guide_show: {
      type: Boolean,
      default: false
    },
  },


  data: {
    guide: false,
  },
  ready() {
    this.initial()
  },

  methods: {
    closeThis() {
      wx.setStorageSync("loadOpen", true)
      this.setData({
        guide: false,
      })
    },
    initial() {
      console.log("1123")
      let firstOpen = wx.getStorageSync("loadOpen")
      if (firstOpen == undefined || firstOpen == '') {
        this.setData({
          guide: true,
        })
        console.log(this.data.guide)
      } else {
        this.setData({
          guide: false,
        })

      }


    }



  }
})