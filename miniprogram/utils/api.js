
const app = getApp()
const db =app.config.db
const _ = db.command


var orderBy = ['_createTime', 'desc']



module.exports = {
  GET_Book: {collec: 'Book' },
  GET_Article: {
    collec: 'press'
  },
  GET_history: {
    collec: 'history'
  },
  GET_Interview_ms: {
    collec: 'interview',
    orderBy,
    where: {
      select: _.neq(true),
    },
    limit: 4
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
    limit: 20,
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
    limit: 20,
    orderBy
  },
  GET_Article_statr: {
    collec: 'statr',
    limit: 20,
    orderBy
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
    limit: 20,
    orderBy: ['browse', 'desc']
  },
}