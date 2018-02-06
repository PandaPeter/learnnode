/* 
    模块加载过程
    1:路径分析：
        '模块标识符'：
            1、定义：require()中的参数，可以省略后缀文件名，(.node\.js\.json ), 建议只省略.js
            2、种类：分为核心模块／带路径（相对、绝对）的文件模块／特殊的非核心非路径的自定义模块如包
            3、特殊的非核心非路径的自定义模块如包特别说明：
                路径搜索规则：1）当前文件夹的node_modules
                            2) 父文件夹的node_modules
                            3) 递归至根目录的node_modules
                例如：module.paths = [ '/Users/panyanan/learnnode/modules/node_modules',
                                        '/Users/panyanan/learnnode/node_modules',
                                        '/Users/panyanan/node_modules',
                                        '/Users/node_modules',
                                        '/node_modules' ]
    2:文件定位
        require('name')
        从路径分析得到路径后进行文件定位, 顺序为
        1）name.js
        2) name.node
        3) name.json
        4) name文件夹（如包）
        5）文件夹中的package.json中的"main": "something.js"
        6） index.js index.node index.json
    3:编译执行
    模块加载速度
    1:缓存中的核心模块，文件模块
    2:核心模块（node提供）
    3:文件模块（用户编写或npm安装）

    exports 与 module.exports的区别
        exports作为形参与module.exports指向同一个内存空间， 可以为这个内存空间添加方法如exports.add/del/update
    但是不能将exports指向另一个内存空间， 如exports=function/{}，这样是切断了exports与module的联系
    因为模块最后返回值是module。

*/
//核心模块
const path = require('path');
//引入自己编写的文件模块（相对路径或者绝对路径）
const userModule = require('./userModule')();
//引入包
//const Koa = require('koa');
//引入json
const location = require('./location.json');
console.log(location.province, location.city, location.area);