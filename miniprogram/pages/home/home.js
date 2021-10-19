import api from "../../utils/api.js"
import task from "../../utils/request.js"
Page({
  onLoad() {
    task.Tree_get(api.GET_explain).then(res => {
      this.setData({
        top_list: res // 推荐Top 列表API
      })
    })
    task.Tree_get(api.GET_notice).then(res => {
      this.setData({
        nt_list: res //通知列表API
      })
    })
    task.Tree_get(api.GET_banner).then(res => {
      this.setData({
        swiperList: res
      })
    })
    task.Tree_cloud('today', {
      db: 123
    }).then(res => {
      this.setData({
        userlist: res.data,
        total: res.total
      })
    })
  },
  tz_swiper(e) {
    console.log(this.data.swiperList)
    console.log(e.currentTarget.dataset.url)
    wx.navigateTo({
      url: "../../pages/details/article_details/article_details?id=" + e.currentTarget.dataset.url
    })
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  tz(e) {
    wx.navigateTo({
      url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
    })
  },
})