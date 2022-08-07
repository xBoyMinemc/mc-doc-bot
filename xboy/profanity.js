const fs = require("fs");
const path = require("path");
const { bot } = require("../index.js")

const del = (group_id,message_id,time)=>{
    setTimeout(()=>bot.pickGroup(group_id).recallMsg(message_id),time??25000)
}  

const profanity = String(fs.readFileSync("./xboy/lib/profanity_filter.wlist","utf-8")).replaceAll('\uFEFF','').toLowerCase().split('\r\n');//.slice(0,4);


const sechi = (keysString) =>{
    // let RuiZiErTe = new Map();
    let RuiZiErTe = new Set();
    for(const ban_words of profanity){
        // console.log(
        //     keysString,
        //     escape(ban_words.split('')[0]).toString('16'),
        //     keysString.includes(ban_words)
        //     )
            keysString.includes(ban_words)?RuiZiErTe.add(ban_words):0;
            
    }
    return Array.from(RuiZiErTe);
}
// console.log(
// sechi("fuck1488")
// )

const give_me_star_please=(sense,wordsArray)=>{
    for(const word of wordsArray){
        let stars = ''
        for(let i = word.length;i--;stars+='*');
        sense=sense.replaceAll(word,stars)
    }
    return sense;
}

bot.on("message", function (msg) {

    const m = msg.raw_message.toLowerCase();
	if (m.startsWith('~profanity')){
        let RuiZiErTe = sechi(m.replace('~profanity ',''));
        console.log(RuiZiErTe)
        if(RuiZiErTe.toString())
		    msg.reply(give_me_star_please(m.replace('~profanity ',''),RuiZiErTe)+"\n#"+RuiZiErTe.join('\n#'), true).then(_=>del(msg.group_id,_.message_id)) //改为false则不会引用
        else
            msg.reply("无结果\n[2.5s后撤回]", true).then(_=>del(msg.group_id,_.message_id,3000)) 
    }
})
