window.location.href和document.location.href、document.URL的区别&JS的document 、documen 

1、document表示的是一个文档对象，window表示的是一个窗口对象，一个窗口下可以有多个文档对象。

　　所以一个窗口下只有一个window.location.href，但是可能有多个document.URL、document.location.href

2、window.location.href和document.location.href可以被赋值，然后跳转到其它页面，document.URL只能读不能写


http://blog.sina.com.cn/s/blog_a6fdc8be0102wlks.html