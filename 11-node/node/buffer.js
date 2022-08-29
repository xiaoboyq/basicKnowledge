/**  Buffer 用来处理二进制数据   从文件拿过来的都是二进制数据
*/

const buf1 = Buffer.alloc(10) // 开辟一个空间 10个字节的空间
console.log(buf1) //<Buffer 00 00 00 00 00 00 00 00 00 00>  俩个00代表一个字节 一个字节 = 8位 

const buf2 = Buffer.from([1,2,3])
console.log(buf2) //<Buffer 01 02 03>

const buf3 = Buffer.from('Buffer创建方法')
console.log(buf3.toString()) //Buffer创建方法

buf1.write('hello')
console.log('buf1: ', buf1) //buf1:  <Buffer 68 65 6c 6c 6f 00 00 00 00 00>
console.log('buf1: ' + buf1) //buf1: hello

const buf4 = Buffer.concat([buf1, buf3])
console.log('buf4:', buf4.toString()) //buf4: helloBuffer创建方法
console.log('buf4:', buf4.toJSON())
// buf4: {
//   type: 'Buffer',
//   data: [
//     104, 101, 108, 108, 111,   0,   0,
//       0,   0,   0,  66, 117, 102, 102,
//     101, 114, 229, 136, 155, 229, 187,
//     186, 230, 150, 185, 230, 179, 149
//   ]
// }