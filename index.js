"use strict"
const { createClient } = require("oicq")

const account = 12345678

const bot = createClient(account)

bot
.on("system.login.qrcode", function (e) {
	this.logger.mark("扫码后按Enter完成登录")
	process.stdin.once("data", () => {
		this.login()
	})
})
.login()
exports.bot = bot

// template plugins
require("./plugin-hello") //hello world
require("./web-qq") //hello world
// require("./plugin-image") //发送图文和表情
require("./plugin-request") //加群和好友
require("./plugin-online") //监听上线事件

require("./motdpe")

require("./msg4page.js")

require("./梦话.js")


require("./xboy/index.js")
// require("./xboy/profanity.js")
// require("./xboy/doc-molang.js")
// require("./xboy/doc-item.js")
// require("./xboy/doc-entity.js")

process.on("unhandledRejection", (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})


