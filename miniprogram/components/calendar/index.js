import api from "../../utils/api.js"
import task from "../../utils/request.js"

let app = getApp()
Component({

  options: {
    addGlobalClass: true
  },
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    // 当前维度
    latitude: "",
    // 当前精度
    longitude: "",

    signinNow: false

  },

  observers: {
    'yesDate': function(typeList) {

      this.yesdate()
    }
  },


  lifetimes: {
    attached(){
      let t = this;
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1 < 10 ? "0" + String(now.getMonth() + 1) : now.getMonth() + 1;
      console.log(this.data.yesDate)
      t.dateInit();
      t.setData({
        year: year,
        month: Number(month),
        isToday: '' + year + month + now.getDate()
      });

    },
  },
  properties: {
    yesDate: {
      type: String,
      default: ''
    },

  },


  methods: {


    // 是否可以签到
    activeSign() {
      console.log(this.data.isToday)
      let t = this;
      let nowdate = t.data.isToday;
      let dateArr = t.data.dateArr;
      let yesDate = t.data.yesDate;
      for (var i = 0; i < dateArr.length; i++) {
        if (Number(dateArr[i].isToday) == Number(nowdate)) {
          dateArr[i].choose = true;
          let userInfo = wx.getStorageSync("userInfo")
          const _ = app.config.db.command
          if (userInfo._id) {
            api.GET_User.doc = t._id
            api.GET_User.update = {
              data: {
                sign_data: _.push(nowdate),
                sign: _.inc(1)
              },
            }
            task.Tree_get(api.GET_User).then(res => {
              t.yesdate()
              console.log("")
              wx.showToast({
                title: '签到成功',
                icon: 'none',
              })
            })

            t.setData({
              signinNow: true,
              yesDate: yesDate
            })
          } else {
            wx.showToast({
              title: '您未登录不能签到',
              icon: 'none',
            })
          }
        }
      };
      t.setData({
        dateArr: dateArr
      })

    },
    // 签到过

    // 已签到日期
    yesdate() {
      let t = wx.getStorageSync("userInfo")
      console.log(t._id)
      if (t._id) {
        api.GET_User2.doc = t._id
        task.Tree_get(api.GET_User2).then(res => {
          let t = this;
          let yesdate =res.sign_data ;
          let dateArr = t.data.dateArr;
          if( dateArr && yesdate){
          for (var i = 0; i < dateArr.length; i++) {
            for (var j = 0; j < yesdate.length; j++) {
              if (dateArr[i].isToday == yesdate[j]) {
                dateArr[i].choose = true
              }
            };
          }
          t.setData({
            dateArr: dateArr
          })
          }
        })
      }







   
    },
    // 日历
    dateInit: function (setYear, setMonth) {
      let t = this;
      //全部时间的月份都是按0~11基准，显示月份才+1
      let dateArr = []; //需要遍历的日历数组数据
      let arrLen = 0; //dateArr的数组长度
      let now = setYear ? new Date(setYear, setMonth) : new Date();
      let year = setYear || now.getFullYear();
      let nextYear = 0;
      let month = setMonth || now.getMonth() //没有+1方便后面计算当月总天数
      let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
      let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay(); //目标月1号对应的星期
      let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
      let obj = {};
      let num = 0;
      if (month + 1 > 11) {
        nextYear = year + 1;
        dayNums = new Date(nextYear, nextMonth, 0).getDate();
      }
      arrLen = startWeek + dayNums;
      for (let i = 0; i < arrLen; i++) {
        if (i >= startWeek) {
          num = i - startWeek + 1 < 10 ? '0' + String(i - startWeek + 1) : String(i - startWeek + 1);
          obj = {
            isToday: '' + year + ((month + 1) < 10 ? "0" + (month + 1) : (month + 1)) + num,
            dateNum: num,
            weight: 5,
            choose: false
          }
        } else {
          obj = {};
        }
        dateArr[i] = obj;
      }
      t.setData({
        dateArr: dateArr
      })
      let nowDate = new Date();
      let nowYear = nowDate.getFullYear();
      let nowMonth = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1);
      let nowWeek = nowDate.getDay();
      let getYear = setYear || nowYear;
      let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
      if (nowYear == getYear && nowMonth == getMonth) {
        t.setData({
          isTodayWeek: true,
          todayIndex: nowWeek
        })
      } else {
        t.setData({
          isTodayWeek: false,
          todayIndex: -1
        })
      };
    },
    /**
     * 上月切换
     */
    lastMonth: function () {
      let t = this;
      //全部时间的月份都是按0~11基准，显示月份才+1
      let year = t.data.month - 2 < 0 ? t.data.year - 1 : t.data.year;
      let month = t.data.month - 2 < 0 ? 11 : t.data.month - 2;
      t.setData({
        year: year,
        month: (month + 1)
      })
      t.dateInit(year, month);
      t.yesdate()
    },
    /**
     * 下月切换
     */
    nextMonth: function () {
      let t = this;
      //全部时间的月份都是按0~11基准，显示月份才+1
      let year = t.data.month > 11 ? t.data.year + 1 : t.data.year;
      let month = t.data.month > 11 ? 0 : t.data.month;
      t.setData({
        year: year,
        month: (month + 1)
      })
      t.dateInit(year, month);
      t.yesdate()
    }
  }
})