require('module-alias/register')
const request = require('request')
const {BD_TRANSLATE_KEY, BD_TRANSLATE_APP_ID} = require('@root/project.config')
const TRANSLATE_URL = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
const MD5 = require('./md5')

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
                const result=JSON.parse(body)
                callback(result)
            }
        }
    })
}

module.exports = {
    translate
}
