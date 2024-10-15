require('module-alias/register')
const L = require('L')
const { isEmptyStr } = require('@src/module/util')
const { translate } = require('@src/lib/baidu.api')
require('colors')

/**
 * 富兰克林宇宙的文件格式检测
 * @param str
 * @returns {boolean}
 */
function fuCheck(str) {
  let res = false
  if (!isEmptyStr(str)) {
    try {
      let jsonObj = JSON.parse(str)
      res = Array.isArray(jsonObj) && jsonObj.length > 0
    } catch (e) {
      L.e('当前文本非JSON格式!')
      L.e(e)
    }
  } else {
    L.w('当前文本是空的')
  }
  return res
}

/**
 * 翻译文本
 * @param str 待翻译文本
 * @param callback(res) 回调函数 res是json对象,-1表示翻译完成了
 * @param isCover 是否覆盖 true--覆盖翻译  false--如果之前已经翻译了，就跳过
 * @param isCoverIfChsEqEng 是否在存在Chs节点时，且发现和Eng一样时执行覆盖操作
 */
function fuTranslate(str, callback, isCover = false, isCoverIfChsEqEng) {
  const map = {}
  const map_cn = {}
  let jsonObj={}
  if (fuCheck(str)) {
    jsonObj = JSON.parse(str)
    jsonObj.forEach((json, index) => {
      if (json['Texts'] && json['Texts']['Eng']) {
        map[index] = json['Texts']['Eng']
      }
      if (json['Texts'] && json['Texts']['Chs']) {
        map_cn[index] = json['Texts']['Chs']
      }
    })
  }
  if (isCover) {
    doTranslate(map, callback)
  } else {
    if (Object.keys(map_cn).length === Object.keys(map).length) {
      if (isCoverIfChsEqEng) {
        if(jsonObj.every(idx => map[idx] === map_cn[idx])){
          doTranslate(map, callback)
        }else{
          if (typeof callback === 'function') {
            callback(-1)
          }
        }
      } else {
        if (typeof callback === 'function') {
          callback(-1)
        }
      }
    } else {
      doTranslate(map, callback)
    }
  }
}

function doTranslate(map, callback) {
  L.i('发现待翻译文本:')
  L.i(JSON.stringify(map, null, 2))
  translate(convertQryMap(map), ({ trans_result }) => {
    if (typeof callback === 'function') {
      callback(trans_result)
    }
  })
}

/**
 * 将参数转换为百度翻译api能接受的参数
 * @param map
 * @returns {string} 由于百度api是要求所有个体参数以\n拼接，但是如果个体参数中存在\n，就会导致翻译返回的数组长度错位，进而会让重组失败
 * 因此，这里的做法就是在拼接时将个体参数中的\n转换为一个翻译保留字符，比如CJS翻译，翻译完后，再将CJS翻译还原为\n
 */
function convertQryMap(map) {
  let res = ''
  Object.keys(map).forEach((key, index, keys) => {
    res += map[key].replace(/\n/g, 'CJS翻译')//替换个体参数里面的\n
    if (index !== keys.length - 1) {
      res += '\n'
    }
  })
  L.d("请求参数合成结果:")
  L.d(res)
  return res;
}

/**
 * 重组翻译前的对象
 * @param srcObj
 * @param resObj
 * @param isCover 是否覆盖 true--覆盖翻译  false--如果之前已经翻译了，就跳过
 * @param isCoverIfChsEqEng 是否在存在Chs节点时，且发现和Eng一样时执行覆盖操作
 */
function fuRegroup(srcObj, resObj, isCover = false, isCoverIfChsEqEng) {
  if (!resObj) {
    L.e('翻译异常了，休息一会儿重来！')
  }
  srcObj.forEach((src, i) => {
    //类比时，要考虑还原src和dst中的<>为\n
    if (src['Texts'] && resObj[i] && resObj[i]['src'] && src['Texts']['Eng'] === resObj[i]['src'].replace(/CJS翻译/g, '\n')) {
      const resDst = resObj[i]['dst'].replace(/CJS翻译/g, '\n')
      if (isCover === true) {
        src['Texts']['Chs'] = resDst
      } else {
        if (!src['Texts']['Chs']) {
          src['Texts']['Chs'] = resDst
        } else {
          if (isCoverIfChsEqEng && src['Texts']['Chs'] === src['Texts']['Eng']) {
            L.d('发现Eng等于Chs')
            src['Texts']['Chs'] = resDst
          }
        }
      }
    }
  })
}

module.exports = {
  fuTranslate,
  fuRegroup
}
