<!-- LocalStorage https://juejin.cn/post/7033749571939336228 -->
1. 命名规范：  项目名 + 当前环境 + 项目版本 + 缓存key 【多个同源项目共享缓存，避免缓存相互污染】；
2. expire定时 ：
 设置缓存key时，将value包装成一个对象，对象中有相应的时效时段，当下一次想获取缓存值时，判断有无超时，不超时就获取value，超时就删除这个缓存
3. crypto加密： 加密很简单，直接使用crypto-js进行对数据的加密，使用这个库里的encrypt、decrypyt进行加密、解密

<!-- 其实实践的话比较简单啦，无非就是四步
1、与团队商讨一下key的格式
2、与团队商讨一下expire的长短
3、与团队商讨一下使用哪个库来对缓存进行加密（个人建议crypto-js）
4、代码实施-->


## sessionStorage 页面不共享
最初的时候误认为只要是同一网站下所有页面共享sessionStorage，后来发现事情不是这样的。
页面是否共享sesstionStorage与打开方式有关系：window.open打开的新标签页与当前页面是同一个session
；<a> 标签打开的不会带去session其它方式单独新开页面，会初始化一个新的session，即使同一网站下，他们也不属于同一个session。
即和它的名字一样， 会话, 只存在于当前会话阶段， 会话结束， 就会消失

譬如同一网站下有A、B两个页面，AB页面中均添加key为detail的sesstionStorage
（A页面：sesstionStorage.setItem(“detail”, “A”)，B页面：sesstionStorage.setItem(“detail”, “B”)），
A页面中点击链接打开的新标签与A页面享有同样的session，detail值均为A；B页面中点击链接打开的新标签与B页面享有同样的session，detail值均为B。AB页面中的session互不干扰。
原文链接：https://blog.csdn.net/yihanzhi/article/details/115284272


## localStorage 、sessionStorage
他们均只能存储字符串类型的对象（虽然规范中可以存储其他原生类型的对象，但是目前为止没有浏览器对其进行实现）。

localStorage生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。

sessionStorage生命周期为当前窗口或标签页，一旦窗口或标签页被永久关闭了，那么所有通过sessionStorage存储的数据也就被清空了。

不同浏览器无法共享localStorage或sessionStorage中的信息。相同浏览器的不同页面间可以共享相同的localStorage（页面属于相同域名和端口），但是不同页面或标签页间无法共享sessionStorage的信息。这里需要注意的是，页面及标签页仅指顶级窗口，如果一个标签页包含多个iframe标签且他们属于同源页面，那么他们之间是可以共享sessionStorage的。