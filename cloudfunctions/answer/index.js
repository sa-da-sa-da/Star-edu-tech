const cloud = require('wx-server-sdk')
cloud.init({
  env: "demo-8gww0qau03b0af5a",
})
const db = cloud.database({
  env: "demo-8gww0qau03b0af5a",
})
exports.main = async (event, context) => {
 
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        "touser": cloud.getWXContext().OPENID,
        "page": 'index',
        "lang": 'zh_CN',
        "page":"pages/index/index?sign=true",
        "data": {
          "name2": {
            "value": event.name
          },
          "phrase1": {
            "value": '签到成功'
          },
          "date3": {
            "value": event.date
          },
          "thing14": {
            "value": '欢迎使用教育技术，明天也记得签到哦！'
          }
        },
        "templateId": 'V5gACL03pwa1MU4Skm1yIIvyZYz5hE2sXxNSy4xw304',
        "miniprogramState": 'developer'
      })
    return result
  } catch (err) {
    return err
  }
}