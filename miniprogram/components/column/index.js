// components/column/index.js
Component({
    properties: {
        list: {
            type: Object,
            default: ''
        },
        loding: {
            type: Boolean,
            default: true
        },
        type: {
            type: Object,
            default: ''
        }
    },
    observers: {
        'list': function (list) {
            if (list) {
                this.setData({
                    loding: false
                })
            }
        }
    },
    methods: {
        tz(e) {
            console.log(e.currentTarget.dataset.id)
            wx.navigateTo({
                url: "../../pages" + e.currentTarget.dataset.url + "?id=" + e.currentTarget.dataset.id
            })
        },
    }

})