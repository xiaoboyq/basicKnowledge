## 浏览器如何知道服务器的数据已经发送完毕？HTTP 协议中的 Transfer-Encoding 【「传输编码」】
1、在HTTP 1.0及之前版本中，content-length字段可有可无(因为HTTP 1.0每次连接完成任务，服务器都会主动断开连接)，完全可以通过第三种方法来判断。
 
2、在http1.1及之后版本。如果是keep alive，则content-length和chunk必然是二选一，不然没法判断是否结束。若是非keep alive，则和http1.0一样。content-length可有可无。


