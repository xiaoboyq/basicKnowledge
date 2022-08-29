# ajax是一种技术方案，但并不是一种新技术。
它依赖的是现有的CSS/HTML/Javascript，
而其中最核心的依赖是浏览器提供的XMLHttpRequest对象，是这个对象使得浏览器可以发出HTTP请求与接收HTTP响应

ajax和 XMLHttpRequest的关系
我们使用XMLHttpRequest对象来发送一个Ajax请求。

XMLHttpRequest 标准又分为Level1和level2
 level1存在几个主要缺陷
 1.受同源策略影响，不能发送跨域请求。
 2.不能发送二进制文件（如图片，视频，音屏）。
 3.在发送和收取数据的过程中，无法实现获取进度信息，只能判断是否完成。

 level2: 新增功能：
 1.在服务器允许的情况下，可以发送跨域请求。
 2.可以发送和接受二进制文件。
 3.发送和获取数据时，可以获取进度信息。
 4.可以设置请求的超时时间。
 5.新增formData对象，可以发送表单数据。


 在发送Ajax请求（实质是一个HTTP请求）时，我们可能需要设置一些请求头部信息，比如content-type、connection、cookie、accept-xxx等。xhr提供了setRequestHeader来允许我们修改请求 header。
1.方法的第一个参数 header 大小写不敏感，即可以写成content-type，也可以写成Content-Type，甚至写成content-Type;

2.Content-Type的默认值与具体发送的数据类型有关，
  xhr.send(data)的参数data可以是以下几种类型：
    ArrayBuffer
    Blob
    Document
    DOMString
    FormData
    null
 （1）如果是 GET/HEAD请求，send()方法一般不传参或传 null。不过即使你真传入了参数，参数也最终被忽略，xhr.send(data)中的data会被置为 null.
 （2）xhr.send(data)中data参数的数据类型会影响请求头部content-type的默认值：
        如果data是 Document 类型，同时也是HTML Document类型，则content-type默认值为text/html;charset=UTF-8;否则为application/xml;charset=UTF-8；
        如果data是 DOMString 类型，content-type默认值为text/plain;charset=UTF-8；
        如果data是 FormData 类型，content-type默认值为multipart/form-data; boundary=[xxx]
        如果data是其他类型，则不会设置content-type的默认值 
    当然这些只是content-type的默认值，但如果用xhr.setRequestHeader()手动设置了中content-type的值，以上默认值就会被覆盖。
3.setRequestHeader必须在open()方法之后，send()方法之前调用，否则会抛错；