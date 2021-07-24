1 项目描述
1.1 项目介绍
1.2 项目描述
1.3 项目优势
1.4 产品定位
1.5 产品功能
2 目录结构
3 开发及部署
3.1 安装
3.2 使用
4 开发指南
4.1 前端页面
4.2 云函数
4.3 数据库
4.4 云存储
4.5 内容管理
4.6 二次开发
1 项目描述
1.1 项目介绍

 Star 教技是教育技术学专业本科生开发一套成熟的基于专业主题内容小程序，该项目基于微信原生+小程序云开发+vant+colorui开发。

1.2 产品描述

该项目基于腾讯云开发、原生微信、使用vant、colorUI等UI开发的一程序，后台基于腾讯开源项目内容管理二次开发。项目目前包括三个大模块，分别是首页模块、文章模块、用户模块。
【首页模块】包含轮播图、推荐Top、公告、字典、书籍（支持pdf）、问答（人工问答和机器人问答）。
【文章模块】包含列表、图文、代码块、笔记、点赞、收藏、分享、分享朋友圈、热门文章监控。
【用户模块】包含签到、签到排行榜、微信订阅推送、权限控制、关于我们、加入群聊、意见反馈、清理缓存、笔记点赞收藏集合、绑定码云。

1.3 产品优势
代码体积小
代码简洁
毫秒级启动速度
不需要后端Java和PHP等语言去写接口，也不需要单独购买服务器、域名、甚至不用备案。全局CDN。
简：部署简单，

1.4 产品定位
1.5 产品功能
2 目录结构
3 开发及部署
3.1 安装
3.2 使用
4 开发指南
4.1 前端页面
4.2 云函数
4.3 数据库
4.4 云存储
4.5 内容管理
4.6 二次开发





2 目录结构

├─cloudfunctions
│  ├─answer
│  ├─Article_collect
│  ├─Article_details
│  ├─Article_details2
│  ├─Article_statr
│  ├─collect
│  ├─details
│  ├─details_cs
│  ├─details_pro
│  ├─dictionaries_details
│  ├─Dictionaries_list
│  ├─list
│  ├─login
│  ├─notice
│  ├─notice2
│  ├─pro_collect
│  ├─pro_start
│  ├─statr
│  ├─today
│  ├─userlist
│  ├─user_browse
│  ├─user_data
│  ├─wx-ext-cms-api
│  ├─wx-ext-cms-fx-openapi
│  ├─wx-ext-cms-init
│  ├─wx-ext-cms-openapi
│  └─wx-ext-cms-service
└─miniprogram
    ├─components
    │  ├─calendar
    │  ├─cu-custom
    │  ├─scroll
    │  ├─swiper
    │  └─tree_list
    ├─miniprogram_npm
    │  ├─@vant
    │  │  └─weapp
    │  │      ├─action-sheet
    │  │      ├─area
    │  │      ├─button
    │  │      ├─calendar
    │  │      │  └─components
    │  │      │      ├─header
    │  │      │      └─month
    │  │      ├─card
    │  │      ├─cell
    │  │      ├─cell-group
    │  │      ├─checkbox
    │  │      ├─checkbox-group
    │  │      ├─circle
    │  │      ├─col
    │  │      ├─collapse
    │  │      ├─collapse-item
    │  │      ├─common
    │  │      │  └─style
    │  │      │      └─mixins
    │  │      ├─count-down
    │  │      ├─datetime-picker
    │  │      ├─definitions
    │  │      ├─dialog
    │  │      ├─divider
    │  │      ├─dropdown-item
    │  │      ├─dropdown-menu
    │  │      ├─empty
    │  │      ├─field
    │  │      ├─goods-action
    │  │      ├─goods-action-button
    │  │      ├─goods-action-icon
    │  │      ├─grid
    │  │      ├─grid-item
    │  │      ├─icon
    │  │      ├─image
    │  │      ├─index-anchor
    │  │      ├─index-bar
    │  │      ├─info
    │  │      ├─loading
    │  │      ├─mixins
    │  │      ├─nav-bar
    │  │      ├─notice-bar
    │  │      ├─notify
    │  │      ├─overlay
    │  │      ├─panel
    │  │      ├─picker
    │  │      ├─picker-column
    │  │      ├─popup
    │  │      ├─progress
    │  │      ├─radio
    │  │      ├─radio-group
    │  │      ├─rate
    │  │      ├─row
    │  │      ├─search
    │  │      ├─share-sheet
    │  │      ├─sidebar
    │  │      ├─sidebar-item
    │  │      ├─skeleton
    │  │      ├─slider
    │  │      ├─stepper
    │  │      ├─steps
    │  │      ├─sticky
    │  │      ├─submit-bar
    │  │      ├─swipe-cell
    │  │      ├─switch
    │  │      ├─tab
    │  │      ├─tabbar
    │  │      ├─tabbar-item
    │  │      ├─tabs
    │  │      ├─tag
    │  │      ├─toast
    │  │      ├─transition
    │  │      ├─tree-select
    │  │      ├─uploader
    │  │      └─wxs
    │  └─mp-weixin
    │      ├─highlight
    │      └─node
    ├─pages
    │  ├─details
    │  │  ├─article_details
    │  │  ├─details_dicz
    │  │  ├─details_html
    │  │  ├─details_ls
    │  │  └─notice
    │  ├─home
    │  │  ├─answer
    │  │  ├─book
    │  │  ├─circular
    │  │  └─dictionaries
    │  ├─index
    │  │  └─guide
    │  ├─question
    │  ├─study
    │  │  ├─history
    │  │  └─warehouse
    │  │  └─study.js
    │  │  └─study.json
    │  │  └─study.wxml
    │  │  └─study.wxss
    │  └─user
    │      ├─aboutus
    │      ├─collect
    │      ├─favorite
    │      ├─gitee_login
    │      ├─note
    │      │  └─add
    │      ├─plan
    │      └─sign
    ├─style
    └─utils


