require('module-alias/register')
const L = require('L')
const fs = require('fs')
const { TRANSLATE_DELAY, TRANSLATE_COVER, TARGET_PATH, TRANSLATE_IF_ENG_EQL_CHS } = require('@root/project.config')
const { loopFile } = require('@src/module/file')
const { fuTranslate, fuRegroup } = require('@src/module/format/fu')

const fileList = loopFile(TARGET_PATH)//待翻译的文件列表
L.d(`待翻译文件数量:${ Array.isArray(fileList) ? fileList.length + 1 : 0 }`)

function doIt(index) {
  let fName = fileList[index]
  L.d(`当前处理文件第${ index + 1 }个文件:`)
  L.i(`[${ fName }]`)
  fs.open(fName, 'r+', (err, fd) => {
    if (err) {
      L.e(err)
    } else {
      L.i(`文件打开成功:${ fd } 准备读取:`)
      fs.readFile(fName, 'utf-8', (err, data) => {
        if (err) {
          L.e('文件读取失败！')
        } else {
          fuTranslate(data, res => {
            L.d('翻译结果')
            L.i(res === -1 ? '当前文件已经翻译完全，跳过该文件' : JSON.stringify(res, null, 2))
            L.rainbow('------------------------------------------------------------------')
            if (res === -1) {
              if (++index < fileList.length) {
                doIt(index)
              } else {
                L.i('***********全部文件翻译完成**********')
              }
            } else {
              let srcObj = JSON.parse(data)
              fuRegroup(srcObj, res, TRANSLATE_COVER, TRANSLATE_IF_ENG_EQL_CHS)
              console.log('重组结果')
              console.log(srcObj)
              fs.writeFileSync(fName, JSON.stringify(srcObj, null, 2))
              fs.close(fd, (err) => {
                if (err) {
                  L.e('关闭失败')
                  L.e(err)
                }
              })
              if (++index < fileList.length) {
                setTimeout(() => {
                  doIt(index)
                }, TRANSLATE_DELAY)
              } else {
                L.i('***********全部文件翻译完成**********')
              }
            }
          }, TRANSLATE_COVER, TRANSLATE_IF_ENG_EQL_CHS)
        }
      })
    }
  })
}

doIt(0)

