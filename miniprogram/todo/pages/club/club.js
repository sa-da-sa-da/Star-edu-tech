// miniprogram/pages/organization/organization.js 
var app = getApp();
let allDataObject = {}
Page({
  data: {
    typeList: ['校级', '教育', '哲政', '马院', '化院', '心理', '音乐',
      '计科', '地科', '新传', '生科', '食品', '文学', '外院',
      '体育', "数科", "美术", "物信", "国商", "材料", "民教"
    ],
    winHeight: "", //窗口高度 
    currentTab: 0, //预设当前项的值 
    scrollLeft: 0, //tab标题的滚动条位置 
    allData: {},
    isRuleTrue: false
  },



  showRule: function (e) {
    console.log(e.currentTarget.dataset.organization)
    let organization = e.currentTarget.dataset.organization
    if (organization.introduce && organization.details.length > 0) {
      this.setData({
        isRuleTrue: true,
        title: organization.name,
        content: organization.details,
      })
    } else {
      wx.showToast({
        title: '暂无该机构详情内容',
        icon: 'none',
        duration: 1500
      })
    }
  },
  //关闭透明层
  hideRule: function () {
    this.setData({
      isRuleTrue: false
    })
  },

  // 滚动切换标签样式 
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式 
  swichNav: function (e) {
    this.setData({
      currentTab: e.target.dataset.current
    })
  },
  //判断当前滚动，设置tab标题滚动条。 
  checkCor: function (direction) {
    let that = this
    let query = wx.createSelectorQuery()
    query.select('.active').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      // console.log(res)
      if (that.data.currentTab > 1) {
        that.setData({
          scrollLeft: res[0].width * (that.data.currentTab - 1)
        })
      } else {
        that.setData({
          scrollLeft: 0
        })
      }
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    //  高度自适应 
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        var clientHeight = res.windowHeight;
        var clientWidth = res.windowWidth;
        var rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    if (JSON.stringify(allDataObject) === '{}') {
      console.log('加载数据')
      wx.cloud.callFunction({
        name: 'getOrganization'
      }).then(res => {
        console.log(res.result.data)
        let allDataList = res.result.data
        for (let i = 0; i < allDataList.length; i++) {
          if (!allDataObject.hasOwnProperty(allDataList[i].type)) {
            allDataObject[allDataList[i].type] = []
          }
          allDataObject[allDataList[i].type].push(allDataList[i]);
        }
        that.setData({
          allData: allDataObject
        })
        wx.hideLoading()
      }).catch(res => {
        wx.hideLoading()
        console.log(res)
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 2000
        })
      })
    } else {
      this.setData({
        allData: allDataObject
      })
      wx.hideLoading()
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '邀你查询 Star 组织',
      path: '../../../todo/pages/club/club'
    }
  }
})