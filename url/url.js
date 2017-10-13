const url = require('url')
const querystring = require('querystring')
const path = require('path')
const http = require('http')
const port = '3000'

const server = http.createServer((req,res)=>{
    const cookie = req.headers.cookie
    console.log(req.url)
    console.log(cookie)
    const query = url.parse(req.url).query
    res.end(`query`)
})

server.listen(port,()=>{
    console.log(`server listening on ${port}`)
})