const cloud = require('wx-server-sdk')
cloud.init({
  env: "demo-8gww0qau03b0af5a",
})
const db = cloud.database({
  env: "demo-8gww0qau03b0af5a",
}) // 初始化数据库

exports.main = async (event, context) => {
  return await db.collection('dictionaries').get()
}