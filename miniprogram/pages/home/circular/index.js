// pages/home/circular/index.js
import api from "../../../utils/api.js"
import task from "../../../utils/request.js"
Component({
    properties: {
        list: {
          type: Object,
          default: ''
        }, 
        loding: {
          type:Boolean,
          default: true
        }, 
      },

    options:{
        addGlobalClass:true
    },
    ready(){
        this.initial()
    },
    methods:{
        initial(){
            task.Tree_get(api.GET_notice).then(res => {
                this.setData({
                    nt_list: res
                })
            })
        },
    tz(e) {
        wx.navigateTo({
        url: "../../" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },
    }
})