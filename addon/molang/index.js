const fs = require("fs");
const { segment } = require("oicq")
const { bot } = require("../../d/index")//bot主文件路径

const del = (group_id,message_id)=>{
    setTimeout(()=>bot.pickGroup(group_id).recallMsg(message_id),25000)
}  

const Molang = String(fs.readFileSync("Molang.txt")).split('\n');


const sechi = (keysArray) =>{
    let RuiZiErTe = new Map();
    let RuiZiErTe2 = new Set();
    Molang.forEach((lineTxT,line) => {
        if(lineTxT !== '\r')
        keysArray.forEach(keyString => {
            if(~lineTxT.indexOf(String(keyString)))
                if(!RuiZiErTe.has(line))
                    RuiZiErTe.set(line,1);
                else
                    RuiZiErTe.set(line,RuiZiErTe.get(line)+1)
        });
    });

    for(let i of RuiZiErTe)
        if(i[1]===keysArray.length)
            if(Molang[i[0]-1]!=='\r')
                RuiZiErTe2.add(i[0]-1)
            else
                RuiZiErTe2.add(i[0])

    return Array.from(RuiZiErTe2);
}

const main = (keysArray) =>{
const RuiZiErTe = sechi(keysArray);
console.log(keysArray)
console.log(RuiZiErTe)
const LeiMeiTe1 = 12;
let LeiMeiTe = LeiMeiTe1;
let MaiSeiZhi = "#return =>";
if(RuiZiErTe.length!==1)
    for(let i of RuiZiErTe){
        LeiMeiTe--;
        if(!LeiMeiTe){
            MaiSeiZhi+=`\n...more ${RuiZiErTe.length-LeiMeiTe1}`
            break;
        }
        MaiSeiZhi+="\n";
        MaiSeiZhi+=Molang[i];
    }
else
{
    
    MaiSeiZhi+="\n";
    MaiSeiZhi+=Molang[RuiZiErTe[0]];
    MaiSeiZhi+="=>\n";
    MaiSeiZhi+=Molang[RuiZiErTe[0]+1];
}
    MaiSeiZhi+="\n[25s后撤回]";
    return MaiSeiZhi;
}



bot.on("message", function (msg) {
    const m = msg.raw_message.toLowerCase();
	if (m.startsWith('~molang'))
		msg.reply(main(m.replace('~molang ','').split(' ')), true).then(_=>del(msg.group_id,_.message_id)) //改为false则不会引用
})
    // console.log(main(["anger","level"]))
