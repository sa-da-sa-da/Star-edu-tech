// 云函数入口文件
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
    let collect = await db.collection('collect').where({
      _id: event.id + wxContext.OPENID
    }).get()
    let statr = await db.collection('statr').where({
      _id: event.id + wxContext.OPENID
    }).get()
    var data
    if(event.bl){
      data = await db.collection('explain').doc(event.id).get()
    }
  
    return {
      collect: collect.data.length ? true : false,
      statr: statr.data.length ? true : false,
      collect_data:event.bl?data.data:''
    }
  }
  return await pota()
}