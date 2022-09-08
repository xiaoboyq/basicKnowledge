
let xhr = new XMLHttpRequest();
xhr.open('POST', url)
xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')

xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if(xhr.status === 200 || xhr.status === 304) {
      // xxx
    }
  }
}
xhr.send(data)


// 0：未初始化。尚未调用 open()方法。

// 1：启动。已经调用 open()方法，但尚未调用 send()方法。

// 2：发送。已经调用 send()方法，但尚未接收到响应。

// 3：接收。已经接收到部分响应数据。

// 4：完成。已经接收到全部响应数据，而且已经可以在客户端使用了。