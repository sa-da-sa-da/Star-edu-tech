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
    moving: !1
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

  },


  methods: {
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
    logout() {
      var that = this;
      wx.showModal({
        title: '退出提醒',
        content: '是否退出当前登录的码云帐号？',
        showCancel: true,
        confirmText: "退出",
        confirmColor: "#ff4500",
        cancelText: "返回",
        success(res) {
          if (res.confirm) {
            app.logout();
            wx.navigateTo({
              url: "../../pages/user/gitee_login/index"
            })
          }
        }
      });
    },
    user_list() {
      task.Tree_cloud('user_data').then(res => {
        this.setData({
          dz: res.dz,
          sc: res.sc,
          nt: res.nt,
          tk: res.tk
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