const net = require('net');

const server = net.createServer((socket)=>{
    socket.on('data',(data)=>{
        socket.write(data)
    })
    socket.on('end',()=>console.log('链接断开'))
    socket.write('welcome')
})
server.listen(8124,()=>console.log('server bound'))

// const client = net.connect({port:8124},()=>{
//     console.log('client connected')
//     client.write('client1')
// });
// client.on('data',(data)=>{
//     console.log(data.toString())
//     client.end();
// })
// client.on('end',()=>{
//     console.log('client disconnected')
// })
