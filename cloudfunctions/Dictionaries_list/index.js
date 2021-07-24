const cloud = require('wx-server-sdk')
cloud.init({
  env: event.env
})
const db = cloud.database({
  env: event.env
}) // 初始化数据库

exports.main = async (event, context) => {
  return await db.collection('dictionaries').get()
}