/*基于colors.js开发的控制台打印辅助工具，话说，原作者在这个开源库里面埋坑，然后删库跑路了。*/
/*created by cjs at 20220114*/
const colors = require('colors')

/**
 * 自定义颜色样式别名及颜色值
 * 颜色不支持#4cbdfe这样的
 */
colors.setTheme({
    rainbow: 'rainbow',
    info: 'green',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
})

function L() {
    this.d = (msg) => {
        console.log(`${msg}`.debug)
    }
    this.e = (msg) => {
        console.log(`${msg}`.error)
    }
    this.w = (msg) => {
        console.log(`${msg}`.warn)
    }
    this.i = (msg) => {
        console.log(`${msg}`.info)
    }
    this.rainbow = (msg) => {
        console.log(`${msg}`.rainbow)
    }

}

/**
 * 带颜色的控制打印
 * @type {L}
 */
module.exports = new L()
