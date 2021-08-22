// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  // const markers = await db.collection('markers').get()
  // return {
  //   data: markers.data
  // }
  // 先取出集合记录总数
  map =  await db.collection("map").get()
    return map.data
}