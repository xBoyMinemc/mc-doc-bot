"use strict"
const { segment } = require("oicq")
const { message } = require("styled-message")
const { bot } = require("./index")

const WebSocketServer = require('ws').WebSocketServer;
const wss = new WebSocketServer({ port: 9998 });



wss.on('connection', function connection(ws) {
    
bot.on("message", function (msg) {
    if(msg.group_id !== 957577232)return;
	if(msg.message[0].type === 'image' ) 
	//   console.error(
        ws.send(msg.sender.nickname+" ==> "+ msg.message[0].url)
	//   )
	if(  msg.message[0].type === 'file' )
		bot.pickGroup(msg.group_id).getFileUrl(msg.message[0].fid).then(_=>{
			console.log(_)
            ws.send(msg.sender.nickname+"  ==> "+ _)
			// bot.pickGroup(msg.group_id).sendMsg(_)
		})
		// msg.reply("hello world", true) //改为false则不会引用

        
	if(  msg.message[0].type === 'text' )ws.send(msg.sender.nickname+" ==> "+ msg.raw_message)
})

    // ws.on('message', function message(data) {
    //   console.log('received: %s', data);
    // });
    ws.on('message', function message(data) {
        bot.pickGroup(957577232).sendMsg((data).toString())
//   ws.send('something');
    });

  ws.send('链接成功');
});

//file:///C:/Users/%E4%BA%91%E6%A2%A6/Desktop/%E7%BD%91%E8%A2%9C/web-s.html