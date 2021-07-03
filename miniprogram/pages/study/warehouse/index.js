
const db = wx.cloud.database({
  env: "demo-8gww0qau03b0af5a"
})
const _ = db.command
const app = getApp()
Component({
  data: {
    videos: [],

   
  },
  created(){
this.post()
  },
  methods:{
    tz(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },
      post(){
        db.collection('Encourage').get().then(res => {
          let result = res.data
          this.setData({
            carousels: result
          })
          console.log(res)
        })
        db.collection('Article').where({ type:"精讲" }
        ).get().then(res => {
          let result = res.data
          this.setData({
            columns: result
          })
          console.log(res)
        })
    
      }

  }



});