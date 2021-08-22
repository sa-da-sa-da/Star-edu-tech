// 云函数入口文件
const cloud = require('wx-server-sdk')
exports.main = async (event, context) => {
  cloud.init({
    env: event.env
  })
  const db = cloud.database({
    env: event.env
  })
  const _ = db.command
  const wxContext = cloud.getWXContext()

  let com = await db.collection('mini_comments').where({
    postId: PermissionRequest._id,
    }).count()
  return com
}