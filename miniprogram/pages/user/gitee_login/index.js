const app = getApp()
const db = wx.cloud.database({
  env: "treeworld-2g5yvz9s899bf4a6"
})
/**
 * 页面的初始数据
 */
Page({
  data: {
    product: app.product,
    user_name: "",
    access_token: "",
    tokenFormShow: true,
    remember_password: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // app.loadFont();
 
  },

  doTokenFormSubmit: function (e) {
    wx.setStorageSync('access_token', e.detail.value.access_token);

    wx.showLoading({
      title: '令牌检测中',
    });
    console.log(    app.access_toke)
    app.getUserInfo(function (result) {
      wx.hideLoading();
      if (result) {
        wx.setStorageSync('access_token', e.detail.value.access_token);
        let userid = wx.getStorageSync("userid")
        console.log(userid)
        db.collection('User').doc(userid).update({
          data:{
            gitee_token:e.detail.value.access_token
          }
        })
        wx.navigateBack({
          delta: 1,
        })
      } else {
        wx.showModal({
          title: '授权失败',
          content: '输入的私人令牌无效，请检查是否正确',
          showCancel: false
        })
      }
    })
  },




})