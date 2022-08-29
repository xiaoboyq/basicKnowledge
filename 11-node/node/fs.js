
/**
 * 正常读取文件
*/
// const  fs = require('fs');
// const { promisify } = require('util')

// fs.readFile('../ES6.md',(err, res)=>{
//   console.log(res.toString('utf-8'))
// })



/**
 * promise 读取文件
*/
// const  fs = require('fs');
// const { promisify } = require('util') // node的util中内置promisify写法
// const readFile = promisify(fs.readFile);

// readFile('../ES6.md').then(res=>{
//   console.log(res.toString())
// })

/*
* async await 写法
*/
(async () => {
  const fs = require('fs');
  const { promisify } = require('util')

  const readFile = promisify(fs.readFile);

  const res = await readFile('../ES6.md')
  console.log(res.toString())
})()