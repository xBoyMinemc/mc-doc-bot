const dgram = require('node:dgram');
const { bot } = require("./index")
const GetMotdpe = (args) => {
    console.log(args)
    const ip = args[0];
    const port = args[1];
    const server = dgram.createSocket('udp4');


    function hexToBytes(hex) {
        hex = hex.replaceAll(' ', '');
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
          
        return bytes;
        // Function Powered By https://github.com/asktaosec
    }

    server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
    });

    server.on('message', (msg, rinfo) => {
        // console.log(String(msg.toString()))
        const motdpe = String(msg).slice(35).split(';')
        // console.log(motdpe.join('\n'));
//   console.log(motdpe)
        return motdpe;
        server.close();
    });

    server.on('listening', () => {
        const address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
    });




    const randomHex = () => {
        const g = Math.floor(Math.random() * 0xffff).toString(16).padEnd(4, "0");
        console.log("g =>",g)
        return g
    }
    const message = hexToBytes('01 00 00 00 00' + randomHex() + 'c1 1d 00 ff ff 00 fe fe fe fe fd fd fd fd 12 34 56 78 9c 18 28 7f e1 64 89 8d')

    server.bind(41234);
    server.send(Buffer.from(message), port, ip, (err) => { });
}
const del = (group_id,message_id)=>{
    setTimeout(()=>bot.pickGroup(group_id).recallMsg(message_id),25000)
}  

bot.on("message", function (msg) {
    const m = msg.raw_message.toLowerCase();
	if (m.startsWith('~s ')){
        let RuiZiErTe = GetMotdpe(m.indexOf(':') > 0 ? m.replace('~s ','').split(':') :  m.replace('~s ','').split(' '));
        if(RuiZiErTe)
		    msg.reply(RuiZiErTe, true).then(_=>del(msg.group_id,_.message_id)) //改为false则不会引用
        else
            msg.reply("无结果\n[25s后撤回]", true).then(_=>del(msg.group_id,_.message_id)) 
    }
})
// let i = GetMotdpe("is-rbq.cn",12506)
//  GetMotdpe("is-rbq.cn",41234)
// console.log(i)
// export default GetMotdpe;