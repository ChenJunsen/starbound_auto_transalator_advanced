require('module-alias/register')
const L = require('L')
const fs = require('fs')

const v5 = require('./china-area-data.json')
console.log(typeof v5)
const tar = require('./china-area')

const _cityList = tar.city_list

function loopObj(obj) {
    for (let key in obj) {
        const val = obj[key]
        if (typeof val === 'object') {
            loopObj(val)
        } else {
            if (val === '市辖区') {
                const _key = key.substring(0, key.length - 1) + '0'
                if (_cityList[_key]) {
                    console.error(`市区码${key}替换为${_cityList[_key]}`)
                    obj[key] = _cityList[_key]
                } else {
                    console.error(`市区码${key}没有对应城市`)
                }
            }
        }
    }
}

loopObj(v5)
fs.writeFileSync('china-area-v6.json', JSON.stringify(v5, null, 2))
