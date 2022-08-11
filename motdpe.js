const dgram = require('node:dgram');
const dns = require("dns");
const server = dgram.createSocket('udp4');
const { bot } = require("./index")
const deColor = (string) => {
    string = string.split("§");
    for (; string.includes("§"); string = string.slice(0, string.indexof("§") + 1) + string.slice(string.indexof("§") + 3));
    return string;
};
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


server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});



const randomHex = () => {
    const g = Math.floor(Math.random() * 0xffff).toString(16).padEnd(4, "0");
    // console.log("g =>", g)
    return g
}
const message = hexToBytes('01 00 00 00 00' + randomHex() + 'c1 1d 00 ff ff 00 fe fe fe fe fd fd fd fd 12 34 56 78 9c 18 28 7f e1 64 89 8d');

server.bind(41234);
const 我管这叫异步池 = new Map();
async function GetMotdpe(address, port) {
    port = port || 19132;


    server.send(Buffer.from(message), port, address, (err) => { });
    return await new Promise((resolve, reject) => {

        dns.lookup(address, 4, function (err, address) {
            if (err) reject('err');

            setTimeout(()=>reject('tiem out'),3000)

            server.on("message", function (data, rinfo) {
                if (rinfo.address === address && rinfo.port === port) {
                    console.log(rinfo)
                    // if(rinfo.address)
                    const motdpe = String(data).slice(35).split(';')
                    // console.log(motdpe);
                    resolve(motdpe);
                    // reject(motdpe)
                    // server.close();
                    // return motdpe;
                }
            })

        });

    });
}
const del = (group_id, message_id, time) => {
    setTimeout(() => bot.pickGroup(group_id).recallMsg(message_id), time || 25000)
}

bot.on("message", function (msg) {
    let m = msg.raw_message.toLowerCase().trim();
    if (!m.startsWith('~s ')) return;
    m = m.replace("~s ", "")
    let address, port;
    if (m.includes(":"))
        [address, port] = m.split(":");
    else if (m.includes(" "))
        [address, port] = m.split(" ");
    else
        address = m;
    console.log(address, port)
    let RuiZiErTe;
    if (address)
        RuiZiErTe = GetMotdpe(address, port);
    if (RuiZiErTe)
        RuiZiErTe.then((_) => {
            // console.log(_)
                msg.reply(
                "O " + _[0] + " 服务器" + "\n"
                + "O " + deColor(_[1]) + "\n"
                + "O " + "协议=>" + _[2] + "版本=>" + _[3] + "\n"
                + "O " + "在线人数: " + _[4] + "/" + _[5] + "\n"
                + "O " + "默认模式" + _[8] + "\n"
                + "O " + "地图名=>" + _[7] + "\n"
                + "\n"
                + "O " + "[8s后撤回]",
                 true).then(_ => del(msg.group_id, _.message_id, 8000))
        }).catch(_=>{
                msg.reply(_+"\n[2.5s后撤回]", true).then(_ => del(msg.group_id, _.message_id, 2500))

        })
    //改为false则不会引用
    else
        msg.reply("无结果\n[2.5s后撤回]", true).then(_ => del(msg.group_id, _.message_id, 2500))

})
