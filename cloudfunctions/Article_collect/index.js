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
  let data = event.press
  data._openid = wxContext.OPENID
  let start_data = await db.collection('collect').where({
    press_id: data._id,
    _openid: wxContext.OPENID
  }).get()
  if (start_data.data.length == 0) {
    await db.collection('press').doc(event.press._id).update({
      data: {
        collect: _.inc(1),
      },
    })
    data._id = data._id + wxContext.OPENID
    await db.collection('collect').add({
      data
    })
    return "收藏成功"
  } else {
    await db.collection('collect').where({
      press_id: data._id,
      _openid: wxContext.OPENID
    }).remove()
    await db.collection('press').doc(data._id).update({
      data: {
        collect: _.inc(-1),
      },
    })
    return "取消收藏"
  }

}