云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "demo-8gww0qau03b0af5a",
})
const db = cloud.database({
  env: "demo-8gww0qau03b0af5a",
})
const _ = db.command
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  async function pota() {
    await db.collection('press').doc(event.id).update({
      data: {
        browse: _.inc(1),
      }
    })
    let details = await db.collection('press').doc(event.id).get()
    return {
      details: details.data,
    }
  }
  return await pota()
}