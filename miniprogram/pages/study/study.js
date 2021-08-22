const app = getApp()
import api from "../../utils/api.js"
import task from "../../utils/request.js"
Component({
  options: {
    addGlobalClass: true
  },
  data: {
    CustomBar: app.globalData.CustomBar,
    height: "40px",
    loding: true,
    type: "全部",
    active: 0,
    tab: [{
      name: "全部",
      id: "全部"
    }, {
      name: "STEM教育",
      id: "stem"
    }, {
      name: "教育技术",
      id: "jj"
    }, {
      name: "中小学教师",
      id: "teacher"
    }, {
      name: "创客教育",
      id: "ck"
    }, {
      name: "学习社区",
      id: "xx"
    }, {
      name: "人工智能与开源硬件",
      id: "rgzn"
    }, {
      name: "翻转课堂",
      id: "fz"
    }, {
      name: "教育装备",
      id: "jy"
    },{
      name: "其他",
      id: "zt"
    },],
    pubshow:false,
  },
  created() {
    this.list()
  },
  properties: {
    list: {
      type: Object,
      default: ''
    },
    loding: {
      type: Boolean,
      default: true
    },
  },
  watch: {
    'active': function (a, b) {
      console.log(a)
      wx.pageScrollTo({
        scrollTop: 0
      })
    },
  },
  methods: {
    onChangepubshow(event){
      this.setData({
        pubshow:true,
        type:"最热",
      })
    },

    show_xl() {
      if (this.data.height == "auto") {
        this.setData({
          height: "40px"
        })
      } else {
        this.setData({
          height: "auto"
        })
      }
    },
    onClick(event) {
      app.globalData.type = event.detail.name
      let that = this
      wx.pageScrollTo({
        scrollTop: 0
      })
      that.setData({
        active: event.detail.name
      })
    },
    onChange(e) {
      this.setData({
        loding: true,
        type: e.currentTarget.dataset.type,
        pubshow:false,
      })
      this.triggerEvent('tab_xz', e.currentTarget.dataset.type)
    },
    list() {
      task.Tree_get(api.GET_Article_browse).then(res => {
        this.setData({
          rb_list: res
        })
      })
      task.Tree_get( api.GET_Article_top) .then(res => {
        this.setData({
          tz_list: res
        })
      })
      task.Tree_get( api.GET_periodical) .then(res => {
        this.setData({
          en_list: res
        })
      })

    },
    tz(e) {

      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
      })
    },
  },
})