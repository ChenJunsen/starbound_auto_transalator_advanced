/**
 * 百度翻译api的key
 * @type {string}
 */
const BD_TRANSLATE_KEY = ''
/**
 * 百度翻译的api的appid
 * @type {string}
 */
const BD_TRANSLATE_APP_ID = ''
/**
 * 是否使用术语库进行翻译
 * @type {boolean} true-是
 */
const BD_TRANSLATE_USE_DICT = true;
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
 * 是否在发现待翻译的文本和已翻译的文本一样时，依旧执行翻译（该项在TRANSLATE_COVER为false时生效，主要是因为发现了有一些文件的Chs和Eng一样，都是英文）
 * 注意：该项开启会影响索引速度，并且必须是该文件所有的中文和英文相同才会执行覆盖翻译
 * @type {boolean}
 */
const TRANSLATE_IF_ENG_EQL_CHS = false
/**
 * 翻译的目标源目录(也可以是单个文件的相对或者绝对路径)
 * @type {string}
 */
const TARGET_PATH = 'G:\\workspace\\StarBound\\FrackinUniverse-sChinese-Project-gitee\\translations\\texts\\objects'
// const TARGET_PATH='G:\\workspace\\StarBound\\FrackinUniverse-sChinese-Project-5.6.4271\\translations\\texts\\codex'

module.exports = {
  BD_TRANSLATE_KEY,
  BD_TRANSLATE_APP_ID,
  BD_TRANSLATE_USE_DICT,
  TRANSLATE_DELAY,
  TRANSLATE_COVER,
  TARGET_PATH,
  TRANSLATE_IF_ENG_EQL_CHS
}
