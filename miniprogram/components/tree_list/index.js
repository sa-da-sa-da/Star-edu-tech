// components/tree_list/index.js
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
    phb: {
      type:Boolean,
      default: false
    }, 
    circular_type: {
      type:Boolean,
      default:false
    },
    star: {
      type:Boolean,
      default:true
    },
    collect: {
      type: Boolean,
      default:true
    },
  },
  observers: {
    'list': function (list) {
      if(list){
        this.setData({
          loding:false
        })
      }
    }
  },
  methods: {
    tz(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "/pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
      })
    },
  }
})
