const app = getApp()
import api from "../../utils/api.js"
import task from "../../utils/request.js"
Component({
  data: {
    show3: true,
    avatarUrl: "https://s1.ax1x.com/2020/07/28/aAdel6.jpg",
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    nickName: "游客",
    show: false,
    coverTransform: "translateY(0px)",
    coverTransition: "0s",
    moving: !1,
    //分享面板
    showShare: false,
    options_sada: [{
        name: '微信',
        icon: 'wechat',
        openType: 'share'
      },
      {
        name: '微博',
        icon: 'weibo'
      },
      {
        name: '复制链接',
        icon: 'link'
      },
      {
        name: '分享海报',
        icon: 'poster'
      },
      {
        name: '二维码',
        icon: 'qrcode'
      },
    ],

  },



  pageLifetimes: {
    show: function () {
      this.authorizer()
    },
  },
  options: {
    addGlobalClass: true
  },
  created() {
    this.authorizer()
    this.dj_list()
  },
  methods: {
    showQrcode: function () {
      wx.previewImage({
        current: 'cloud://demo-8gww0qau03b0af5a.6465-demo-8gww0qau03b0af5a-1304763314/78D917437FB9E50C5AE0259FFBF09105.jpg',
        urls: ['cloud://demo-8gww0qau03b0af5a.6465-demo-8gww0qau03b0af5a-1304763314/78D917437FB9E50C5AE0259FFBF09105.jpg']
      })
    },
    onClick(event) {
      this.setData({
        showShare: true
      });
    },

    onClose() {
      this.setData({
        showShare: false
      });
    },

    onSelect(event) {

      console.log(event.detail.name)
      if (event.detail.name == '复制链接') {
        // 绑定分享参数
        wx.setClipboardData({
          data: '#小程序://Star教技/教育技术/S2GCdL9SZMx1Zyn',
        })

      } else if (event.detail.name == '分享海报') {
        wx.previewImage({
          urls: ['https://6465-demo-8gww0qau03b0af5a-1304763314.tcb.qcloud.la/1.jpg?sign=ad1e0cf51a646dae6bf6dfc7fee729ad&t=1629386219'],
        })
      } else if (event.detail.name == '二维码') {
        wx.previewImage({
          urls: ['https://6465-demo-8gww0qau03b0af5a-1304763314.tcb.qcloud.la/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%BA%8C%E7%BB%B4%E7%A0%81.png?sign=e38dadc5da40a1244beac5271ddff4ca&t=1629387272'],
        })

      }
      this.onClose();
    },

    sz() {
      wx.openSetting({
        success: function (res) {}
      })
    },
    ql() {
      wx.showToast({
        title: '清理缓存成功',
        icon: 'none',
      })
      wx.clearStorage()
    },
    SubmitSussgest() {
      wx.navigateToMiniProgram({
        appId: "wx8abaf00ee8c3202e",
        path: 'page/index/index?id=123',
        extraData: {
          id: "344351",
          customData: {
            clientInfo: `iPhone OS 10.3.1 / 3.2.0.43 / 0`,
            imei: '7280BECE2FC29544172A2B858E9E90D0'
          }
        },
        success(res) {
          console.log("打开成功。")
        }
      })
    },
    hideModal() {
      this.setData({
        show: false
      })
    },
    getUserProfile() {
      let userid = wx.getStorageSync('userInfo')
      wx.getUserProfile({
        desc: '展示用户信息',
        success: (res) => {
          api.GET_User2.doc = userid._id
          api.GET_User2.update = {
            data: {
              avatarUrl: res.userInfo.avatarUrl,
              nickName: res.userInfo.nickName,
            }
          }
          task.Tree_get(api.GET_User2).then(res => {
            this.setData({
              show: false
            })
            this.authorizer()
          })
        }
      })
    },
    coverTouchstart(e) {
      if (this.data.pageAtTop === false) {
        return;
      }
      this.setData({
        coverTransition: 'transform .1s linear',
        startY: e.touches[0].clientY
      })
    },
    coverTouchmove(e) {
      var moveDistance = e.touches[0].clientY - this.data.startY;
      if (moveDistance < 0) {
        this.data.moving = true;
        if (375 + moveDistance > this.data.CustomBar + this.data.StatusBar + 140) {
          this.setData({
            heights: moveDistance
          })
        }
      } else {
        this.data.moving = true;
        if (moveDistance >= 80 && moveDistance < 100) {
          moveDistance = 80;
          this.setData({
            coverTransform: "translateY(".concat(moveDistance, "px)")
          })
        }
        if (moveDistance > 0 && moveDistance <= 80) {
          this.setData({
            coverTransform: "translateY(".concat(moveDistance, "px)")
          })
        }
      }

    },
    coverTouchend() {
      if (this.data.moving === false) {
        return;
      }
      console.log(this.data.heights)
      if (this.data.heights < -140) {
        this.setData({
          heights: 0
        })
      }
      this.setData({
        moving: false,
        coverTransition: 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)',
        coverTransform: 'translateY(0px)',

      })

    },

    user_list() {
      task.Tree_cloud('user_data').then(res => {
        this.setData({
          dz: res.dz,
          sc: res.sc,
          nt: res.nt
        })
      })
    },

    dj_list() {
      let that = this
      var dj
      task.Tree_cloud('vip_grade').then(res => {
        console.log(res)
        that.setData({
          jf: res.jf,
          dj: res.dj,
        })
      })
    },

    authorizer() {
      let that = this
      task.Tree_get(api.GET_User).then(res => {
        console.log(res)
        if (res[0].avatarUrl) {
          this.user_list()
          that.setData({
            avatarUrl: res[0].avatarUrl,
            nickName: res[0].nickName,
            userin: res[0],
            add_time: res[0].addtime,
            _openid: res[0]._openid
          })
        } else {
          this.setData({
            show: true
          })
        }
      })
    },

    tz(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: "../../pages/" + e.currentTarget.dataset.a + "?id=" + e.currentTarget.dataset.id
      })
    },
  }
})