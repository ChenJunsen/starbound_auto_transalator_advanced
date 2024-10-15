const {province_list, city_list, county_list} = require('./china-area')
const fs = require('fs')
const v5 = require("./china-area-data.json");

function makeList(original) {
    const list = []
    for (let key in original) {
        list.push({
            name: original[key],
            code: key
        })
    }
    return list
}

function exportProvince() {
    fs.writeFileSync('中国省级代码.json', JSON.stringify(makeList(province_list), null, 2))
}

function exportCity() {
    fs.writeFileSync('中国市级代码.json', JSON.stringify(makeList(city_list), null, 2))
}

function exportCounty() {
    fs.writeFileSync('中国区级代码.json', JSON.stringify(makeList(county_list), null, 2))
}

exportProvince()
exportCity()
exportCounty()
