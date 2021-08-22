import api from "../../utils/api.js"
import task from "../../utils/request.js"
const app = getApp()
Component({
  options: {
    addGlobalClass: true
    
  },
  properties: {
    popr: {
      type: Number,
      default: 0
    },
  },

  ready(){
    this.initial()
  },
  methods: {
    initial() {
      task.Tree_get(api.GET_Article_list).then(res => {
        this.setData({
          xw_list: res  //文章列表 API
        })
      })
      task.Tree_get(api.GET_explain).then(res => {
        this.setData({
          top_list: res  // 推荐Top 列表API
        })
      })
      task.Tree_get(api.GET_notice).then(res =>{
        this.setData({
          nt_list: res   //通知列表API
        })
      })
      task.Tree_get(api.GET_banner).then(res => {
        this.setData({
          swiperList: res
        })
      })
      /*wx.cloud.database({env:'demo-8gww0qau03b0af5a'}).collection('banner').get().then( res => {
        this.setData({
          swiperList: res.data
        })
      })*/
      
      task.Tree_cloud('today',{db:123}).then(res => {
        this.setData({
          userlist: res.data,
          total:res.total
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
    yg(){
      wx.navigateToMiniProgram({
        appId: "wx85e06ec2a5d5127e",
        },
      )
    },
    tz(e) {
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },
  }
})
    