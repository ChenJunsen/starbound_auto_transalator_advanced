require('module-alias/register')
const fs = require('fs')
const path = require('path')
const request = require('request')
const JSON5 = require('json5')
const {BD_TRANSLATE_KEY, BD_TRANSLATE_APP_ID, BD_TRANSLATE_USE_DICT} = require('@root/project.config')
const TRANSLATE_URL = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
const MD5 = require('./md5')
const {isEmptyStr} = require('@src/module/util')

/**
 * 英译汉
 * @param query
 * @param callback
 */
function translate(query, callback) {
    const salt = (new Date).getTime();
    // const query = 'apple\nI adore you\nIt\'s better';// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    const from = 'en';
    const to = 'zh';
    const str1 = BD_TRANSLATE_APP_ID + query + salt + BD_TRANSLATE_KEY;
    const sign = MD5(str1);

    /**
     * request发送content-type就是application/x-www-form-urlencoded ，符合百度翻译api的要求
     */
    request.post({
        url: TRANSLATE_URL,
        form: {
            action: BD_TRANSLATE_USE_DICT ? '1' : '',
            q: query,
            appid: BD_TRANSLATE_APP_ID,
            salt: salt,
            from: from,
            to: to,
            sign: sign
        }
    }, function (err, resp, body) {
        if (err) {
            console.error('翻译失败:')
            console.error(err)
        } else {
            if (typeof callback === 'function') {
                //这里需要注意的是，原始的body里面的中文是以utf8字符存在的，直接匹配忽略字典是不会成功的
                //所以先以parse方法内置转换功能将其转换为正常中文字符，在字符串化进行替换
                const result = JSON.parse(reduceTranslate(JSON.stringify(JSON.parse(body))))
                callback(result)
            }
        }
    })
}

/**
 * 还原不需要翻译的部分
 * @param src
 * @returns {*}
 */
function reduceTranslate(src) {
    if (!isEmptyStr(src)) {
        const dictFName = path.resolve(__dirname, '..\\..\\doc\\translate.ignore.json5')
        let num = fs.openSync(dictFName, 'r')
        const dict = JSON5.parse(fs.readFileSync(num))
        for (let key in dict) {
            if (src.includes(key)) {
                const p = key.substring(1, key.length)//因为正则表达式无法匹配^这个符号，所以截取之后的字符作为匹配模式
                src = src.replace(new RegExp(p, 'g'), dict[key])
            }
        }
    }
    return src
}

module.exports = {
    translate
}
