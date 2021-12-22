const iconv=require('iconv-lite')
let a=iconv.encode('12我','utf-8')
console.log(iconv.decode(a,'utf-8'))

