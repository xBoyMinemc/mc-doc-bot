const fs = require("fs");
const path = require("path");
const { bot } = require("../index")
// const doc = {files:[]};
// const json = {files:[]};
// const bet = {files:[]};

{
// fs.readdirSync("doc").forEach(_=>{
//     const fileName = _.replace('.html','');
//     doc.files.push(fileName);
//     doc[fileName] = String(fs.readFileSync("doc/"+_));
// })
}
// else
// {
//     doc.files.push('Molang.html');
//     doc['Molang'] = String(fs.readFileSync("doc/Molang.html"));
// }


// console.log(path.join("/bet/Molang.txt"))
const del = (group_id,message_id)=>{
    setTimeout(()=>bot.pickGroup(group_id).recallMsg(message_id),25000)
}  

const Molang = String(fs.readFileSync("./xboy/lib/Molang.txt")).split('\n');

// console.log(Molang)
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
// console.log("keysArray=>",keysArray)
// console.log("RuiZiErTe=>",RuiZiErTe)
let MaiSeiZhi = "#return =>";
if(!RuiZiErTe.length)return false;
// return `${keysArray[0].split('')}\n==\n${String(Molang[RuiZiErTe[0]]).split('')}\n\n${String(keysArray[0])==String(Molang[RuiZiErTe[0]])}`
console.log("find=>",RuiZiErTe.find(_=> Molang[_].replace('\r','') == keysArray[0] || Molang[_].replace('\r','').replace('query.','') == keysArray[0]))
const ___ = RuiZiErTe.find(_=> console.log(_,Molang[_]) ||( Molang[_].replace('\r','') === keysArray[0]) ||( Molang[_].replace('\r','').replace('query.','') === keysArray[0]));
if(___){
console.log(___)
    {
    
        MaiSeiZhi+="\n";
        MaiSeiZhi+=Molang[___];
        MaiSeiZhi+="=>\n";
        MaiSeiZhi+=Molang[___+1];
    }
        MaiSeiZhi+="\n[25s后撤回]";
        return MaiSeiZhi;
}
const LeiMeiTe1 = 12;
let LeiMeiTe = LeiMeiTe1;
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
	if (m.startsWith('~molang')){
        let RuiZiErTe = main(m.replace('~molang ','').split(' '));
        if(RuiZiErTe)
		    msg.reply(RuiZiErTe, true).then(_=>del(msg.group_id,_.message_id)) //改为false则不会引用
        else
            msg.reply("无结果\n[25s后撤回]", true).then(_=>del(msg.group_id,_.message_id)) 
    }
})
    // console.log(main(["anger","level"]))