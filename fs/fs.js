const fs = require('fs');
const path = require('path');

const test = ()=>{
    const file = path.resolve(__dirname,'../buffer/buffer.md')
    //highwatermark控制触发data事件的buffer大小
    //默认一个slab读取，也就是8KB，highwatermark设置过小对系统的调用次数过多，值越大，读取速度越快
    const read = fs.createReadStream(file,{highWaterMark:11});
    //设置读流的解码方式，就不会出现乱码
    read.setEncoding('utf-8');
    const write = fs.createWriteStream(path.resolve(__dirname,'../test.md'))
    let data;
    read.on('data',(chunk)=>{
        //等价于 data = data.toString()+trunk.toString()
        //外文中，语境通常为英文，toString()不会造成影响
        //中文中，容易出现乱码的问题
        data+=chunk;
        //console.log(chunk)
        // console.log(trunk)
    })
    read.on('end',()=>{
         console.log(data)
    })    
    read.pipe(write)
}

test()