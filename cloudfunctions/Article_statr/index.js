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
  let start_data = await db.collection('statr').where({
    press_id: data._id,
    _openid: wxContext.OPENID
  }).get()
  if (start_data.data.length == 0) {
    await db.collection('press').doc(data._id).update({
      data: {
        statr: _.inc(1),
      },
    })
    data._id = data._id + wxContext.OPENID
    await db.collection('statr').add({
      data
    })

    return "点赞成功"
  } else {
    await db.collection('statr').where({
      press_id: data._id,
      _openid: wxContext.OPENID
    }).remove()
    await db.collection('press').doc(data._id).update({
      data: {
        statr: _.inc(-1),
      },
    })
    return "取消点赞"
  }

}