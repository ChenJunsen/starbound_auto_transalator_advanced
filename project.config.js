/**
 * 百度翻译api的key
 * @type {string}
 */
const BD_TRANSLATE_KEY = 'Wt6XUACspEJdh4qX3v8Q'
/**
 * 百度翻译的api的appid
 * @type {string}
 */
const BD_TRANSLATE_APP_ID = '20210916000945338'
/**
 * 翻译的文件与文件之间的延迟，过于频繁会导致api调用失败
 * @type {number} 毫秒
 */
const TRANSLATE_DELAY = 5000
/**
 * 是否覆盖翻译
 * @type {boolean} true--之前翻译过的会覆盖翻译 false--过滤掉之前翻译过的
 */
const TRANSLATE_COVER = false
/**
 * 翻译的目标源目录
 * @type {string}
 */
const TARGET_PATH='G:\\workspace\\StarBound\\FrackinUniverse-sChinese-Project\\translations\\texts\\objects\\mantizi'

module.exports = {
    BD_TRANSLATE_KEY,
    BD_TRANSLATE_APP_ID,
    TRANSLATE_DELAY,
    TRANSLATE_COVER,
    TARGET_PATH
}
