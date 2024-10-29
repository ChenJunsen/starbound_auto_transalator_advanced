/*矿物掉率修改*/
require('module-alias/register')
const L = require('L')
const fs = require('fs')
const { isEmptyStr } = require('@src/module/util')

/**
 * 待转换的文件地址
 * @type {string}
 */
const PATH_INPUT = "G:\\workspace\\StarBound\\FrackinUniverse\\biomes\\oredistributions.configfunctions.patch"
/**
 * 最大出现率
 * @type {number}
 */
const RARITY_MAX = 1.5
/**
 * 最小出现率
 * @type {number}
 */
const RARITY_MIN = 0.1

/**
 * 稀有矿提升倍率
 * @type {{effigium: number, nocxium: number, densinium: number, xithricite: number}}
 */
const RARE_ORES = {
  'effigium': 3, // 幻影矿
  'nocxium': 3, // 诺克原石
  'densinium': 2, // 超致密
  'xithricite': 2 // 赛德瑞瑟
}


function exec() {
  fs.open(PATH_INPUT, 'r+', (err, fd) => {
    if (err) {
      L.e(err)
    } else {
      L.i('文件打开成功：' + fd)
      L.d('文件名称：' + PATH_INPUT)
      fs.readFile(PATH_INPUT, 'utf-8', (err, data) => {
        if (err) {
          L.e('文件读取失败:')
          L.e(err)
        } else {
          const OBJ = JSON.parse(data)
          if (!Array.isArray(OBJ)) {
            L.e('非法文本格式')
            fs.closeSync(fd)
          } else {
            const filtered = []
            OBJ.forEach(obj => {
              const value = obj.value
              let included = false
              if (Array.isArray(value)) {
                value.forEach(val => {
                  if (Array.isArray(val) && val.length === 2) {
                    const second = val[1]
                    second.forEach(sec => {
                      if (Array.isArray(sec)) {
                        if (Array.isArray(sec) && sec.length === 2) {
                          const key = sec[0]
                          if (!isEmptyStr(RARE_ORES[key])) {
                            sec[1] = replaceRule(sec[1], RARE_ORES[key])
                            included = true
                          }
                        } else {
                          // L.d('格式不对，跳过')
                        }
                      }
                    })
                  }
                })
              }
              if (included) {
                obj.op = 'replace'
                filtered.push(obj)
              }
            })
            L.i('最终结果:')
            L.i(filtered)
            fs.closeSync(fd)
            L.d('开始写入文件:')
            fs.writeFile('oredistributions.configfunctions.patch', JSON.stringify(filtered), {
              flag: 'a+'
            }, function (err) {
              if (err) {
                console.log(err)
              }
            })
            L.d('写入成功')
          }
        }
      })
    }
  })
}

const replaceRule = (rarity, rareMultiple) => {
  let val = Number((rarity * rareMultiple).toFixed(2))
  val = Math.max(val, RARITY_MIN)
  val = Math.min(val, RARITY_MAX)
  return val
}

exec()


