# 前言
高级版的文本自动翻译机终于开发完成了，之前采用的是纯html的图形界面进行开发，但是还不够全自动，需要手动定位文件拷贝覆盖。理论像这种东西可以使用python进行开发，但本人只会前端和安卓。于是乎找到了一个折衷的办法，用**nodeJS**开发。
# 工具特色
## 跨平台
支持多种操作系统，包括**Windows**、**Linux**、**Mac**
## 百度翻译API
使用免费(标准版)。支持术语库(高级版)。高级版一个月有200万免费字符使用权限。标准版无限使用。由于屎大棒里面尤其是FU里面有很多新造的词汇，采用术语库，可以极大降低翻译不准确的问题。
## 全自动翻译
只需一个简单指令，就能自动翻译指定目录下的所有文件
# 使用教程
## 一、注册百度翻译账号，获取key和appid
可以参照之前的[半自动翻译教程](https://github.com/ChenJunsen/StarboundAutoTranslator)

## 二、安装配置node
### 1、下载安装包
进入[node官网](https://nodejs.org/en/download/)，选择你的系统对应的平台版本，以windows为例，分32位版本和64位版本，不清除的就选32位，因为64位兼容32位的程序，不过现在的系统一般都是64位的。下载完后双击安装，无脑下一步点击就行了。
![node下载](https://img-blog.csdnimg.cn/bd47b60a54f4440ba42ef95133512e34.png#pic_center)
### 2、检测是否安装成功
win+R调出’运行‘，输入cmd
![终端](https://img-blog.csdnimg.cn/1fb11a04cd824eba8d9090dbe7d5fe26.png#pic_center)
确定，打开终端，键入

```bash
node -v
```
如果能看到node的版本信息，证明安装成功了
![cmd](https://img-blog.csdnimg.cn/9e2fdf924c404869826f003234b41aab.png#pic_center)

需要注意的是，如果你的登录账户不是**Administrator**账户，这一步乃至后面的步骤可能会出现失败。那么就需要调用**管理员权限的PowerShell**。打开方式是，按住**shift**键同时右键**win**的徽标：
![powershell](https://img-blog.csdnimg.cn/b8ccca52944b4ad98c1b499e74d26f50.png#pic_center)

### 3、下载配置工具文件
下载地址:[github传送门](https://github.com/ChenJunsen/starbound_auto_transalator_advanced)
进入到源码根目录，**最好不要有中文路径**，在空白区域shift+右键，调出此处打开powershell
![此处](https://img-blog.csdnimg.cn/74221ab5d1674683b41a769b9507ac3c.png#pic_center)
键入下面命令进行依赖安装。

```bash
npm install
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/d20277661d114b3f80d6ab20f57d1dbc.png#pic_center)
上述图片就是成功截图。安装依赖途中可能会有杀毒软件报警，允许。另外前面说了，不是Adminstrtor账户的话，运行指令可能会失败，就只有打开管理员的powershell然后cd进源码目录进行安装。

接下来找到根目录的project.config.js文件
![project.cfg](https://img-blog.csdnimg.cn/a2c6c20bf7c344c0874285d699ff82d4.png#pic_center)

```javascript
/**
 * 百度翻译api的key
 * @type {string}
 */
const BD_TRANSLATE_KEY = ''
/**
 * 百度翻译的api的appid
 * @type {string}
 */
const BD_TRANSLATE_APP_ID = ''
/**
 * 翻译的文件与文件之间的延迟，过于频繁会导致api调用失败
 * @type {number} 毫秒
 */
const TRANSLATE_DELAY = 5000
/**
 * 是否覆盖翻译
 * @type {boolean} true--之前翻译过的会覆盖翻译 false--过滤掉之前翻译过的
 */
const TRANSLATE_COVER = false
/**
 * 翻译的目标源目录
 * @type {string}
 */
const TARGET_PATH='G:\\workspace\\StarBound\\FrackinUniverse-sChinese-Project\\translations\\texts\\objects\\mantizi'
```
相关配置如上所述，需要注意的是前两项为百度翻译的Key和Appid,TARGET_PATH这个目标源目录，windows下的文件分隔符是\\,并且填入的时候,要加入转义字符，也就是两根反斜杠。

至此，项目配置就算完毕，接下来就是进行翻译指令了。

## 三、执行翻译
windows系统下以管理员模式双击start.bat即可开始翻译，其他系统自行进入src目录执行

```bash
node .\exe.js
```
以上面的**TARGET_PATH**的文件为例，执行这个指令后会出现

```bash
[G:\workspace\StarBound\FrackinUniverse-sChinese-Project\translations\texts\objects\mantizi\imperialbanner1\imperialbanner1.object.json
]
文件打开成功:3 准备读取:
翻译结果
当前文件已经翻译完全，跳过该文件
------------------------------------------------------------------
当前处理文件第2个文件:
[G:\workspace\StarBound\FrackinUniverse-sChinese-Project\translations\texts\objects\mantizi\imperialbanner2\imperialbanner2.object.json
]
文件打开成功:4 准备读取:
发现待翻译文本:
{
  '0': 'A beautifully woven banner.',
  '1': 'A bright woven banner. I wonder what the jewel in the middle means.',
  '2': 'A sun? Or some kind of creature?',
  '3': 'A thick woven banner depicting the imperial crest.',
  '4': 'Floran usually avoid this sssymbol.',
  '5': 'I enjoy the golden accents woven into the fabric.',
  '6': 'Is the Empire nearby?',
  '7': 'Mantizi Imperial Banner',
  '8': 'Servire Imperium.',
  '9': 'This banner looks like it has a beetle woven on it.'
}
请求参数合成结果:
A beautifully woven banner.
A bright woven banner. I wonder what the jewel in the middle means.
A sun? Or some kind of creature?
A thick woven banner depicting the imperial crest.
Floran usually avoid this sssymbol.
I enjoy the golden accents woven into the fabric.
Is the Empire nearby?
Mantizi Imperial Banner
Servire Imperium.
This banner looks like it has a beetle woven on it.
翻译结果
[
  { src: 'A beautifully woven banner.', dst: '编织精美的旗帜。' },
  {
    src: 'A bright woven banner. I wonder what the jewel in the middle means.',
    dst: '鲜艳的编织横幅。我想知道中间的珠宝是什么意思。'
  },
  { src: 'A sun? Or some kind of creature?', dst: '太阳？或者某种生物？' },
  {
    src: 'A thick woven banner depicting the imperial crest.',
    dst: '描绘皇冠的粗织旗帜。'
  },
  { src: 'Floran usually avoid this sssymbol.', dst: '弗洛兰通常避免使用这个符号。' },
  {
    src: 'I enjoy the golden accents woven into the fabric.',
    dst: '我喜欢织入织物的金色口音。'
  },
  { src: 'Is the Empire nearby?', dst: '帝国在附近吗？' },
  { src: 'Mantizi Imperial Banner', dst: '曼提兹帝国旗' },
  { src: 'Servire Imperium.', dst: '帝国服务。' },
  {
    src: 'This banner looks like it has a beetle woven on it.',
    dst: '这面横幅上好像织着一只甲虫。'
  }
]
------------------------------------------------------------------
重组结果
[
  {
    DeniedAlternatives: [],
    Files: {
      'objects/mantizi/imperialbanner2/imperialbanner2.object': [Array]
    },
    Texts: { Eng: 'A beautifully woven banner.', Chs: '编织精美的旗帜。' }
  },
  {
    DeniedAlternatives: [],
    Files: {
      'objects/mantizi/imperialbanner2/imperialbanner2.object': [Array]
    },
    Texts: {
      Eng: 'A bright woven banner. I wonder what the jewel in the middle means.',
      Chs: '鲜艳的编织横幅。我想知道中间的珠宝是什么意思。'
    }
  },
  {
    DeniedAlternatives: [],
    Files: {
      'objects/mantizi/imperialbanner2/imperialbanner2.object': [Array]
    },
    Texts: { Eng: 'A sun? Or some kind of creature?', Chs: '太阳？或者某种生物？' }
  },
  {
    DeniedAlternatives: [],
    Files: {
      'objects/mantizi/imperialbanner2/imperialbanner2.object': [Array]
    },
    Texts: {
      Eng: 'A thick woven banner depicting the imperial crest.',
      Chs: '描绘皇冠的粗织旗帜。'
    }
  },
  {
    DeniedAlternatives: [],
    Files: {
      'objects/mantizi/imperialbanner2/imperialbanner2.object': [Array]
    },
    Texts: {
      Eng: 'Floran usually avoid this sssymbol.',
      Chs: '弗洛兰通常避免使用这个符号。'
    }
  },
  {
    DeniedAlternatives: [],
    Files: {
      'objects/mantizi/imperialbanner2/imperialbanner2.object': [Array]
    },
    Texts: {
      Eng: 'I enjoy the golden accents woven into the fabric.',
      Chs: '我喜欢织入织物的金色口音。'
    }
  },
  {
    DeniedAlternatives: [],
    Files: {
      'objects/mantizi/imperialbanner2/imperialbanner2.object': [Array]
    },
    Texts: { Eng: 'Is the Empire nearby?', Chs: '帝国在附近吗？' }
  },
  {
    DeniedAlternatives: [],
    Files: {
      'objects/mantizi/imperialbanner2/imperialbanner2.object': [Array]
    },
    Texts: { Chs: 'Mantizi帝国横幅', Eng: 'Mantizi Imperial Banner' }
  },
  {
    DeniedAlternatives: [],
    Files: {
      'objects/mantizi/imperialbanner2/imperialbanner2.object': [Array]
    },
    Texts: { Chs: '服侍帝国。', Eng: 'Servire Imperium.' }
  },
  {
    DeniedAlternatives: [],
    Files: {
      'objects/mantizi/imperialbanner2/imperialbanner2.object': [Array]
    },
    Texts: {
      Eng: 'This banner looks like it has a beetle woven on it.',
      Chs: '这面横幅上好像织着一只甲虫。'
    }
  }
]
```
从控制台的信息可以看见当前翻译文件的信息，当配置不覆盖翻译时，会自动跳过翻译完成的文件，增加翻译效率。
翻译成功后也会有相应提示:

```bash
当前处理文件第35个文件:
[G:\workspace\StarBound\FrackinUniverse-sChinese-Project\translations\texts\objects\mantizi\shared_imperialvaselarge\shared_imperialvas
elarge.json]
文件打开成功:4 准备读取:
发现待翻译文本:
{ '0': 'A large decorative glazed vase.' }
请求参数合成结果:
A large decorative glazed vase.
翻译结果
[ { src: 'A large decorative glazed vase.', dst: '一个装饰性的大玻璃花瓶。' } ]
------------------------------------------------------------------
重组结果
[
  {
    DeniedAlternatives: [],
    Files: {
      'objects/mantizi/imperialvaselarge1/imperialvaselarge1.object': [Array],
      'objects/mantizi/imperialvaselarge2/imperialvaselarge2.object': [Array]
    },
    Texts: { Eng: 'A large decorative glazed vase.', Chs: '一个装饰性的大玻璃花瓶。' }
  }
]
***********全部文件翻译完成**********
```

## 四、设置术语库
这一步不是必须，但是设置术语库可以增加翻译准确性，目前我搜集了一些关于矿石、液体和NPC名称的相关术语，文件在doc目录下面:
![术语库](https://img-blog.csdnimg.cn/660d4062827f4b1090fe6baf135227e6.png#pic_center)
在[百度翻译平台](https://api.fanyi.baidu.com/manage/term)可以配置
![配置术语库](https://img-blog.csdnimg.cn/a1f1c4e9e8b349acb81b6d90204d2b81.png#pic_center)

## 五、最重要的一点
术语库的操作会最大限度提升翻译精确度，但是机器是没有感情的，翻译完后，一定要挨个校对一下

## 六、change log
### 2022.01.06->v1.1.0
- 1、支持单个文件翻译，只需修改project.config.js的TARGET_PATH为单个文件路径即可
- 2、优化了类似^orange;的翻译，现在会跳过这些翻译

### 2022.01.14->v1.1.1
- 控制台打印支持彩色文字显示
