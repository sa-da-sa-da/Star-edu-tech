const cloud = require('wx-server-sdk')



exports.main = async (event, context) => {
  cloud.init({
    env:event.env
  })
  const db = cloud.database({
    env:event.env
  }) 


  if (event.Type) {
    const countResult = await db.collection(event.database).where({Type:event.Type}).count()
    const total = countResult.total
      return {
        total: total,
        data: await db.collection(event.database).where({Type:event.Type}) .skip(event.size * (event.page - 1)).orderBy('_createTime','desc').limit(event.size).get()
      }
  } else {
    const countResult = await db.collection(event.database).count()
    const total = countResult.total
    return {
      count: total,
      data:await db.collection(event.database).skip(event.size * (event.page - 1)).orderBy('add_time','desc').limit(event.size).get()
    }
  }
}