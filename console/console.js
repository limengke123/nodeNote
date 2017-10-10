
const test1 = () => {
    const fs = require('fs');
    const { Console } = require('console')
    const output = fs.createWriteStream('./stdout.log');
    const errorOutput = fs.createWriteStream('./stderr.log');
    // 自定义的简单记录器
    const logger = new Console(output, errorOutput);
    // 像 console 一样使用
    const count = 5;
    logger.log('count: %d', count);
    // stdout.log 中打印: count 5
}

const test2 = () => {
    const obj = {
        a:1,
        b:"string",
        c:{
            c1:2,
            c2:"str",
            c3:[
                1,
                "str3",
                {
                    fuck:"what"
                }
            ]
        }
    }
    console.log(obj);
    console.dir(obj,{
        showHidden:true,
        depth:null,
        colors:true
    })
}

test2()