
import task from "../../../utils/request.js"
Component({
  data: {
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [{
      id: 0,
      name: "C",
      color: "bg-blue"
    }, {
      id: 1,
      name: "D",
      color: "bg-green"
    }, {
      id: 2,
      name: "F",
      color: "bg-orange "
    }, {
      id: 3,
      name: "G",
      color: "bg-olive"
    }, {
      id: 4,
      name: "H",
      color: "bg-brown "
    }, {
      id: 5,
      name: "J",
      color: "bg-cyan "
    }, {
      id: 6,
      name: "K",
      color: "bg-blue"
    }, {
      id: 7,
      name: "L",
      color: "bg-green"
    }, {
      id: 8,
      name: "N",
      color: "bg-orange "
    }, {
      id: 9,
      name: "P",
      color: "bg-olive"
    },
    {
      id: 10,
      name: "R",
      color: "bg-brown "
    }, {
      id: 11,
      name: "S",
      color: "bg-cyan "
    }, {
      id: 12,
      name: "W",
      color: "bg-blue"
    }, {
      id: 13,
      name: "X",
      color: "bg-green"
    }, {
      id: 14,
      name: "Y",
      color: "bg-orange "
    }, {
      id: 15,
      name: "Z",
      color: "bg-olive"
    }
   ],
    load: true,
    loding: true
  },

  created() {
    this.post()
  },

  methods: {
    post() {
      this.setData({
        loding: true
      })
      task.Tree_cloud(
        "dictionaries_list",
      ).then(res => {
        this.setData({
          list2: res.data,
          loding: false
        })
      })
    },
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        MainCur: e.currentTarget.dataset.id,
        VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
      })
    },
    tz: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },
    VerticalMain(e) {
      let that = this;
      let list = this.data.list;
      let tabHeight = 0;
      if (this.data.load) {
        for (let i = 0; i < list.length; i++) {
          let view = wx.createSelectorQuery().in(this).select("#main-" + list[i].id);
          view.fields({
            size: true
          }, data => {
            list[i].top = tabHeight;
            tabHeight = tabHeight + data.height;
            list[i].bottom = tabHeight;
          }).exec();
        }
        that.setData({
          load: false,
          list: list
        })
      }
      let scrollTop = e.detail.scrollTop + 20;
      for (let i = 0; i < list.length; i++) {
        if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
          that.setData({
            VerticalNavTop: (list[i].id - 1) * 50,
            TabCur: list[i].id
          })
          return false
        }
      }
    }
  }
})