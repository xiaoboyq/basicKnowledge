<!-- https://blog.csdn.net/zhangjing0320/article/details/121230242 👍 -->
请求头
Origin	
Access-Control-Request-Headers
Access-Control-Request-Method	

响应头
Access-Control-Allow-Credentials
Access-Control-Allow-Headers
Access-Control-Allow-Methods
Access-Control-Allow-Origin
Access-Control-Expose-Headers
Access-Control-Max-Age


<!-- 在CORS中，默认的，只允许客户端读取下面六个响应头, 其他的需要Access-Control-Expose-Headers暴露出来 -->
Cache-Control
Content-Language
Content-Type
Expires
Last-Modified
Pragma    HTTP/1.0 caches协议没有实现Cache-Control（在http1.1实现），  实现了 Pragma: no-cache的功能。  请求头中如果包含pragma头的时候，服务器端会将该请求转发给源服务器。 
