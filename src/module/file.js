const fs = require('fs')
const path = require('path')
const readline = require("readline");
const targetPath = path.resolve(__dirname, '..\\..\\text')//翻译源文件的根目录
// console.log(`待翻译文件根目录:${targetPath}`)

/**
 * 遍历文件夹下面的所有文件
 * @param dir 文件路径或文件夹路径
 * @returns {*[]}
 */
function loopFile(dir) {
    let res = []
    const fileStats = fs.statSync(dir);
    if (fileStats.isDirectory()) {
        function traverse(dir) {
            fs.readdirSync(dir).forEach((file) => {
                const pathname = path.join(dir, file)
                if (fs.statSync(pathname).isDirectory()) {
                    traverse(pathname)
                } else {
                    res.push(pathname)
                }
            })
        }

        traverse(dir)
    } else {
        res.push(dir)
    }
    return res;
}

/**
 * 逐行读文件并将文件内容存为与行数相同的数组里面
 * @param fReadName
 * @param callback
 */
function readFileToArr(fReadName, callback) {
    let fRead = fs.createReadStream(fReadName);
    let objReadline = readline.createInterface({
        input: fRead
    });
    let arr = new Array();
    objReadline.on('line', line => {
        arr.push(line);
    });
    objReadline.on('close', () => {
        callback(arr);
    });
}

module.exports = {
    targetPath,
    readFileToArr,
    loopFile
}



