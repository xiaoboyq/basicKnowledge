const http =  require('http');
const fs = require('fs');
const server = http.createServer((req,res)=>{

  const { url, method } = req // 请求
  if(url === '/'&& method === 'GET') {
    fs.readFile('./index.html',(err,data)=>{
      if(err) {
        res.writeHead(500, { 'Content-type': 'text/plain;charset=utf-8'})
        res.end('服务器错误')
      } else {
        res.writeHead(200, {
          'Content-type': 'text/html'
        })
        res.end(data)
      }
    })
  } else if(url === '/users' && method ==='GET') {
    res.writeHead(200,{'Content-type': 'application/json'})
    res.end(JSON.stringify({name: 'test'}))

  }

})

server.listen(3000)