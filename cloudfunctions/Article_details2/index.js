// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  async function pota() {
    await db.collection('press').doc(event.id).update({
      data: {
        Article_Temperature: _.inc(1),
      }
    })
    let Article_List = await db.collection('press').doc(event.id).get()
    return {
      Article_details: Article_List.data,
    }
  }
  return await pota()
}