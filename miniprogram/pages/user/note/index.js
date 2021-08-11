import api from "../../../utils/api.js"
import task from "../../../utils/request.js"
var {
  config
} = require('../../../utils/config.js');
const db = wx.cloud.database({
  env: config.env
})

const app = getApp()
Component({
  options: {
    addGlobalClass: true
  },

  ready() {
    this.initial()
  },

  created() {
    this.Load_list()
  },

  methods: {
    
    initial() {
      task.Tree_get(api.GET_note).then(res => {
        this.setData({
          note_list: res
        })
      })
    },

    tz: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../../pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
      })
    },

    Load_list() {
      var that = this;
      db.collection('note')
      .where({status:true})
      .orderBy('time','desc')
      .watch({
        onChange: function (snapshot) {
          console.log(snapshot)
          that.setData({
            note_list: snapshot.docs
          })
        },
        onError: function (err) {
          console.error('the watch closed because of error', err)
        }
      })

      /*.get().then(res=>{
      this.setData({
        note_list: res
      })
      })*/
    },
  },
})