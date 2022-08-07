const fs = require("fs");
const path = require("path");
const { bot } = require("../index")

const del = (group_id,message_id,time)=>{
    setTimeout(()=>bot.pickGroup(group_id).recallMsg(message_id),time??25000)
}  


const Item = new Map();
String(fs.readFileSync("./xboy/lib/Item.txt"))
.replaceAll('\r','')
.split('\nminecraft:')
.forEach(_=>{
    const __ = _.split('\n')[0]
        if(__==='')return;
        _=_.split('\n')
    let ___=[];
        for(;_.length&&_[1]!=='';___.push(_.shift()+'\n'));
        ___.push('###########\n');
        ____:for(;;){
            if(!_.length)break ____;
             for(;_.length&&!(_[0]===''&&_[1]!==''&&_[2]==='');___.push(_.shift()+'\n'));
        ___.push('###########\n');
        for(;_[0]==='';_.shift());
            }
       Item.set(__,___)
      });
      
// console.log(
//     Array.from(Item.keys()).includes("armor")?Item.get("armor"):0
//     )


bot.on("message", function (msg) {
    let m = msg.raw_message.toLowerCase();
	if (m.startsWith('~item')){
        m = m.replace('~item ','')
        let RuiZiErTe;
        if(m==='list')
            RuiZiErTe = Array.from(Item.keys()).join('\n');
        else
            RuiZiErTe = Array.from(Item.keys()).includes(m)?Item.get(m):0;

        if(RuiZiErTe)
		    msg.reply("##minecraft:"+RuiZiErTe.join(''), true).then(_=>del(msg.group_id,_.message_id,60000)) //改为false则不会引用
        else
            msg.reply("无结果\n[2.5s后撤回]", true).then(_=>del(msg.group_id,_.message_id,3000)) 
    }
})


