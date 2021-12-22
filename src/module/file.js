const fs=require('fs')
const path=require('path')
const targetPath=path.resolve(__dirname,'..\\..\\text')//翻译源文件的根目录
// console.log(`待翻译文件根目录:${targetPath}`)

/**
 * 遍历文件夹下面的所有文件
 * @param dir
 * @returns {*[]}
 */
function loopFile(dir){
    let res=[]
    function traverse(dir){
        fs.readdirSync(dir).forEach((file)=>{
            const pathname=path.join(dir,file)
            if(fs.statSync(pathname).isDirectory()){
                traverse(pathname)
            }else{
                res.push(pathname)
            }
        })
    }
    traverse(dir)
    return res;
}

module.exports={
    targetPath,
    loopFile
}



