// miniprogram/pages/note/add/index.js
import time from "../../../../utils/time.js"
var {
  config
} = require('../../../../utils/config.js');
const db = wx.cloud.database({
  env: config.env
})
const app = getApp()
Page({
  data: {

    time: "",
    html: "",
    tille: "",
  },
  add() {
    db.collection('note').add({
      data: {
        time: this.data.time,
        html: this.data.html,
        tille: this.data.tille,
        press_id: this.data.press_id || null,
        ly: this.data.ly || null,
        status: true
      },
      success: function (res) {
        wx.showToast({
          title: '添加成功',
          icon: 'succes',
          duration: 2000,
          mask: true
        })
        wx.navigateBack({
          delta: 1
        })

      }
    })
  },
  onClickIcon() {
    wx.navigateTo({
      url: "../../../pages/details/details_html/index" + "?id=" + this.data.press_id
    })
  },
  initial(id) {
    db.collection('note').where({
      _id: id
    }).get().then(res => {
      console.log(res.data)
      this.setData({
        tille: res.data[0].tille,
        time: res.data[0].time,
        html: res.data[0].html,
        ly: res.data[0].ly,
        press_id: res.data[0].press_id
      })
    })
  },
  update_list(e) {
    let id = e.currentTarget.dataset._id;
    db.collection('note')
      .where({
        _id: id
      })
      .update({
        data:{
          tille: this.data.tille,
          time: this.data.time,
          html: this.data.html,
        },
        success(res) {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 1000);
          console.log('成功', res);
        },
        fail(res) {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 1000);
          console.log('失败', res);
        }
      })
  },
  delete_list(e) {
    let id = e.currentTarget.dataset._id;
    console.log(id);
    db.collection('note')
      .where({
        _id: id
      })
      .update({
        data: {
          status: false
        },
        success(res) {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 1000);
          console.log('成功', res);
        },
        fail(res) {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 1000);
          console.log('失败', res);
        }
      });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.initial(options.id)
    }
    if (options.id) {
      this.setData({
        press_id: options.id
      })
      db.collection('press').doc(options.id).get().then(res => {
        console.log(res.data)
        this.setData({
          ly: res.data.tille
        })
      })
      console.log(this.data.press_id)
    }

    this.setData({
      time: time.formatTime(new Date()),
    })
    console.log(this.data.time)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})