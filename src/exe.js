require('module-alias/register')
const fs = require('fs')
const {TRANSLATE_DELAY, TRANSLATE_COVER,TARGET_PATH} = require('@root/project.config')
const {loopFile} = require('@src/module/file')
const {fuTranslate, fuRegroup} = require('@src/module/format/fu')

const fileList = loopFile(TARGET_PATH)//待翻译的文件列表
console.log(`待翻译文件数量:${Array.isArray(fileList) ? fileList.length + 1 : 0}`)

function doIt(index) {
    let fName = fileList[index]
    console.log(`当前处理文件第${index + 1}个文件:`)
    console.info(`[${fName}]`)
    fs.open(fName, 'r+', (err, fd) => {
        if (err) {
            console.error(err)
        } else {
            console.log(`文件打开成功:${fd} 准备读取:`)
            fs.readFile(fName, 'utf-8', (err, data) => {
                if (err) {
                    console.error('文件读取失败！')
                } else {
                    fuTranslate(data, res => {
                        console.log('翻译结果')
                        console.warn(res === -1 ? '当前文件已经翻译完全，跳过该文件' : res)
                        console.log('------------------------------------------------------------------')
                        if (res === -1) {
                            if (++index < fileList.length) {
                                doIt(index)
                            } else {
                                console.log('***********全部文件翻译完成**********')
                            }
                        } else {
                            let srcObj = JSON.parse(data)
                            fuRegroup(srcObj, res, TRANSLATE_COVER)
                            console.log('重组结果')
                            console.log(srcObj)
                            fs.writeFileSync(fName, JSON.stringify(srcObj, null, 2))
                            fs.close(fd, (err)=>{
                                if(err){
                                    console.error('关闭失败')
                                    console.error(err)
                                }
                            })
                            if (++index < fileList.length) {
                                setTimeout(() => {
                                    doIt(index)
                                }, TRANSLATE_DELAY)
                            } else {
                                console.log('***********全部文件翻译完成**********')
                            }
                        }
                    }, TRANSLATE_COVER)
                }
            })
        }
    })
}

doIt(0)

