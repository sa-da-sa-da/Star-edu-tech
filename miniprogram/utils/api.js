var task = require("./request.js")
import envId from "./config.js"
import time from "./time.js"

const app = getApp()
const db = app.config.db
const _ = db.command
var orderBy = ['_createTime', 'desc']

/**
 * 新增评论
 */
function addPostComment(commentContent, accept) {
  return wx.cloud.callFunction({
    name: 'postsService',
    data: {
      action: "addPostComment",
      commentContent: commentContent,
      accept: accept
    }
  })
}

/**
 * 新增子评论
 * @param {} id 
 * @param {*} comments 
 */
function addPostChildComment(id, postId, comments, accept) {
  return wx.cloud.callFunction({
    name: 'postsService',
    data: {
      action: "addPostChildComment",
      id: id,
      comments: comments,
      postId: postId,
      accept: accept
    }
  })
}

// 评论内容安全检查
function checkPostComment(content) {
  return wx.cloud.callFunction({
    name: 'postsService',
    data: {
      action: "checkPostComment",
      content: content
    }
  })
}

/**
 * 获取会员信息
 * @param {} openId 
 */
function getMemberInfo(openId) {
  return db.collection('user')
    .where({
      _openId: openId
    })
    .get()
}

/**
 * 获取评论列表
 * @param {} page 
 * @param {*} postId 
 */
function getPostComments(page, postId) {
  return db.collection('mini_comments')
    .where({
      postId: postId,
      flag: 0
    })
    .orderBy('timestamp', 'desc')
    .skip((page - 1) * 10)
    .limit(10)
    .get()
}

module.exports = {
  GET_Book: {
    collec: 'Book'
  },

  GET_Article: {
    collec: 'press'
  },


  GET_Article_ms: {
    collec: 'press',
    limit: 4,
    orderBy,
    where: {
      Type: "ms"
    }
  },
  GET_Article_list: {
    collec: 'press',
    orderBy,
    where: {
      browse: _.gt(10)
    }
  },
  GET_User: {
    collec: 'User',
  },
  GET_User2: {
    collec: 'User',
  },
  GET_Article_collect: {
    collec: 'collect',
    orderBy
  },
  GET_Article_statr: {
    collec: 'statr',
    orderBy
  },

  GET_history: {
    collec: 'history'
  },

  GET_History_list: {
    collec: 'history',
    orderBy
  },

  GET_Article_top: {
    collec: 'press',
    where: {
      Top: true
    }
  },

  GET_answer: {
    collec: 'answer',
    orderBy
  },

  GET_Article_browse: {
    collec: 'press',
    orderBy: ['browse', 'desc']
  },

  GET_notice: {
    collec: 'notice',
    orderBy: ['add_time', 'desc']
  },

  GET_note: {
    collec: 'note',
    orderBy
  },

  GET_explain: {
    collec: 'explain',
    orderBy
  },

  GET_encourage: {
    collec: 'encourage',
    orderBy
  },

  GET_periodical: {
    collec: 'periodical',
    orderBy
  },

  GET_topic: {
    collec: 'topic',
    orderBy
  },


  GET_Interview_ms: {
    collec: 'interview',
    orderBy,
    where: {
      select: _.neq(true),
    },
    limit: 4
  },
  getPostComments: getPostComments,
  checkPostComment: checkPostComment,
  getMemberInfo: getMemberInfo,
  addPostChildComment: addPostChildComment,
  addPostComment: addPostComment,
}