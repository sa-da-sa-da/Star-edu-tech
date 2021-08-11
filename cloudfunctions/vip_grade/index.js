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
    let sc = await db.collection('collect').where({
        _openid: wxContext.OPENID,
    }).count()
    let dz = await db.collection('statr').where({
        _openid: wxContext.OPENID,
    }).count()
    let nt = await db.collection('note').where({
        _openid: wxContext.OPENID,
    }).count()
    let todos = await db.collection('todos').where({
        _openid: wxContext.OPENID,
    }).count()
    let biaobai = await db.collection('biaobai').where({
        _openid: wxContext.OPENID,
    }).count()
    let pinglun = await db.collection('mini_comments').where({
        _openid: wxContext.OPENID
    }).count()
    return {
        jf: sc.total + dz.total + nt.total * 2 + todos.total * 2 + biaobai.total * 2 + pinglun.total * 2,
        dj: parseInt((sc.total + dz.total + nt.total * 2 + todos.total * 2 + biaobai.total * 2 + pinglun.total * 2)/5)
    }
    /*if (zh) {
        switch (zh / 5) {
            case 0:
                return dj = 1;
                break;
            case 1:
                return dj = 1;
                break;
            case 2:
                return dj = 2;
                break;
            case 3:
                return dj = 3;
                break;
            default:
                return dj = 4;
                break;
        }
    }else{
        return dj = 0;
    }*/

}