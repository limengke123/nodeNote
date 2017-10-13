const dgram = require('dgram')
//UDP套接字相对于TCP套接字使用起来更简单，只是EventEmitter的实例，非Stream的实例
//具备如下自定义时间：message listening close error

const message = Buffer.from('深入浅出Node.js')
const client = dgram.createSocket('udp4')
client.send(message,0,message.length,41234,"localhost",(err,bytes)=>{
    client.close()
})