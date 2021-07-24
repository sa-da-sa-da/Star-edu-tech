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
  const _ = db.command
    var data
    if(event.bl){
      data = await db.collection('notice').doc(event.id).get()
    }
    return {
      data:event.bl?data.data:''
    }
  

}