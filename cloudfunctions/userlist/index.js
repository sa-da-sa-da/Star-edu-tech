const cloud = require('wx-server-sdk')
cloud.init({
  env: event.env
})
const db = cloud.database({
  env: event.env
}) // 初始化数据库


exports.main = async (event, context) => {
  // 先取出集合记录总数
  return await db.collection('userlist').limit(10).orderBy('addtime', 'desc').get()


}