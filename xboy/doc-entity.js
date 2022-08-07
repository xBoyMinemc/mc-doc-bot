const fs = require("fs");
const path = require("path");
const { bot } = require("../index")

const del = (group_id,message_id,time)=>{
    setTimeout(()=>bot.pickGroup(group_id).recallMsg(message_id),time??25000)
}  


const Entity = new Map();
String(fs.readFileSync("./xboy/lib/entity.txt"))
.replaceAll('\r','')
.split('Back to top\n')
.forEach(_=>{
    for(_=_.split('\n');_[0]==='';_.shift());
    const __ = _[0];
        if(__==='')return;
    let ___=[];
        for(;_.length&&_[1]!=='';___.push(_.shift()+'\n'));
        ___.push('###########\n');
        ___:for(;;){
            if(!_.length)break ___;
            for(;_.length;___.push(_.shift()+'\n'));
            for(___.push('###########\n');_[0]==='';_.shift());
            }
       Entity.set(__,___)
      });
      
// console.log(
//     Entity.keys()
//     // ,
//     // Array.from(Entity.keys()).includes("particle")?Entity.get("particle"):0
//     )


bot.on("message", function (msg) {
    let m = msg.raw_message;
	if (m.toLowerCase().startsWith('~entity')){
        m = m.slice(8)
        // console.log(m,Array.from(Entity.get('ENTITIES DOCUMENTATION')).join(''))
        let RuiZiErTe;
        if(m=='list')
            RuiZiErTe = Array.from(Entity.get('ENTITIES DOCUMENTATION'));
        else
            RuiZiErTe = Array.from(Entity.keys()).includes(m)?Entity.get(m):0;
console.log(RuiZiErTe)
        if(RuiZiErTe)
		    msg.reply("##-实体组件-##\n"+RuiZiErTe.join(''), true).then(_=>del(msg.group_id,_.message_id,60000)) //改为false则不会引用
        else
            msg.reply("无结果\n[2.5s后撤回]", true).then(_=>del(msg.group_id,_.message_id,3000)) 
    }
})


