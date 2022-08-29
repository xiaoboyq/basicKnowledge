1，网络协议 2，vue 双向绑定 3，平时用到的webpack 4.作用域链 5，原型链和继承 6，闭包

## https 的加密原理
对称加密  AES
非对称加密 RSA

1.dom vue原理

2.css flex



3. js继承
3.1. 原型继承
3.2. class继承

4. fetch取消请求

## AbortController
创建一个 AbortController实例
这个实例拥有一个 signal 属性
把这个 signal 作为 fetch 请求的选项
调用 AbortController 的 abort 属性以取消所有使用这个信号的 fetch 请求。

```javascript
const controller = new AbortController();
const { signal } = controller;

fetch('http://xxx', { signal }).then(res=>{

})

// 取消请求
controller.abort()

```
5.eventloop 事件循环

6.instanceof

```javascript
function instanceof(L, right) {
    let left = L.__ptoto__;
    right = R.prototype;
    while(true) {
        if(left === null) {
            return false
        }
        if(left === right) {
            return true
        }
       left = left.__proto__
    }
}

```
7. promise封装setstate

# 为什么要封装：
 因为setState的设置很多时候我们不好立马拿到更新的值， 需要通过第二个参数callback 函数来获取， callback方式缺点是不好定位错误，很容易就进入了回调地狱。 故用promsie 来封装 .then来链式调用

## 参考https://blog.csdn.net/qq_35414779/article/details/84959475

```javascript
const setState_Promise = function(state) {
    return new Promise((resolve)=> this.setState(state, resolve))
}

## 使用方法
7.1 导入setStateP方法
7.2 在constructor构造函数中去绑定this
this.setState=setState_promise.bind(this);  // 将setState_promise的this指向当前的this
7.3 使用，这时候this.setState_promise等效于this.setState，不同的是在setState_promise后面可以直接加.then()，避免回调地狱。
```


8. redux基本组成和设计单向数据流
## cnblogs.com/dennisj/p/13230081.html
```javascript

function createStore() {

    const getState = ()=> state

    return {
        getState,
        subscribe,
        listener,
        dispacth
    }
}
```

9.https协议的过程


10.https获取加密密钥的过程

## 对称加密  
## 非对称加密
## 数字证书

11. http的方法有哪几种,每种方法的有用途
原文链接：https://blog.csdn.net/vikeyyyy/article/details/80655115
 get post delete put head

 GET产生一个TCP数据包；POST产生两个TCP数据包。对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。

 GET和POST的区别：b

    1、GET请求的数据是放在HTTP包头中的，也就是URL之后，通常是像下面这样定义格式的：
login.action?name=hyddd&password=idontknow&verify=%E4%BD%E5%A5%BD
其中，以?来分隔URL和数据；以&来分隔参数；如果数据是英文或数字，原样发送；如果数据是中文或其它字符，则进行BASE64编码。
而Post是把提交的数据放在HTTP正文中的。
    2、GET提交的数据比较少，最多1024B，因为GET数据是附在URL之后的，而URL则会受到不同环境的限制的，比如说IE对其限制为2K+35，而POST可以传送更多的数据（理论上是没有限制的，但一般也会受不同的环境，如浏览器、操作系统、服务器处理能力等限制，IIS4可支持80KB，IIS5可支持100KB）。
    3、Post的安全性要比Get高，因为Get时，参数数据是明文传输的，参数直接暴露在url中，所以不能用来传递敏感信息。而且使用GET的话，还可能造成Cross-site request forgery攻击。而POST数据则可以加密的，但GET的速度可能会快些。
    4、get请求只能进行url编码，而post支持多种编码方式；get请求会浏览器主动cache，而post支持多种编码方式；get请求参数会被完整保留在浏览历史记录里，而post中的参数不会被保留。
    5、GET和POST本质上就是TCP链接，并无差别。但是由于HTTP的规定和浏览器/服务器的限制，导致他们在应用过程中体现出一些不同。
    6、GET产生一个TCP数据包；POST产生两个TCP数据包。对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。


12. 类式继承的方案

13. prototype继承的实现



14.借用构造继承，几种组合继承方式

15.看编程代码说出运行结果：Process.nextTick，setImmediate和promise.then 的优先级Process.nextTick，promise, setImmediate的优先级

16. 实现一个bind函数

```javascript

Function.prototype.bind= function() {
    let that = this;  // 保存原函数
    let context = [].shift.call(arguments); // 获取需要绑定的this上下文
    let bindArgs = [].slice.call(arguments); // 获取bind绑定时候传入的参数
    return function () {
        return that.apply(context,[].concat.call(bindArgs,[].slice.call(arguments)))
    }
}
```

17.数字千分位处理，正则和非正则都要实现
```javascript

// 非正则
function  thousandHandle(num) {
  num = num.toString()
  let numArr =   num.includes('.') ? num.split('.') : [num]
  let intArr =  numArr[0].split('').reverse();
  let i = 2;
  while(i < intArr.length) {
    intArr[i] = ((i + 1) === intArr.length) ? intArr[i] : ',' + intArr[i] 
      i = i + 3;
  }
  console.log(intArr)
 intArr = intArr.reverse();
 return intArr.join('')+ numArr[1] 
}

thousandHandle(1239123213123.44444)

```
