
## 项目介绍

Star edu-tech项目是一套基于成熟的高校专业小程序，基于微信原生+微信云开发+vant+colorui+码云以及相关技术栈开发。  

云开发小程序为什么快，因为不需要后端java，php 等语言去写接口，开发者无需搭建服务器，可免鉴权直接使用微信平台提供的 API 进行业务开发，并且原生打通微信开放能力。

只要你安装部署教程，完成每一步就能在短短半小时内，获得一个上线的小程序。 


## 项目模块介绍 （这是main版本）



## 建议初学者使用（main部署很简单，强烈推荐），只需要在 cms 后台加点文章就可以了。

地址：https://gitee.com/sakay/Star-edu-tech.git

- 基于腾讯云服务开发、微信云开发、原生微信、使用vant、colorui为UI的开发的小程序，后台基于微信云开项目。

- [文章模块]包含（点赞、收藏、笔记、列表、图文、代码块、分享、分享朋友圈、热点监控）

- [题库模块]包含（倒计时、答案浮现，懒加载，选择题模块）

- [对话模块]包含（客服对话、机器人对话）

- [树洞模块]包含

- [视频模块]包含

- []

- [个人模块]包含（点赞列表、收藏列表）

- [权限模块]包含（权限控制、千人千面）

## 预览 

### 小程序

预览地址：

![小程序二维码](https://6465-demo-8gww0qau03b0af5a-1304763314.tcb.qcloud.la/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%BA%8C%E7%BB%B4%E7%A0%81.png?sign=66e24ec82cf40bf422c48c72834ce117&t=1627131341)


### 后台CMS系统

地址：https://demo-8gww0qau03b0af5a-1304763314.tcloudbaseapp.com/wx-cms/#/login

用户名：ceshi（该账号仅有查看查看，不具有创建、更新、删除权限。）

密码：ceshiceshi123

## 小程序快速部署

- 前置条件下载 `微信开发工具` 开通微信 `云开发` 。

### 部署数据库 

- 点击云开发，点击设置，然后创建环境，复制环境ID。

- 在开发工具里面打开`/utils/config.js`替换`demo-8gww0qau03b0af5a`成你自己的环境ID。

```
let config= {
  apiUrl: "https://gitee.com/", //调用仓库地址
  mock: false,//是否开启模拟数据
  env: "你的环境ID",//环境参数
  color:"tree",   //全局颜色
}
module.exports = {
  config
}
```

然后在此环境中以下数据库集合,每行代表一个数据库名字：
示例：-数据库名（数据库权限；关联项目）

```
 - Book（权限设置，所有用户可读写，仅创建者可写；关联首页书籍栏目）
 - answer （权限设置，所有用户可读写，仅创建者可写；关联首页问答栏目）
 - collect （权限设置，仅创建者可读写；关联用户收藏栏目）
 - dictionaries （权限设置，所有用户可读写，仅创建者可写；关联首页字典栏目）
 - encourage （权限设置，所有用户可读写，仅创建者可写；关联学习页专栏栏目）
 - history （权限设置，所有用户可读写，仅创建者可写；关联学习页历史栏目）
 - interview （权限设置，所有用户可读写，仅创建者可写）
 - interview_collect （权限设置，仅创建者可读写）
 - interview_statr （权限设置，仅创建者可读写）
 - note （权限设置，仅创建者可读写；关联用户中心笔记栏目）
 - notice （权限设置，所有用户可读；关联首页公告栏目）
 - press （权限设置，所有用户可读写，仅创建者可写；关联各种类型文章）
 - statr （权限设置，仅创建者可读写；关联用户点赞）
 - User （权限设置，仅创建者可读写；关联用户登录数据读写）
- explain （权限设置，所有用户可读；关联用户推荐Top栏）
```

### 部署云函数

 导入cloudfunctions文件里除了wx开头的云函数（wx开头的为在下面步骤自动生成）,右键点击`上传并部署（云端安装依赖）`即可。

### 部署CMS

- 打开微信开发工具 云开发更新到最新的版本工具，在工具顶部 Tab 栏中，点击「更多」-「内容管理」

- 开通，`勾选同意协议`后，点击确定内容管理能力需要使用`云函数、数据库、静态网站`等服务，开通时云开发将会在该环境下创建内容管理云函数、内容管理数据集合、内容管理静态网站文件等云资源，具体云资源参见云资源详情。

- 内容管理当前仅支持支付方式为按量付费的环境开通，点击开通后在当前弹窗开通按量付费即可；

- 开通完成后，内容管理当前页面可看到内容管理的入口链接和相关信息。

- 点击访问地址，即可在弹出的浏览器窗口中进行内容管理的相关配置。 

- 登录内容管理CMS云开发控制台 -> 更多 -> 内容管理页面中，点击`访问地址`即可进入内容管理界面。

- 内容管理平台独立于云控制台进行内容和权限管理的，访问地址也可在浏览器中收藏后续直接访问即可，不需再从云开发控制台进入（保存网址）。

- 进入后台管理页面点击内容模型导，点击导入模型入schema-export-5hibvabs.json文件。

## 注意

1. 因项目部分图片储存在云库里请在项目替换。
2. 因部分栏目bug尚未解决，请广大开发者自行解决，本项目将不承担因开发者自身原因所产生的后果。
3. 


## 感谢

- [vant](https://vue3js.cn/docs/zh/)
- [color-ui](https://www.kancloud.cn/als24/color/)
- [腾讯云开发](https://console.cloud.tencent.com//)
- [微信开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- 

最后更新时间：2021年7月24日

