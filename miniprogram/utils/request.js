const app = getApp()
const db = app.config.db
const _ = db.command

function Tree_cloud(name, data) {
  if (!data) {
    data = {}
  }
  data.env = app.config.env

  if (app.config.mock) {

    wx.showToast({
      title: '您未开启云环境，进入开发环境',
    })
    let promise = new Promise(function (resolve, reject) {
      resolve("1");

    })
    return promise
  } else {
    let promise = new Promise(function (resolve, reject) {

      wx.cloud.callFunction({
        name,
        data,
        success: function (res) {
          resolve(res.result);
        },
        fail: function (res) {
          console.log(res)
          wx.showToast({
            title: String(res),
            icon: 'none',
            duration: 3000
          })
          reject(res.result);
        }
      })
    })
    return promise
  }

}

function Tree_get(data, func) {
  if (app.config.mock) {
    wx.showToast({
      title: '您未开启云环境，进入开发环境',
    })
    var str = "123";
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: baseURL + url,
        method: method,
        data: method === POST ? JSON.stringify(data) : data,
        header: header,
        success(res) {
        },
        fail(err) {
          reject(err)
        }
      })
    })
  } else {
    let promise = new Promise(function (resolve, reject) {
      let DB = db.collection(data.collec)
      if (data.where) {
        DB = DB.where(data.where)
      }
      if (data.limit) {
        DB = DB.limit(data.limit)
      }
      if (data.orderBy) {
        DB = DB.orderBy(data.orderBy[0], data.orderBy[1])
      }
      if (data.doc) {
        DB = DB.doc(data.doc)
      }
      if (data.update) {
        DB = resolve(DB.update(data.update))
        return
      }
      if (data.update) {
      } else {
        DB.get({
          success: function (res) {
            resolve(res.data);
          },
          fail: function (res) {
            wx.showToast({
              title: String(res),
              icon: 'none',
              duration: 3000
            })
            reject(res.result);
          }
        })
      }
    })
    return promise
  }
}
module.exports = {
  Tree_cloud,
  Tree_get,
}