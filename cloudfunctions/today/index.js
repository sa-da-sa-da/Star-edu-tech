// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {

  const db = await cloud.database({
    env:event.env
  }) 
  const _ = db.command
  function  utils (i) {
    if (i >= 0 && i <= 9) {
      return "0" + i;
    } else {
      return i;
    }
  }
  function time() {
    var date = new Date(); 
    var month = utils(date.getMonth() + 1); 
    var day = utils(date.getDate()); 
    var curTime = date.getFullYear() + "-" + month + "-" + day 
    return curTime;
  }
  var today =  time()
  let total= await db.collection('User').where({
    endtime:_.and(_.gte(today+" 00:00:00"),_.lte(today+" 23:59:59"))
  }).count()
  let data= await db.collection('User').where({
    endtime:_.and(_.gte(today+" 00:00:00"),_.lte(today+" 23:59:59"))
  }).get()
  return {total:total.total,data:data.data}
  

   
  

}