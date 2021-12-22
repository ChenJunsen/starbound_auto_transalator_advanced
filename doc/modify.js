/*术语库转换脚本 将中英转换为英中*/

const fs = require('fs')
const readline = require('readline')

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

/**
 * 中英转英中
 * @param arr
 */
function ce2ec() {
    readFileToArr('星界边境术语库-中英.txt', arr => {
        for (let i = 0; i < arr.length; i++) {
            const t = arr[i]
            if (t && t.includes('|||')) {
                let tt = t.split('|||')
                fs.writeFile('星界边境术语库-英中.txt', `${tt[1]}|||${tt[0]}\n`, {
                    flag: 'a+'
                }, function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        }
        console.log('转换完成！')
    });
}

ce2ec()


