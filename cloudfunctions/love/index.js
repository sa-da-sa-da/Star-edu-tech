// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database({
    env: cloud.DYNAMIC_CURRENT_ENV
})


// 云函数入口函数
exports.main = async (event, context) => {
    console.log(event)
    const wxContext = cloud.getWXContext()
    try {
        return await db.collection("biaobai").add({
            data: {
                _openid: wxContext.OPENID,
                _createTime: db.serverDate(),
                info: event.info,
                to: event.to,
                writer: event.writer,
                sendTime: event.sendTime,
                like: 0,
                status:"待审核",
            }
        })
    } catch (e) {
        console.log(e)
    }
}