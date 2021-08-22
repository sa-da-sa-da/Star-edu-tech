let selectMarker = 0
let content = ''
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memu: true,
    selectMarkerContent: '',
    latitude: 34.20351,
    longitude: 108.951672,
    selectTabCampus: 0,
    placeList: [
      [
        { id: 0, name: '新西门', latitude: 34.203094, longitude: 108.947064 }, 
        { id: 1, name: '老西门' , latitude: 34.20537, longitude: 108.95252 },
        { id: 2, name: '东门' , latitude: 34.20428, longitude: 108.95631 },
        { id: 3, name: '图书馆' , latitude: 34.203195, longitude: 108.950437 },
        { id: 4, name: '体育馆' ,latitude: 34.202829, longitude: 108.953439 },
        { id: 5, name: '教育学部', latitude: 34.202843, longitude: 108.947553  },
        { id: 6, name: '崇鋈楼', latitude: 34.203052, longitude: 108.948611 },
        { id: 7, name: '积学堂', latitude: 34.204281, longitude: 108.95005 },
        { id: 8, name: '行政楼' , latitude: 34.204032, longitude: 108.952352 },
        { id: 9, name: '教学二楼', latitude: 34.204566, longitude: 108.948608 },
        { id: 10, name: '教学三楼', latitude: 34.204191, longitude: 108.949522 },
        { id: 11, name: '教学四楼' , latitude: 34.204899, longitude: 108.949367 },
        { id: 12, name: '教学五楼', latitude: 34.202221, longitude: 108.948616 },
        { id: 13, name: '教学八楼', latitude: 34.204207, longitude: 108.947708 },
        { id: 14, name: '超市', latitude: 34.203535, longitude: 108.954919 },
        { id: 15, name: '墨香印务' , latitude: 34.20307, longitude: 108.954259 },
        { id: 16, name: '动力中心' , latitude: 34.204186, longitude: 108.954088 },
        { id: 17, name: '菜鸟驿站' , latitude: 34.203257, longitude: 108.955415 },
        { id: 18, name: '顺丰中通', latitude: 34.205011, longitude: 108.952482 },
        { id: 19, name: '京东', latitude: 34.205011, longitude: 108.952104 },
        { id: 20, name: '学术楼', latitude: 34.206279, longitude: 108.954958 },
        { id: 21, name: '西平院' , latitude: 34.205021, longitude: 108.951973 },
        { id: 22, name: '校医院' , latitude: 34.207443, longitude: 108.955115 }
      ],
      [
        { id: 0, name: '北门', latitude: 34.157363, longitude: 108.893759 }, 
        { id: 1, name: '教育博物馆' , latitude: 34.156552, longitude: 108.892108 },
        { id: 2, name: '校务楼' , latitude: 34.157236, longitude: 108.89521 },
        { id: 3, name: '上林体育馆' , latitude: 34.156862, longitude: 108.889589 },
        { id: 4, name: '体育馆' ,latitude: 34.202829, longitude: 108.953439 },
        { id: 5, name: '文津楼', latitude: 34.155877, longitude: 108.891267  },
        { id: 6, name: '文澜楼', latitude: 34.155216, longitude: 108.891937 },
        { id: 7, name: '文渊楼', latitude: 34.15569, longitude: 108.895717 },
        { id: 8, name: '文汇楼' , latitude: 34.15425, longitude: 108.895368 },
        { id: 9, name: '图书馆', latitude: 34.154345, longitude: 108.89363 },
        { id: 10, name: '格物楼', latitude: 34.152941, longitude: 108.896561 },
        { id: 11, name: '阳光苑' , latitude: 34.150054, longitude: 108.891482 }
      ],
      []],//主要地点标记
    selectTabPlace: -1,
    scale: 16,//比例
    showCompass: true,//指南针
    enableZoom: true,//缩放
    enableScroll: true,//拖动
    enableRotate: true,//旋转
    markers: [
         {
         id: 0,
         title: '陕师大雁塔校区',
         iconPath: "cloud://demo-8gww0qau03b0af5a.6465-demo-8gww0qau03b0af5a-1304763314/icon/陕西师范大学logo.png", 
         latitude: 34.20351,
         longitude: 108.951672,
         width: 35,
         height: 30
       },{
         id: 1,
         title: '陕师大长安校区',
         iconPath: "cloud://demo-8gww0qau03b0af5a.6465-demo-8gww0qau03b0af5a-1304763314/icon/陕西师范大学logo.png",
         latitude: 34.154293,
         longitude: 108.893045,
         width: 32,
         height: 30
       },

    ]
  },
  /**
   * VR地图按钮，弹窗提示复制网址
   */
  vrMap: function (e) {
    let scene_id = [73521]
    let i = this.data.selectTabCampus
    let url = 'https://720yun.com/t/c6829wbgcln?scene_id=' + scene_id[i]
    wx.showModal({
      title: 'VR校园',
      confirmText: '复制网址',
      content: '暂不支持在小程序中查看VR校园，' +
        '请复制以下网址\n在浏览器或微信中打开：\n' + url,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.setClipboardData({
            data: url,
            success(res) {
              console.log('复制成功')
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  clickButton: function (e) {
    //console.log(this.data.fullscreen)
    //打印所有关于点击对象的信息
    this.setData({ fullscreen: !this.data.fullscreen })
  },
  /**
   * 选择校区
   */
  selectCampus: function (e) {
    let campus = [
      [34.20351,108.951672, 16],
      [34.154293,108.893045, 15]];
    var that = this
    wx.showActionSheet({
      itemList: ['雁塔校区', '长安校区'],
      success(res) {
        let i = res.tapIndex;
        // console.log(res.tapIndex)
        that.setData({
          selectTabCampus: i,
          selectTabPlace: -1,
          latitude: campus[i][0],
          longitude: campus[i][1],
          scale: campus[i][2]
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 选择顶部tab地点
   */
  selectPlace: function (e) {
    // console.log(e.currentTarget.dataset.id)
    let i = e.currentTarget.dataset.id
    let placeList = this.data.placeList
    let campus = [
      [34.20351,108.951672, 16],
      [34.154293,108.893045, 15]];
      let j=this.data.selectTabCampus
    if (i == -1) {
      this.setData({
        latitude: campus[j][0],
        longitude: campus[j][1],
        selectTabPlace: i,
        scale: campus[j][2]
      })
    } else {
      this.setData({
        latitude: placeList[j][i].latitude,
        longitude: placeList[j][i].longitude,
        selectTabPlace: i,
        scale: 18
      })
    }

  },

  loadMarkers: function () {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    if(app.globalData.markers){
      this.setData({
        markers: app.globalData.markers
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 1000)
    }else{
      wx.cloud.callFunction({
        name: 'getMarker',
        success: res => {
          let markers = res.result.data
          console.log(markers.length)
          console.log(res.result.data)
          app.globalData.markers=markers
          that.setData({
            markers: markers,
            details:res.result.data.details
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 1000)
        },
        fail: res => {
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: '加载异常',
            icon: 'none',
            duration: 1000
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /**
     * 初始化标记数据
     */
    this.loadMarkers()
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
    return {
      title: '邀你查看Star 校园地图、VR地图',
      path: '/miniprogram/todo/pages/school-map/school-map'
    }
  }
})