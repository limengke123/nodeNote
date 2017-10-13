const {request,ClientRequest} = require('http');
const util = require('util')
// let url = 'localhost'
// process.stdout.write('输入url')
// process.stdin.setEncoding('utf8')
// process.stdin.on('data',(chunk)=>{
//     console.log(chunk)
//     const options = {
//         hostname:chunk.toString(),
//         port:3131,
//         path:'/',
//         method:'GET'
//     }
    
//     console.dir(options,{
//         colors:true
//     })
//     return false;
//     const req = request(options,(res)=>{
//         console.log(`STATUS:${res.statusCode}`)
//         console.log(`HEADERS:${JSON.stringify(res.headers)}`)
//         res.setEncoding('utf8')
//         res.on('data',(data)=>{
//             console.log(data)
//         })
//     })
//     req.end()
// })
