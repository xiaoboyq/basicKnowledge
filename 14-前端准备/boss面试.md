1. 盒子模型
2. 块状元素和行内元素区别  行内元素设置width height padding margin 是否有效
3. 图片的加载 3种方式 dispaly:none; visibility:hidden; opacity:0 都会加载吗？
4. 图片 height:300px； 父亲div 会是303px 怎么处理？ font-size: 0 | line-height: 0  | display: block  【因为图片末尾默认会添加一个匿名文本盒子】
5. 父宽度不固定： 子3个 均匀分布。
6. 宏任务 、微任务 【页面有俩个<script>script1</script><script>script2</script>】
script1和script2中都有宏任务微任务 怎么执行。
7. 页面性能优化： react在webpack上做了很多的工作。
8. 数组去重。 key value 方式 【数组中有number和String类型，es5去重】；
9. react useRef【一个定时器，不想重新渲染，timer不放到state，怎么储存， useref】  生命周期， 函数组件和class组件区别 传参数。
10. react函数组件的闭包陷阱 https://blog.csdn.net/weixin_38080573/article/details/115178502
11. 使用过svg吗
12. 上传文件 同步和异步上传 【二进制流 还有其他方式吗】
13. 重绘、回流。
14. react 传值 component purecomponent。
15. 手机端0.5像素的border怎么生成。
16. 小程序分包机制。
17. obj和map 这种性能谁好： 要看数据量的 小的obj好 数据越多map越好
18. 事件循环机制

上传图片 base64 或者二进制流

<!-- <img src> 和背景图片加载 -->
# 参考： https://segmentfault.com/a/1190000010032501
## 渲染流程
解析HTML —> 构建DOM树
加载样式 —> 解析样式 —> 构建样式规则树
加载javascript —> 执行javascript代码
把DOM树和样式规则树匹配构建渲染树
计算元素位置进行布局
绘制
## 图片资源从什么时候开始加载，下图标出图片加载和渲染的时机：
解析HTML【遇到<img>标签加载图片】 —> 构建DOM树
加载样式 —> 解析样式【遇到背景图片链接不加载】 —> 构建样式规则树
加载javascript —> 执行javascript代码
把DOM树和样式规则树匹配构建渲染树【遍历DOM树时加载对应样式规则上的背景图片】
计算元素位置进行布局
绘制【开始渲染图片】

 <!-- 图片撑开父亲节点高度， 父亲节点高度比真实的高3px -->
https://blog.csdn.net/wzp6010625/article/details/80718791
解决方案
（1）消除掉匿名盒子的高度，给a设置line-height:0或font-size:0 
（2）给两者vertical-align:top，让其top对齐，而不是baseline对齐 
（3）【推荐】：给img以display:block，让它和匿名行级盒子不在一个布局上下文中，也就不存在行级盒的对齐问题


script 的下载和img 的预加载不能类比