
const http = require('http')
//http 超文本传输协议 HyperText Transfer Protcol
//http构建于TCP之上，属于应用层协议，HTTP两端是服务器和浏览器既B/S模式
//EventEmitter的实例
//connection request close checkContinue connect upgrade clientError等事件
//http.request用于构造http客户端

/* *
    web在具体业务上，应有如下需求：
    * 请求方法的判断 GET POST DELETE PUT HEAD CONNECT
    * URL的路径解析
    * URL查询字符串的解析
    * Cookie的解析
    * Basic认证
    * 表单数据解析
    * 任意格式文件的上传
    * Session需求
* */
const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.write('what?')
    res.write('hahah')
    res.end('hello world\n')
    //res.write('last')
})
server.on('connect',(req,res)=>{
    req && console.log(req)
    console.log(`connect`)
})
server.listen(3131,()=>{
    console.log(`server is start 3131`)
})