"use strict"
const { segment } = require("oicq")
const { bot } = require("./index")
let id163 = 869450;

// console.log(path.join("/bet/Molang.txt"))
const del = (group_id, message_id, delay) => {
	setTimeout(() => bot.pickGroup(group_id).recallMsg(message_id), delay ?? 25000)
}

// hello world
bot.on("message", function (msg) {
	if (msg.raw_message === "hello")
		msg.reply("hello world", true) //改为false则不会引用
	if (msg.raw_message === "nano")
		msg.reply("dont nanononono me!!あぁぁぁぁぁぁぁ!", false) //改为false则不会引用
	//https://music.163.com/song?id=869450&userid=1483227853
	if (msg.raw_message.startsWith("https://music.163.com/song?id=")) {
		console.log(`[CQ:music,type=163,id=${msg.raw_message.slice(30, msg.raw_message.indexOf("&") == -1 ? msg.raw_message.length - 1 : msg.raw_message.indexOf("&"))}]`)
		id163=msg.raw_message.slice(30, msg.raw_message.indexOf("&") == -1 ? msg.raw_message.length - 1 : msg.raw_message.indexOf("&"));
		msg.reply(`/me [CQ:music,type=163,id=${msg.raw_message.slice(30, msg.raw_message.indexOf("&") == -1 ? msg.raw_message.length - 1 : msg.raw_message.indexOf("&"))}]`, false)
			.then(_ => del(msg.group_id, _.message_id, 500))
	}
	if (msg.raw_message == "下一首")
		msg.reply(`/me [CQ:music,type=163,id=${id163++}]`, false).then(_ => del(msg.group_id, _.message_id, 1000))

	if (msg.raw_message == "上一首")
		msg.reply(`/me [CQ:music,type=163,id=${id163--}]`, false).then(_ => del(msg.group_id, _.message_id, 1000))


})
bot.on("message", function (msg) {
	// console.log(msg)
	if (msg.message[0].type === 'image')
	console.error(
		"message ==>", msg.message[0].url
	)
	if (msg.message[0].type === 'video')
	console.error(
		"video ==>", msg.message[0].url
	)
	if (msg.message[0].type === 'file')
		bot.pickGroup(msg.group_id).getFileUrl(msg.message[0].fid).then(_ => {
			console.log(_)
			// bot.pickGroup(msg.group_id).sendMsg(_)
		})
	
	// msg.reply("hello world", true) //改为false则不会引用
})

// 撤回和发送群消息
bot.on("message.group", function (msg) {
	if (msg.raw_message === "dice") {
		// 撤回这条消息
		msg.recall()
		// 发送一个骰子
		msg.group.sendMsg(segment.dice())
		// 发送一个戳一戳
		msg.member.poke()
	}
})

// 接收戳一戳
bot.on("notice.group.poke", function (e) {
	if (e.target_id === this.uin)
		e.group.sendMsg("dont nanononono me!!あぁぁぁぁぁぁぁ!")
})


// GroupMessage {
// 	post_type: 'message',
// 	message_id: 'ORN4EEq/JvQAAM6mGcYzX2Lc96sB',
// 	user_id: 1254041332,
// 	time: 1658648491,
// 	seq: 52902,
// 	rand: 432419679,
// 	font: '宋体',
// 	message: [ { type: 'text', text: '~test' } ],
// 	raw_message: '~test',
// 	message_type: 'group',
// 	sender: {
// 	  user_id: 1254041332,
// 	  nickname: '云梦',
// 	  card: '云梦',
// 	  sex: 'unknown',
// 	  age: 0,
// 	  area: '',
// 	  level: 2,
// 	  role: 'admin',
// 	  title: ''
// 	},
// 	group_id: 957577232,
// 	group_name: 'Bot Dev',
// 	block: false,
// 	sub_type: 'normal',
// 	anonymous: null,
// 	atme: false,
// 	atall: false,
// 	group: Group {},
// 	member: Member {},
// 	reply: [Function (anonymous)],
// 	recall: [Function (anonymous)],
// 	self_id: 3378662628
//   }