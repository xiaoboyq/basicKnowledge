


## 在 Node.js 上建一个 http 服务器


（1）新建一个文件 `server01.js`，然后在里面输入如下代码：

```javascript

const http = require('http');  //引入 node.js里面的一个http包。因为引入之后，我们不会去修改它，所以用常量来表示


// 创建一台服务器
var server =  http.createServer(function (){   //当有人来访问这台服务器时，就会执行 function 回调函数
    console.log('有人来访问我了');
});

server.listen(8080);   //要让服务器设置为监听状态，端口设置为8080

```

注意看注释。

我们把上面这个 js 文件跑起来，然后在浏览器端输入`http://localhost:8080/`，每请求一次，服务器的控制台就会打印 `有人来访问我了`。


（2）write()函数和 end()函数：

将上面的代码修改如下：

server02.js：

```javascript
const http = require('http');


// 创建一台服务器
var server = http.createServer(function (request, response) {   //当有人来访问这个服务器时，就会执行function 这个回调函数
    console.log('有人来访问我了');

    response.write('smyhvae');  //向浏览器输出内容
    response.end();   //结束了，浏览器你走吧。

});

server.listen(8080);


```

function 回调函数里可以设置两个参数：request 和 response。`response.write()`表示向浏览器输出一些内容。

将上面的 js 代码跑起来，产生的问题是，无论我们在浏览器端输入`http://localhost:8080/1.html`，还是输入`http://localhost:8080/2.jpg`，浏览器上显示的都是`smyhvae`。

# 反向代理 正向代理 概念
反向代理： 靠近服务端的代理
正向代理： 靠近浏览器端的代理 【翻墙： 这里代理服务器只对客户端负责】
一个对客户端负责，一个对所代理的服务器负责。一个正，一个反。

## 正向代理和反向代理在用途上有什么区别呢？
正向代理的常见用途是为在防火墙内的局域网客户端提供浏览Internet的途径。正向代理还可以使用缓冲特性减少网络使用率以及进行上网行为管理，记录用户的访问记录。
反向代理的主要用途，一是保证内网的安全，可以使用反向代理提供WAF功能，阻止web攻击。二是负载均衡，通过反向代理服务器来优化网站的负载




























