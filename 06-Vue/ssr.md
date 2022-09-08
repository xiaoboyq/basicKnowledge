# ssr
https://ssr.vue.org

# 概念： 
服务端渲染：将vue实例渲染成html字符串直接返回， 在前端激活为交互程序

# 优点
seo
首屏内容达到时间短

# 缺点
开发逻辑复杂
开发条件限制： 比如一些生命周期不可用， 一些第三方库会不能用 【beforeCreated  create 可用】
服务器负载大


# 服务端知识
express
npm i express -S


# 基本实现
使用渲染器将vue实例转化成html字符串并返回

vue-server-renderer
npm i vue-server-renderer -S


npm i vue vue-server-renderer - s 确保vue和vue-server-renderer版本相同匹配


# 激活过程



# spa页面缺点
seo差
首屏内容到达时间长

 
# favicon 【图标】
npm i serve-favicon



如果已经存在spa页面 需要优化seo
1.需要seo页面较少，只是几个营销页面需要， 考虑预渲染
2.确实需要做ssr改造，利用服务器端爬虫技术puppeteer
3.如上不行再选择重构
4.全新项目可以选择nuxt.js



