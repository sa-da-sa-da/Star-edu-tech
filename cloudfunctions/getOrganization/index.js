const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
      //直接返回调取结果。
       /* return cloud.database().collection("organization").get({
        success(res) {
          return res
        },
        fail(err) {
          return err
        }
      })
     先取出集合记录总数*/
  const countResult = await db.collection('organization').count()
  const total = countResult.total
  const MAX_LIMIT = 90
  // 计算需分几次取
  const batchTimes = Math.ceil(total/MAX_LIMIT)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const markers = await db.collection('organization').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push.apply(tasks,markers.data)
  }
  return {
    data: tasks
  }
}