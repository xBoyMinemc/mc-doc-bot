const pinyin = require("./lib")
const dict_zi_or = require("./data/dict-zi-web")
const dict_zi_end = new Map()
const 四合一  = {
    "a":"a",
    "ā":"a",
    "á":"a",
    "ǎ":"a",
    "à":"a",
    "o":"o",
    "ō":"o",
    "ó":"o",
    "ǒ":"o",
    "ò":"o",
    "ē":"e",
    "é":"e",
    "ě":"e",
    "è":"e",
    "ī":"i",
    "í":"i",
    "ǐ":"i",
    "ì":"i",
    "ū":"u",
    "ú":"u",
    "ǔ":"u",
    "ù":"u",
}

 for (let iterator in dict_zi_or) {
    const zi = dict_zi_or[iterator];
    // if(iterator.includes(","))
    // for(const a in 四合一)iterator=iterator.replaceAll(a,四合一[a])
   iterator.split(',').forEach(_=>{
    if(!zi)return;
        if(!dict_zi_end[_])dict_zi_end[_]=""

    //   console.log(dict_zi_end[_],zi)
        dict_zi_end[_]+=zi
    })
}





// const or = pinyin("我是云梦，偶尔做梦.yeah !", {style: pinyin.STYLE_NORMAL,})

// let end = ''

// or.forEach(_=>{
//     // console.log(_)
//     if(dict_zi_end[_[0]]){
//        const y = dict_zi_end[_[0]].split("")
//        end+=y[Number((Math.random()*(y.length-1)).toFixed())]
//     }else{
//         end+=_[0]
//     }
// })

module.exports = function t(zi){


    const or = pinyin(zi)

    let end = ''
    
    or.forEach(_=>{
        // console.log(_)
        if(dict_zi_end[_[0]]){
           const y = dict_zi_end[_[0]].split("")
           end+=y[Number((Math.random()*(y.length-1)).toFixed())]
        }else{
            end+=_[0]
        }
    })

    return end
    
};


// console.log(
//     end
//     // dict_zi_or["a"],
//     // dict_zi_end
//     // or
//     // pinyin("吩咐我ā ", {style: pinyin.STYLE_NORMAL,})
// )