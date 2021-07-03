// 云函数入口文件
const cloud = require('wx-server-sdk')
exports.main = async (event, context) => {
  cloud.init({
    env: event.env
  })
  const db = cloud.database({
    env: event.env
  })
  const wxContext = cloud.getWXContext()
  let sc = await db.collection('collect').where({
    _openid: wxContext.OPENID,
  }).count()
  let dz = await db.collection('statr').where({
    _openid: wxContext.OPENID,
  }).count()
  let nt = await db.collection('note').where({
    _openid: wxContext.OPENID,
  }).count()
  let tk = await db.collection('interview_collect').where({
    _openid: wxContext.OPENID,
  }).count()


  return {
    sc: sc.total,
    dz: dz.total,
    nt: nt.total,
    tk: tk.total
  }
}