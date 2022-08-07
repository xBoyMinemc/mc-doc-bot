

"use strict"
const { segment } = require("oicq")
const { message } = require("styled-message")
const { bot } = require("./index")
const t = require("./pinyin/temp")

console.log(t("我是云梦，偶尔做梦.yeah !"))


// let messageBox = []

const 不指定的群 = [1028830030]

bot.on("message", function (msg) {

    if (不指定的群.includes(Number(msg.group_id))) return;
    if (msg.message[0].type !== 'text') return;
    if (msg.message[0].text.startsWith("~梦话 "))
    // if (messageBox.length > 9) messageBox.shift()
    // messageBox.push([msg.sender.card + String(msg.sender.user_id).slice(-3), msg.message[0].text])
    //可以自行打表绑定id和qq号
    bot.pickGroup(msg.group_id).sendMsg(t(msg.message[0].text.replace("~梦话 ","")))
})
