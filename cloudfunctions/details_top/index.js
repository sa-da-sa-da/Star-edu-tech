// 云函数入口文件
const cloud = require('wx-server-sdk')
exports.main = async (event, context) => {

  cloud.init({
    env: event.envs
  })
  const db = cloud.database({
    env: event.env
  })
  const wxContext = cloud.getWXContext()
  const _ = db.command

    let collect = await db.collection('collect').where({
      _id: event.id + wxContext.OPENID
    }).count()
    let statr = await db.collection('statr').where({
      _id: event.id + wxContext.OPENID
    }).count()
    var data
    if(event.bl){
      data = await db.collection('explain').doc(event.id).get()
    }
  
    return {
      collect: collect.total==1? true : false,
      statr: statr.total==1? true : false,
      data:event.bl?data.data:''
    }
  

}